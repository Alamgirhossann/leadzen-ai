import asyncio
import os
import tempfile
import uuid
from typing import List, Dict

import httpx
import pandas as pd
from fastapi import APIRouter
from fastapi import UploadFile, File, status, HTTPException, BackgroundTasks
from loguru import logger
from pydantic import BaseModel

from app.config import (
    API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL,
    API_CONFIG_ALLOWED_CONTENT_TYPES,
    API_CONFIG_TEXAU_LINKEDIN_EMAIL_SEARCH_URL,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_PIPL_EMAIL_SEARCH_URL,
)
from app.pipl import PiplFindDetailsFromEmailRequest, PiplFindDetailsFromEmailResponse
from app.texau.linkedin.email_phone import (
    TexAuFindEmailAndPhoneForLinkedInProfileRequest,
    TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)

router = APIRouter(prefix="/bulk_upload", tags=["Bulk Search"])


async def send_success_email(email_id: str, filename: str):
    logger.success(f"Sending Success Email, {email_id=}, {filename=}")
    pass


async def send_failure_email(email_id: str, filename: str):
    logger.error(f"Sending Failure Email, {email_id=}, {filename=}")
    pass


async def update_history(user_id: str, data: List[Dict]):
    logger.debug(f"Updating History, {user_id=}, {len(data)=}")
    pass


async def handle_pipl_emails(
    emails: List[str], filename: str, max_timeout_counter: int = 18
):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            API_CONFIG_PIPL_EMAIL_SEARCH_URL,
            json=PiplFindDetailsFromEmailRequest(
                emails=emails, filename=filename
            ).dict(),
        )

        if response.status_code != 200:
            logger.error(
                f"Error handling pipl search, {response.status_code=}, {response.text=}"
            )
            return

        if not (json := response.json()):
            logger.error("Invalid Response")
            return

        data = PiplFindDetailsFromEmailResponse(**json)

        timeout_counter = max_timeout_counter

        while timeout_counter > 0:
            if os.path.exists(data.filename):
                logger.success(f"found {data.filename=}")
                # send email
                df = pd.read_csv(data.filename)
                logger.debug(df.head())

                await update_history(user_id="---", data=[])

                return await send_success_email("", data.filename)

            logger.warning(f"{data.filename=} not found, waiting")

            await asyncio.sleep(API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL)

            timeout_counter = timeout_counter - 1

        logger.critical(
            f"unable to find {data.filename=} in "
            f"{timeout_counter*API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL}s"
        )
        return await send_failure_email("", data.filename)


async def handle_linkedin_profile_urls(
    urls: List[str], filename: str, max_timeout_counter: int = 18
):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            API_CONFIG_TEXAU_LINKEDIN_EMAIL_SEARCH_URL,
            json=TexAuFindEmailAndPhoneForLinkedInProfileRequest(
                urls=urls,
                filename=filename,  # TODO: remove this cookie in production
                cookie="AQEDAQFGp0UCVdaAAAABe2AWLdIAAAF7hCKx0k4AeljWlYLJWzMzPyxIRAjQSo6OK5dVCVSSBXpy2J0DZrt9uyOICBu64noYRNWpJUHXEOm20kpdqFB5JFh6Az2QHDSH4_YwdnPjnqXEjJ8ihhF0Mo8D",
            ).dict(),
        )

        if response.status_code != 200:
            logger.error(
                f"Error handling linkedin profile url, {response.status_code=}, {response.text=}"
            )
            return

        if not (json := response.json()):
            logger.error("Invalid Response")
            return

        data = TexAuFindEmailAndPhoneForLinkedInProfileResponse(**json)

        timeout_counter = max_timeout_counter

        while timeout_counter > 0:
            if os.path.exists(data.filename):
                logger.success(f"found {data.filename=}")
                # send email
                df = pd.read_csv(data.filename)
                logger.debug(df.head())

                await update_history(user_id="---", data=[])

                return await send_success_email("", data.filename)

            logger.warning(f"{data.filename=} not found, waiting")

            await asyncio.sleep(API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL)

            timeout_counter = timeout_counter - 1

        logger.critical(
            f"unable to find {data.filename=} in "
            f"{timeout_counter*API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL}s"
        )
        return await send_failure_email("", data.filename)


class BulkUploadResponse(BaseModel):
    input_filename: str
    output_filename: str


@router.post("/csv", response_model=BulkUploadResponse)
async def upload_csv_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
):
    # read the file into pandas
    # store the file into incoming dir
    # depending on the content to work send to linkedin or pipl
    # check for the resulting file and send email with results
    # store results in history

    if file.content_type not in API_CONFIG_ALLOWED_CONTENT_TYPES:
        logger.warning(
            f"Uploaded File does not contain CSV Content: {file.content_type=}, {API_CONFIG_ALLOWED_CONTENT_TYPES=}"
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded File does not contain CSV Content",
        )

    if not file.filename.endswith(".csv"):
        logger.warning(f"Not a CSV File: {file.filename=}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded File is Not a CSV File",
        )

    # this is due to a known defect in the SpooledTemporary file library
    # as it dont implement the readable interface that pandas needs to read data
    # so i make a copy of the spooled temp file into a regular temp file
    # and then use it for pandas to read, and since both these files are temp files
    # they will vanish as soon as close as called, hence using the with context manager
    with tempfile.TemporaryFile() as temp_file:
        lines = file.file.readlines()
        temp_file.writelines(lines)
        temp_file.seek(0)

        df = pd.read_csv(temp_file)

        logger.debug(df.head())

        if df is None or df.empty:
            logger.warning("No Data in uploaded file")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No Data in Uploaded File",
            )

        df.fillna("", inplace=True)

        if "emails" in df.columns:
            logger.warning("Performing Email Searches")
            filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
            background_tasks.add_task(
                handle_pipl_emails,
                emails=list(df.emails),
                filename=filename,
            )
            return BulkUploadResponse(
                input_filename=file.filename, output_filename=filename
            )
        elif "linkedin_profile_urls" in df.columns:
            logger.warning("Performing LinkedIn Profile Searches")
            filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
            background_tasks.add_task(
                handle_linkedin_profile_urls,
                urls=list(df.linkedin_profile_urls),
                filename=filename,
            )
            return BulkUploadResponse(
                input_filename=file.filename, output_filename=filename
            )
        else:
            logger.warning("emails or linkedin_profile_urls columns not preset in file")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="emails or linkedin_profile_urls columns not preset in file",
            )

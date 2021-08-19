import asyncio
import os
import tempfile
from typing import List

import httpx as httpx
import pandas as pd
from fastapi import UploadFile, File, status, HTTPException, BackgroundTasks
from fastapi import APIRouter
from loguru import logger

from app.config import (
    API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL,
    API_CONFIG_ALLOWED_CONTENT_TYPES,
)
from app.texau.linkedin.email_phone import (
    handle_find_email_and_phone_for_linkedin_profile_url,
    TexAuFindEmailAndPhoneForLinkedInProfileRequest,
    TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)

router = APIRouter(prefix="/bulk_upload", tags=["Bulk Search"])


async def send_email(email_id: str, filename: str):
    logger.debug(f"sending {email_id=}, {filename=}")
    pass


async def handle_linkedin_profile_urls(urls: List[str], max_timeout_counter: int = 18):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:12005/api/texau/find_email_and_phone_for_linkedin_profile_url",
            json=TexAuFindEmailAndPhoneForLinkedInProfileRequest(
                urls=urls,
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

                return await send_email("", data.filename)

            logger.warning(f"{data.filename=} not found, waiting")

            await asyncio.sleep(API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL)

            timeout_counter = timeout_counter - 1

        logger.error(
            f"unable to find {data.filename=} in "
            f"{timeout_counter*API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL}s"
        )


@router.post("/csv")
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
            pass
        elif "linkedin_profile_urls" in df.columns:
            background_tasks.add_task(
                handle_linkedin_profile_urls, urls=list(df.linkedin_profile_urls)
            )
        else:
            logger.warning("emails or linkedin_profile_urls columns not preset in file")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="emails or linkedin_profile_urls columns not preset in file",
            )

    return True

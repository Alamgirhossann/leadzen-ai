import asyncio
import os
from typing import List, Dict, Optional, Tuple

import httpx
import pandas as pd
from loguru import logger
from pydantic import BaseModel
from app.config import (
    API_CONFIG_SENDINBLUE_BULK_FAILURE_TEMPLATE_ID,
    API_CONFIG_SENDINBLUE_EXCEL_EXPORT_FAILURE_TEMPLATE_ID,
    API_CONFIG_SENDINBLUE_EXCEL_EXPORT_SUCCESS_TEMPLATE_ID,
    API_CONFIG_SENDINBLUE_BULK_EXPORT_SUCCESS_TEMPLATE_ID,
)

from app.config import (
    API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL,
    API_CONFIG_SELF_BASE_EXTERNAL_URL,
    API_CONFIG_EMAIL_SEND_URL,
)
from app.email import UserEmailSendRequest
from app.users import User


class BulkRequest(BaseModel):
    incoming_filename: Optional[str] = None
    outgoing_filename: str
    user: User


async def wait_and_check_for_filename(
    request: BulkRequest, max_timeout_counter: int = 18
):
    timeout_counter = max_timeout_counter
    logger.debug(f"{request=}")
    while timeout_counter > 0:
        if os.path.exists(request.outgoing_filename):
            logger.success(f"found {request.outgoing_filename=}")

            if request.outgoing_filename.endswith(".xlsx"):
                df = pd.read_excel(request.outgoing_filename)
            else:
                df = pd.read_csv(request.outgoing_filename)

            logger.debug(df.head())

            await update_history(user_id="---", data=[])

            return await send_success_email(
                user=request.user, filename=request.outgoing_filename
            )

        logger.warning(f"{request.outgoing_filename=} not found, waiting")

        await asyncio.sleep(API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL)

        timeout_counter = timeout_counter - 1

    logger.critical(
        f"unable to find {request.outgoing_filename=} in "
        f"{timeout_counter * API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL}s"
    )

    if not request.incoming_filename:
        logger.warning("Incoming filename is Invalid, Not Sending Error Email")
        return

    return await send_failure_email(
        user=request.user, filename=request.incoming_filename
    )


class BulkUploadResponse(BaseModel):
    input_filename: Optional[str] = None
    output_filename: Optional[str] = None
    detail: Optional[str] = None


def generate_email_message_for_file(user: User, filename: str) -> Tuple[str, str]:
    check = ""
    for i in range(len(filename)):
        if i != 0 or i != 1:
            check = check + filename[i]
    if filename.endswith(".xlsx"):
        template_id = API_CONFIG_SENDINBLUE_EXCEL_EXPORT_SUCCESS_TEMPLATE_ID
        download_link = f"{API_CONFIG_SELF_BASE_EXTERNAL_URL}/api/{check} \n"
    else:
        template_id = API_CONFIG_SENDINBLUE_BULK_EXPORT_SUCCESS_TEMPLATE_ID
        download_link = f"{API_CONFIG_SELF_BASE_EXTERNAL_URL}/api/{check} \n"

    return template_id, download_link


async def send_success_email(user: User, filename: str):
    template_id, download_link = generate_email_message_for_file(
        user=user, filename=filename
    )
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_EMAIL_SEND_URL,
                json=UserEmailSendRequest(
                    template_id=template_id,
                    name=user.username,
                    email=user.email,
                    link=download_link,
                ).dict(),
            )

            if response.status_code != 200:
                logger.error(
                    f"Error sending email, {response.status_code=}, {response.text=}"
                )
                return

            logger.success(f"Email Sent Successfully, {user.email=}, {filename=}")
    except httpx.ReadTimeout as e:
        logger.warning(f"ReadTimeout - can be ignored: {str(e)}")
    except Exception as e:
        logger.critical(f"Exception Sending Email: {str(e)}")


async def send_failure_email(user: User, filename: str):
    try:
        if filename.endswith(".csv"):
            template_id = API_CONFIG_SENDINBLUE_BULK_FAILURE_TEMPLATE_ID
        else:
            template_id = API_CONFIG_SENDINBLUE_EXCEL_EXPORT_FAILURE_TEMPLATE_ID
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_EMAIL_SEND_URL,
                json=UserEmailSendRequest(
                    template_id=template_id,
                    name=user.username,
                    email=user.email,
                    link="",
                ).dict(),
            )

            if response.status_code != 200:
                logger.error(
                    f"Error sending email, {response.status_code=}, {response.text=}"
                )
                return

            logger.success(f"Email Sent Successfully, {user.email=}, {filename=}")
    except httpx.ReadTimeout as e:
        logger.warning(f"ReadTimeout - can be ignored: {str(e)}")
    except Exception as e:
        logger.critical(f"Exception Sending Email: {str(e)}")


async def update_history(user_id: str, data: List[Dict]):
    logger.debug(f"Updating History, {user_id=}, {len(data)=}")
    pass

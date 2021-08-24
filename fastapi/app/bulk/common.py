import asyncio
import os
from typing import List, Dict

import httpx
import pandas as pd
from loguru import logger
from pydantic import BaseModel

from app.config import (
    API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL,
    API_CONFIG_SELF_BASE_EXTERNAL_URL,
    API_CONFIG_EMAIL_SEND_URL,
)
from app.email import UserEmailSendRequest
from app.users import User


class BulkRequest(BaseModel):
    incoming_filename: str
    outgoing_filename: str
    user: User


async def wait_and_check_for_filename(
    request: BulkRequest, max_timeout_counter: int = 18
):
    timeout_counter = max_timeout_counter

    while timeout_counter > 0:
        if os.path.exists(request.outgoing_filename):
            logger.success(f"found {request.outgoing_filename=}")

            # send email
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

    return await send_failure_email(
        user=request.user, filename=request.incoming_filename
    )


class BulkUploadResponse(BaseModel):
    input_filename: str
    output_filename: str


async def send_success_email(user: User, filename: str):
    email_text = (
        f"Dear {user.username}, \n"
        f"Your Bulk Search results are ready. \n"
        f"Please click on the link below to download the results:\n"
        f"{API_CONFIG_SELF_BASE_EXTERNAL_URL}/api/{filename.removeprefix('./')} \n"
        f"--- \n"
        f"Thanks \n"
        f"Analystt Team "
    )

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_EMAIL_SEND_URL,
                json=UserEmailSendRequest(email=user.email, text=email_text).dict(),
            )

            if response.status_code != 200:
                logger.error(
                    f"Error sending email, {response.status_code=}, {response.text=}"
                )
                return

            logger.success(f"Email Sent Successfully, {user.email=}, {filename=}")
    except Exception as e:
        logger.critical(f"Exception Sending Email: {str(e)}")


async def send_failure_email(user: User, filename: str):
    email_text = (
        f"Dear {user.username}, \n"
        f"Your Bulk Search request for {filename} has failed. \n "
        f"--- \n"
        f"Thanks \n"
        f"Analystt Team "
    )

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_EMAIL_SEND_URL,
                json=UserEmailSendRequest(email=user.email, text=email_text).dict(),
            )

            if response.status_code != 200:
                logger.error(
                    f"Error sending email, {response.status_code=}, {response.text=}"
                )
                return

            logger.success(f"Email Sent Successfully, {user.email=}, {filename=}")
    except Exception as e:
        logger.critical(f"Exception Sending Email: {str(e)}")


async def update_history(user_id: str, data: List[Dict]):
    logger.debug(f"Updating History, {user_id=}, {len(data)=}")
    pass

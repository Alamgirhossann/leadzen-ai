import asyncio
import os
from typing import List, Dict, Optional, Tuple

import httpx
import pandas as pd
from loguru import logger
from pydantic import BaseModel

from app.config import (
    API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL,
    API_CONFIG_SELF_BASE_EXTERNAL_URL,
    API_CONFIG_EMAIL_SEND_CUSTOM_URL,
)
from app.email import UserEmailSendCustomRequest


class RealTimeRequest(BaseModel):
    incoming_filename: Optional[str] = None
    outgoing_filename: str
    user: Dict[str, str]


async def wait_and_check_for_filename(
    request: RealTimeRequest, max_timeout_counter: int = 18
):
    timeout_counter = max_timeout_counter
    while timeout_counter > 0:
        if os.path.exists(request.outgoing_filename):
            logger.success(f"found {request.outgoing_filename=}")
            df = pd.read_excel(request.outgoing_filename)
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


class RealTimeUploadResponse(BaseModel):
    input_filename: str
    output_filename: str


def generate_email_message_for_file(user, filename: str) -> Tuple[str, str]:
    subject = f"LeadZen: Your custom data request is Ready"
    check = ""
    for i in range(len(filename)):
        if i != 0 or i != 1:
            check = check + filename[i]
    message = (
        f"Dear {user['username']}, \n"
        f"We have completed your custom data request for: {user['requirement']} \n"
        f"Please click on the link below to download the results. The download should start automatically, "
        f"however in case it doesn't kindly right click on the link and download the linked file. Get your lead "
        f"details as you open the file in Excel.\n"
        f"{API_CONFIG_SELF_BASE_EXTERNAL_URL}/api/{check} \n"
        f"--- \n"
        f"Thanks \n"
        f"LeadZen Team "
    )

    return message, subject


async def send_success_email(user, filename: str):

    message, subject = generate_email_message_for_file(user=user, filename=filename)

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_EMAIL_SEND_CUSTOM_URL,
                json=UserEmailSendCustomRequest(
                    email=user["email"],
                    message=message,
                    subject=subject,
                ).dict(),
            )

            if response.status_code != 200:
                logger.error(
                    f"Error sending email, {response.status_code=}, {response.text=}"
                )
                return

            logger.success(f"Email Sent Successfully, {user['email']=}, {filename=}")
    except httpx.ReadTimeout as e:
        logger.warning(f"ReadTimeout - can be ignored: {str(e)}")
    except Exception as e:
        logger.critical(f"Exception Sending Email: {str(e)}")


async def send_failure_email(user, filename: str):
    message = (
        f"Dear {user['username']}, \n"
        f"Your request for {user['requirement']} has failed. \n "
        f"--- \n"
        f"Thanks \n"
        f"LeadZen Team "
    )

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_EMAIL_SEND_CUSTOM_URL,
                json=UserEmailSendCustomRequest(
                    email=user["email"],
                    message=message,
                    subject=f"Request for {user['requirement']} Failed",
                ).dict(),
            )

            if response.status_code != 200:
                logger.error(
                    f"Error sending email, {response.status_code=}, {response.text=}"
                )
                return

            logger.success(f"Email Sent Successfully, {user['email']=}, {filename=}")
    except httpx.ReadTimeout as e:
        logger.warning(f"ReadTimeout - can be ignored: {str(e)}")
    except Exception as e:
        logger.critical(f"Exception Sending Email: {str(e)}")


async def update_history(user_id: str, data: List[Dict]):
    logger.debug(f"Updating History, {user_id=}, {len(data)=}")
    pass

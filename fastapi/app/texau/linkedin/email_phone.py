import asyncio
import json
import os
import uuid
from fileinput import filename
from typing import Optional, List

import httpx
import pandas as pd
from fastapi import HTTPException
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import (
    API_CONFIG_TEXAU_PROXY_NAME,
    API_CONFIG_TEXAU_KEY,
    API_CONFIG_TEXAU_URL,
    API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_RECIPE_ID,
    API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_FUNC_ID,
    API_CONFIG_TEXAU_PROXY_USER,
    API_CONFIG_TEXAU_PROXY_PASS,
    API_CONFIG_TEXAU_PROXY_HOST,
)
from app.texau.common import check_execution_status, read_linkedin_cookie


async def send_spice_request(cookie: str, linkedin_profile_url: str) -> Optional[str]:
    logger.debug(f"{linkedin_profile_url=}")
    payload = json.dumps(
        {
            "funcName": API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_FUNC_ID,
            "spiceId": API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_RECIPE_ID,
            "inputs": {
                "profileUrl": linkedin_profile_url,
                "li_at": cookie,
                "proxy": {
                    "proxyName": API_CONFIG_TEXAU_PROXY_NAME,
                    "ip": API_CONFIG_TEXAU_PROXY_HOST,
                    "name": API_CONFIG_TEXAU_PROXY_USER,
                    "password": API_CONFIG_TEXAU_PROXY_PASS,
                },
            },
            "executionName": str(uuid.uuid4()),
        }
    )
    headers = {
        "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_TEXAU_URL, headers=headers, data=payload
            )

            if response.status_code != 200:
                logger.error(
                    f"Invalid Status Code: {response.status_code=}, {response.text=}"
                )
                return None

            if not (data := response.json()):
                logger.error(f"Invalid Data")
                return None

            if not (execution_id := data.get("executionId")):
                logger.error(f"Invalid Data")
                return None

            return execution_id
    except Exception as e:
        logger.critical(f"Exception sending to texau: {str(e)}")
        return None


class TexAuFindEmailAndPhoneForLinkedInProfileRequest(BaseModel):
    urls: List[str]
    cookie: Optional[str] = None
    filename: Optional[str] = None


class TexAuFindEmailAndPhoneForLinkedInProfileResponse(BaseModel):
    filename: str


async def handle_find_email_and_phone_for_linkedin_profile_url(
    request: TexAuFindEmailAndPhoneForLinkedInProfileRequest, cookie: str, filename: str
) -> Optional[TexAuFindEmailAndPhoneForLinkedInProfileResponse]:
    """
    :param request: pydantic request object
    :param cookie: linkedin cookie
    :param filename: expected filename of the output
    :return: pydantic response object

    take in the url, cookie and filename, do search on texau and collect the results and store it into the filename
    as a csv file
    """

    if not filename.endswith(".csv"):
        logger.warning("Filename does not end with .csv, only CSV files are supported")
        return None

    try:
        unique_urls = list(set(request.urls))

        request_coroutines = [
            send_spice_request(cookie=cookie, linkedin_profile_url=url)
            for url in unique_urls
            if url
        ]

        execution_ids = await asyncio.gather(*request_coroutines)

        logger.debug(f"{execution_ids=}")

        check_coroutines = [
            check_execution_status(execution_id=execution_id)
            for execution_id in execution_ids
        ]

        responses = await asyncio.gather(*check_coroutines)

        if not any(responses):
            logger.error("no valid responses found")
            return

        df = pd.DataFrame([x for x in responses if x])
        logger.debug(df.head())

        df.to_csv(filename, index=False)

        os.sync()

        logger.success(f"saved to {filename=}")

        return TexAuFindEmailAndPhoneForLinkedInProfileResponse(filename=filename)
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )

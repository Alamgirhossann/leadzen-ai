import asyncio
import os
import uuid
from typing import Optional, List

import pandas as pd
from fastapi import HTTPException
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import (
    API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_SPICE_ID,
    API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_FUNC_ID,
)
from app.texau.common import TEXAU_PROXY
from app.texau.spice import send_spice_request
from app.texau.status import get_status_waiting


class TexAuFindEmailAndPhoneForLinkedInProfileRequest(BaseModel):
    urls: List[str]
    cookie: Optional[str] = None
    filename: Optional[str] = None


class TexAuFindEmailAndPhoneForLinkedInProfileResponse(BaseModel):
    filename: str


async def handle_find_email_and_phone_for_linkedin_profile_url(
    request: TexAuFindEmailAndPhoneForLinkedInProfileRequest,
) -> Optional[TexAuFindEmailAndPhoneForLinkedInProfileResponse]:
    if not request.filename.endswith(".csv"):
        logger.warning("Filename does not end with .csv, only CSV files are supported")
        return None

    try:
        unique_urls = list(set(request.urls))

        request_coroutines = [
            send_spice_request(
                data={
                    "funcName": API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_FUNC_ID,
                    "spiceId": API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_SPICE_ID,
                    "inputs": {
                        "profileUrl": url,
                        "li_at": request.cookie,
                        "proxy": TEXAU_PROXY,
                    },
                    "executionName": str(uuid.uuid4()),
                }
            )
            for url in unique_urls
            if url
        ]

        execution_ids = await asyncio.gather(*request_coroutines)

        logger.debug(f"{execution_ids=}")

        check_coroutines = [
            get_status_waiting(execution_id=execution_id)
            for execution_id in execution_ids
        ]

        responses = await asyncio.gather(*check_coroutines)

        if not any(responses):
            logger.error("no valid responses found")
            return

        df = pd.DataFrame([x for x in responses if x])
        logger.debug(df.head())

        df.to_csv(request.filename, index=False)

        os.sync()

        logger.success(f"saved to {request.filename=}")

        return TexAuFindEmailAndPhoneForLinkedInProfileResponse(
            filename=request.filename
        )
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )

import asyncio
from typing import List, Dict, Optional, Text

import httpx
from fastapi import APIRouter, HTTPException, status
from loguru import logger
from pydantic import BaseModel, conlist
import phonenumbers

from app.config import (
    API_CONFIG_GET_PHONE_VERIFICATION_URL,
    API_CONFIG_GET_PHONE_VERIFICATION_APIKEY,
    API_CONFIG_GET_PHONE_VERIFICATION_CALLBACK_URL,
    API_CONFIG_HTTP_CALL_TIMEOUT_IN_SECONDS,
)

router = APIRouter(prefix="/phone", tags=["Phone Verification"])


class PhoneRequest(BaseModel):
    phones: conlist(item_type=str, min_items=1)


@router.post("/phone_verification", response_model=List[Dict])
async def phone_verification(request: PhoneRequest):
    logger.info(f"{request=}")

    def clean_phone_numbers(phones: List[Text]) -> Optional[List[Dict]]:
        def fallback(phone: Text) -> Optional[Text]:
            try:
                x = str(int(phone))
                if len(x) != 10:
                    logger.warning("Not 10 Digit Phone Number")
                    return None
                else:
                    logger.success(x)
                    return x
            except Exception as e:
                logger.warning(e)
                return None

        def parse(phone: str) -> Optional[Dict]:
            try:
                return {
                    "cleaned": str(phonenumbers.parse(phone, None).national_number),
                    "raw": phone,
                }
            except Exception as e:
                logger.warning(f"Exception Parsing Phone Number {phone=}: {e}")

                logger.warning(f"Using Fallback Parsing Phone Number {phone=}")
                if not (cleaned := fallback(phone)):
                    return None

                return {"cleaned": cleaned, "raw": phone}

        phones = [parse(x) for x in phones if x]

        if not any(phones):
            logger.warning("No Results")
            return None

        phones = [x for x in phones if x]

        logger.success(phones)

        return phones

    async def verify_one(clean_phone: Text, raw_phone: Text, client: httpx.AsyncClient):
        response = await client.get(
            API_CONFIG_GET_PHONE_VERIFICATION_URL,
            params={
                "apikey": API_CONFIG_GET_PHONE_VERIFICATION_APIKEY,
                "phoneno": clean_phone,
                "callbackurl": API_CONFIG_GET_PHONE_VERIFICATION_CALLBACK_URL,
            },
            timeout=httpx.Timeout(API_CONFIG_HTTP_CALL_TIMEOUT_IN_SECONDS),
        )

        if not response:
            logger.error("Invalid Response")
            return None

        if response.status_code != 200:
            logger.error(f"Invalid Status Response: {response.status_code=}")
            return None

        if not (data := response.json()):
            logger.error("Invalid Response Data:")
            return None

        data["phone"] = clean_phone
        data["raw_phone"] = raw_phone
        logger.debug(f"{data=}")

        return data

    if not (
        cleaned_and_de_duplicated_phone_numbers := clean_phone_numbers(
            phones=list(set(request.phones))
        )
    ):
        logger.warning("No Valid Phone Number Found in Request")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="No Valid Phone Numbers"
        )

    async with httpx.AsyncClient() as client:
        coroutines = [
            verify_one(clean_phone=x["cleaned"], raw_phone=x["raw"], client=client)
            for x in cleaned_and_de_duplicated_phone_numbers
        ]
        results = await asyncio.gather(*coroutines)

    if not any(results):
        logger.warning("No Verification Results")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No Results Found"
        )

    logger.debug(f"{results=}")

    return results

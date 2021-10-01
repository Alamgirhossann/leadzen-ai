import asyncio
import httpx
import json
import requests
from typing import List, Optional
from app.config import (API_CONFIG_GET_PHONE_VERIFICATION_URL,
                        API_CONFIG_GET_PHONE_VERIFICATION_APIKEY,
                        API_CONFIG_GET_PHONE_VERIFICATION_CALLBACK_URL)
from fastapi import APIRouter,HTTPException,Depends
from pydantic.main import BaseModel
from typing import Optional
from loguru import logger
from starlette import status
from app.users import fastapi_users, get_user

router = APIRouter(prefix="/phone", tags=["Phone Verification"])


class PhoneRequest(BaseModel):
    phones: List[str]=[]

@router.post("/phone_verification")
async def phone_verification(request:PhoneRequest,user=Depends(fastapi_users.get_current_active_user)):
    logger.info(f"{user=}")
    if request.phones:
        async def async_call(phone_number):
            url = API_CONFIG_GET_PHONE_VERIFICATION_URL
            payload = {
                "apikey": API_CONFIG_GET_PHONE_VERIFICATION_APIKEY,
                "phoneno": phone_number,
                "callbackurl": API_CONFIG_GET_PHONE_VERIFICATION_CALLBACK_URL
            }
            async with httpx.AsyncClient() as client:
                timeout = httpx.Timeout(20.0)
                response = await client.get(url, params=payload,timeout=timeout)
                if response.status_code == 200:
                    data = json.loads(response.text)
                    data["phone"] = phone_number
                    logger.debug(data)
                    return data
                elif response.status_code == 400:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=str("Phone Verification: Bad request"),
                    )
                else:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=str("Phone Verification: Data not found"),
                    )
        coros = [async_call(_i) for _i in request.phones]
        results = await asyncio.gather(*coros)
        return results
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str("Phone: Invalid Phone Number"),
        )
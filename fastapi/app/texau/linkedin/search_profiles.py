import json
import uuid
from typing import Optional, List

import httpx
from fastapi import HTTPException
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import (
    API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID,
    API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID,
    API_CONFIG_TEXAU_PROXY_NAME,
    API_CONFIG_TEXAU_PROXY_USER,
    API_CONFIG_TEXAU_PROXY_PASS,
    API_CONFIG_TEXAU_KEY,
    API_CONFIG_TEXAU_URL as url,
    API_CONFIG_TEXAU_PROXY_HOST,
)
from app.linkedin import query_url_builder as linkedin_query_url_builder
from app.texau.common import TexAuResponse, read_linkedin_cookie, check_execution_status


async def send_spice_request(cookie, linkedin_url) -> Optional[str]:
    logger.debug("send_spice_request id>>>>>>>>>", linkedin_url)
    payload = json.dumps(
        {
            "funcName": API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID,
            "spiceId": API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID,
            "inputs": {
                "search": linkedin_url,
                "numberOfPage": "10",
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
            response = await client.post(url, headers=headers, data=payload)

            if response.status_code != 200:
                logger.error(
                    f"Invalid Status Code: {response.status_code=}, {response.text=}"
                )
                return None

            if not (data := response.json()):
                logger.error(f"Invalid Data")
                return None
            logger.debug("ExecutionId>>>>" + data.get("executionId"))
            if not (task_id := data.get("executionId")):
                logger.error(f"Invalid Data")
                return None
            logger.debug("task_id>>>>" + task_id)
            return task_id
    except Exception as e:
        logger.critical(f"Exception sending to texau: {str(e)}")
        return None


class TexAuFindProfileRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    title: Optional[str] = None
    keywords: str
    industry: List[str] = []
    location: List[str] = []
    currentCompany: List[str] = []
    pastCompany: List[str] = []


class TexAuExecutionResponse(BaseModel):
    execution_id: str


async def handle_find_matching_linkedin_profiles(
    request: TexAuFindProfileRequest, cookie: str
) -> Optional[TexAuExecutionResponse]:
    try:
        if not (query_url := linkedin_query_url_builder(request.dict())):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str("TexAu: Could not make Linkedin Query based on input"),
            )

        logger.debug(query_url)

        if not (
            execution_id := await send_spice_request(
                cookie=cookie, linkedin_url=query_url
            )
        ):
            logger.warning("Invalid Task Id")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Task Id"),
            )

        logger.debug("Execution Id in main>>>>>" + execution_id)
        return TexAuExecutionResponse(execution_id=execution_id)
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )

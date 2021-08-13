import asyncio
import csv
import json
import uuid
from typing import Optional, List, Dict

import httpx
from fastapi import APIRouter, HTTPException
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import (
    API_CONFIG_LINKEDIN_CSV_FILE,
    API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID,
    API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID,
    API_CONFIG_TEXAU_PROXY,
    API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL, API_CONFIG_PROXY_USER, API_CONFIG_PROXY_PASS,
)
from app.config import (
    API_CONFIG_TEXAU_KEY,
    API_CONFIG_TEXAU_EXECUTION_URL,
)
from app.config import API_CONFIG_TEXAU_URL as url
from app.linkedin import query_url_builder as linkedin_query_url_builder


class TexAuRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    title: Optional[str] = None
    keywords: str
    industry: List[str] = []
    location: List[str] = []
    currentCompany: List[str] = []
    pastCompany: List[str] = []


class TexAuResponse(BaseModel):
    data: Optional[List[Dict]] = None


router = APIRouter(prefix="/texau", tags=["TexAu Search"])


def read_linkedin_cookie():
    with open(f"./{API_CONFIG_LINKEDIN_CSV_FILE}", "r") as file:
        csv_reader = csv.reader(file)
        for line in csv_reader:
            if csv_reader.line_num == 2:
                cookie = line[0]
                logger.debug(cookie, "cookie")
    return cookie


async def check_execution_status(execution_id: str) -> Optional[Dict]:
    if not execution_id:
        logger.warning("Invalid task_id")
        return None

    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
                "Content-Type": "application/json",
            }

            timeout_counter = 18

            while timeout_counter > 0:
                response = await client.get(
                    f"{API_CONFIG_TEXAU_EXECUTION_URL}{execution_id}", headers=headers
                )

                if response.status_code == 200:
                    if data := response.json():
                        if data["execution"]["status"] == "completed":
                            logger.success(f"Got Task Results: {data=}")
                            return data["execution"]["output"]
                        else:
                            logger.warning(f'{data["execution"]["status"]=}')

                await asyncio.sleep(
                    API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL
                )

                timeout_counter = timeout_counter - 1

            logger.warning(f"No results in 60s")

            return None
    except Exception as e:
        logger.critical(f"Exception Getting Task Status: {execution_id=}: {str(e)}")
        return None


async def send_spice_request(cookie, linkedin_url) -> Optional[str]:
    payload = json.dumps(
        {
            "funcName": API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID,
            "spiceId": API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID,
            "inputs": {
                "search": linkedin_url,
                "numberOfPage": "1",
                "li_at": cookie,
                "proxy": {
                    "proxyName": API_CONFIG_TEXAU_PROXY,
                    'ip': 'http://168.81.41.43:47192',
                    'name': API_CONFIG_PROXY_USER,
                    'password': API_CONFIG_PROXY_PASS
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

            if not (task_id := data.get("executionId")):
                logger.error(f"Invalid Data")
                return None

            return task_id
    except Exception as e:
        logger.critical(f"Exception sending to texau: {str(e)}")
        return None


@router.post("/search", response_model=TexAuResponse)
async def search_using_texau(request: TexAuRequest):
    logger.info(f"{request=}")

    try:
        if not (query_url := linkedin_query_url_builder(request.dict())):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str("TexAu: Could not make Linkedin Query based on input"),
            )

        logger.debug(query_url)

        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )

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

        if not (data := await check_execution_status(execution_id=execution_id)):
            logger.error("Invalid Data")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Data for Task-Id"),
            )
        return TexAuResponse(data=data)
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )
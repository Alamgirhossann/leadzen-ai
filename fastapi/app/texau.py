import asyncio
import csv
import json
import uuid
from typing import Optional, List, Dict

import httpx
from fastapi import APIRouter, HTTPException, Depends
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import (
    API_CONFIG_LINKEDIN_CSV_FILE,
    API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID,
    API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID,
    API_CONFIG_TEXAU_PROXY,
    API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL,
    API_CONFIG_PROXY_USER,
    API_CONFIG_PROXY_PASS,
    API_CONFIG_PROXY_URL,
)
from app.config import (
    API_CONFIG_TEXAU_KEY,
    API_CONFIG_TEXAU_EXECUTION_URL,
)
from app.config import API_CONFIG_TEXAU_URL as url
from app.linkedin import query_url_builder as linkedin_query_url_builder
from app.users import fastapi_users
from app.scraper import fetch_linkedin_cookie


class TexAuRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    title: Optional[str] = None
    keywords: str
    industry: List[str] = []
    location: List[str] = []
    currentCompany: List[str] = []
    pastCompany: List[str] = []


class TexAuExecutionResponse(BaseModel):
    execution_id: Optional[str] = None


class TexAuResponse(BaseModel):
    data: Optional[List[Dict]] = None


router = APIRouter(prefix="/texau", tags=["TexAu Search"])


def read_linkedin_cookie():
    cookie = ""
    with open(f"./{API_CONFIG_LINKEDIN_CSV_FILE}", "r") as file:
        csv_reader = csv.reader(file)
        for line in csv_reader:
            if csv_reader.line_num == 2:
                cookie = line[0]
                logger.debug(cookie, "cookie")
    return cookie


def refresh_linkedin_cookie_manually():
    logger.debug("linkedin cookie...")
    data = fetch_linkedin_cookie()
    header = ["cookie"]
    with open(f"./{API_CONFIG_LINKEDIN_CSV_FILE}", "w") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerow([data])
    logger.debug(header)
    return data


@router.get("/check_status/{execution_id}", response_model=TexAuResponse)
async def check_execution_status(execution_id: str):
    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
                "Content-Type": "application/json",
            }

            response = await client.get(
                f"{API_CONFIG_TEXAU_EXECUTION_URL}{execution_id}", headers=headers
            )

            if response.status_code == 200:
                if data := response.json():
                    if (
                            data["execution"]["status"] == "completed"
                            and data["execution"].get("output") is not None
                    ):
                        logger.success(f"Got Task Results: {data=}")
                        result = data["execution"]["output"]
                        logger.debug("TexAu Response>>>" + str(result))
                        return TexAuResponse(data=result)
                    if data["execution"]["status"] == "cookieError":
                        logger.debug("Result Cookie Error")
                        raise HTTPException(
                            status_code=status.HTTP_403_FORBIDDEN,
                            detail="Cookie Error",
                        )
                    # TODO: Handle the cookie error by sending an alert or refreshing the linkedin cookie

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No Results Found",
            )
    except Exception as e:
        logger.critical(f"Exception Getting Task Status: {execution_id=}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Finding Results",
        )


# this will be needed in the csv/bulk search case
async def wait_and_check_execution_status(execution_id: str) -> Optional[TexAuResponse]:
    if not execution_id:
        logger.warning("Invalid task_id")
        return None

    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
                "Content-Type": "application/json",
            }

            response = await client.get(
                f"{API_CONFIG_TEXAU_EXECUTION_URL}{execution_id}",
                headers=headers,
            )
            if response.status_code == 200:
                if data := response.json():
                    if (
                            data["execution"]["status"] == "completed"
                            and data["execution"].get("output") is not None
                    ):
                        logger.success(f"Got Task Results: {data=}")
                        result = data["execution"]["output"]
                        return TexAuResponse(data=result)
                    elif data["execution"]["status"] == "cookieError":
                        # async with httpx.AsyncClient() as cookie_client:
                        #     r = await cookie_client.get('/refresh_linkedin_cookie')
                        result = data["execution"]["output"]

                        return TexAuResponse(data=result)
                    else:
                        logger.warning(f'{data["execution"]["status"]=}')

            return None
    except Exception as e:
        logger.critical(f"Exception Getting Task Status: {execution_id=}: {str(e)}")
        return None


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
                    "proxyName": API_CONFIG_TEXAU_PROXY,
                    "ip": API_CONFIG_PROXY_URL,
                    "name": API_CONFIG_PROXY_USER,
                    "password": API_CONFIG_PROXY_PASS,
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


@router.post("/search", response_model=TexAuExecutionResponse)
async def search_using_texau(
        request: TexAuRequest, user=Depends(fastapi_users.get_current_active_user)
):
    logger.info(f"{request=}, {user=}")

    try:
        if not (query_url := linkedin_query_url_builder(request.dict())):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str("TexAu: Could not make Linkedin Query based on input"),
            )

        logger.debug(query_url)

        if not (cookie := read_linkedin_cookie()):
            if not (cookie := refresh_linkedin_cookie_manually()):
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

        logger.debug("Execution Id in main>>>>>" + execution_id)
        return TexAuExecutionResponse(execution_id=execution_id)
        # return {"execution_id": execution_id}
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )

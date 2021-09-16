import json
from typing import List
from app.users import fastapi_users
import httpx
import requests
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from loguru import logger
from pydantic import BaseModel, HttpUrl
from starlette import status
from app.credits.common import EmailSearchGetRequest, EmailSearchAddRequest
from app.credits.email import add_email_search, get_email_search
from app.credits.admin import deduct_credit
from starlette.responses import JSONResponse
from app.users import get_user
from app.config import (
    API_CONFIG_SNOV_GRANT_TYPE,
    API_CONFIG_SNOV_CLIENT_ID,
    API_CONFIG_SNOV_CLIENT_SECRET,
    API_CONFIG_SNOV_ADD_URL_SEARCH,
    API_CONFIG_SNOV_GET_EMAIL,
    API_CONFIG_SNOV_OAUTH_ACESS_TOKEN,
    API_CONFIG_DATABASE_GET_EMAIL,
    API_CONFIG_DATABASE_ADD_EMAIL,
)

router = APIRouter(prefix="/snov", tags=["Snov"])


class SnovIoRequest(BaseModel):
    url: List[HttpUrl] = []


async def add_email_into_database(user_id, query_url, email):
    await add_email_search(
        request=EmailSearchAddRequest(
            user_id=user_id, query_url=query_url, email_result=email
        )
    )


def get_access_token():
    params = {
        "grant_type": API_CONFIG_SNOV_GRANT_TYPE,
        "client_id": API_CONFIG_SNOV_CLIENT_ID,
        "client_secret": API_CONFIG_SNOV_CLIENT_SECRET,
    }
    try:
        res = requests.post(API_CONFIG_SNOV_OAUTH_ACESS_TOKEN, data=params)
        if res.status_code == 200:
            res_text = res.text.encode("ascii", "ignore")
            return json.loads(res_text)["access_token"]
        else:
            return JSONResponse(
                status_code=res.status_code,
                content={"message": "Error Getting Token for snov"},
            )
    except Exception as e:
        logger.critical(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting Token For snov",
        )


def add_url_for_search(url):
    print("url2", url)
    token = get_access_token()
    params = {"access_token": token, "url": url}
    try:
        res = requests.post(API_CONFIG_SNOV_ADD_URL_SEARCH, data=params)
        if res.status_code == 200:
            return json.loads(res.text)
        else:
            return JSONResponse(
                status_code=res.status_code,
                content={"message": "Error Adding url for search"},
            )
    except Exception as e:
        logger.critical(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Adding url for search",
        )


@router.post("/emails_for_url")
async def get_emails_from_url(
    request: SnovIoRequest,
    background_tasks: BackgroundTasks,
    user=Depends(fastapi_users.get_current_active_user),
):
    status_codes = status.HTTP_500_INTERNAL_SERVER_ERROR
    try:
        url = request.url[0]
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_DATABASE_GET_EMAIL,
                json=EmailSearchGetRequest(
                    user_id=str(user.id),
                    query_url=url,
                ).dict(),
            )
        if response.status_code == 200:
            return response.json()
        else:
            user_credit = await get_user(user)
            email_credit = user_credit.email_credit
            if email_credit >= 1:
                add_url_for_search(url)
                token = get_access_token()
                params = {"access_token": token, "url": url}
                async with httpx.AsyncClient() as client:
                    res = await client.post(API_CONFIG_SNOV_GET_EMAIL, data=params)
                    if res.status_code == 200:
                        data = json.loads(res.text)
                        if data["success"]:
                            email_data = data["data"]["emails"]
                            email = email_data[0]["email"]
                            valid = email_data[0]["status"]
                            if valid == "valid" or valid == "unknown":
                                background_tasks.add_task(
                                    add_email_into_database, str(user.id), url, email
                                )
                                background_tasks.add_task(deduct_credit, "EMAIL", user)
                                return email
                        return JSONResponse(
                            status_code=404,
                            content={"message": "Snov: Data not found"},
                        )
                    else:
                        return JSONResponse(
                            status_code=res.status_code,
                            content={"message": "Error Getting Data From snov"},
                        )
            else:
                return JSONResponse(
                    status_code=402,
                    content={"message": "Insufficient Credits"},
                )
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from snov",
        )

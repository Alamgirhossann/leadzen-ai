import json
from typing import List
from app.users import fastapi_users
import httpx
import requests
from fastapi import APIRouter, HTTPException,Depends,BackgroundTasks
from loguru import logger
from pydantic import BaseModel, HttpUrl
from starlette import status
from app.credits.common import EmailSearchGetRequest ,EmailSearchAddRequest
from app.credits.admin import deduct_credit
from app.users import get_user
from app.config import (
    API_CONFIG_SNOV_GRANT_TYPE,
    API_CONFIG_SNOV_CLIENT_ID,
    API_CONFIG_SNOV_CLIENT_SECRET,
    API_CONFIG_SNOV_ADD_URL_SEARCH,
    API_CONFIG_SNOV_GET_EMAIL,
    API_CONFIG_SNOV_OAUTH_ACESS_TOKEN,
    API_CONFIG_DATABASE_GET_EMAIL,
    API_CONFIG_DATABASE_ADD_EMAIL
)

router = APIRouter(prefix="/snov", tags=["Snov"])


class SnovIoRequest(BaseModel):
    url: List[HttpUrl] = []


async def add_email_into_database(user_id,query_url,email):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            API_CONFIG_DATABASE_ADD_EMAIL,
            json=EmailSearchAddRequest(
                user_id=user_id,
                query_url=query_url,
                email_result=email
            ).dict(),
        )



def get_access_token():
    params = {
        "grant_type": API_CONFIG_SNOV_GRANT_TYPE,
        "client_id": API_CONFIG_SNOV_CLIENT_ID,
        "client_secret": API_CONFIG_SNOV_CLIENT_SECRET,
    }
    res = requests.post(API_CONFIG_SNOV_OAUTH_ACESS_TOKEN, data=params)
    resText = res.text.encode("ascii", "ignore")
    return json.loads(resText)["access_token"]


def add_url_for_search(url):
    print("url2", url)
    token = get_access_token()
    params = {"access_token": token, "url": url}
    res = requests.post(API_CONFIG_SNOV_ADD_URL_SEARCH, data=params)
    return json.loads(res.text)


@router.post("/emails_for_url")
async def get_emails_from_url(
        request: SnovIoRequest,
        background_tasks:BackgroundTasks,
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
            x = await get_user(user)
            email_credit = x.email_credit
            if email_credit>=1:
                add_url_for_search(url)
                token = get_access_token()
                params = {"access_token": token, "url": url}
                async with httpx.AsyncClient() as client:
                    res = await client.post(API_CONFIG_SNOV_GET_EMAIL, data=params)
                data = json.loads(res.text)
                if data:
                    y = data["data"]["emails"]
                    email = y[0]["email"]
                    valid = y[0]["status"]
                    if valid == "valid" or valid == "unknown":
                        background_tasks.add_task(add_email_into_database,str(user.id),url,email)
                        background_tasks.add_task(deduct_credit, "EMAIL", user)
                        return email
                status_codes = status.HTTP_404_NOT_FOUND
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=str("Snov: Data not found"),
                )
            else:
                status_codes = status.HTTP_402_PAYMENT_REQUIRED
                raise HTTPException(
                    status_code=status.HTTP_402_PAYMENT_REQUIRED,
                    detail=str("Insufficient Credits"),
                )
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status_codes,
            detail="Error Getting data from snov",
        )

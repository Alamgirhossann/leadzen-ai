from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.config import (
    API_CONFIG_SNOV_GRANT_TYPE,
    API_CONFIG_SNOV_CLIENT_ID,
    API_CONFIG_SNOV_CLIENT_SECRET,
    API_CONFIG_TRUEMAIL_API_URL,
    API_CONFIG_TRUEMAIL_API_KEY,
    API_CONFIG_SNOV_ADD_URL_SEARCH,
    API_CONFIG_SNOV_GET_EMAIL,
    API_CONFIG_TRUEMAIL_API_URL,
    API_CONFIG_SNOV_OAUTH_ACESS_TOKEN,
)
import requests
import httpx
import json
from loguru import logger
from starlette import status

router = APIRouter(prefix="/get_email", tags=["Customize Email"])


class SnovIoRequest(BaseModel):
    url: List[str] = []


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


@router.post("/snov/")
async def get_emails_from_url(request: SnovIoRequest):
    try:
        url = request.url[0]
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
            if valid == "valid":
                return email
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=str("Snov: Invalid Email"),
                )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str("Snov: Data not found"),
        )
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from snov",
        )

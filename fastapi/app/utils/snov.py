import json
import sys
from typing import List, Optional

import httpx
import requests
from fastapi import APIRouter, HTTPException
from loguru import logger
from pydantic import BaseModel, HttpUrl
from starlette import status

from app.config import (
    API_CONFIG_SNOV_GRANT_TYPE,
    API_CONFIG_SNOV_CLIENT_ID,
    API_CONFIG_SNOV_CLIENT_SECRET,
    API_CONFIG_SNOV_ADD_URL_SEARCH,
    API_CONFIG_SNOV_GET_EMAIL,
    API_CONFIG_SNOV_OAUTH_ACESS_TOKEN, )

router = APIRouter(prefix="/snov", tags=["Snov"])


class SnovIoRequest(BaseModel):
    url: List[HttpUrl] = []


class TexAuFindLinkedInCompanyRequest(BaseModel):
    url: Optional[str] = None
    name: Optional[str] = None
    cookie: Optional[str] = None


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


@router.post("/emails_for_company")
async def get_emails_from_domain(request: TexAuFindLinkedInCompanyRequest):
    try:
        token = get_access_token()
        params = {
            "access_token": token,
            "domain": request.url,
            "type": "personal",
            "limit": 10,
            "lastId": 0,
            "positions[]": ["Founder", "Director", "Chief", "President", "COO", "CEO"]
        }
        async with httpx.AsyncClient() as client:
            res = await client.get("https://api.snov.io/v2/domain-emails-with-info", params=params)

            if res.status_code == 200:
                return json.loads(res.text)

            elif res.status_code == 400:
                print("in 400")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=str("Snov: Bad request"),
                )

            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=str("Snov: Data not found"),
                )

    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print(exc_type, exc_tb.tb_lineno)
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from snov",
        )

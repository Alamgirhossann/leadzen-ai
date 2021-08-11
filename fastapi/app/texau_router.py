import asyncio
import csv
import json
from typing import Optional, List, Dict

import httpx
from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import CSV_FILE
from app.config import PROXY_USER, PROXY_PASS, TEXAU_KEY, TEXAU_EXECUTION_URL
from app.config import TEXAU_URL as url
from app.url_builder import query


class QueryBuilderRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    title: Optional[str] = None
    keywords: str
    industry: List[str] = []
    location: List[str] = []
    currentCompany: List[str] = []
    pastCompany: List[str] = []


class CompanyReportResponse(BaseModel):
    data: Optional[List[Dict]] = None


router = APIRouter(prefix="/texAu", tags=["TexAu Search"])


async def read_csv():
    with open(f'./{CSV_FILE}', 'r') as f:
        csv_reader = csv.reader(f)
        for line in csv_reader:
            if csv_reader.line_num == 2:
                cookie = line[0]
                print(cookie, "cookie")
    return cookie


async def tex_au_request(cookie, linkedin_url):
    payload = json.dumps({
        "funcName": "texau-automation-1-dev-linkedInSearchExtractor",
        "spiceId": "5d403c1ddf129e430077c329",
        "inputs": {
            "search": linkedin_url,
            "numberOfPage": "1",
            "li_at": cookie,
            'proxy': {"proxyName": "BestProxyAndVPN-Pune", 'ip': 'http://168.81.41.43:47192', 'name': PROXY_USER,
                      'password': PROXY_PASS}
        },
        "executionName": "exec-8"
    })
    headers = {
        'Authorization': f'APIKey {TEXAU_KEY}',
        'Content-Type': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, data=payload)

        print(response.text)
        val = response.json()
        execution_id = val.get('executionId')

        await asyncio.sleep(55)

        url_response = f"{TEXAU_EXECUTION_URL}{execution_id}"
        response_result = await client.get(url_response, headers=headers)
        print(response_result.text)
    return response_result.json()


@router.post("/search")
async def scrape_website_using_selenium(request: QueryBuilderRequest):
    logger.info(f"{request=}")
    try:
        if result := query(dict(request)):
            print(result)
            cookie = await read_csv()
            if texau_response := await tex_au_request(cookie=cookie, linkedin_url=result):
                print(texau_response)
                json_compatible_item_data = jsonable_encoder(texau_response)
                return JSONResponse(content=json_compatible_item_data)
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("Unable to Scrape from URL"),
            )
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str("Unable to Scrape from URL"),
        )

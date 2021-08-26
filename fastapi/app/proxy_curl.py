import requests
import json
import httpx
from starlette import status
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List, Dict
from loguru import logger
from app.config import API_CONFIG_PROXY_CURL_ENDPOINT, API_CONFIG_PROXY_CURL_API_KEY
router = APIRouter(prefix="/proxycurl", tags=["Proxy Search"])


class ProxyCurlRequest(BaseModel):
    url: List[str] = []


@router.post("/proxyCurl")
async def search_using_texau(request: ProxyCurlRequest):
    logger.info(f"{request=}")
    try:
        if request:
            query_url = request.url[0]
            api_endpoint = API_CONFIG_PROXY_CURL_ENDPOINT
            api_key = API_CONFIG_PROXY_CURL_API_KEY
            header_dic = {'Authorization': 'Bearer ' + api_key}
            params = {
                'url': query_url,
                'use_cache': 'if-present',
            }
            async with httpx.AsyncClient() as client:
                response = await client.get(api_endpoint,
                                            params=params,
                                            headers=header_dic)
        data = response.json()
        if data:
            return data
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No Results Found",
            )

    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )

import httpx
from fastapi import APIRouter, HTTPException,Depends
from fastapi_cache.decorator import cache
from loguru import logger
from pydantic import BaseModel, HttpUrl
from starlette import status

from app.config import (
    API_CONFIG_PROXY_CURL_ENDPOINT,
    API_CONFIG_PROXY_CURL_API_KEY,
    API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS,
)
from app.users import fastapi_users, get_user

router = APIRouter(prefix="/proxycurl", tags=["ProxyCurl"])


class ProxyCurlRequest(BaseModel):
    url: HttpUrl


# response format is defined here
# https://nubela.co/proxycurl/docs?python#enrichment-api-linkedin-person-profile-endpoint


@router.post("/search")
# @cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def search(request: ProxyCurlRequest,user=Depends(fastapi_users.get_current_active_user),):
    logger.info(f"{request=}")
    try:
        url = API_CONFIG_PROXY_CURL_ENDPOINT
        headers = {"Authorization": f"Bearer {API_CONFIG_PROXY_CURL_API_KEY}"}
        params = {
            "url": request.url,
            "use_cache": "if-present",
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, headers=headers)

            if response.status_code != 200:
                logger.warning(
                    f"Invalid response, {response.status_code=}, {response.text=}"
                )
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Invalid Response",
                )

            if not (data := response.json()):
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No Results Found",
                )

            return data
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )

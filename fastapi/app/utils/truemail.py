import json
from fastapi_cache.decorator import cache
import httpx
from fastapi import APIRouter

from app.config import (
    API_CONFIG_TRUEMAIL_API_URL,
    API_CONFIG_TRUEMAIL_API_KEY,
    API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS,
)

router = APIRouter(prefix="/truemail", tags=["Truemail"])


@router.get("/verify/{email_id}")
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def verify_email(email_id):
    try:
        apiKey = API_CONFIG_TRUEMAIL_API_KEY
        apiUrl = API_CONFIG_TRUEMAIL_API_URL + apiKey + "&email=" + email_id
        async with httpx.AsyncClient() as client:
            response = await client.get(apiUrl)
        response_text = json.loads(response.text)
        return response_text
    except Exception as e:
        return e

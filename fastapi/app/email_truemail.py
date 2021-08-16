from fastapi import APIRouter

from app.config import API_CONFIG_TRUEMAIL_API_URL, API_CONFIG_TRUEMAIL_API_KEY

import requests
import httpx

import json

router = APIRouter(prefix="/verification_email", tags=["Customize verification"])


@router.get("/truemail/{email_id}")
async def truemail_single(email_id):
    try:
        apiKey = API_CONFIG_TRUEMAIL_API_KEY
        apiUrl = API_CONFIG_TRUEMAIL_API_URL + apiKey + "&email=" + email_id
        async with httpx.AsyncClient() as client:
            response = await client.get(apiUrl)
        response_text = json.loads(response.text)
        return response_text
    except Exception as e:
        return e

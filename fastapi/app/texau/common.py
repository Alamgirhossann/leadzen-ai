from typing import Optional, Dict, List

from pydantic import BaseModel

from app.config import (
    API_CONFIG_TEXAU_PROXY_NAME,
    API_CONFIG_TEXAU_PROXY_HOST,
    API_CONFIG_TEXAU_PROXY_USER,
    API_CONFIG_TEXAU_PROXY_PASS,
)


class TexAuResult(BaseModel):
    data: List[Dict]


class TexAuExecutionResponse(BaseModel):
    execution_id: str


TEXAU_PROXY = {
    "proxyName": API_CONFIG_TEXAU_PROXY_NAME,
    "ip": API_CONFIG_TEXAU_PROXY_HOST,
    "name": API_CONFIG_TEXAU_PROXY_USER,
    "password": API_CONFIG_TEXAU_PROXY_PASS,
}


class TexAuCompanyRequest(BaseModel):
    firstName: str
    lastName: str
    companyName: Optional[str] = None

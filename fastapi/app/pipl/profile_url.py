from typing import Optional, List

from loguru import logger
from pydantic import BaseModel

from app.config import API_CONFIG_PIPL_BASE_URL, API_CONFIG_PIPL_API_KEY
from app.pipl.common import write_to_file, search_all


class PiplDetailsFromProfileUrlRequest(BaseModel):
    profile_urls: List[str]
    filename: Optional[str] = None


class PiplDetailsFromProfileUrlResponse(BaseModel):
    filename: str


async def execute_task(request: PiplDetailsFromProfileUrlRequest):
    profile_urls = list(set(request.profile_urls))  # remove duplicates
    profile_urls = [x for x in profile_urls if x]  # remove empty profile_urls

    urls = [
        f"{API_CONFIG_PIPL_BASE_URL}/?url={profile_url}&key={API_CONFIG_PIPL_API_KEY}"
        for profile_url in profile_urls
        if profile_url
    ]

    if not (responses := await search_all(urls=urls, slugs=profile_urls)):
        logger.error("Error Getting Data")
        return

    if not any(responses):
        logger.error("no valid responses found")
        return

    await write_to_file(responses=responses, filename=request.filename)

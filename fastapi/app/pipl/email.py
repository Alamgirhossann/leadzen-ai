from typing import Optional, List

from loguru import logger
from pydantic import BaseModel

from app.config import API_CONFIG_PIPL_BASE_URL, API_CONFIG_PIPL_API_KEY
from app.pipl.common import write_to_file, search_all


class PiplFindDetailsFromEmailRequest(BaseModel):
    emails: List[str]
    filename: Optional[str] = None


class PiplFindDetailsFromEmailResponse(BaseModel):
    filename: str


async def execute_task(request: PiplFindDetailsFromEmailRequest):
    emails = list(set(request.emails))  # remove duplicates
    emails = [x for x in emails if x]  # remove empty emails

    urls = [
        f"{API_CONFIG_PIPL_BASE_URL}/?email={email}&key={API_CONFIG_PIPL_API_KEY}"
        for email in emails
        if email
    ]

    if not (responses := await search_all(urls=urls, slugs=emails)):
        logger.error("Error Getting Data")
        return

    if not any(responses):
        logger.error("no valid responses found")
        return

    await write_to_file(responses=responses, filename=request.filename)

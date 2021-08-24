from typing import List

import httpx
from loguru import logger

from app.bulk.common import BulkRequest, wait_and_check_for_filename
from app.config import API_CONFIG_BULK_PIPL_PROFILE_SEARCH_URL
from app.pipl.profile_url import (
    PiplDetailsFromProfileUrlRequest,
    PiplFindDetailsFromProfileUrlResponse,
)


class BulkProfileUrlRequest(BulkRequest):
    urls: List[str]


async def handle_bulk_profile_urls(request: BulkProfileUrlRequest):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            API_CONFIG_BULK_PIPL_PROFILE_SEARCH_URL,
            json=PiplDetailsFromProfileUrlRequest(
                profile_urls=request.urls, filename=request.outgoing_filename
            ).dict(),
        )

        if response.status_code != 200:
            logger.error(
                f"Error handling pipl search, {response.status_code=}, {response.text=}"
            )
            return

        if not (json_data := response.json()):
            logger.error("Invalid Response")
            return

        data = PiplFindDetailsFromProfileUrlResponse(**json_data)

        return await wait_and_check_for_filename(
            request=BulkRequest(
                incoming_filename=request.incoming_filename,
                outgoing_filename=data.filename,
                user=request.user,
            )
        )

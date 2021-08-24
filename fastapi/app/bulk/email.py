from typing import List

import httpx
from loguru import logger

from app.bulk.common import BulkRequest, wait_and_check_for_filename
from app.config import API_CONFIG_BULK_PIPL_EMAIL_SEARCH_URL
from app.pipl.email import PiplDetailsFromEmailRequest, PiplFindDetailsFromEmailResponse


class BulkEmailRequest(BulkRequest):
    emails: List[str]


async def handle_bulk_emails(request: BulkEmailRequest):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            API_CONFIG_BULK_PIPL_EMAIL_SEARCH_URL,
            json=PiplDetailsFromEmailRequest(
                emails=request.emails, filename=request.outgoing_filename
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

        data = PiplFindDetailsFromEmailResponse(**json_data)

        return await wait_and_check_for_filename(
            request=BulkRequest(
                incoming_filename=request.incoming_filename,
                outgoing_filename=data.filename,
                user=request.user,
            )
        )

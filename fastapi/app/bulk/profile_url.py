from typing import List

import pandas as pd
from app.bulk.common import BulkRequest, wait_and_check_for_filename
from app.pipl.profile_url import (
    execute_task as execute_profile_task,
    PiplDetailsFromProfileUrlRequest,
    add_excel_template_to_file,
)
from loguru import logger


class BulkProfileUrlRequest(BulkRequest):
    urls: List[str]


async def handle_bulk_profile_urls(request: BulkProfileUrlRequest):
    await execute_profile_task(
        request=PiplDetailsFromProfileUrlRequest(
            profile_urls=request.urls, filename=request.outgoing_filename
        )
    )

    outgoing_filename = request.outgoing_filename
    if outgoing_filename.endswith(".xlsx"):
        add_excel_template_to_file(outgoing_filename)

    await wait_and_check_for_filename(
        request=BulkRequest(
            incoming_filename=request.incoming_filename,
            outgoing_filename=request.outgoing_filename,
            user=request.user,
        )
    )

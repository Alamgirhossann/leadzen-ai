from typing import List, Optional, Dict
from app.users import User
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
    hash_key_list: Optional[List[Dict]] = None
    user: User


async def handle_bulk_profile_urls(request: BulkProfileUrlRequest, ):
    print("in handle_bulk_profile_urls request>>",request)
    await execute_profile_task(
        request=PiplDetailsFromProfileUrlRequest(
            profile_urls=request.urls,  filename=request.outgoing_filename, hash_key_list=request.hash_key_list, user=request.user
        )
    )
    user = request.user
    outgoing_filename = request.outgoing_filename
    if outgoing_filename.endswith(".xlsx"):
        add_excel_template_to_file(outgoing_filename, user)

    await wait_and_check_for_filename(
        request=BulkRequest(
            incoming_filename=request.incoming_filename,
            outgoing_filename=request.outgoing_filename,
            user=request.user,
        )
    )

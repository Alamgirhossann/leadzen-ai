from typing import List

from app.bulk.common import BulkRequest, wait_and_check_for_filename
from app.pipl.email import (
    execute_task as execute_email_task,
    PiplDetailsFromEmailRequest,
)


class BulkEmailRequest(BulkRequest):
    emails: List[str]


async def handle_bulk_emails(request: BulkEmailRequest):
    await execute_email_task(
        request=PiplDetailsFromEmailRequest(
            emails=request.emails, filename=request.outgoing_filename
        )
    )

    await wait_and_check_for_filename(
        request=BulkRequest(
            incoming_filename=request.incoming_filename,
            outgoing_filename=request.outgoing_filename,
            user=request.user,
        )
    )

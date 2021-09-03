import tempfile
import uuid
from app.realtimerequestmanual.common import RealTimeRequest, wait_and_check_for_filename
import pandas as pd

from fastapi import (
    UploadFile,
    File,
    APIRouter,
    Form
)


from app.realtimerequestmanual.common import RealTimeUploadResponse
from app.config import (
    API_CONFIG_ALLOWED_CONTENT_TYPES,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_BULK_MAX_ROWS_IN_CSV,
    API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS,
)


router = APIRouter(prefix="/realtime_upload", tags=["Real Time Upload"])


@router.post("/csv", response_model=RealTimeUploadResponse)
async def upload_csv_file(
    email: str = Form(...),
    username: str = Form(...),
    requests: str = Form(...),
    file: UploadFile = File(...),

):
    if file.filename.endswith(".csv"):
        outgoing_filename = (
            f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        )
    else:
        outgoing_filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.xlsx"

    with tempfile.TemporaryFile() as temp_file:
        lines = file.file.readlines()
        temp_file.writelines(lines)
        temp_file.seek(0)
        df = pd.read_csv(temp_file)
        if outgoing_filename.endswith("csv"):
            df.to_csv(outgoing_filename, index=False)
        else:
            df.to_excel(outgoing_filename, index=False)
    
    user = {
        "email": email,
        "username": username,
        "requests": requests
    }
    incoming_filename = file.filename
    await wait_and_check_for_filename(
        request=RealTimeRequest(
            incoming_filename=incoming_filename,
            outgoing_filename=outgoing_filename,
            user=user,
        )
    )
    return RealTimeUploadResponse(
        input_filename=file.filename, output_filename=outgoing_filename
    )



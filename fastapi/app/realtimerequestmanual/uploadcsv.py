import tempfile
import uuid
from app.realtimerequestmanual.common import RealTimeRequest, wait_and_check_for_filename
import pandas as pd
import httpx
import json
from fastapi import (
    UploadFile,
    File,
    APIRouter,
    Form,
    HTTPException
)
from starlette import status


from app.realtimerequestmanual.common import RealTimeUploadResponse
from app.config import (
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_GET_USER_FROM_USER_ID_URL
)


router = APIRouter(prefix="/realtime_upload", tags=["Real Time Upload"])


@router.post("/csv", response_model=RealTimeUploadResponse)
async def upload_csv_file(
    user_token: str = Form(...),
    user_id: str = Form(...),
    requirement: str = Form(...),
    file: UploadFile = File(...),

):
    async with httpx.AsyncClient() as client:
        headers = {
            "Authorization": f"Bearer {user_token}",
            "Content-Type": "application/json",
        }

        response1 = await client.get(
            f"{ API_CONFIG_GET_USER_FROM_USER_ID_URL}{user_id}", headers=headers
        )
    if response1.status_code == 200:
        user = response1.json()
        user['requirement'] = requirement

        if file.filename.endswith(".csv"):
            raise HTTPException(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                detail="File need to be in excel format",
            )
        else:
            outgoing_filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.xlsx"

            with tempfile.TemporaryFile() as temp_file:
                lines = file.file.readlines()
                temp_file.writelines(lines)
                temp_file.seek(0)
                df = pd.read_excel(temp_file)
                df.to_excel(outgoing_filename, index=False)
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
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="You need to be authorized super user",
    )


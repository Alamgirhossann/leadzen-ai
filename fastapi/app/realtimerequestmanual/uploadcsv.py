import tempfile
import uuid
from app.realtimerequestmanual.realtime import RealTimeRequest, wait_and_check_for_filename,RealTimeUploadResponse
import pandas as pd
import httpx
import json
from app.database import database
from fastapi import (
    UploadFile,
    File,
    APIRouter,
    Form,
    HTTPException,
    Depends
)
from starlette import status
from app.users import fastapi_users

from app.config import (
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_GET_USER_FROM_USER_ID_URL
)


router = APIRouter(prefix="/realtime_upload", tags=["Real Time Upload"])


@router.post("/excel", response_model=RealTimeUploadResponse)
async def upload_excel_file(
    user_id: str = Form(...),
    requirement: str = Form(...),
    file: UploadFile = File(...),
    current_user=Depends(fastapi_users.get_current_active_user)

):
    try:
        if current_user.is_superuser:
            query = (
                f"SELECT * FROM user WHERE id = :user_id"
            )
            row = await database.fetch_one(
                query=query, values={ "user_id": str(user_id)}
            )
            user = {}
            if row:
                user['email'] = row[1]
                user['requirement'] = requirement
                user['username'] = row[6]
                if file.filename.endswith(".xlsx"):
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
                else:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="File need to be in excel format",
                    )
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid user id",
                )
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You need to be authorized super user",
            )
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Sending file",
        )


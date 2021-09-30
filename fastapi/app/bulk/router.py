import tempfile
import uuid
from typing import List, Optional, Dict

import pandas as pd
from fastapi import (
    UploadFile,
    File,
    status,
    HTTPException,
    BackgroundTasks,
    APIRouter,
    Request,
    Depends,
)
from fastapi_cache.decorator import cache
from loguru import logger
from pydantic import BaseModel, HttpUrl
from sse_starlette.sse import EventSourceResponse

from app.bulk.common import BulkUploadResponse
from app.bulk.email import BulkEmailRequest, handle_bulk_emails
from app.bulk.profile_url import BulkProfileUrlRequest, handle_bulk_profile_urls
from app.bulk.stream import status_event_generator
from app.config import (
    API_CONFIG_ALLOWED_CONTENT_TYPES,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_BULK_MAX_ROWS_IN_CSV,
    API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS,
)
from app.users import fastapi_users, get_user

router = APIRouter(prefix="/bulk_upload", tags=["Bulk Search"])


@router.post("/csv", response_model=BulkUploadResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def upload_csv_file(
        background_tasks: BackgroundTasks,
        file: UploadFile = File(...),
        user=Depends(fastapi_users.get_current_active_user),
):

    if file.content_type not in API_CONFIG_ALLOWED_CONTENT_TYPES:
        logger.warning(
            f"Uploaded File does not contain CSV Content: {file.content_type=}, {API_CONFIG_ALLOWED_CONTENT_TYPES=}"
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded File does not contain CSV Content",
        )

    # this is due to a known defect in the SpooledTemporary file library
    # as it dont implement the readable interface that pandas needs to read data
    # so i make a copy of the spooled temp file into a regular temp file
    # and then use it for pandas to read, and since both these files are temp files
    # they will vanish as soon as close as called, hence using the with context manager

    def readfile(pandas_readfile):
        with tempfile.TemporaryFile() as temp_file:
            lines = file.file.readlines()
            temp_file.writelines(lines)
            temp_file.seek(0)

            df = pandas_readfile(temp_file)
            logger.debug(df.head())
            if df is None or df.empty:
                logger.warning("No Data in uploaded file")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="No Data in Uploaded File",
                )

            if "linkedin_profile_urls" not in df.columns:
                logger.warning("linkedin_profile_urls columns not preset in file")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="linkedin_profile_urls columns not preset in file",
                )

            linkedin = df.loc[df['linkedin_profile_urls'].str.contains("linkedin", case=False)]

            if linkedin is None or linkedin.empty:
                print("in linkedin")
                logger.warning("Linkedin url not in Uploaded File")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Linkedin url not in Uploaded File",
                )

            df.fillna("", inplace=True)

            logger.warning("Performing LinkedIn Profile Searches")
            outgoing_filename = (
                f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
            )
            # TODO: check Credit if not sufficient send mail and exit else continue with scrapping
            background_tasks.add_task(
                handle_bulk_profile_urls,
                request=BulkProfileUrlRequest(
                    urls=list(
                        df.linkedin_profile_urls[:API_CONFIG_BULK_MAX_ROWS_IN_CSV]
                    ),
                    outgoing_filename=outgoing_filename,
                    incoming_filename=file.filename,
                    user=user,
                ),
            )

            return BulkUploadResponse(
                input_filename=file.filename, output_filename=outgoing_filename
            )

    if file.filename.endswith(".csv"):
        data = readfile(pd.read_csv)
        return data
    elif file.filename.endswith(".xlsx"):
        data = readfile(pd.read_excel)
        return data
    else:
        logger.warning(f"File format not excel or csv: {file.filename=}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File format not excel or csv",
        )


@router.get("/status/stream")
async def send_status_stream(filename: str, request: Request):
    event_generator = status_event_generator(filename=filename, request=request)
    return EventSourceResponse(event_generator)


class BulkExportToExcelRequest(BaseModel):
    profile_urls: List[str]
    hash_key_list: Optional[List[Dict]]
    export_type: Optional[str] = None
    search_id: Optional[str] = None
    search_index: Optional[List[Dict]] = None


@router.post("/export/excel", response_model=BulkUploadResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def export_excel_file(
        app_request: BulkExportToExcelRequest,
        background_tasks: BackgroundTasks,
        user=Depends(fastapi_users.get_current_active_user),
):
    user_response = await get_user(user)
    logger.debug(f"{app_request=}>>>{len(app_request.profile_urls)=}")
    logger.debug(f"{user_response=}, {type(user_response)}")
    if user_response and user_response.profile_credit < len(app_request.profile_urls):
        logger.warning("Insufficient Credits")
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Insufficient Credits"
        )
    outgoing_filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.xlsx"

    background_tasks.add_task(
        handle_bulk_profile_urls,
        request=BulkProfileUrlRequest(
            urls=app_request.profile_urls,
            hash_key_list=app_request.hash_key_list,
            outgoing_filename=outgoing_filename,
            user=user,
            export_type=app_request.export_type,
            search_id=app_request.search_id,
            search_index=app_request.search_index
        )
    )

    return BulkUploadResponse(input_filename="-", output_filename=outgoing_filename)

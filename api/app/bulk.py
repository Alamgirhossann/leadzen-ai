import tempfile
import uuid
from typing import List

import httpx
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

from app.config import (
    API_CONFIG_ALLOWED_CONTENT_TYPES,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_BULK_MAX_ROWS_IN_CSV,
    API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS,
)
from app.users import fastapi_users

router = APIRouter(prefix="/bulk_upload", tags=["Bulk Search"])


@router.post("/csv", response_model=BulkUploadResponse)
async def upload_csv_file(
    file: UploadFile = File(...),
    user=Depends(fastapi_users.get_current_active_user),
):
    async with httpx.AsyncClient() as client:
        response = await client.post()

    if response.status_code != 200:
        return response

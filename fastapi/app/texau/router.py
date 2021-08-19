import uuid
from http.client import HTTPException
from typing import List

from fastapi import APIRouter, BackgroundTasks, HTTPException, status
from loguru import logger

from app.config import API_CONFIG_BULK_OUTGOING_DIRECTORY
from app.texau.common import TexAuResponse, read_linkedin_cookie
from app.texau.linkedin.email_phone import (
    TexAuFindEmailAndPhoneForLinkedInProfileRequest,
    handle_find_email_and_phone_for_linkedin_profile_url,
    TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)
from app.texau.linkedin.search_profiles import (
    handle_find_matching_linkedin_profiles,
    TexAuFindProfileRequest,
)

router = APIRouter(prefix="/texau", tags=["TexAu Search"])


@router.post("/find_matching_linkedin_profiles", response_model=TexAuResponse)
async def find_matching_linkedin_profiles(request: TexAuFindProfileRequest):
    logger.info(f"{request=}")

    if not (cookie := read_linkedin_cookie()):
        logger.critical("Error Getting LinkedIn Cookie")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting LinkedIn Cookie",
        )

    return await handle_find_matching_linkedin_profiles(request=request, cookie=cookie)


@router.post(
    "/find_email_and_phone_for_linkedin_profile_url",
    response_model=TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)
async def find_email_and_phone_for_linkedin_profile_url(
    request: TexAuFindEmailAndPhoneForLinkedInProfileRequest,
    background_tasks: BackgroundTasks,
):
    logger.info(f"{request=}")

    if not request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )
    else:
        cookie = request.cookie

    filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
    logger.debug(f"{filename=}")

    background_tasks.add_task(
        handle_find_email_and_phone_for_linkedin_profile_url,
        request=request,
        cookie=cookie,
        filename=filename,
    )

    return TexAuFindEmailAndPhoneForLinkedInProfileResponse(filename=filename)

import uuid
from http.client import HTTPException
from typing import Dict, List

from fastapi import APIRouter, BackgroundTasks, HTTPException, status
from loguru import logger

from app.config import API_CONFIG_BULK_OUTGOING_DIRECTORY
from app.texau.linkedin.commenters import (
    handle_find_post_commenters,
    TexAuFindLinkedInPostCommentersRequest,
)
from app.texau.linkedin.cookie import read_linkedin_cookie
from app.texau.status import get_status_once
from app.texau.linkedin.email import (
    TexAuFindEmailAndPhoneForLinkedInProfileRequest,
    handle_find_email_and_phone_for_linkedin_profile_url,
    TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)
from app.texau.linkedin.likers import (
    TexAuFindLinkedInPostLikersRequest,
    handle_find_post_likers,
)
from app.texau.linkedin.profiles import (
    handle_find_matching_linkedin_profiles,
    TexAuFindProfileRequest,
)
from app.texau.common import TexAuExecutionResponse, TexAuResult

router = APIRouter(prefix="/texau", tags=["TexAu"])


@router.post("/linkedin/matching_profiles", response_model=TexAuExecutionResponse)
async def find_matching_linkedin_profiles(request: TexAuFindProfileRequest):
    logger.info(f"{request=}")

    if not request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )
        request.cookie = cookie

    return await handle_find_matching_linkedin_profiles(request=request)


@router.post(
    "/linkedin/email_for_profile_url",
    response_model=TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)
async def find_email_for_linkedin_profile_url(
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

        request.cookie = cookie

    if not request.filename:
        filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        request.filename = filename

    logger.info(f"{request=}")

    background_tasks.add_task(
        handle_find_email_and_phone_for_linkedin_profile_url,
        request=request,
    )

    return TexAuFindEmailAndPhoneForLinkedInProfileResponse(filename=filename)


@router.post("/linkedin/post_likers", response_model=TexAuExecutionResponse)
async def find_linkedin_post_likers(request: TexAuFindLinkedInPostLikersRequest):
    logger.info(f"{request=}")

    if not request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )

        request.cookie = cookie

    return await handle_find_post_likers(request=request)


@router.post("/linkedin/post_commenters", response_model=TexAuExecutionResponse)
async def find_linkedin_post_commenters(
    request: TexAuFindLinkedInPostCommentersRequest,
):
    logger.info(f"{request=}")

    if not request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )

        request.cookie = cookie

    return await handle_find_post_commenters(request=request)


@router.get("/result/{execution_id}", response_model=TexAuResult)
async def get_execution_results(execution_id):
    logger.info(f"{execution_id=}")

    return await get_status_once(execution_id=execution_id)

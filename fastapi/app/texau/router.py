import asyncio
import itertools
import uuid
from http.client import HTTPException

from fastapi import APIRouter, BackgroundTasks, HTTPException, status, Depends
from fastapi_cache.decorator import cache
from loguru import logger

from app.config import (
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS,
)
from app.texau.common import TexAuExecutionResponse, TexAuResult
from app.texau.linkedin.commenters import (
    handle_find_post_commenters,
    TexAuFindLinkedInPostCommentersRequest,
)
from app.texau.linkedin.company import (TexAuFindLinkedInCompanyRequest, handle_find_company_details,
                                        handle_find_company_employees_details, handle_find_company_screenshot,
                                        handle_find_company_domain, handle_find_company_tech_stack,
                                        handle_find_email_and_phones_from_website, handle_find_company_social_media)
from app.texau.linkedin.cookie import read_linkedin_cookie
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
    TexAuFindProfileRequest, handle_find_matching_linkedin_profiles_company, TexAuFindCompanyProfileRequest,
)
from app.texau.status import get_status_once
from app.users import fastapi_users
from app.utils.snov import get_emails_from_domain

router = APIRouter(prefix="/texau", tags=["TexAu"])


@router.post("/linkedin/matching_profiles", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_matching_linkedin_profiles(
        app_request: TexAuFindProfileRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")

    if not app_request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )
        app_request.cookie = cookie

    return await handle_find_matching_linkedin_profiles(request=app_request)


@router.post("/linkedin/matching_profiles_for_company_url", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_matching_linkedin_profiles_company(
        app_request: TexAuFindCompanyProfileRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")

    if not app_request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )
        app_request.cookie = cookie

    return await handle_find_matching_linkedin_profiles_company(request=app_request)


@router.post(
    "/linkedin/email_for_profile_url",
    response_model=TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_email_for_linkedin_profile_url(
        app_request: TexAuFindEmailAndPhoneForLinkedInProfileRequest,
        background_tasks: BackgroundTasks,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")

    if not app_request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )

        app_request.cookie = cookie

    if not app_request.filename:
        filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        app_request.filename = filename

    logger.info(f"{app_request=}")

    background_tasks.add_task(
        handle_find_email_and_phone_for_linkedin_profile_url,
        request=app_request,
    )

    return TexAuFindEmailAndPhoneForLinkedInProfileResponse(
        filename=app_request.filename
    )


@router.post("/linkedin/post_likers", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_linkedin_post_likers(
        app_request: TexAuFindLinkedInPostLikersRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")

    if not app_request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )

        app_request.cookie = cookie

    return await handle_find_post_likers(request=app_request)


@router.post("/linkedin/post_commenters", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_linkedin_post_commenters(
        app_request: TexAuFindLinkedInPostCommentersRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")

    if not app_request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )

        app_request.cookie = cookie

    return await handle_find_post_commenters(request=app_request)


@router.post("/linkedin/find_company_details", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_company_details(
        app_request: TexAuFindLinkedInCompanyRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")

    if not app_request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )
        app_request.cookie = cookie

    return await handle_find_company_details(request=app_request)


@router.post("/linkedin/find_company_employees_details", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_company_employees_details(
        app_request: TexAuFindLinkedInCompanyRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")

    if not app_request.cookie:
        if not (cookie := read_linkedin_cookie()):
            logger.critical("Error Getting LinkedIn Cookie")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error Getting LinkedIn Cookie",
            )
        app_request.cookie = cookie

    return await handle_find_company_employees_details(request=app_request)


@router.post("/linkedin/find_company_screenshot", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_company_screenshot(
        app_request: TexAuFindLinkedInCompanyRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")
    return await handle_find_company_screenshot(request=app_request)


@router.post("/linkedin/find_company_domain", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_company_domain(
        app_request: TexAuFindLinkedInCompanyRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")
    return await handle_find_company_domain(request=app_request)


@router.post("/linkedin/find_company_tech_stack", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_company_tech_stack(
        app_request: TexAuFindLinkedInCompanyRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")
    return await handle_find_company_tech_stack(request=app_request)


@router.post("/linkedin/find_email_and_phones_from_website", response_model=TexAuExecutionResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def find_email_and_phones_from_website(
        app_request: TexAuFindLinkedInCompanyRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")
    return await handle_find_email_and_phones_from_website(request=app_request)


@router.post("/linkedin/get_all_company_data")
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS * 10)
async def get_all_company_data(
        app_request: TexAuFindLinkedInCompanyRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.info(f"{app_request=}, {user=}")
    coroutines = [
        handle_find_company_screenshot(request=app_request),
        handle_find_email_and_phones_from_website(request=app_request),
        handle_find_company_tech_stack(request=app_request),
        handle_find_company_social_media(request=app_request),
        get_emails_from_domain(request=app_request),

    ]
    results = await asyncio.gather(*coroutines)
    results = [
        x for x in results if x
    ]  # remove the None's else chain/flatten operation will fail
    print("results", results)
    if not any(results):
        logger.warning("No Results Found")
        return None

    return list(itertools.chain(*results))

    # screenshot = await handle_find_company_screenshot(request=app_request)
    # email_and_phone = await handle_find_email_and_phones_from_website(request=app_request)
    # company_stack = await handle_find_company_tech_stack(request=app_request)
    # social_media = await handle_find_company_social_media(request=app_request)
    # snov = await get_emails_from_domain(request=app_request)
    # lst = [screenshot, email_and_phone, company_stack, social_media]
    # """jack = await asyncio.gather(
    #     handle_find_company_screenshot(request=app_request),
    #     handle_find_email_and_phones_from_website(request=app_request),
    #     handle_find_company_tech_stack(request=app_request),
    #     handle_find_company_social_media(request=app_request)
    # )
    # print(jack)
    # return jack"""
    # # all_groups = asyncio.gather(screenshot, email_and_phone, company_stack, social_media, snov)
    # # all_groups = asyncio.gather(*lst)
    # # results = loop.run_until_complete(all_groups)
    # #
    # # loop.close()
    # #
    # # print(results)
    # # return results
    # ls = dict()
    # count = 0
    # for x in lst:
    #     data = await get_status_waiting(x.execution_id)
    #     ls[count] = data
    #     count += 1
    # ls[4] = snov
    # return ls


@router.get("/result/{execution_id}", response_model=TexAuResult)
async def get_execution_results(
        execution_id, user=Depends(fastapi_users.get_current_active_user)
):
    logger.info(f"{execution_id=}, {user=}")

    return await get_status_once(execution_id=execution_id)  # if not app_request.cookie:
    #     if not (cookie := read_linkedin_cookie()):
    #         logger.critical("Error Getting LinkedIn Cookie")
    #         raise HTTPException(
    #             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #             detail="Error Getting LinkedIn Cookie",
    #         )
    #     app_request.cookie = cookie

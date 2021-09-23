from typing import Optional, List, Dict

from fastapi import APIRouter, Depends, Request, HTTPException, status
from loguru import logger
from pydantic import BaseModel, HttpUrl

from app.common import send_request_to_internal_server
from app.config import API_CONFIG_INTERNAL_URL
from app.users import fastapi_users

router = APIRouter(tags=["LinkedIn"])


class TexAuExecutionResponse(BaseModel):
    execution_id: str


class TexAuFindProfileRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    title: Optional[str] = None
    keywords: str
    industry: List[str] = []
    location: List[str] = []
    currentCompany: List[str] = []
    pastCompany: List[str] = []
    cookie: Optional[str] = None


@router.post("/linkedin/matching_profiles", response_model=TexAuExecutionResponse)
async def find_matching_linkedin_profiles(
    app_request: TexAuFindProfileRequest,
    incoming_request: Request,
    user=Depends(fastapi_users.current_user(active=True)),
):
    logger.info(f"{app_request=}, {user=}")

    try:
        response = await send_request_to_internal_server(
            url=f"{API_CONFIG_INTERNAL_URL}/api/texau/linkedin/matching_profiles",
            app_request=app_request.dict(),
            incoming_request=incoming_request,
        )
        return TexAuExecutionResponse(**response)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception in PIPL Search: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TexAuFindCompanyProfileRequest(BaseModel):
    name: Optional[str] = None
    industry: List[str] = []
    location: List[str] = []
    employeeCount: List[str] = []
    cookie: Optional[str] = None


@router.post(
    "/linkedin/matching_profiles_for_company_url", response_model=TexAuExecutionResponse
)
async def find_matching_linkedin_profiles_company(
    app_request: TexAuFindCompanyProfileRequest,
    incoming_request: Request,
    user=Depends(fastapi_users.current_user(active=True)),
):
    logger.info(f"{app_request=}, {user=}")

    try:
        response = await send_request_to_internal_server(
            url=f"{API_CONFIG_INTERNAL_URL}/api/texau/linkedin/matching_profiles_for_company_url",
            app_request=app_request.dict(),
            incoming_request=incoming_request,
        )
        return TexAuExecutionResponse(**response)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception in PIPL Search: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TexAuFindLinkedInPostLikersRequest(BaseModel):
    url: HttpUrl
    cookie: Optional[str] = None


@router.post("/linkedin/post_likers", response_model=TexAuExecutionResponse)
async def find_linkedin_post_likers(
    app_request: TexAuFindLinkedInPostLikersRequest,
    incoming_request: Request,
    user=Depends(fastapi_users.current_user(active=True)),
):
    logger.info(f"{app_request=}, {user=}")

    try:
        response = await send_request_to_internal_server(
            url=f"{API_CONFIG_INTERNAL_URL}/api/texau/linkedin/post_likers",
            app_request=app_request.dict(),
            incoming_request=incoming_request,
        )
        return TexAuExecutionResponse(**response)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception in TexAu Search: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TexAuFindLinkedInPostCommentersRequest(BaseModel):
    url: HttpUrl
    cookie: Optional[str] = None


@router.post("/linkedin/post_commenters", response_model=TexAuExecutionResponse)
async def find_linkedin_post_commenters(
    app_request: TexAuFindLinkedInPostCommentersRequest,
    incoming_request: Request,
    user=Depends(fastapi_users.current_user(active=True)),
):
    logger.info(f"{app_request=}, {user=}")
    try:
        response = await send_request_to_internal_server(
            url=f"{API_CONFIG_INTERNAL_URL}/api/texau/linkedin/post_commenters",
            app_request=app_request.dict(),
            incoming_request=incoming_request,
        )
        return TexAuExecutionResponse(**response)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception in TexAu Search: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TexAuResult(BaseModel):
    data: List[Dict]


@router.get("/linkedin/result/{execution_id}", response_model=TexAuResult)
async def get_execution_results(
    execution_id: str,
    incoming_request: Request,
    user=Depends(fastapi_users.current_user(active=True)),
):
    logger.info(f"{execution_id=}, {user=}")
    try:
        response = await send_request_to_internal_server(
            url=f"{API_CONFIG_INTERNAL_URL}/api/texau/result/{execution_id}",
            incoming_request=incoming_request,
            request_type="GET",
        )
        return TexAuResult(**response)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception in getting TexAu execution result: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

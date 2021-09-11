import uuid
from typing import Optional
from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, HTTPException, status, BackgroundTasks, Depends
from fastapi_cache.decorator import cache
from loguru import logger
from pydantic import BaseModel
from sentry_sdk import capture_message

from app.config import (
    API_CONFIG_PIPL_API_KEY,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_PIPL_BASE_URL,
    API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS,
    API_CONFIG_MAX_RESULTS_PER_CALL,
)
from app.pipl.email import (
    execute_task as execute_email_task,
    PiplDetailsFromEmailRequest,
    PiplDetailsFromEmailResponse,
)
from app.pipl.profile_url import (
    execute_task as execute_profile_task,
    PiplDetailsFromProfileUrlRequest,
    PiplDetailsFromProfileUrlResponse,
)
from app.users import fastapi_users

router = APIRouter(prefix="/pipl", tags=["PIPL"])


class PiplName(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class PiplRequest(BaseModel):
    email: Optional[str] = None
    name: Optional[PiplName] = None
    url: Optional[str] = None


@router.post("/search")
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def people_search(
    app_request: PiplRequest, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{app_request=}, {user=}")

    try:
        logger.debug(app_request)

        params = {}

        if app_request.email:
            params["email"] = app_request.email

        if app_request.name:
            if app_request.name.first_name:
                params["first_name"] = app_request.name.first_name
            if app_request.name.last_name:
                params["last_name"] = app_request.name.last_name

        if app_request.url:
            params["url"] = app_request.url
        params["match_requirements"] = "phones"

        if not params:
            logger.warning("No Valid Request Parameters")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Request"
            )

        params["key"] = API_CONFIG_PIPL_API_KEY

        url = f"{API_CONFIG_PIPL_BASE_URL}/?{urlencode(params)}"

        logger.debug(f"{url=}")

        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            if not response.status_code == 200:
                if response.status_code == 403 or response.status_code == 429:
                    # https://docs.pipl.com/reference/#rate-limiting-information
                    capture_message(
                        message=f"PIPL Rate Limit Hit, {url=}, {response.status_code =}"
                    )

                logger.warning(
                    f"Invalid Status Code: {response.status_code=}, {response.text=}"
                )
                raise HTTPException(
                    status_code=response.status_code, detail="Error Searching PIPL"
                )

            if not (data := response.json()):
                logger.warning(f"Empty Response")
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Empty Response",
                )

            logger.debug(data.keys())

            if data["@persons_count"] == 1 and data.get("person"):
                logger.success("found 1 person")
                return [data.get("person")]
            elif data["@persons_count"] > 1 and data.get("possible_persons"):
                logger.success(f'found {data["@persons_count"]} persons')
                return [x for x in data.get("possible_persons") if x][
                    :API_CONFIG_MAX_RESULTS_PER_CALL
                ]
            else:
                logger.warning(f"Invalid Response")
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Invalid Response",
                )
    except HTTPException as e:
        logger.warning("HTTPException - Re-Raising")
        raise e
    except Exception as e:
        logger.critical(f"Exception in PIPL search: {str(e)}")
        return None


@router.post("/bulk/email", response_model=PiplDetailsFromEmailResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def bulk_find_details_for_email(
    app_request: PiplDetailsFromEmailRequest,
    background_tasks: BackgroundTasks,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{app_request=}, {user=}")

    if not app_request.filename:
        app_request.filename = (
            f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        )

    logger.debug(f"{app_request.filename=}")

    background_tasks.add_task(execute_email_task, request=app_request)

    return PiplDetailsFromEmailResponse(filename=app_request.filename)


@router.post(
    "/bulk/profile_url",
    response_model=PiplDetailsFromProfileUrlResponse,
)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def bulk_find_details_for_profile_url(
    app_request: PiplDetailsFromProfileUrlRequest,
    background_tasks: BackgroundTasks,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{app_request=}, {user=}")

    if not app_request.filename:
        app_request.filename = (
            f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        )

    logger.debug(f"{app_request.filename=}")

    background_tasks.add_task(execute_profile_task, request=app_request)

    return PiplDetailsFromProfileUrlResponse(filename=app_request.filename)

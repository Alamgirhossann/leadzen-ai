import uuid
from typing import Optional
from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from loguru import logger
from pydantic import BaseModel

from app.config import (
    API_CONFIG_PIPL_API_KEY,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_PIPL_BASE_URL,
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

router = APIRouter(prefix="/pipl", tags=["PIPL"])


class PiplName(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class PiplRequest(BaseModel):
    email: Optional[str] = None
    name: Optional[PiplName] = None
    url: Optional[str] = None


@router.post("/search")
async def people_search(request: PiplRequest):
    logger.debug(f"{request=}")

    try:
        logger.debug(request)

        params = {}

        if request.email:
            params["email"] = request.email

        if request.name:
            if request.name.first_name:
                params["first_name"] = request.name.first_name
            if request.name.last_name:
                params["last_name"] = request.name.last_name

        if request.url:
            params["url"] = request.url

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
                return [data.get("person")]
            elif data["@persons_count"] > 1 and data.get("possible_persons"):
                return [x for x in data.get("possible_persons") if x]
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
async def bulk_find_details_for_email(
    request: PiplDetailsFromEmailRequest, background_tasks: BackgroundTasks
):
    logger.debug(f"{request=}")

    if not request.filename:
        request.filename = (
            f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        )

    logger.debug(f"{request.filename=}")

    background_tasks.add_task(execute_email_task, request=request)

    return PiplDetailsFromEmailResponse(filename=request.filename)


@router.post(
    "/bulk/profile_url",
    response_model=PiplDetailsFromProfileUrlResponse,
)
async def bulk_find_details_for_profile_url(
    request: PiplDetailsFromProfileUrlRequest, background_tasks: BackgroundTasks
):
    logger.debug(f"{request=}")

    if not request.filename:
        request.filename = (
            f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        )

    logger.debug(f"{request.filename=}")

    background_tasks.add_task(execute_profile_task, request=request)

    return PiplDetailsFromProfileUrlResponse(filename=request.filename)

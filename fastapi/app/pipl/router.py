import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from loguru import logger
from piplapis.search import SearchAPIRequest
from pydantic import BaseModel

from app.config import (
    API_CONFIG_PIPL_API_KEY,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
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
    first_name: str
    last_name: str


class PiplRequest(BaseModel):
    email: Optional[str] = None
    name: Optional[PiplName] = None
    url: Optional[str] = None


@router.post("/search")
async def people_search(request: PiplRequest):
    logger.debug(f"{request=}")
    try:
        request = SearchAPIRequest(
            email=request.email,
            first_name=request.name.first_name if request.name else None,
            last_name=request.name.last_name if request.name else None,
            url=request.url,
            match_requirements="phones",
            api_key=API_CONFIG_PIPL_API_KEY,
        )

        if not (response := request.send()):
            logger.warning("No Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No Results"
            )

        response_data = None

        if response.person:
            logger.success("single rec")
            response_data = [response.person]
        elif response.possible_persons:
            logger.success("multiple records")
            response_data = response.possible_persons

        logger.success(f"{response_data=}")

        if not response_data:
            logger.warning("Invalid Response")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No Results",
            )

        return JSONResponse(content=jsonable_encoder(response_data))
    except Exception as e:
        logger.critical(f"Exception Searching PIPL: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Searching PIPL"
        )


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

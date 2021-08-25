import uuid
from typing import Optional, List

from fastapi import HTTPException
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import (
    API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID,
    API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID,
)
from app.linkedin import query_url_builder as linkedin_query_url_builder
from app.texau.common import TexAuExecutionResponse, TEXAU_PROXY
from app.texau.spice import send_spice_request


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


async def handle_find_matching_linkedin_profiles(
    request: TexAuFindProfileRequest,
) -> Optional[TexAuExecutionResponse]:
    try:
        if not (query_url := linkedin_query_url_builder(request.dict())):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str("TexAu: Could not make Linkedin Query based on input"),
            )

        logger.debug(query_url)

        if not (
            execution_id := await send_spice_request(
                data={
                    "funcName": API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID,
                    "spiceId": API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID,
                    "inputs": {
                        "search": query_url,
                        "numberOfPage": "10",
                        "li_at": request.cookie,
                        "proxy": TEXAU_PROXY,
                    },
                    "executionName": str(uuid.uuid4()),
                }
            )
        ):
            logger.warning("Invalid Task Id")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Task Id"),
            )

        logger.debug(f"{execution_id=}")

        return TexAuExecutionResponse(execution_id=execution_id)
    except HTTPException as e:
        logger.critical(str(e))
        raise e
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )

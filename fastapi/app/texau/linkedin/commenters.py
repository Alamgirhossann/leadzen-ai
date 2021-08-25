import uuid
from typing import Optional

from fastapi import HTTPException
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import (
    API_CONFIG_TEXAU_LINKEDIN_FIND_POST_COMMENTERS_SPICE_ID,
    API_CONFIG_TEXAU_LINKEDIN_FIND_POST_COMMENTERS_FUNC_ID,
)
from app.texau.common import TexAuExecutionResponse, TEXAU_PROXY
from app.texau.spice import send_spice_request


class TexAuFindLinkedInPostCommentersRequest(BaseModel):
    url: str
    cookie: Optional[str] = None


async def handle_find_post_commenters(
    request: TexAuFindLinkedInPostCommentersRequest,
) -> Optional[TexAuExecutionResponse]:
    try:
        execution_id = await send_spice_request(
            data={
                "funcName": API_CONFIG_TEXAU_LINKEDIN_FIND_POST_COMMENTERS_FUNC_ID,
                "spiceId": API_CONFIG_TEXAU_LINKEDIN_FIND_POST_COMMENTERS_SPICE_ID,
                "inputs": {
                    "postUrl": request.url,
                    "li_at": request.cookie,
                    "proxy": TEXAU_PROXY,
                },
                "executionName": str(uuid.uuid4()),
            }
        )

        if not execution_id:
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

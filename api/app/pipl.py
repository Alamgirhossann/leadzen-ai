from typing import Optional, List, Dict

from fastapi import APIRouter, Depends, HTTPException, Request, status
from loguru import logger
from pydantic import BaseModel

from app.common import send_request_to_internal_server
from app.config import (
    API_CONFIG_INTERNAL_URL,
)
from app.users import fastapi_users

router = APIRouter(prefix="/people", tags=["People"])


class PiplName(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class PiplRequest(BaseModel):
    email: Optional[str] = None
    name: Optional[PiplName] = None
    url: Optional[str] = None
    hash_key: Optional[str] = None
    type: Optional[str] = None
    result: Optional[List[Dict]] = None


@router.post("/search")
async def people_search(
    app_request: PiplRequest,
    incoming_request: Request,
    user=Depends(fastapi_users.current_user(active=True)),
):
    logger.debug(f"{app_request=}, {user=}, {incoming_request=}")

    try:
        url = f"{API_CONFIG_INTERNAL_URL}/api/pipl/search"

        return await send_request_to_internal_server(
            url=url, app_request=app_request.dict(), incoming_request=incoming_request
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception in PIPL Search: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

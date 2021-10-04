import hashlib

from fastapi import APIRouter, HTTPException, status, BackgroundTasks, Depends
from pydantic.main import BaseModel
from loguru import logger
from app.users import fastapi_users

router = APIRouter(prefix="/util", tags=["Util Methods"])


class HashKeyRequest(BaseModel):
    url: str


@router.post("/make_hash_key")
async def make_hash_key(
        app_request: HashKeyRequest, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{app_request=}, {user=}")

    try:
        encoded = app_request.url.encode()
        result = hashlib.sha256(encoded)
        return result.hexdigest()
    except Exception as e:
        logger.critical(f"Exception in make hash key : {str(e)}")
        return None

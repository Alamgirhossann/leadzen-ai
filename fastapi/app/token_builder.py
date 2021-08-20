import jwt
from fastapi import APIRouter
from loguru import logger
from pydantic import BaseModel


class UserInfo(BaseModel):
    email: str


class UserInfoResponse(BaseModel):
    data: str


JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 3600

router = APIRouter(prefix="/verify_token", tags=["token verification"])


@router.post('/verification', response_model=UserInfoResponse)
def verify_token(request: UserInfo):
    logger.info(f"{request=}")
    try:
        payload = {'email': request.email}
        jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
        logger.debug(jwt_token)

        # newload = jwt.decode(jwt_token, JWT_SECRET,algorithms=[JWT_ALGORITHM])
        # print("newload", newload)
        return UserInfoResponse(data=jwt_token)
    except Exception as e:
        logger.critical(str(e))

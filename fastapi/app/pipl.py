from typing import Optional

from fastapi import APIRouter, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from loguru import logger
from piplapis.search import SearchAPIRequest
from pydantic import BaseModel

from app.config import API_CONFIG_PIPL_API_KEY
from app.users import fastapi_users

router = APIRouter(prefix="/pipl", tags=["PIPL"])


class PiplName(BaseModel):
    first_name: str
    last_name: str


class PiplRequest(BaseModel):
    email: Optional[str] = None
    name: Optional[PiplName] = None
    url: Optional[str] = None


@router.post("/search")
async def people_search(
    request: PiplRequest, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{request=}, {user=}")

    response_data = None
    json_compatible_item_data = None
    try:
        request = SearchAPIRequest(
            email=request.email,
            first_name=request.name.first_name,
            last_name=request.name.last_name,
            url=request.url,
            match_requirements="phones",
            api_key=API_CONFIG_PIPL_API_KEY,
        )
        # request = SearchAPIRequest(email='', first_name='', last_name='',
        #                            url=u'https://www.linkedin.com/pub/superman/20/7a/365',
        #                            # url=u'https://www.linkedin.com/in/malharlakdawala/' , clark.kent@example.com
        #                            api_key=API_CONFIG_PIPL_API_KEY)
        response = request.send()
        if response:
            if response.person:
                logger.success("single rec")
                response_data = [response.person]
            elif response.possible_persons:
                logger.success("multiple records")
                response_data = response.possible_persons
        else:
            response_data = None
            json_compatible_item_data = None

        logger.success("response_data Size>>>>" + str(response_data))
    except Exception as e:
        logger.critical("Exception >>" + str(e))
        raise HTTPException(status_code=404, detail="Item not found")

    if response_data:
        json_compatible_item_data = jsonable_encoder(response_data)
    return JSONResponse(content=json_compatible_item_data)

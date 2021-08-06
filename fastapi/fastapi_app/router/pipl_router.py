from fastapi import APIRouter
from piplapis.search import SearchAPIRequest
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi_app.requests import PiplRequest

from fastapi_app.config import PIPL_API_KEY

piplrouter = APIRouter(prefix="/pipl", tags=["Analyst People PIPL Router"])


@piplrouter.post(
    "/get_pipl",
)
async def people_search(pipl_request: PiplRequest):
    response_data = None
    try:
        request = SearchAPIRequest(email=pipl_request.email, first_name=pipl_request.firstName,
                                   last_name=pipl_request.lastName, url=pipl_request.url,
                                   api_key=PIPL_API_KEY)
        # request = SearchAPIRequest(email='', first_name='', last_name='',
        #                            url=u'https://www.linkedin.com/pub/superman/20/7a/365',
        #                            # url=u'https://www.linkedin.com/in/malharlakdawala/',
        #                            api_key=PIPL_API_KEY)
        response = request.send()
        if response:
            if response.person:
                print("single rec")
                response_data = [response.person]
            elif response.possible_persons:
                print("multiple records")
                response_data = response.possible_persons
            print("response_data Size>>>>", response_data)
    except Exception as e:
        print("Exception >>", e)
    json_compatible_item_data = jsonable_encoder(response_data)
    return JSONResponse(content=json_compatible_item_data)




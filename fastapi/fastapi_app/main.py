from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from piplapis.search import SearchAPIRequest
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()

PIPL_API_KEY = os.getenv('PIPL_API_ACCESS_KEY')

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    request = SearchAPIRequest(email=u'clark.kent@example.com', first_name=u'Clark', last_name=u'Kent', api_key=PIPL_API_KEY)
    response = request.send()

    if response.person:
        currentPerson = response.person
    
    json_compatible_item_data = jsonable_encoder(currentPerson)
    return JSONResponse(content=json_compatible_item_data)
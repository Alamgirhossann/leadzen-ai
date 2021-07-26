from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from piplapis.search import SearchAPIRequest

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
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
    request = SearchAPIRequest(email=u'clark.kent@example.com', first_name=u'Clark', last_name=u'Kent', api_key='x8tent752npf5q26l7w9fv95')
    response = request.send()

    if response.person:
        currentPerson = response.person

    return {"data": currentPerson}
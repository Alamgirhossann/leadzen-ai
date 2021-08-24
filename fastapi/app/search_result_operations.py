import json

import sqlalchemy
from fastapi import APIRouter
from pydantic.main import BaseModel

from app.config import API_CONFIG_DATABASE_URL
import databases
from typing import List, Optional
from loguru import logger

router = APIRouter(prefix="/search_result", tags=["Search Result Operations"])
metadata = sqlalchemy.MetaData()

database = databases.Database(API_CONFIG_DATABASE_URL)

search_result = sqlalchemy.Table(

    "search_result",

    metadata,

    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("result", sqlalchemy.String),
    sqlalchemy.Column("search_type", sqlalchemy.String),
    sqlalchemy.Column("additional_data", sqlalchemy.String),
    sqlalchemy.Column("phone_is_verified", sqlalchemy.Boolean),
    sqlalchemy.Column("phone_credit_used", sqlalchemy.Boolean),
    sqlalchemy.Column("email_is_verified", sqlalchemy.Boolean),
    sqlalchemy.Column("email_credit_used", sqlalchemy.Boolean),
    sqlalchemy.Column("created_on", sqlalchemy.Date),

)

engine = sqlalchemy.create_engine(
    API_CONFIG_DATABASE_URL, connect_args={"check_same_thread": False}
)
metadata.create_all(engine)


class SearchResultIn(BaseModel):
    result: str
    search_type: str
    # completed: bool


class SearchResult(BaseModel):
    id: int
    result: str
    search_type: Optional[str]


@router.get("/", response_model=List[SearchResult])
async def read_search_results():
    query = search_result.select()
    return await database.fetch_all(query)


@router.post("/", response_model=SearchResult)
async def create_search_result(search_results: SearchResultIn):
    query = search_result.insert().values(result=search_results.result, search_type=search_results.search_type)
    last_record_id = await database.execute(query)
    return {**search_results.dict(), "id": last_record_id}

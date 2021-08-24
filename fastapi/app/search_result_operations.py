import json

import sqlalchemy
from fastapi import APIRouter
from pydantic.main import BaseModel

from app.config import API_CONFIG_DATABASE_URL
import databases
from typing import List, Optional
from loguru import logger
import datetime

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
    sqlalchemy.Column("phone_number", sqlalchemy.Integer),
    sqlalchemy.Column("email_id", sqlalchemy.String),
    sqlalchemy.Column("phone_is_verified", sqlalchemy.Boolean),
    sqlalchemy.Column("phone_credit_used", sqlalchemy.Boolean),
    sqlalchemy.Column("email_is_verified", sqlalchemy.Boolean),
    sqlalchemy.Column("email_credit_used", sqlalchemy.Boolean),
    sqlalchemy.Column("additional_data", sqlalchemy.String),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime, default=datetime.datetime.now()),

)

engine = sqlalchemy.create_engine(
    API_CONFIG_DATABASE_URL, connect_args={"check_same_thread": False}
)
metadata.create_all(engine)


class SearchResultIn(BaseModel):
    result: str
    search_type: Optional[str]
    user_id: Optional[str] = None
    phone_number: Optional[int] = None
    email_id: Optional[str] = None
    phone_is_verified: Optional[bool] = False
    phone_credit_used: Optional[bool] = False
    email_is_verified: Optional[bool] = False
    email_credit_used: Optional[bool] = False
    additional_data: Optional[str] = None
    created_on: Optional[datetime.datetime] = datetime.datetime.now()


class SearchResult(BaseModel):
    id: int
    result: str
    search_type: Optional[str]
    user_id: Optional[str] = None
    phone_number: Optional[int] = None
    email_id: Optional[str] = None
    phone_is_verified: Optional[bool] = False
    phone_credit_used: Optional[bool] = False
    email_is_verified: Optional[bool] = False
    email_credit_used: Optional[bool] = False
    additional_data: Optional[str] = None
    created_on: Optional[datetime.datetime]


@router.get("/get_search_result", response_model=List[SearchResult])
async def read_search_results():
    query = search_result.select()
    return await database.fetch_all(query)


@router.post("/save_search_result", response_model=SearchResult)
async def create_search_result(search_results: SearchResultIn):
    current_time = datetime.datetime.now()
    logger.debug("current_time>>>" + str(current_time))

    query = search_result.insert().values(result=search_results.result,
                                          search_type=search_results.search_type,
                                          user_id=search_results.user_id,
                                          phone_number=search_results.phone_number,
                                          email_id=search_results.email_id,
                                          phone_is_verified=search_results.phone_is_verified,
                                          phone_credit_used=search_results.phone_credit_used,
                                          email_is_verified=search_results.email_is_verified,
                                          email_credit_used=search_results.email_credit_used,
                                          additional_data=search_results.additional_data,
                                          created_on=datetime.datetime.now())
    logger.debug("Query>>>>>" + str(query))
    last_record_id = await database.execute(query)
    return {**search_results.dict(), "id": last_record_id}

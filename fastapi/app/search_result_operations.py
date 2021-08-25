import json

import sqlalchemy
from fastapi import APIRouter
from pydantic.main import BaseModel

from app.config import API_CONFIG_DATABASE_URL
import databases
from typing import List, Optional, Dict
from loguru import logger
import datetime

router = APIRouter(prefix="/search_result", tags=["Search Result Operations"])
metadata = sqlalchemy.MetaData()

database = databases.Database(API_CONFIG_DATABASE_URL)

search_result = sqlalchemy.Table(

    "search_result",

    metadata,

    sqlalchemy.Column("search_id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("search_param", sqlalchemy.String, unique=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("result", sqlalchemy.String),
    sqlalchemy.Column("search_type", sqlalchemy.String),
    sqlalchemy.Column("additional_data", sqlalchemy.String),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime, default=datetime.datetime.now()),

)

search_result_phone = sqlalchemy.Table(

    "search_result_phone",

    metadata,

    sqlalchemy.Column("phone_id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("search_param", sqlalchemy.String),
    sqlalchemy.Column("phone_number", sqlalchemy.Integer),
    sqlalchemy.Column("phone_is_verified", sqlalchemy.Boolean),
    sqlalchemy.Column("phone_credit_used", sqlalchemy.Boolean),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime, default=datetime.datetime.now()),

)

search_result_email = sqlalchemy.Table(

    "search_result_email",

    metadata,

    sqlalchemy.Column("email_id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("search_param", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String),
    sqlalchemy.Column("email_is_verified", sqlalchemy.Boolean),
    sqlalchemy.Column("email_credit_used", sqlalchemy.Boolean),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime, default=datetime.datetime.now()),

)

engine = sqlalchemy.create_engine(
    API_CONFIG_DATABASE_URL, connect_args={"check_same_thread": False}
)
metadata.create_all(engine)


class SearchResultIn(BaseModel):
    result: str
    search_param: str
    search_type: Optional[str]
    user_id: Optional[str] = None
    additional_data: Optional[str] = None
    created_on: Optional[datetime.datetime] = datetime.datetime.now()


class SearchResult(BaseModel):
    search_id: int
    search_param: str
    result: Optional[str]
    search_type: Optional[str]
    user_id: Optional[str] = None
    additional_data: Optional[str] = None
    created_on: Optional[datetime.datetime]


class SearchResultPhoneIn(BaseModel):
    search_param: Optional[str] = None
    user_id: Optional[str] = None
    phone_number: Optional[int] = None
    phone_is_verified: Optional[bool] = False
    phone_credit_used: Optional[bool] = False
    created_on: Optional[datetime.datetime] = datetime.datetime.now()


class SearchResultPhone(BaseModel):
    phone_id: int
    search_param: Optional[str] = None
    user_id: Optional[str] = None
    phone_number: Optional[int] = None
    phone_is_verified: Optional[bool] = False
    phone_credit_used: Optional[bool] = False
    created_on: Optional[datetime.datetime] = datetime.datetime.now()


class SearchResultEmailIn(BaseModel):
    user_id: Optional[str] = None
    search_param: Optional[str] = None
    email: Optional[str] = None
    email_is_verified: Optional[bool] = False
    email_credit_used: Optional[bool] = False
    created_on: Optional[datetime.datetime] = datetime.datetime.now()


class SearchResultEmail(BaseModel):
    email_id: int
    search_param: Optional[str] = None
    user_id: Optional[str] = None
    email: Optional[str] = None
    email_is_verified: Optional[bool] = False
    email_credit_used: Optional[bool] = False
    created_on: Optional[datetime.datetime] = datetime.datetime.now()


@router.get("/get_search_result", response_model=List[SearchResult])
async def read_search_results(search_id: Optional[int] = None):
    result = None
    print("search_id>>>", search_id)
    try:
        if search_id:
            query = "SELECT * FROM search_result WHERE search_id = :search_id"
            result = await database.fetch_all(query=query, values={"search_id": search_id})
        else:
            query = "SELECT * FROM search_result"
            result = await database.fetch_all(query=query)
    except Exception as e:
        logger.critical("Error>>>" + str(e))

    return result


@router.get("/get_search_result_by_user_id", response_model=List[SearchResult])
async def read_search_results(user_id: str):
    print("search_id>>>", user_id)
    result = None
    try:
        if user_id:
            query = "SELECT * FROM search_result WHERE user_id = :user_id"
            result = await database.fetch_all(query=query, values={"user_id": user_id})
    # result = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
    except Exception as e:
        logger.critical("Error>>>" + str(e))
    return result


@router.get("/get_search_result_by_id_and_param", response_model=List[SearchResult])
async def read_search_results(user_id: str, search_param: str):
    print("param>>>", search_param)
    result = None
    try:
        if search_param:
            query = "SELECT * FROM search_result WHERE search_param = :search_param AND user_id = :user_id"
            result = await database.fetch_all(query=query, values={"search_param": search_param, "user_id": user_id})

    except Exception as e:
        logger.critical("Error>>>" + str(e))
    return result


@router.get("/get_search_result_phone", response_model=List[SearchResultPhone])
async def read_search_results_phone(phone_id: int):
    result = None
    try:
        if phone_id:
            query = "SELECT * FROM search_result_phone WHERE phone_id = :phone_id"
            result = await database.fetch_all(query=query, values={"phone_id": phone_id})
    except Exception as e:
        logger.critical("Error>>>" + str(e))
    return result


@router.get("/get_search_result_email", response_model=List[SearchResultEmail])
async def read_search_results_email(email_id: int):
    result = None
    try:
        if email_id:
            query = "SELECT * FROM search_result_email WHERE email_id = :email_id"
            result = await database.fetch_all(query=query, values={"email_id": email_id})
    except Exception as e:
        logger.critical("Error>>>" + str(e))
    return result


@router.post("/save_search_result", response_model=SearchResult)
async def create_search_result(search_results: SearchResultIn):
    result = None
    try:
        query = search_result.insert().values(result=search_results.result,
                                              search_type=search_results.search_type,
                                              search_param=search_results.search_param,
                                              user_id=search_results.user_id,
                                              additional_data=search_results.additional_data,
                                              created_on=datetime.datetime.now())

        last_record_id = await database.execute(query)
        result = {**search_results.dict(), "search_id": last_record_id}

    except Exception as e:
        logger.critical("Error>>>" + str(e))

    return result


@router.post("/save_search_result_phone", response_model=SearchResultPhone)
async def create_search_result_phone(search_results: SearchResultPhoneIn):
    result = None
    try:
        query = search_result_phone.insert().values(
            user_id=search_results.user_id,
            search_param=search_results.search_param,
            phone_number=search_results.phone_number,
            phone_is_verified=search_results.phone_is_verified,
            phone_credit_used=search_results.phone_credit_used,
            created_on=datetime.datetime.now())

        last_record_id = await database.execute(query)
        result = {**search_results.dict(), "phone_id": last_record_id}
    except Exception as e:
        logger.critical("Error>>>" + str(e))

    return result


@router.post("/save_search_result_email", response_model=SearchResultEmail)
async def create_search_result_email(search_results: SearchResultEmailIn):
    result = None
    try:
        query = search_result_email.insert().values(
            user_id=search_results.user_id,
            search_param=search_results.search_param,
            email=search_results.email,
            email_is_verified=search_results.email_is_verified,
            email_credit_used=search_results.email_credit_used,
            created_on=datetime.datetime.now())

        last_record_id = await database.execute(query)
        result = {**search_results.dict(), "email_id": last_record_id}
    except Exception as e:
        logger.critical("Error>>>" + str(e))

    return result

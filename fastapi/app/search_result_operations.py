# import datetime
# import json
# import uuid
# from typing import List, Optional, Dict
#
# import databases
# import sqlalchemy
# from fastapi import APIRouter
# from loguru import logger
# from pydantic.main import BaseModel
#
# from app.config import API_CONFIG_DATABASE_URL
#
# router = APIRouter(prefix="/search_result", tags=["Search Result Operations"])
# metadata = sqlalchemy.MetaData()
#
# database = databases.Database(API_CONFIG_DATABASE_URL)
#
# search_history = sqlalchemy.Table(
#     "search_history",
#     metadata,
#     sqlalchemy.Column("id", sqlalchemy.String, primary_key=True, default=uuid.uuid4),
#     sqlalchemy.Column("search_id", sqlalchemy.String, unique=True),
#     sqlalchemy.Column("user_id", sqlalchemy.String),
#     sqlalchemy.Column("results", sqlalchemy.String),
#     sqlalchemy.Column("search_type", sqlalchemy.String),
#     sqlalchemy.Column("search_term", sqlalchemy.String),
#     sqlalchemy.Column(
#         "created_on", sqlalchemy.DateTime, default=datetime.datetime.now()
#     ),
# )
#
# profile_credit_history = sqlalchemy.Table(
#     "profile_credit_history",
#     metadata,
#     sqlalchemy.Column("id", sqlalchemy.String, primary_key=True, default=uuid.uuid4),
#     sqlalchemy.Column("user_id", sqlalchemy.String),
#     sqlalchemy.Column("search_id", sqlalchemy.String),
#     sqlalchemy.Column("phone_number", sqlalchemy.String),
#     sqlalchemy.Column("search_index", sqlalchemy.Integer),
#     sqlalchemy.Column(
#         "created_on", sqlalchemy.DateTime, default=datetime.datetime.now()
#     ),
# )
#
# email_credit_history = sqlalchemy.Table(
#     "email_credit_history",
#     metadata,
#     sqlalchemy.Column("id", sqlalchemy.String, primary_key=True, default=uuid.uuid4),
#     sqlalchemy.Column("user_id", sqlalchemy.String),
#     sqlalchemy.Column("search_id", sqlalchemy.String),
#     sqlalchemy.Column("email_address", sqlalchemy.String),
#     sqlalchemy.Column("search_index", sqlalchemy.Integer),
#     sqlalchemy.Column(
#         "created_on", sqlalchemy.DateTime, default=datetime.datetime.now()
#     ),
# )
#
# engine = sqlalchemy.create_engine(
#     API_CONFIG_DATABASE_URL, connect_args={"check_same_thread": False}
# )
# metadata.create_all(engine)
#
#
# class SearchHistoryRequest(BaseModel):
#     user_id: str
#     search_id: str
#     search_type: str
#     search_term: str
#     results: List[Dict]
#     created_on: Optional[datetime.datetime] = datetime.datetime.now()
#
#
# class EmailCreditHistoryRequest(BaseModel):
#     user_id: str
#     search_id: str
#     email: List[str]
#     search_index: int
#     created_on: Optional[datetime.datetime] = datetime.datetime.now()
#
#
# class ProfileCreditHistoryRequest(BaseModel):
#     user_id: str
#     search_id: str
#     phone: List[str]
#     search_index: int
#     created_on: Optional[datetime.datetime] = datetime.datetime.now()
#
#
# class SearchHistoryResponse(BaseModel):
#     id: str
#     user_id: str
#     search_id: str
#     search_type: str
#     search_term: str
#     results: List[Dict]
#     created_on: Optional[datetime.datetime] = datetime.datetime.now()
#
#
# class EmailCreditHistoryResponse(BaseModel):
#     id: Optional[str]
#     user_id: Optional[str]
#     search_id: Optional[str]
#     email_address: Optional[str]
#     search_index: Optional[int]
#     created_on: Optional[datetime.datetime] = datetime.datetime.now()
#
#
# class ProfileCreditHistoryResponse(BaseModel):
#     id: Optional[str]
#     user_id: Optional[str]
#     search_id: Optional[str]
#     phone_number: Optional[str]
#     search_index: Optional[int]
#     created_on: Optional[datetime.datetime] = datetime.datetime.now()
#
#
# @router.get("/get_search_history", response_model=List[SearchHistoryResponse])
# async def read_search_history(search_id: Optional[str] = None):
#     result = None
#     print("search_id>>>", search_id)
#     try:
#         if search_id:
#             query = "SELECT * FROM search_history WHERE search_id = :search_id"
#             result = await database.fetch_all(
#                 query=query, values={"search_id": search_id}
#             )
#         else:
#             query = "SELECT * FROM search_history"
#             result = await database.fetch_all(query=query)
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#
#     return result
#
#
# @router.get(
#     "/get_search_history_by_user_id", response_model=List[SearchHistoryResponse]
# )
# async def read_search_history_by_user_id(user_id: str):
#     print("search_id>>>", user_id)
#     result = None
#     try:
#         if user_id:
#             query = "SELECT * FROM search_history WHERE user_id = :user_id"
#             result = await database.fetch_all(query=query, values={"user_id": user_id})
#
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#     return result
#
#
# @router.get(
#     "/get_profile_history_by_user_id", response_model=List[ProfileCreditHistoryResponse]
# )
# async def read_profile_history_by_user_id(user_id: str):
#     result = None
#     try:
#         if user_id:
#             query = "SELECT * FROM profile_credit_history WHERE user_id = :user_id"
#             result = await database.fetch_all(query=query, values={"user_id": user_id})
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#     return result
#
#
# @router.get(
#     "/get_profile_credit_history_by_search_id_and_user_id",
#     response_model=List[ProfileCreditHistoryResponse],
# )
# async def read_profile_history_by_search_id_and_user_id(search_id: str, user_id: str):
#     result = None
#     try:
#         if search_id and user_id:
#             query = "SELECT * FROM profile_credit_history WHERE search_id = :search_id AND user_id = :user_id"
#             result = await database.fetch_all(
#                 query=query, values={"search_id": search_id, "user_id": user_id}
#             )
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#     return result
#
#
# @router.get(
#     "/get_email_credit_history_by_user_id",
#     response_model=List[EmailCreditHistoryResponse],
# )
# async def read_search_results_email(user_id: int):
#     result = None
#     try:
#         if user_id:
#             query = "SELECT * FROM email_credit_history WHERE user_id = :user_id"
#             result = await database.fetch_all(query=query, values={"user_id": user_id})
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#     return result
#
#
# @router.get(
#     "/get_email_credit_history_by_search_id_and_user_id",
#     response_model=List[EmailCreditHistoryResponse],
# )
# async def read_email_history_by_search_id_and_user_id(search_id: str, user_id: str):
#     result = None
#     try:
#         if search_id and user_id:
#             query = "SELECT * FROM email_credit_history WHERE search_id = :search_id AND user_id = :user_id"
#             result = await database.fetch_all(
#                 query=query, values={"search_id": search_id, "user_id": user_id}
#             )
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#     return result
#
#
# @router.post("/save_search_history", response_model=SearchHistoryResponse)
# async def create_search_history(search_results: SearchHistoryRequest):
#     result = None
#     id = uuid.uuid4()
#     logger.debug("Id>>>>>>>>" + str(id), search_results)
#     print(type(search_results.results))
#     # logger.debug("Result..."+json.dumps(search_results.results))
#
#     try:
#         query = search_history.insert().values(
#             id=str(id),
#             user_id=search_results.user_id,
#             search_id=search_results.search_id,
#             search_type=search_results.search_type,
#             search_term=search_results.search_term,
#             results=str(json.dumps(search_results.results)),
#             created_on=datetime.datetime.now(),
#         )
#
#         last_record_id = await database.execute(query)
#         result = {**search_results.dict(), "id": last_record_id}
#
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#
#     return result
#
#
# # @router.post("/save_profile_credit_history", response_model=ProfileCreditHistoryResponse)
# # async def create_profile_credit_history(search_results: ProfileCreditHistoryRequest):
# #     result = None
# #     try:
# #         query = profile_credit_history.insert().values(
# #             id=str(uuid.uuid4()),
# #             user_id=search_results.user_id,
# #             search_id=search_results.search_id,
# #             phone_number=search_results.phone,
# #             search_index=search_results.search_index,
# #             created_on=datetime.datetime.now())
# #
# #         last_record_id = await database.execute(query)
# #         result = {**search_results.dict(), "id": last_record_id}
# #     except Exception as e:
# #         logger.critical("Error>>>" + str(e))
# #
# #     return result
#
#
# @router.post(
#     "/save_profile_credit_history", response_model=ProfileCreditHistoryResponse
# )
# async def create_profile_credit_history(search_results: ProfileCreditHistoryRequest):
#     result = None
#     logger.debug("Request>>>>" + str(search_results.phone))
#
#     values = [
#         {
#             "id": str(uuid.uuid4()),
#             "user_id": search_results.user_id,
#             "search_id": search_results.search_id,
#             "phone_number": k,
#             "search_index": search_results.search_index,
#             "created_on": datetime.datetime.now(),
#         }
#         for k in [search_results.phone[i] for i in range(0, len(search_results.phone))]
#     ]
#     print("values>>>>", values)
#
#     try:
#         query = "INSERT INTO profile_credit_history(id, user_id, search_id, phone_number, search_index, created_on) VALUES(:id, :user_id, :search_id, :phone_number, :search_index, :created_on)"
#
#         last_record_id = await database.execute_many(query=query, values=values)
#         result = {**search_results.dict(), "id": last_record_id}
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#
#     return result
#
#
# @router.post("/save_email_credit_history", response_model=EmailCreditHistoryResponse)
# async def create_email_credit_history(search_results: EmailCreditHistoryRequest):
#
#     result = None
#     logger.debug("Request>>>>" + str(search_results.email))
#
#     values = [
#         {
#             "id": str(uuid.uuid4()),
#             "user_id": search_results.user_id,
#             "search_id": search_results.search_id,
#             "email_address": k,
#             "search_index": search_results.search_index,
#             "created_on": datetime.datetime.now(),
#         }
#         for k in [search_results.email[i] for i in range(0, len(search_results.email))]
#     ]
#     print("values>>>>", values)
#
#     try:
#         query = "INSERT INTO email_credit_history(id, user_id, search_id, email_address, search_index, created_on) VALUES(:id, :user_id, :search_id, :email_address, :search_index, :created_on)"
#
#         last_record_id = await database.execute_many(query=query, values=values)
#         result = {**search_results.dict(), "id": last_record_id}
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#
#     return result

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class ProfileCreditAddRequest(BaseModel):
    search_id: str
    phone_number: str
    search_index: int


class ProfileCreditBulkAddRequest(BaseModel):
    search_id: str
    phone_numbers: List[str]
    search_index: int


class ProfileCreditAddResponse(BaseModel):
    profile_credit_id: str


class ProfileCreditBulkAddResponse(BaseModel):
    profile_credit_ids: List[str]


class ProfileCreditResponse(BaseModel):
    id: str
    user_id: str
    search_id: str
    phone_number: str
    search_index: int
    created_on: datetime


class EmailCreditAddRequest(BaseModel):
    search_id: str
    email_address: str
    search_index: int


class EmailCreditBulkAddRequest(BaseModel):
    search_id: str
    email_addresses: List[str]
    search_index: int


class EmailCreditAddResponse(BaseModel):
    email_credit_id: str


class EmailCreditBulkAddResponse(BaseModel):
    email_credit_ids: List[str]


class EmailCreditResponse(BaseModel):
    id: str
    user_id: str
    search_id: str
    email_address: str
    search_index: int
    created_on: datetime


class UserCreditRequest(BaseModel):
    email: str
    profile_credit: Optional[int] = 5
    email_credit: Optional[int] = 5


class UserCreditResponse(BaseModel):
    row_updated: Optional[int]


class EmailSearchAddRequest(BaseModel):
    user_id: str
    query_url: str
    email_result: str


class EmailSearchGetRequest(BaseModel):
    user_id : str
    query_url : str
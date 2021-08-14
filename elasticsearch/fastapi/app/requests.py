from typing import List, Optional, Dict

from pydantic import BaseModel, conlist, constr


class Contact(BaseModel):
    CustomerName: str
    Vehicles: str
    PhoneNumbers: str
    Addresses: str
    Companies: str


class ContactAddRequest(BaseModel):
    contacts: conlist(item_type=Contact, min_items=1)
    index_name: constr(
        to_lower=True, strip_whitespace=True, min_length=3
    ) = "analystt.default"


class ContactDeleteRequest(BaseModel):
    id: str
    index_name: constr(
        to_lower=True, strip_whitespace=True, min_length=3
    ) = "analystt.default"


class ContactIndexDeleteRequest(BaseModel):
    index_name: constr(
        to_lower=True, strip_whitespace=True, min_length=3
    ) = "analystt.default"


class ContactSearchRequest(BaseModel):
    dsl: Dict
    limit: Optional[int] = None
    index_name: constr(
        to_lower=True, strip_whitespace=True, min_length=3
    ) = "analystt.*"


class ContactSearchResponse(BaseModel):
    results: List[Dict]

from pydantic import BaseModel


class PiplRequest(BaseModel):
    email: str
    firstName: str
    lastName: str
    url: str

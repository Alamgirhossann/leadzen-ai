from fastapi import APIRouter
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import BaseModel, EmailStr
from typing import List
from app.config import API_CONFIG_GSUITE_EMAIL, API_CONFIG_GSUITE_PASSWORD


class EmailSchema(BaseModel):
    email: List[EmailStr]


conf = ConnectionConfig(
    MAIL_USERNAME=API_CONFIG_GSUITE_EMAIL,
    MAIL_PASSWORD=API_CONFIG_GSUITE_PASSWORD,
    MAIL_FROM=API_CONFIG_GSUITE_EMAIL,
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_TLS=True,
    MAIL_SSL=False,
    TEMPLATE_FOLDER='templates',
)
router = APIRouter(prefix="/email", tags=["email_send"])


@router.post("/email")
async def send_with_template(email: EmailSchema) -> JSONResponse:
    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=email.dict().get("email"),
        template_body={
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGMxMzQ5OWYtYTYxMy00NzRjLWFlNDMtZTFmMDM0OWZlODJjIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiYXVkIjoiZmFzdGFwaS11c2Vyczp2ZXJpZnkiLCJleHAiOjE2MjkzNzgwNTJ9.t5uNqfRoENgEUaWsYdbB_0vPLLZ5Wai9VzaZ10qA12I",
        },
    )

    fm = FastMail(conf)
    await fm.send_message(message, template_name="email_template.html")
    return JSONResponse(status_code=200, content={"message": "email has been sent"})

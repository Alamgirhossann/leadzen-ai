from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from starlette.responses import JSONResponse

from app.config import API_CONFIG_GSUITE_EMAIL, API_CONFIG_GSUITE_PASSWORD, API_CONFIG_HOST_ADDRESS

conf = ConnectionConfig(
    MAIL_USERNAME=API_CONFIG_GSUITE_EMAIL,
    MAIL_PASSWORD=API_CONFIG_GSUITE_PASSWORD,
    MAIL_FROM="noreply@analystt.ai",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)


async def send_with_template(email: str, token: str) -> JSONResponse:
    message = MessageSchema(
        subject="Analystt.ai user verification",
        recipients=[email],
        body=f"""
            <a href="{API_CONFIG_HOST_ADDRESS}verify-email?token={token}">ClickHere</a>
        """,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message, template_name="email_template.html")
    return JSONResponse(status_code=200, content={"message": "email has been sent"})

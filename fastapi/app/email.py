from crypt import methods
from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from loguru import logger
from pydantic import BaseModel, EmailStr
from starlette.responses import JSONResponse, RedirectResponse

from app.config import (
    API_CONFIG_GSUITE_EMAIL,
    API_CONFIG_GSUITE_PASSWORD,
    API_CONFIG_REACT_LOGIN_PAGE_URL,
    API_CONFIG_SELF_BASE_URL,
    API_CONFIG_SELF_BASE_EXTERNAL_URL,
)


class UserEmailVerificationEmailRequest(BaseModel):
    email: EmailStr
    token: str
    name: str


conf = ConnectionConfig(
    MAIL_USERNAME=API_CONFIG_GSUITE_EMAIL,
    MAIL_PASSWORD=API_CONFIG_GSUITE_PASSWORD,
    MAIL_FROM=API_CONFIG_GSUITE_EMAIL,
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_TLS=True,
    MAIL_SSL=False,
    # TEMPLATE_FOLDER='fastapi/templates',
)
router = APIRouter(prefix="/email", tags=["Email"])


class UserEmailSendRequest(BaseModel):
    email: EmailStr
    message: str
    subject: str


@router.post("/send", response_model=bool)
async def send_email(request: UserEmailSendRequest, background_tasks: BackgroundTasks):
    logger.debug(f"{request=}")

    message = MessageSchema(
        subject=request.subject,
        recipients=[request.email],
        body=request.message,
    )

    fast_mail = FastMail(conf)
    background_tasks.add_task(fast_mail.send_message, message)
    logger.success(f"Email Sent, {request.email=}")
    return True


@router.post("/verify/account", response_model=bool)
async def send_account_verification_email(
    request: UserEmailVerificationEmailRequest, background_tasks: BackgroundTasks
):
    logger.debug(f"{request=}")

    email_text = (
        f"Dear {request.name}, \n"
        f"Please click the link below to verify your email: \n"
        f"{API_CONFIG_SELF_BASE_EXTERNAL_URL}/api/email/verify/account/{request.token} \n"
        f"--- \n"
        f"Thanks \n"
        f"Analystt Team"
    )

    message = MessageSchema(
        subject="Analystt Email Verification",
        recipients=[request.email],
        body=email_text,
    )

    fast_mail = FastMail(conf)
    background_tasks.add_task(fast_mail.send_message, message)
    logger.success(f"Verification Email Sent, {request.email=}")
    return True


@router.get("/verify/account/{token}")
async def verify_email_by_token(token: str):
    logger.debug(f"{token=}")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{API_CONFIG_SELF_BASE_URL}/api/auth/verify", json={"token": token}
            )

            if not response:
                return JSONResponse(
                    status_code=401,
                    content={"message": "Error Verifying Email"},
                )

            data = response.json()
            logger.debug(data)

            if (
                response.status_code == 400
                and data["detail"] == "VERIFY_USER_ALREADY_VERIFIED"
            ):
                logger.warning("Email Already Verified, Redirect to Login")
                return RedirectResponse(
                    f"{API_CONFIG_REACT_LOGIN_PAGE_URL}?emailVerified=true"
                )

            if not response or response.status_code != 200:
                # redirect to error page
                logger.warning(
                    f"invalid response status code: {response.status_code=}, {response.text=}"
                )

                return JSONResponse(
                    status_code=401,
                    content={"message": "Error Verifying Email"},
                )

            logger.success("User Verified, Redirecting to login page")
            print(type(data))
            print("data.email", data.get("email"))

            params = urlencode({"email": data.get("email"), "emailVerified": "true"})

            return RedirectResponse(f"{API_CONFIG_REACT_LOGIN_PAGE_URL}?{params}")
    except Exception as e:
        logger.critical(f"Exception Verifying Email, {str(e)}")
        return JSONResponse(
            status_code=401,
            content={"message": "Error Verifying Email"},
        )

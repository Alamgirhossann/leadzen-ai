from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from loguru import logger
from pydantic import BaseModel, EmailStr
from starlette.responses import JSONResponse, RedirectResponse
from app.config import API_CONFIG_SENDINBLUE_EMAIL_VERIFICATION_TEMPLATE_ID
from app.utils.sendinblue import sendinblue_email_send

from app.config import (
    API_CONFIG_GSUITE_EMAIL,
    API_CONFIG_GSUITE_PASSWORD,
    API_CONFIG_REACT_LOGIN_PAGE_URL,
    API_CONFIG_SELF_BASE_URL,
    API_CONFIG_SELF_BASE_EXTERNAL_URL,
    API_CONFIG_SENDINBLUE_WELCOME_TEMPLATE_ID,
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
    template_id: int
    name: str
    email: EmailStr
    link: str


@router.post("/send", response_model=bool)
async def send_email(request: UserEmailSendRequest, background_tasks: BackgroundTasks):
    logger.debug(f"{request=}")
    background_tasks.add_task(
        sendinblue_email_send,
        templates_id=request.template_id,
        name=request.name,
        email_to=request.email,
        link=request.link,
    )
    logger.success(f"Email Sent, {request.email=}")
    return True


@router.post("/verify/account", response_model=bool)
async def send_account_verification_email(
    request: UserEmailVerificationEmailRequest, background_tasks: BackgroundTasks
):
    logger.debug(f"{request=}")
    link = f"{API_CONFIG_SELF_BASE_EXTERNAL_URL}/api/email/verify/account/{request.token} \n"
    background_tasks.add_task(
        sendinblue_email_send,
        templates_id=API_CONFIG_SENDINBLUE_EMAIL_VERIFICATION_TEMPLATE_ID,
        name=request.name,
        email_to=request.email,
        link=link,
    )
    logger.success(f"Verification Email Sent, {request.email=}")
    return True


@router.get("/verify/account/{token}")
async def verify_email_by_token(token: str, background_tasks: BackgroundTasks):
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
            if response.status_code == 200:
                background_tasks.add_task(
                    sendinblue_email_send,
                    templates_id=API_CONFIG_SENDINBLUE_WELCOME_TEMPLATE_ID,
                    name=data["username"],
                    email_to=data["email"],
                    link="",
                )
            logger.success("User Verified, Redirecting to login page")

            params = urlencode({"email": data.get("email"), "emailVerified": "true"})

            return RedirectResponse(f"{API_CONFIG_REACT_LOGIN_PAGE_URL}?{params}")
    except Exception as e:
        logger.critical(f"Exception Verifying Email, {str(e)}")
        return JSONResponse(
            status_code=401,
            content={"message": "Error Verifying Email"},
        )

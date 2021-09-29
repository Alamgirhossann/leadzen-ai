from typing import Optional

import httpx
from fastapi import Request, HTTPException
from fastapi_users import FastAPIUsers, models
from fastapi_users.authentication import JWTAuthentication
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from loguru import logger
from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from starlette import status

from app.config import (
    API_CONFIG_SELF_BASE_URL,
    API_CONFIG_JWT_SECRET,
)
from app.database import database, engine
from app.email import UserEmailVerificationEmailRequest


class User(models.BaseUser):
    username: str
    onboarded: bool = False
    profile_credit: Optional[int] = 5
    email_credit: Optional[int] = 5
    total_profile_credits: Optional[int] = 5
    total_email_credits: Optional[int] = 5


class UserCreate(models.BaseUserCreate):
    username: str
    onboarded: bool = False
    profile_credit: Optional[int] = 5
    email_credit: Optional[int] = 5
    total_profile_credits: Optional[int] = 5
    total_email_credits: Optional[int] = 5


class UserUpdate(User, models.BaseUserUpdate):
    username: str
    onboarded: bool = False
    profile_credit: Optional[int] = 5
    email_credit: Optional[int] = 5
    total_profile_credit: Optional[int] = 5
    total_email_credit: Optional[int] = 5


class UserDB(User, models.BaseUserDB):
    username: str
    onboarded: bool = False
    profile_credit: Optional[int] = 5
    email_credit: Optional[int] = 5
    total_profile_credits: Optional[int] = 5
    total_email_credits: Optional[int] = 5


Base: DeclarativeMeta = declarative_base()


class UserTable(Base, SQLAlchemyBaseUserTable):
    username = Column(String(length=320))
    onboarded = Column(Boolean, default=True)
    profile_credit = Column(Integer, default=5)
    email_credit = Column(Integer, default=5)
    total_profile_credits = Column(Integer, default=5)
    total_email_credits = Column(Integer, default=5)


Base.metadata.create_all(engine)

users = UserTable.__table__
user_db = SQLAlchemyUserDatabase(UserDB, database, users)


async def on_after_register(user: UserDB, request: Request):
    logger.success(f"User Registration {user=}, {request=}")

    try:
        async with httpx.AsyncClient() as client:
            logger.info(f"Performing Email Verification")
            await client.post(
                f"{API_CONFIG_SELF_BASE_URL}/api/auth/request-verify-token",
                json={"email": user.email},
            )
    except Exception as e:
        logger.critical(f"Exception in Email Verification: {str(e)}")


def on_after_forgot_password(user: UserDB, token: str, request: Request):
    logger.info(f"User {user.id} has forgot their password. Reset token: {token}")


async def after_verification_request(user: UserDB, token: str, request: Request):
    logger.info(f"Verification requested for {user=}, {token=}")

    try:
        # using the http call approach instead of the direct function call so that we can use the background_tasks
        # feature of fastapi
        async with httpx.AsyncClient() as client:
            logger.info(f"sending verification email")
            await client.post(
                f"{API_CONFIG_SELF_BASE_URL}/api/email/verify/account",
                json=UserEmailVerificationEmailRequest(
                    email=user.email, token=token, name=user.username
                ).dict(),
            )
    except Exception as e:
        logger.critical(f"Exception Sending Verification Email, {str(e)}")


jwt_authentication = JWTAuthentication(
    secret=API_CONFIG_JWT_SECRET, lifetime_seconds=3600, tokenUrl="/api/auth/jwt/login"
)


async def get_user(user):
    logger.debug(f"In Get User>>{user=}")
    try:
        query = "SELECT * FROM user WHERE id = :user_id"

        if not (
                rows := await database.fetch_all(
                    query=query, values={"user_id": str(user.id)}
                )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )
        logger.debug(f"db result{rows=},{len(rows)},>>>{type(rows)}")
        rows = [dict(x) for x in rows if x]
        logger.debug(f"{rows=},{len(rows)}")
        res_dct = {k: v for element in rows for k, v in element.items()}
        logger.debug(f"{res_dct=}")
        return UserDB(id=res_dct.get('id'), username=res_dct.get('username'), onboarded=res_dct.get('onboarded'),
                      profile_credit=res_dct.get('profile_credit'), email_credit=res_dct.get('email_credit'),
                      hashed_password=res_dct.get('hashed_password'),
                      total_profile_credits=res_dct.get('total_profile_credits'),
                      total_email_credits=res_dct.get('total_email_credits')
                      )

    except Exception as e:
        logger.critical(f"Exception in get User: {str(e)}")
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))


fastapi_users = FastAPIUsers(
    user_db,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)

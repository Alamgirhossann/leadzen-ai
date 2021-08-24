from typing import Optional

import databases
import httpx
import sqlalchemy
from fastapi import Request
from fastapi_users import FastAPIUsers, models
from fastapi_users.authentication import JWTAuthentication
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from loguru import logger
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base

from app.config import (
    API_CONFIG_SELF_BASE_URL,
    API_CONFIG_JWT_SECRET,
    API_CONFIG_DATABASE_URL,
)
from app.email import UserEmailVerificationEmailRequest


class User(models.BaseUser):
    username: Optional[str] = None


class UserCreate(models.BaseUserCreate):
    username: Optional[str] = None


class UserUpdate(User, models.BaseUserUpdate):
    username: Optional[str] = None


class UserDB(User, models.BaseUserDB):
    username: Optional[str] = None


database = databases.Database(API_CONFIG_DATABASE_URL)
Base: DeclarativeMeta = declarative_base()


class UserTable(Base, SQLAlchemyBaseUserTable):
    username = Column(String(length=320), nullable=True)


engine = sqlalchemy.create_engine(
    API_CONFIG_DATABASE_URL, connect_args={"check_same_thread": False}
)
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

fastapi_users = FastAPIUsers(
    user_db,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)

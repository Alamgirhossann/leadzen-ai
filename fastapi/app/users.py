from typing import Optional

import databases
import sqlalchemy
from fastapi import Request
from fastapi_users import FastAPIUsers, models
from fastapi_users.authentication import JWTAuthentication
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from fastapi_users.router.verify import VERIFY_USER_TOKEN_AUDIENCE
from fastapi_users.utils import generate_jwt
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base

from app.send_email import send_with_template

DATABASE_URL = "sqlite:///./test.db"
SECRET = "SECRET"


class User(models.BaseUser):
    username: Optional[str] = None
    pass


class UserCreate(models.BaseUserCreate):
    username: Optional[str] = None
    # pass


class UserUpdate(User, models.BaseUserUpdate):
    username: Optional[str] = None


class UserDB(User, models.BaseUserDB):
    username: Optional[str] = None


database = databases.Database(DATABASE_URL)
Base: DeclarativeMeta = declarative_base()


class UserTable(Base, SQLAlchemyBaseUserTable):
    username = Column(String(length=320), nullable=True)


engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
Base.metadata.create_all(engine)

users = UserTable.__table__
user_db = SQLAlchemyUserDatabase(UserDB, database, users)


async def on_after_register(user: UserDB, request: Request):
    print(f"User {user.id} has registered.")
    token_data = {
        "user_id": str(user.id),
        "email": user.email,
        "aud": VERIFY_USER_TOKEN_AUDIENCE,
    }
    token = generate_jwt(
        token_data,
        SECRET,
        3600,
    )
    await send_with_template(user.email, token)


def on_after_forgot_password(user: UserDB, token: str, request: Request):
    print(f"User {user.id} has forgot their password. Reset token: {token}")


def after_verification_request(user: UserDB, token: str, request: Request):
    print(f"Verification requested for user {user.id}. Verification token: {token}")


jwt_authentication = JWTAuthentication(
    secret=SECRET, lifetime_seconds=3600, tokenUrl="/api/auth/jwt/login"
)

fastapi_users = FastAPIUsers(
    user_db,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)

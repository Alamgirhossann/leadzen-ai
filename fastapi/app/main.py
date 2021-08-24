import csv
import databases
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utils.tasks import repeat_every
from loguru import logger
from starlette import status
from app.config import API_CONFIG_LINKEDIN_CSV_FILE, API_CONFIG_DATABASE_URL, API_CONFIG_JWT_SECRET
from app.customize_filter import router as filter_router
from app.email import router as email_router
from app.email_truemail import router as email_verification
from app.pipl import router as pipl_router
from app.scraper import fetch_linkedin_cookie
from app.texau import router as texau_router
from app.email_truemail import router as email_verification
from app.search_result_operations import router as search_operations, database
from app.users import fastapi_users
from app.users import (
    jwt_authentication,
    on_after_register,
    on_after_forgot_password,
    after_verification_request,
    database,
)

current_active_user = fastapi_users.current_user(active=True)

app = FastAPI()
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Analyst People API Endpoint"}


app.include_router(router=pipl_router, prefix="/api")
app.include_router(router=filter_router, prefix="/api")
app.include_router(router=texau_router, prefix="/api")
app.include_router(router=filter_router, prefix="/api")
app.include_router(router=email_verification, prefix="/api")
app.include_router(router=search_operations, prefix="/api")

app.include_router(
    fastapi_users.get_auth_router(jwt_authentication),
    prefix="/api/auth/jwt",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_register_router(on_after_register),
    prefix="/api/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(
        API_CONFIG_JWT_SECRET, after_forgot_password=on_after_forgot_password
    ),
    prefix="/api/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(
        API_CONFIG_JWT_SECRET, after_verification_request=after_verification_request
    ),
    prefix="/api/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(), prefix="/api/users", tags=["Users"]
)
app.include_router(router=email_router, prefix="/api")


# @app.on_event("startup")
# async def startup():
#     await database.connect()
#
#
# @app.on_event("shutdown")
# async def shutdown():
#     await database.disconnect()


# @app.on_event("startup")
# @repeat_every(seconds=60 * 60)
# def refresh_linkedin_cookie():
#     logger.debug("linkedin cookie...")
#     data = fetch_linkedin_cookie()
#     header = ["cookie"]
#     with open(API_CONFIG_LINKEDIN_CSV_FILE, "w") as f:
#         writer = csv.writer(f)
#         writer.writerow(header)
#         writer.writerow([data])
#     logger.debug(header)


@app.get("/refresh_linkedin_cookie")
def refresh_linkedin_cookie_manually():
    logger.debug("linkedin cookie...")
    data = fetch_linkedin_cookie()
    header = ["cookie"]
    with open(API_CONFIG_LINKEDIN_CSV_FILE, "w") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerow([data])
    logger.debug(header)
    return status.HTTP_200_OK


@app.on_event("startup")
async def startup():
    logger.debug("In database Connectin....")
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
@app.get("/test_auth")
def test_auth(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"test auth, {user=}")
    return True

import csv
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi_utils.tasks import repeat_every
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend
from fastapi_cache.decorator import cache
from loguru import logger
from starlette import status

from app.bulk.router import router as bulk_router
from app.config import (
    API_CONFIG_LINKEDIN_CSV_FILE,
    API_CONFIG_JWT_SECRET,
)
from app.credits import router as credits_router
from app.customize_filter import router as filter_router
from app.database import database
from app.email import router as email_router
from app.history import router as history_router
from app.pipl.router import router as pipl_router
from app.saved_list import router as save_list_router
from app.scraper import fetch_linkedin_cookie
from app.texau.router import router as texau_router
from app.users import fastapi_users
from app.users import (
    jwt_authentication,
    on_after_register,
    on_after_forgot_password,
    after_verification_request,
)
from app.utils.proxy_curl import router as proxycurl_router
from app.utils.snov import router as snov_router
from app.utils.truemail import router as truemail_router

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

app.mount("/api/bulk", StaticFiles(directory="bulk"), name="bulk")


@app.get("/")
async def root():
    return {"message": "Analyst People API Endpoint"}


app.include_router(router=pipl_router, prefix="/api")
app.include_router(router=filter_router, prefix="/api")
app.include_router(router=texau_router, prefix="/api")
app.include_router(router=bulk_router, prefix="/api")
app.include_router(router=history_router, prefix="/api")
app.include_router(router=credits_router, prefix="/api")
app.include_router(router=truemail_router, prefix="/api")
app.include_router(router=snov_router, prefix="/api")
app.include_router(router=proxycurl_router, prefix="/api")
app.include_router(router=save_list_router, prefix="/api")
# app.include_router(
#     router=search_operations,
#     prefix="/api",
#     dependencies=[Depends(fastapi_users.get_current_active_user)],
# )

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


@app.on_event("startup")
@repeat_every(seconds=60 * 60)
def job():
    print("linkedin delete cookie...")
    # data = fetch_linkedin_cookie()
    with open(API_CONFIG_LINKEDIN_CSV_FILE, "r") as f:
        data = list(csv.reader(f))
        logger.debug("data", data)
    # header = ['cookie']
    with open(API_CONFIG_LINKEDIN_CSV_FILE, 'wb') as f:
        writer = csv.writer(f)
        for row in data:
            if row[2] != "0":
                writer.writerow(row)


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
    logger.info("Connecting to Database")
    await database.connect()
    logger.info("Initializing In Memory Cache")
    FastAPICache.init(InMemoryBackend(), prefix="fastapi-cache")


@app.on_event("shutdown")
async def shutdown():
    logger.info("Disconnecting from Database")
    await database.disconnect()
    logger.info("Clearing Memory Cache")
    await FastAPICache.clear()


@app.get("/test_auth")
@cache(expire=10)
async def test_auth_with_10s_cache(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"test auth, {user=}")
    return datetime.utcnow().timestamp()


@cache()
async def get_cache():
    return 1

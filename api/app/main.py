import aioredis
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi_limiter import FastAPILimiter

from loguru import logger

from app.config import (
    API_CONFIG_REDIS_URL,
    API_CONFIG_RATELIMIT_ALLOWED_COUNT,
    API_CONFIG_RATELIMIT_ALLOWED_DURATION,
)
from app.database import database
from app.pipl import router as pipl_router
from app.texau import router as texau_router
from app.users import (
    fastapi_users,
)
from app.users import (
    jwt_authentication,
)
from fastapi_limiter.depends import RateLimiter

current_active_user = fastapi_users.current_user(active=True)


def app_factory():
    app = FastAPI(
        title="Analystt LeadZen Public API",
        description=f"All endpoints need authorization. Signup at LeadZen site to get access. All endpoints are rate "
        f"limited to a maximum of {API_CONFIG_RATELIMIT_ALLOWED_COUNT} calls in "
        f"{API_CONFIG_RATELIMIT_ALLOWED_DURATION}s per user",
        dependencies=[
            Depends(
                RateLimiter(
                    times=API_CONFIG_RATELIMIT_ALLOWED_COUNT,
                    seconds=API_CONFIG_RATELIMIT_ALLOWED_DURATION,
                )
            )
        ],
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(router=pipl_router, prefix="/api")
    app.include_router(router=texau_router, prefix="/api")

    app.include_router(
        fastapi_users.get_auth_router(jwt_authentication),
        prefix="/api/auth/jwt",
        tags=["auth"],
    )

    return app


async def app_shutdown(app):
    logger.info("Disconnecting from Database")
    await database.disconnect()


async def app_startup(app):
    logger.info("Connecting to Database")
    await database.connect()
    logger.info("Starting Rate Limiter")
    redis = await aioredis.from_url(
        API_CONFIG_REDIS_URL, encoding="utf-8", decode_responses=True
    )
    await FastAPILimiter.init(redis)


app = app_factory()


@app.get("/")
async def root():
    return {"message": "Analystt LeadZen Endpoint"}


@app.on_event("startup")
async def startup():
    await app_startup(app)


@app.on_event("shutdown")
async def shutdown():
    await app_shutdown(app)

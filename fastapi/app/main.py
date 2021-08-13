import csv

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utils.tasks import repeat_every
from loguru import logger

from app.config import API_CONFIG_LINKEDIN_CSV_FILE
from app.customize_filter import router as filter_router
from app.pipl import router as pipl_router
from app.scraper import fetch_linkedin_cookie
from app.texau import router as texau_router

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


@app.on_event("startup")
@repeat_every(seconds=60 * 60)
def refresh_linkedin_cookie():
    logger.debug("linkedin cookie...")
    data = fetch_linkedin_cookie()
    header = ["cookie"]
    with open(API_CONFIG_LINKEDIN_CSV_FILE, "w") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerow([data])
    logger.debug(header)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.pipl import router as pipl_router
from app.texau import router as texau_router
from app.customize_filter import router as filter_router
from app.email_truemail import router as email_verification


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
app.include_router(router=texau_router, prefix="/api")
app.include_router(router=filter_router, prefix="/api")
app.include_router(router=email_verification, prefix="/api")


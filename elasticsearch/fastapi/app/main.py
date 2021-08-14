from fastapi import FastAPI

from app.elasticsearch.database import shutdown as database_shutdown
from app.elasticsearch.database import status as database_status

app = FastAPI(
    title="Contact Search API",
    description="API to add new contact, search contacts by name and other attributes",
    version="1.0.0",
)


@app.get("/")
async def read_root():
    return await database_status()


from app.contacts import router as contacts_router

app.include_router(
    contacts_router,
    prefix="/contacts",
    tags=["Contacts"],
)


@app.on_event("shutdown")
async def handle_shutdown_event():
    await database_shutdown()

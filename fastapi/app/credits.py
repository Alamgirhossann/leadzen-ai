import uuid
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from pydantic.main import BaseModel

from app.database import profile_credit_history, email_credit_history,email_search, database
from app.users import fastapi_users

router = APIRouter(prefix="/credits", tags=["Credits"])


class ProfileCreditAddRequest(BaseModel):
    search_id: str
    phone_number: str
    search_index: int


class ProfileCreditBulkAddRequest(BaseModel):
    search_id: str
    phone_numbers: List[str]
    search_index: int


class ProfileCreditAddResponse(BaseModel):
    profile_credit_id: str


class ProfileCreditBulkAddResponse(BaseModel):
    profile_credit_ids: List[str]


class ProfileCreditResponse(BaseModel):
    id: str
    user_id: str
    search_id: str
    phone_number: str
    search_index: int
    created_on: datetime


@router.get("/profile/all", response_model=List[ProfileCreditResponse])
async def get_all_profile_credit(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"{user=}")
    try:
        query = "SELECT * FROM profile_credit_history WHERE user_id = :user_id ORDER BY id DESC"

        if not (
                rows := await database.fetch_all(
                    query=query, values={"user_id": str(user.id)}
                )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{rows=}")

        processed_rows = [dict(x) for x in rows]

        return [ProfileCreditResponse(**x) for x in processed_rows if x]

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )


@router.get(
    "/profile/search_id/{search_id}",
    response_model=List[ProfileCreditResponse],
)
async def get_all_profile_credits_for_search_id(
        search_id: str, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{search_id=}, {user=}")
    try:
        query = f"SELECT * FROM profile_credit_history WHERE search_id = :search_id AND user_id = :user_id"

        if not (
                rows := await database.fetch_all(
                    query=query, values={"search_id": search_id, "user_id": str(user.id)}
                )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{rows=}")

        processed_rows = [dict(x) for x in rows]

        return [ProfileCreditResponse(**x) for x in processed_rows]
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )


@router.post("/profile/add", response_model=ProfileCreditAddResponse)
async def add_profile_credit_history(
        request: ProfileCreditAddRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:
        profile_credit_id = str(uuid.uuid4())

        query = profile_credit_history.insert().values(
            id=profile_credit_id,
            user_id=str(user.id),
            search_id=request.search_id,
            phone_number=request.phone_number,
            search_index=request.search_index,
            created_on=datetime.utcnow(),
        )

        row_id = await database.execute(query)

        logger.debug(f"{row_id=}")

        return ProfileCreditAddResponse(profile_credit_id=profile_credit_id)

    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.post("/profile/bulk_add", response_model=ProfileCreditBulkAddResponse)
async def add_bulk_profile_credit_history(
        request: ProfileCreditBulkAddRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:
        values = [{"id": str(uuid.uuid4()),
                   "user_id": str(user.id),
                   "search_id": request.search_id,
                   "phone_number": phone,
                   "search_index": request.search_index,
                   "created_on": datetime.utcnow()
                   } for phone in [request.phone_numbers[i] for i in range(0, len(request.phone_numbers))]]
        profile_credit_ids = [item.get("id") for item in values]
        logger.debug("Ids>>>>"+str(profile_credit_ids)+ str(type(profile_credit_ids)))
        query = profile_credit_history.insert().values(
            values
        )

        row_id = await database.execute(query)
        logger.debug(f"{row_id=}")
        return ProfileCreditBulkAddResponse(profile_credit_ids=profile_credit_ids)

    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


class EmailCreditAddRequest(BaseModel):
    search_id: str
    email_address: str
    search_index: int


class EmailCreditBulkAddRequest(BaseModel):
    search_id: str
    email_addresses: List[str]
    search_index: int


class EmailCreditAddResponse(BaseModel):
    email_credit_id: str


class EmailCreditBulkAddResponse(BaseModel):
    email_credit_ids: List[str]


class EmailCreditResponse(BaseModel):
    id: str
    user_id: str
    search_id: str
    email_address: str
    search_index: int
    created_on: datetime

class EmailSearchAddRequest(BaseModel):
    user_id: str
    query_url: str
    email_result: str


class EmailSearchGetRequest(BaseModel):
    user_id:str
    query_url: str


@router.get(
    "/email/all",
    response_model=List[EmailCreditResponse],
)
async def get_all_email_credits(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"{user=}")
    try:
        query = "SELECT * FROM email_credit_history WHERE user_id = :user_id ORDER BY id DESC"

        if not (
                rows := await database.fetch_all(
                    query=query, values={"user_id": str(user.id)}
                )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{rows=}")

        processed_rows = [dict(x) for x in rows]

        return [EmailCreditResponse(**x) for x in processed_rows if x]

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )


@router.get(
    "/email/search_id/{search_id}",
    response_model=List[EmailCreditResponse],
)
async def get_email_credits_used_in_search_id(
        search_id: str, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{search_id=}, {user=}")
    try:
        query = f"SELECT * FROM email_credit_history WHERE search_id = :search_id AND user_id = :user_id"

        if not (
                rows := await database.fetch_all(
                    query=query, values={"search_id": search_id, "user_id": str(user.id)}
                )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{rows=}")

        processed_rows = [dict(x) for x in rows]

        return [EmailCreditResponse(**x) for x in processed_rows]
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )


@router.post("/email/add", response_model=EmailCreditAddResponse)
async def add_email_credit_history(
        request: EmailCreditAddRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:
        email_credit_id = str(uuid.uuid4())
        query = email_credit_history.insert().values(
            id=email_credit_id,
            user_id=str(user.id),
            search_id=request.search_id,
            email_address=request.email_address,
            search_index=request.search_index,
            created_on=datetime.utcnow(),
        )

        row_id = await database.execute(query)

        logger.debug(f"{row_id=}")

        return EmailCreditAddResponse(email_credit_id=email_credit_id)

    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.post("/email/bulk_add", response_model=EmailCreditBulkAddResponse)
async def add_bulk_email_credit_history(
        request: EmailCreditBulkAddRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:

        values = [{"id": str(uuid.uuid4()),
                   "user_id": str(user.id),
                   "search_id": request.search_id,
                   "email_address": emails,
                   "search_index": request.search_index,
                   "created_on": datetime.utcnow()
                   } for emails in [request.email_addresses[i] for i in range(0, len(request.email_addresses))]]
        email_credit_ids = [item.get("id") for item in values]

        query = email_credit_history.insert().values(
            values
        )

        row_id = await database.execute(query)

        logger.debug(f"{row_id=}")

        return EmailCreditBulkAddResponse(email_credit_ids=email_credit_ids)

    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.post("/email_search/add")
async def add_email_search(
        request: EmailSearchAddRequest
):
    try:
        email_search_id = str(uuid.uuid4())
        query = email_search.insert().values(
            id=email_search_id,
            user_id=request.user_id,
            query_url=request.query_url,
            email_result=request.email_result,
            created_on=datetime.utcnow(),
        )

        row_id = await database.execute(query)
        logger.debug(f"{row_id=}")
        return row_id
    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.post("/email_search/get")
async def add_email_search(
        request: EmailSearchGetRequest,
):
    print("kisha",request)
    try:
        query = f"SELECT * FROM email_search WHERE user_id = :user_id AND query_url = :query_url"

        if not (
                rows := await database.fetch_all(
                    query=query, values={"user_id": request.user_id, "query_url": request.query_url}
                )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{rows=}")

        processed_rows = [dict(x) for x in rows]
        for i in processed_rows[0]:
            if i=='email_result':
                return processed_rows[0][i]
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )



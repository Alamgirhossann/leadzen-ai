import uuid
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from pydantic.main import BaseModel

from app.database import profile_credit_history
from app.main import database
from app.users import fastapi_users

router = APIRouter(prefix="/credits", tags=["Credits"])


class ProfileCreditAddRequest(BaseModel):
    user_id: str
    search_id: str
    phone_number: str
    search_index: int


class ProfileCreditAddResponse(BaseModel):
    profile_id: str


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

    result = None
    try:
        query = "SELECT * FROM profile_credit_history WHERE search_id = :search_id AND user_id = :user_id"
        result = await database.fetch_all(
            query=query, values={"search_id": search_id, "user_id": user.id}
        )
    except Exception as e:
        logger.critical("Error>>>" + str(e))
    return result


@router.post("/profile/add", response_model=ProfileCreditAddResponse)
async def add_profile_credit_history(
    request: ProfileCreditAddRequest,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:
        profile_id = str(uuid.uuid4())
        query = profile_credit_history.insert().values(
            id=profile_id,
            user_id=str(user.id),
            search_id=request.search_id,
            phone_number=request.phone_number,
            search_index=request.search_index,
            created_on=datetime.utcnow(),
        )

        logger.debug(f"{query=}")

        row_id = await database.execute(query)

        logger.debug(f"{row_id=}")

        return ProfileCreditAddResponse(profile_id=profile_id)

    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


class EmailCreditHistoryRequest(BaseModel):
    user_id: str
    search_id: str
    email: str
    search_index: int


class EmailCreditHistoryResponse(BaseModel):
    id: Optional[str]
    user_id: Optional[str]
    search_id: Optional[str]
    email_address: Optional[str]
    search_index: Optional[int]
    created_on: datetime


@router.get(
    "/email/all",
    response_model=List[EmailCreditHistoryResponse],
)
async def get_all_email_credits(user=Depends(fastapi_users.get_current_active_user)):
    result = None
    try:
        query = "SELECT * FROM email_credit_history WHERE user_id = :user_id"
        result = await database.fetch_all(query=query, values={"user_id": user.id})
    except Exception as e:
        logger.critical("Error>>>" + str(e))
    return result


@router.get(
    "/email/search_id/{search_id}",
    response_model=List[EmailCreditHistoryResponse],
)
async def get_email_credits_used_in_search_id(
    search_id: str, user=Depends(fastapi_users.get_current_active_user)
):
    result = None
    try:
        query = "SELECT * FROM email_credit_history WHERE search_id = :search_id AND user_id = :user_id"
        result = await database.fetch_all(
            query=query, values={"search_id": search_id, "user_id": user.id}
        )
    except Exception as e:
        logger.critical("Error>>>" + str(e))
    return result


# @router.post("/save_profile_credit_history", response_model=ProfileCreditHistoryResponse)
# async def create_profile_credit_history(search_results: ProfileCreditHistoryRequest):
#     result = None
#     try:
#         query = profile_credit_history.insert().values(
#             id=str(uuid.uuid4()),
#             user_id=search_results.user_id,
#             search_id=search_results.search_id,
#             phone_number=search_results.phone,
#             search_index=search_results.search_index,
#             created_on=datetime.datetime.now())
#
#         last_record_id = await database.execute(query)
#         result = {**search_results.dict(), "id": last_record_id}
#     except Exception as e:
#         logger.critical("Error>>>" + str(e))
#
#     return result


@router.post("/save_email_credit_history", response_model=EmailCreditHistoryResponse)
async def create_email_credit_history(search_results: EmailCreditHistoryRequest):

    result = None
    logger.debug("Request>>>>" + str(search_results.email))

    values = [
        {
            "id": str(uuid.uuid4()),
            "user_id": search_results.user_id,
            "search_id": search_results.search_id,
            "email_address": k,
            "search_index": search_results.search_index,
            "created_on": datetime.datetime.now(),
        }
        for k in [search_results.email[i] for i in range(0, len(search_results.email))]
    ]
    print("values>>>>", values)

    try:
        query = "INSERT INTO email_credit_history(id, user_id, search_id, email_address, search_index, created_on) VALUES(:id, :user_id, :search_id, :email_address, :search_index, :created_on)"

        last_record_id = await database.execute_many(query=query, values=values)
        result = {**search_results.dict(), "id": last_record_id}
    except Exception as e:
        logger.critical("Error>>>" + str(e))

    return result

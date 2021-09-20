import uuid
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger

from app.credits.common import ProfileCreditAddRequest, ProfileCreditBulkAddRequest, ProfileCreditAddResponse, \
    ProfileCreditBulkAddResponse, ProfileCreditResponse
from app.database import profile_credit_history, database
from app.users import fastapi_users

router = APIRouter(prefix="/credits", tags=["Credits"])


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
        # query = (
        #     f"SELECT * FROM profile_credit_history WHERE user_id = :user_id"
        # )
        # logger.debug(f"{query=}")
        #
        # if (
        #         row := await database.fetch_all(
        #             query=query, values={"user_id": str(user.id)}
        #         )
        # ):
        #
        #     logger.warning(f"Record already present {row=}")
        #
        #     return None
        values = [{"id": str(uuid.uuid4()),
                   "user_id": str(user.id),
                   "search_id": request.search_id,
                   "phone_number": phone,
                   "search_index": request.search_index,
                   "created_on": datetime.utcnow()
                   } for phone in [request.phone_numbers[i] for i in range(0, len(request.phone_numbers))]]
        profile_credit_ids = [item.get("id") for item in values]
        logger.debug("Ids>>>>" + str(profile_credit_ids) + str(type(profile_credit_ids)))
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




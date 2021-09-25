import asyncio
import itertools
import sys
import uuid
from datetime import datetime
from typing import List

import httpx
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
    if request:
        profile_credit_id = await insert_one_profile(request.search_id,request.phone_number,request.search_index, user)
        return ProfileCreditAddResponse(profile_credit_id=profile_credit_id)
    return None


async def insert_one_profile(search_id, phone_number, search_index, user):
    try:
        if not search_id and not phone_number and not search_index:
            logger.warning(f"Details Not Found")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Details Not Found",
            )
        logger.debug(f"{search_id=}>>{phone_number=}>>{search_index=}")
        query = f"SELECT * FROM profile_credit_history WHERE search_id = :search_id AND user_id = :user_id AND phone_number= :phone_number"
        if (
                rows := await database.fetch_all(
                    query=query, values={"search_id": search_id, "user_id": str(user.id),
                                         "phone_number": phone_number}
                )
        ):
            logger.warning(f"Record Already Exists>>>{rows=}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Record Already Exists"
            )
        logger.debug(f"Q{query}")
        profile_credit_id = str(uuid.uuid4())
        query = profile_credit_history.insert().values(
            id=profile_credit_id,
            user_id=str(user.id),
            search_id=search_id,
            phone_number=phone_number,
            search_index=search_index,
            created_on=datetime.utcnow(),
        )

        row_id = await database.execute(query)
        logger.debug(f"{row_id=}")
        return row_id

    except HTTPException as e:
        logger.warning(f"HTTPException re-raised")
        raise e
    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.post("/profile/bulk_add")
async def add_bulk_profile_credit_history(
        request: ProfileCreditBulkAddRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:
        phone_numbers = list(set(request.phone_numbers))
        phone_numbers = [x for x in phone_numbers if x]
        logger.debug(f"{phone_numbers}>>>{type(phone_numbers)}")
        # async with httpx.AsyncClient() as client:
        coroutines = [

            insert_one_profile(
                search_id=request.search_id, phone_number=phone_numbers[int(p)], search_index=request.search_index,
                user=user

            )
            for p,v in enumerate(phone_numbers)
        ]
        results = await asyncio.gather(*coroutines)

        results = [
            x for x in results if x
        ]  # remove the None's else chain/flatten operation will fail

        if not any(results):
            logger.warning("No Results Found")
            return None

        return results


    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )

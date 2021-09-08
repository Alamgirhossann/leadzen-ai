import sys
import uuid
from datetime import datetime
from typing import List

import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger

from app.config import API_CONFIG_SELF_BASE_URL
from app.credits.common import ProfileCreditAddRequest, ProfileCreditBulkAddRequest, ProfileCreditAddResponse, \
    ProfileCreditBulkAddResponse, ProfileCreditResponse, EmailCreditAddRequest, EmailCreditBulkAddRequest, \
    EmailCreditAddResponse, EmailCreditBulkAddResponse, EmailCreditResponse, UserCreditResponse
from app.database import profile_credit_history, email_credit_history, database
from app.users import fastapi_users, users

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
        if user.email_credit <= 0:
            logger.warning("Insufficient credits")
            raise HTTPException(
                status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Insufficient credits"
            )

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
        if not (
                row_id := await database.execute(query)
        ):
            logger.warning("Invalid Request")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Request"
            )
        logger.debug(f"{row_id=}")

        # async with httpx.AsyncClient(auth=Depends(fastapi_users.get_current_active_user)) as client:
        #
        #     response = await client.put(
        #         f"{API_CONFIG_SELF_BASE_URL}/api/credits/deduct/EMAIL",
        #
        #
        #     )
        #     if not response:
        #         logger.debug(f"credit deduct {response=}")

        return EmailCreditBulkAddResponse(email_credit_ids=email_credit_ids)

    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.put("/deduct/{credit_type}", response_model=UserCreditResponse)
async def deduct_credit(credit_type: str, user=Depends(fastapi_users.get_current_active_user),
                        ):
    logger.debug(f"{user=}")
    try:
        values = ""
        if credit_type:
            if credit_type == 'EMAIL':
                if not user.email_credit >= 1:
                    logger.warning("Insufficient credits")
                    raise HTTPException(
                        status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Insufficient credits"
                    )
                values = {"email_credit": users.c.email_credit - 1}
            if credit_type == 'PROFILE':
                if not user.profile_credit >= 1:
                    logger.warning("Insufficient credits")
                    raise HTTPException(
                        status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Insufficient credits"
                    )
                values = {"profile_credit": users.c.profile_credit - 1}
            if credit_type == 'COMPANY':
                if not user.company_credit >= 1:
                    logger.warning("Insufficient credits")
                    raise HTTPException(
                        status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Insufficient credits"
                    )
                values = {"company_credit": users.c.company_credit - 1}

        update_query = users.update().values(values).where(users.c.id == user.id)
        logger.debug(f"{update_query=}")

        if not (
                row := await database.execute(update_query
                                              )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )
        return UserCreditResponse(row_updated=row)
    except HTTPException as e:
        raise e
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )

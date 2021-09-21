import sys
import uuid
from datetime import datetime
from typing import List

from fastapi import Depends, HTTPException, APIRouter
from loguru import logger
from starlette import status

from app.credits.common import EmailCreditResponse, EmailCreditAddResponse, EmailCreditAddRequest, \
    EmailCreditBulkAddResponse, EmailCreditBulkAddRequest
from app.database import database, email_credit_history
from app.users import fastapi_users

router = APIRouter(prefix="/credits", tags=["Credits"])

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
        if not (
                row_id := await database.execute(query)
        ):
            logger.warning("Invalid Request")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Request"
            )
        logger.debug(f"{row_id=}")

        # async with httpx.AsyncClient() as client:
        #
        #     response = await client.put(
        #         f"{API_CONFIG_SELF_BASE_URL}/api/credits/deduct/EMAIL",
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
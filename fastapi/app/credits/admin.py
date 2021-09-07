import sys
from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger

from app.credits.common import UserCreditRequest
from app.database import database
from app.users import fastapi_users, users

router = APIRouter(prefix="/credits_admin", tags=["Credit Admin Operations"])


@router.put("/add_credits")
async def add_all_credits_to_users(request: UserCreditRequest, user=Depends(fastapi_users.get_current_superuser)):
    logger.debug(f"{user=},>>>{request=}")
    try:

        update_query = users.update().values(
            profile_credit=users.c.profile_credit + request.profile_credit,
            email_credit=users.c.email_credit + request.email_credit,
            company_credit=users.c.company_credit + request.company_credit).where(users.c.email == request.email)
        logger.debug(f"{update_query=}")

        if not (
                row := await database.execute(update_query
                                              )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        return {"row updated": row}
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )

from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger

from app.credits.common import UserCreditRequest, UserCreditResponse
from app.database import database
from app.users import fastapi_users, users

router = APIRouter(prefix="/credits/admin", tags=["Credit Admin Operations"])


@router.put("/add", response_model=UserCreditResponse)
async def add_all_credits_to_users(request: UserCreditRequest, user=Depends(fastapi_users.get_current_superuser)):
    logger.debug(f"{user=},>>>{request=}")
    try:

        update_query = users.update().values(
            profile_credit=users.c.profile_credit + request.profile_credit,
            email_credit=users.c.email_credit + request.email_credit,
            total_profile_credits=users.c.total_profile_credits + request.profile_credit,
            total_email_credits=users.c.total_email_credits + request.email_credit,
        ).where(users.c.email == request.email)
        logger.debug(f"{update_query=}")

        if not (
                row := await database.execute(update_query
                                              )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User Id Not Found"
            )

        return UserCreditResponse(row_updated=row)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error Querying Database"
        )


@router.put("/deduct/{credit_type}", response_model=UserCreditResponse)
async def deduct_credit_by_type(credit_type: str, user=Depends(fastapi_users.get_current_active_user),
                                ):
    logger.debug(f"{user=}")
    credit_res = await deduct_credit(credit_type, user)
    return UserCreditResponse(row_updated=credit_res)


async def deduct_credit(credit_type, user):
    try:
        logger.debug(f"in deduct credit >>>{user=},>>>{credit_type=}>>>>>{users.c.profile_credit=}>>>>>{user.profile_credit-1=}")
        values = ""
        updated_profile=user.profile_credit - 1
        logger.debug(
            f"in deduct credit >>>{updated_profile=}")
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
                values = {"profile_credit": users.c.profile_credit - 1 }
        logger.debug(f"{values=}")
        update_query = users.update().values(values).where(users.c.id == user.id)
        logger.debug(f"{update_query=}")

        if not (
                row := await database.execute(update_query
                                              )
        ):
            logger.debug(f"updated....{row=}")
            logger.warning("Invalid Query Results")
            return None
        return row
    except HTTPException as e:
        raise e
    except Exception as e:

        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error Querying Database"
        )

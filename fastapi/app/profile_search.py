import json
import sys
import uuid
from datetime import datetime
from typing import List, Dict

from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from pydantic import BaseModel, conlist

from app.database import search_history, database, profile_search
from app.users import fastapi_users

router = APIRouter(prefix="/profile/search", tags=["Profile Search"])


class ProfileSearchAddRequest(BaseModel):
    search_type: str
    hash_key: str
    search_results: conlist(item_type=Dict, min_items=1)


class ProfileSearchAddResponse(BaseModel):
    id: str

class ProfileSearchResponse(BaseModel):
    id: str
    user_id: str
    search_type: str
    hash_key: str
    search_results: List[Dict]
    created_on: datetime


@router.get("/get/{hash_key}", response_model=ProfileSearchResponse)
async def get_profile_search_by_hash_key(
        hash_key: str, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{hash_key=}, {user=}")
    try:
        query = (
            f"SELECT * FROM profile_search WHERE hash_key = :hash_key AND user_id = :user_id"
        )

        if not (
                row := await database.fetch_one(
                    query=query, values={"hash_key": hash_key, "user_id": str(user.id)}
                )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{row=}")

        processed_row = dict(row)
        processed_row["search_results"] = json.loads(processed_row["search_results"])

        return ProfileSearchResponse(**processed_row)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )


@router.get("/all")
async def get_all_profile_search(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"{user=}")
    try:
        query = f"SELECT * FROM profile_search WHERE user_id = :user_id"

        if not (
                rows := await database.fetch_all(
                    query=query, values={"user_id": str(user.id)}
                )
        ):

            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        rows = [dict(x) for x in rows if x]
        print("rows>>>>", rows, type(rows))

        return rows

    except HTTPException as e:
        raise e
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )


@router.post("/add", response_model=ProfileSearchAddResponse)
async def add_profile_search(
        request: ProfileSearchAddRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:
        query = f"SELECT * FROM profile_search WHERE hash_key = :hash_key AND user_id = :user_id"

        if (
                rows := await database.fetch_all(
                    query=query, values={"hash_key": str(request.hash_key),"user_id": str(user.id)}
                )
        ):
            print("rows>>>>", rows)
            logger.warning("Record Already Exist")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="Record Already Exist"
            )

        id = str(uuid.uuid4())
        print("HashKey>>>",request.hash_key, type(request.hash_key))
        query = profile_search.insert().values(
            id=id,
            user_id=str(user.id),
            search_type=request.search_type,
            hash_key=request.hash_key,
            search_results=str(json.dumps(request.search_results)),
            created_on=datetime.utcnow(),
        )

        logger.debug(f"{query=}")

        if not (
                row_id := await database.execute(query)
        ):
            logger.warning("Bad Request")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Bad Request"
            )

        logger.debug(f"{row_id=}")

        return ProfileSearchAddResponse(id=id)
    except HTTPException as e:
        raise e
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )

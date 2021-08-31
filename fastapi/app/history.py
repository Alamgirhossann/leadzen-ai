import json
import uuid
from datetime import datetime
from typing import List, Dict

from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from pydantic import BaseModel, conlist

from app.database import search_history, database
from app.users import fastapi_users

router = APIRouter(prefix="/history", tags=["Search History"])


class SearchHistoryAddRequest(BaseModel):
    search_id: str = str(uuid.uuid4())
    search_type: str
    search_term: str
    search_results: conlist(item_type=Dict, min_items=1)


class SearchHistoryAddResponse(BaseModel):
    search_id: str


class SearchHistoryGetMultipleRequest(BaseModel):
    search_ids: conlist(item_type=str, min_items=1)


class SearchHistoryShortResponse(BaseModel):
    id: str
    user_id: str
    search_type: str
    search_term: str
    profile_count: int
    email_count: int
    created_on: datetime


class SearchHistoryFullResponse(BaseModel):
    id: str
    user_id: str
    search_type: str
    search_term: str
    search_results: List[Dict]
    created_on: datetime


@router.get("/id/{search_id}", response_model=SearchHistoryFullResponse)
async def get_search_history_by_id(
        search_id: str, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{search_id=}, {user=}")
    try:
        query = (
            f"SELECT * FROM search_history WHERE id = :search_id AND user_id = :user_id"
        )

        if not (
                row := await database.fetch_one(
                    query=query, values={"search_id": search_id, "user_id": str(user.id)}
                )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{row=}")

        processed_row = dict(row)
        processed_row["search_results"] = json.loads(processed_row["search_results"])

        return SearchHistoryFullResponse(**processed_row)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )


# @router.post("/ids", response_model=List[SearchHistoryFullResponse])
# async def get_search_history_by_multiple_ids(
#     request: SearchHistoryGetMultipleRequest,
#     user=Depends(fastapi_users.get_current_active_user),
# ):
#     logger.debug(f"{request=}, {user=}")
#     try:
#         search_ids = ", ".join(["'" + x + "'" for x in request.search_ids])
#         query = (
#             f"SELECT * FROM search_history WHERE id IN ({search_ids}) AND "
#             "user_id = :user_id"
#         )
#
#         logger.debug(f"{query=}")
#         if not (
#             rows := await database.fetch_all(
#                 query=query,
#                 values={
#                     "user_id": str(user.id),
#                 },
#             )
#         ):
#             logger.warning("Invalid Query Results")
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
#             )
#
#         logger.debug(f"{rows=}")
#
#         processed_rows = [dict(x) for x in rows]
#         processed_rows = [
#             x | {"search_results": json.loads(x["search_results"])}
#             for x in processed_rows
#         ]
#
#         return [SearchHistoryFullResponse(**x) for x in processed_rows if x]
#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         logger.critical(f"Exception Querying Database: {str(e)}")
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
#         )

async def conv_list_to_str(values: list, data: list):
    for val in values:
        if isinstance(val, list):
            await conv_list_to_str(val, data)
        elif val:
            if isinstance(val, dict):
                if val:
                    for k, v in val.items():
                        val = str(v)
            data.append(val)


@router.get("/all", response_model=List[SearchHistoryShortResponse])
async def get_all_search_history(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"{user=}")
    try:
        query = "SELECT * FROM search_history WHERE user_id = :user_id ORDER BY id DESC"

        if not (
                rows := await database.fetch_all(
                    query=query, values={"user_id": str(user.id)}
                )
        ):

            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )
        rows = [dict(x) for x in rows]

        for obj in rows:
            if not obj:
                continue
            search_id = obj['id']
            try:

                search_term: list = json.loads(obj['search_term']).values()
                search_term_ls = []

                await conv_list_to_str(search_term, search_term_ls)
                if search_term:
                    obj["search_term"] = ", ".join(search_term_ls)
            except Exception as err:
                logger.critical("JException "+ str(err))
                obj["search_term"] = ""

            query_profile_count = "SELECT COUNT(DISTINCT(search_index)) as profile_count FROM profile_credit_history  WHERE  user_id = :user_id AND search_id =:search_id "

            if not (
                    profile := await database.fetch_all(
                        query=query_profile_count, values={"user_id": str(user.id), "search_id": search_id}
                    )
            ):
                logger.debug("rows>>>>", profile)
                logger.warning("Invalid Query Results")
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
                )

            query_email_count = "SELECT COUNT(DISTINCT (search_index)) as email_count FROM email_credit_history  WHERE  user_id = :user_id AND search_id =:search_id "

            if not (
                    email := await database.fetch_all(
                        query=query_email_count, values={"user_id": str(user.id), "search_id": search_id}
                    )
            ):
                logger.debug("rows1>>>>", email, "rows>>>>>", profile)
                logger.warning("Invalid Query Results")
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
                )
            processed_rows_email = [item for x in email for item in x]
            processed_rows_profile = [item for x in profile for item in x]
            obj['email_count'] = processed_rows_email[0]
            obj['profile_count'] = processed_rows_profile[0]
            logger.debug(f"{processed_rows_email[0]=}>>>{processed_rows_profile[0]=}")

        return [SearchHistoryShortResponse(**x) for x in rows if x]

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )


@router.post("/add", response_model=SearchHistoryAddResponse)
async def add_search_history(
        request: SearchHistoryAddRequest,
        user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:
        query = search_history.insert().values(
            id=request.search_id,
            user_id=str(user.id),
            search_type=request.search_type,
            search_term=request.search_term,
            search_results=str(json.dumps(request.search_results)),
            created_on=datetime.utcnow(),
        )

        logger.debug(f"{query=}")

        row_id = await database.execute(query)

        logger.debug(f"{row_id=}")

        return SearchHistoryAddResponse(search_id=request.search_id)
    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )

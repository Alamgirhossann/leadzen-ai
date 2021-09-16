import json
import uuid
from datetime import datetime
from typing import List, Dict

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from loguru import logger
from pydantic import BaseModel

from app.database import database, search_saved, search_saved_name
from app.users import fastapi_users

router = APIRouter(prefix="/save_list", tags=["Search SaveList"])


class SaveListRequest(BaseModel):
    save_list_name: str
    save_list_results: Dict
    search_type: str


class SaveListResponse(BaseModel):
    save_list_id: str


class SaveListFullResponse(BaseModel):
    save_list_results: List


class SaveListRequestName(BaseModel):
    save_list_name: str


@router.post("/add", response_model=SaveListResponse)
async def add_search_save_list(
    request: SaveListRequest,
    background_tasks: BackgroundTasks,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")
    id = str(uuid.uuid4())
    try:
        query = search_saved.insert().values(
            id=id,
            save_list_name=request.save_list_name,
            user_id=str(user.id),
            search_type=request.search_type,
            save_list_results=json.dumps(request.save_list_results),
            created_on=datetime.utcnow(),
        )

        logger.debug(f"{query=}")

        row_id = await database.execute(query)
        values = {"created_on": datetime.utcnow()}
        update_query = (
            search_saved_name.update()
            .values(values)
            .where(search_saved_name.c.save_list_name == request.save_list_name)
        )
        if not (row := await database.execute(update_query)):
            logger.debug(f"updated....{row=}")
            logger.warning("Invalid Query Results")
        logger.debug(f"{row_id=}")
        return SaveListResponse(save_list_id=id)
    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.delete("/id/{save_list_id}", response_model=SaveListResponse)
async def delete_save_list_by_id(
    save_list_id: str, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{save_list_id=}, {user=}")
    try:
        query = (
            f"DELETE FROM search_saved WHERE id = :save_list_id AND user_id = :user_id"
        )
        if not (
            row := await database.execute(
                query=query,
                values={"save_list_id": save_list_id, "user_id": str(user.id)},
            )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{row=}")

        logger.debug(f"{query=}")

        return SaveListResponse(save_list_id=row.id)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )


@router.get("/all")
async def get_all_save_list(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"{user=}")
    try:
        query = "SELECT * FROM search_saved WHERE user_id = :user_id ORDER BY created_on DESC"

        if not (
            rows := await database.fetch_all(
                query=query, values={"user_id": str(user.id)}
            )
        ):
            print("rows>>>>", rows)
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{rows=}")
        processed_rows = [dict(x) for x in rows]
        for x in processed_rows:
            x["save_list_results"] = json.loads(x["save_list_results"])
        # return SaveListFullResponse(save_list_results=processed_rows)
        return processed_rows
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )


@router.post("/add_name", response_model=SaveListResponse)
async def add_search_save_list_name(
    request: SaveListRequestName,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")
    id = str(uuid.uuid4())
    try:
        query = search_saved_name.insert().values(
            id=id,
            user_id=str(user.id),
            save_list_name=request.save_list_name,
            created_on=datetime.utcnow(),
        )

        logger.debug(f"{query=}")

        row_id = await database.execute(query)

        logger.debug(f"{row_id=}")

        return SaveListResponse(save_list_id=id)
    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.get("/all_name")
async def get_all_save_list_name(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"{user=}")
    try:
        query = "SELECT save_list_name FROM search_saved_name WHERE user_id = :user_id ORDER BY created_on DESC"

        if not (
            rows := await database.fetch_all(
                query=query, values={"user_id": str(user.id)}
            )
        ):
            print("rows>>>>", rows)
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{rows=}")
        processed_rows = [dict(x) for x in rows]
        return processed_rows
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )

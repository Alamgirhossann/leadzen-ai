import json
import uuid
from datetime import datetime
from typing import List, Dict, Optional

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from loguru import logger
from pydantic import BaseModel

from app.database import database, search_saved
from app.users import fastapi_users

router = APIRouter(prefix="/save_list", tags=["Search SaveList"])


class SaveListRequest(BaseModel):
    list_name: str
    save_list_results: Dict
    search_type: str


class SaveListResponse(BaseModel):
    save_list_id: str


class SaveListFullResponse(BaseModel):
    save_list_results: List


class SaveListRequestName(BaseModel):
    list_name: str


class SaveListRequestUpdate(BaseModel):
    prev_list_name: str
    new_list_name: Optional[str]
    list_description: Optional[str]


@router.post("/add", response_model=SaveListResponse)
async def add_search_save_list(
    request: SaveListRequest,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")
    id = str(uuid.uuid4())
    try:
        if not request.list_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Name"
            )
        query = search_saved.insert().values(
            id=id,
            list_name=request.list_name,
            user_id=str(user.id),
            search_type=request.search_type,
            save_list_results=json.dumps(request.save_list_results),
            created_on=datetime.utcnow(),
        )
        logger.debug(f"{query=}")
        row_id = await database.execute(query)
        logger.debug(f"{row_id=}")
        return SaveListResponse(save_list_id=id)
    except HTTPException as e:
        raise e
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
        if not request.list_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Name"
            )
        query = search_saved.insert().values(
            id=id,
            list_name=request.list_name,
            user_id=str(user.id),
            created_on=datetime.utcnow(),
        )
        logger.debug(f"{query=}")
        row_id = await database.execute(query)
        logger.debug(f"{row_id=}")
        return SaveListResponse(save_list_id=id)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.get("/all_name_description")
async def get_all_save_list_name_description(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"{user=}")
    try:
        query = "SELECT DISTINCT list_name,list_description FROM search_saved WHERE user_id = :user_id ORDER BY created_on DESC"

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


@router.post("/update", response_model=SaveListResponse)
async def update_search_save_list(
    request: SaveListRequestUpdate,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")
    id = str(uuid.uuid4())
    try:
        if not request.new_list_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Name"
            )
        values = {
            "list_name": request.new_list_name,
            "name_description": request.list_description,
        }
        update_query_name = (
            search_saved.update()
            .values(values)
            .where(
                search_saved.c.list_name == request.prev_list_name
                and search_saved.c.user_id == request.user_id
            )
        )
        if not (row := await database.execute(update_query_name)):
            logger.debug(f"updated....{row=}")
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )
        return SaveListResponse(save_list_id=id)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Updating to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Updating Name to Database",
        )


@router.delete("/by_name/{name}", response_model=SaveListResponse)
async def delete_save_list_by_name(
    list_name: str, user=Depends(fastapi_users.get_current_active_user)
):
    try:
        query_name = f"DELETE FROM search_saved WHERE list_name = :list_name AND user_id = :user_id"
        if not (
            row := await database.execute(
                query=query_name,
                values={"list_name": list_name, "user_id": str(user.id)},
            )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        return SaveListResponse(save_list_id=row)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Querying Database"
        )

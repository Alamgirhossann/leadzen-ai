import json
import uuid
from datetime import datetime
from typing import List, Dict, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from pydantic import BaseModel

from app.database import database, saved_list
from app.users import fastapi_users

router = APIRouter(prefix="/saved_list", tags=["Saved Lists"])


class SavedListAddRequest(BaseModel):
    list_name: str
    list_description: Optional[str] = None
    content: Dict
    search_type: str


class SavedListUpdateRequest(BaseModel):
    list_name: Optional[str] = None
    list_description: Optional[str] = None
    content: Optional[Dict] = None
    search_type: Optional[str] = None


class SavedListResponse(BaseModel):
    id: str


class SavedListAddNameRequest(BaseModel):
    list_name: str
    list_description: Optional[str] = None


class SavedListName(BaseModel):
    id: str
    list_name: str
    list_description: Optional[str] = None


@router.post("/add", response_model=SavedListResponse)
async def add_to_saved_list(
    request: SavedListAddRequest,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    saved_list_id = str(uuid.uuid4())

    try:
        query = saved_list.insert().values(
            id=saved_list_id,
            list_name=request.list_name,
            user_id=str(user.id),
            search_type=request.search_type,
            list_content=json.dumps(request.content),
            list_description=request.list_description or "",
            created_on=datetime.utcnow(),
        )

        logger.debug(f"{query=}")

        row_id = await database.execute(query)

        logger.debug(f"{row_id=}")

        return SavedListResponse(id=saved_list_id)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.delete("/id/{saved_list_id}", response_model=SavedListResponse)
async def delete_saved_list_by_id(
    saved_list_id: str, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{saved_list_id=}, {user=}")
    try:
        query = (
            f"DELETE FROM saved_list WHERE id = :saved_list_id AND user_id = :user_id"
        )

        logger.debug(f"{query=}")

        if not (
            row := await database.execute(
                query=query,
                values={"saved_list_id": saved_list_id, "user_id": str(user.id)},
            )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{row=}")

        return SavedListResponse(id=saved_list_id)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Deleting from Database",
        )


@router.get("/id/{saved_list_id}")
async def get_saved_list_by_id(
    saved_list_id: str, user=Depends(fastapi_users.get_current_active_user)
):
    logger.debug(f"{user=}, {saved_list_id=}")

    try:
        query = "SELECT * FROM saved_list WHERE id = :saved_list_id AND user_id = :user_id ORDER BY created_on DESC"

        if not (
            row := await database.fetch_one(
                query=query,
                values={
                    "saved_list_id": saved_list_id,
                    "user_id": str(user.id),
                },
            )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{row=}")

        processed_row = dict(row)

        if processed_row["list_content"]:
            processed_row["list_content"] = json.loads(processed_row["list_content"])

        return processed_row
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )


@router.get("/all")
async def get_all_saved_lists(user=Depends(fastapi_users.get_current_active_user)):
    logger.debug(f"{user=}")

    try:
        query = (
            "SELECT * FROM saved_list WHERE user_id = :user_id ORDER BY created_on DESC"
        )

        if not (
            rows := await database.fetch_all(
                query=query, values={"user_id": str(user.id)}
            )
        ):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(type(rows[0]))

        processed_rows = [dict(x) for x in rows]
        processed_data = []
        for x in processed_rows:
            if x["list_content"]:
                x["list_content"] = json.loads(x["list_content"])

        logger.debug(f"{processed_rows=}")

        return processed_rows
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )


@router.post("/add_name", response_model=SavedListResponse)
async def add_saved_list_name(
    request: SavedListAddNameRequest,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    saved_list_id = str(uuid.uuid4())

    try:
        query = saved_list.insert().values(
            id=saved_list_id,
            list_name=request.list_name,
            list_description=request.list_description or "",
            user_id=str(user.id),
            created_on=datetime.utcnow(),
        )

        logger.debug(f"{query=}")

        row_id = await database.execute(query)
        logger.debug(f"{row_id=}")

        return SavedListResponse(id=saved_list_id)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Inserting to Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Inserting to Database",
        )


@router.get("/all/names", response_model=List[SavedListName])
async def get_all_saved_list_names(
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{user=}")

    try:
        query = (
            "SELECT DISTINCT id, list_name,list_description FROM saved_list WHERE user_id = :user_id ORDER BY "
            "created_on DESC "
        )

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

        logger.debug(processed_rows)

        return [SavedListName(**x) for x in processed_rows]
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Querying Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Querying Database",
        )


@router.patch("/id/{saved_list_id}", response_model=SavedListResponse)
async def update_search_save_list(
    saved_list_id: str,
    request: SavedListUpdateRequest,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{request=}, {user=}")

    try:
        values = {}

        if request.list_name:
            values["list_name"] = request.list_name

        if request.list_description:
            values["list_description"] = request.list_description

        if request.content:
            query = "SELECT list_content FROM saved_list WHERE  id = :id and user_id = :user_id "

            if not (
                rows := await database.fetch_all(
                    query=query, values={"id": saved_list_id, "user_id": str(user.id)}
                )
            ):
                logger.warning("Invalid Query Results")
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
                )
            if rows[0][0]:
                list_data = json.loads(rows[0][0])
                list_data.insert(0, request.content)

                values["list_content"] = json.dumps(list_data)
            else:
                list_data = []
                list_data.append(request.content)
                values["list_content"] = json.dumps(list_data)

        if request.search_type:
            values["search_type"] = request.search_type

        update_query = (
            saved_list.update()
            .values(values)
            .where(
                saved_list.c.id == saved_list_id
                and saved_list.c.user_id == str(user.id)
            )
        )

        if not (row := await database.execute(update_query)):
            logger.warning("Invalid Query Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Query Result"
            )

        logger.debug(f"{row=}")

        return SavedListResponse(id=saved_list_id)
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(f"Exception Patching in Database: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Patching in Database",
        )

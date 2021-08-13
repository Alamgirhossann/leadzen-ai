import asyncio
import tempfile
from typing import Dict

import pandas as pd
from fastapi import APIRouter, HTTPException, UploadFile, File, BackgroundTasks, Depends
from loguru import logger
from starlette import status

from app.config import (
    API_CONFIG_MAX_RECORDS_UPLOADED_PER_CALL,
    API_CONFIG_ALLOWED_CONTENT_TYPES,
)
from app.elasticsearch.database import add as database_add
from app.elasticsearch.database import delete as database_delete
from app.elasticsearch.database import delete_index as database_delete_index
from app.elasticsearch.database import query as database_query
from app.elasticsearch.database import get as database_get
from app.elasticsearch.database import search as database_search
from app.elasticsearch.requests import (
    ElasticsearchAddRequest,
    ElasticsearchQueryRequest,
)
from app.requests import (
    ContactAddRequest,
    ContactSearchResponse,
    ContactSearchRequest,
    ContactDeleteRequest,
    ContactIndexDeleteRequest,
)
from app.security import get_current_username
from app.utils import (
    clean_and_convert_to_dataframe,
    spread_comma_seperated_texts,
    check_for_mandatory_columns,
)

router = APIRouter()


@router.post("/add", response_model=bool)
async def add_contacts(
    request: ContactAddRequest, username: str = Depends(get_current_username)
):
    assert username
    df = clean_and_convert_to_dataframe(request=request)
    if df is None or df.empty:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Data To Add In Request",
        )

    if not (
        response := await database_add(
            request=ElasticsearchAddRequest(
                index_name=request.index_name, records=df.to_dict(orient="records")
            )
        )
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Error Adding Contacts to Database",
        )

    return response


@router.delete("/delete", response_model=bool)
async def delete_contact(
    request: ContactDeleteRequest, username: str = Depends(get_current_username)
):
    assert username
    if not (response := await database_delete(request=request)):
        logger.error(f"Error Deleting Contact: {request=}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Error Deleting Contacts",
        )

    logger.success(f"Deleted Contact: {request=}")

    return response


@router.delete("/delete_index", response_model=bool)
async def delete_index(
    request: ContactIndexDeleteRequest, username: str = Depends(get_current_username)
):
    assert username
    if not (response := await database_delete_index(request=request)):
        logger.error(f"Error Deleting Contact Index: {request=}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Error Deleting Contact Index",
        )

    logger.success(f"Deleted Contact Index: {request=}")

    return response


@router.post("/query", response_model=ContactSearchResponse)
async def search_in_contacts_using_dsl(
    request: ContactSearchRequest, username: str = Depends(get_current_username)
):
    assert username
    logger.debug(f"{request=}")

    if not (
        results := await database_query(
            request=ElasticsearchQueryRequest(
                index_name=request.index_name, query=request.dsl, limit=request.limit
            )
        )
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No Query Results"
        )

    logger.debug(f"{len(results)=}")
    logger.debug(results)

    return ContactSearchResponse(results=results)


@router.post("/upload", response_model=bool)
async def upload_csv_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    username: str = Depends(get_current_username),
):
    assert username
    if file.content_type not in API_CONFIG_ALLOWED_CONTENT_TYPES:
        logger.warning(
            f"Uploaded File does not contain CSV Content: {file.content_type=}, {API_CONFIG_ALLOWED_CONTENT_TYPES=}"
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded File does not contain CSV Content",
        )

    if not file.filename.endswith(".csv"):
        logger.warning(f"Not a CSV File: {file.filename=}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded File is Not a CSV File",
        )

    # this is due to a known defect in the SpooledTemporary file library
    # as it dont implement the readable interface that pandas needs to read data
    # so i make a copy of the spooled temp file into a regular temp file
    # and then use it for pandas to read, and since both these files are temp files
    # they will vanish as soon as close as called, hence using the with context manager
    with tempfile.TemporaryFile() as temp_file:
        lines = file.file.readlines()
        temp_file.writelines(lines)
        temp_file.seek(0)
        df = pd.read_csv(temp_file)

        logger.debug(df.head())

        if df is None or df.empty:
            logger.warning("No Data in uploaded file")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No Data in Uploaded File",
            )

        if not check_for_mandatory_columns(df):
            logger.warning("Mandatory Columns Missing")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Mandatory Columns Missing",
            )

        df = spread_comma_seperated_texts(df=df)
        df.fillna("", inplace=True)

        # the addition of records needs to be split to avoid the 429 errors the client can add records at blazing
        # speeds but the elasticsearch cluster cannot handle it depending on the its config, if there are more nodes
        # in the cluster it may be able to handle more additions in parallel but for now a 10k records added per
        # works well
        for p, v in enumerate(
            range(0, len(df), API_CONFIG_MAX_RECORDS_UPLOADED_PER_CALL)
        ):
            df_slice = df[v : v + API_CONFIG_MAX_RECORDS_UPLOADED_PER_CALL]

            logger.warning(
                f"{p+1} Database Operation(s) is Queued to Run in Background"
            )

            background_tasks.add_task(
                database_add,
                request=ElasticsearchAddRequest(
                    index_name=f"analystt.{file.filename}",
                    records=df_slice.to_dict(orient="records"),
                ),
            )

            # this sleep is needed to prevent yet more 429 errors
            background_tasks.add_task(
                asyncio.sleep,
                delay=30 * 1,
            )

        return True


@router.get("/get/{index}/{id}", response_model=Dict)
async def get_contact_by_id(
    index: str, id: str, username: str = Depends(get_current_username)
):
    assert username
    if not (response := await database_get(index=index, id=id)):
        logger.error(f"Error Getting Contact, {index=} {id=}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Error Getting Contact",
        )

    logger.success(f"Got Contact: {response=}")

    return response


@router.get("/search/{text}", response_model=ContactSearchResponse)
async def search_contact_by_text(
    text: str,
    index: str = "analystt.*",
    limit: int = 10,
    username: str = Depends(get_current_username),
):
    assert username

    logger.debug(f"{index=}, {id=}")

    if not (results := await database_search(index=index, query=text, limit=limit)):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No Search Results"
        )

    logger.debug(f"{len(results)=}")
    logger.debug(results)

    return ContactSearchResponse(results=results)

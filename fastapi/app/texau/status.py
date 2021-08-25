import asyncio
from typing import Dict, Optional, List

import httpx
from fastapi import HTTPException
from loguru import logger
from starlette import status

from app.config import (
    API_CONFIG_TEXAU_KEY,
    API_CONFIG_TEXAU_EXECUTION_URL,
    API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL,
)
from app.texau.common import TexAuResult


async def get_status_once(execution_id: str) -> TexAuResult:
    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
                "Content-Type": "application/json",
            }

            response = await client.get(
                f"{API_CONFIG_TEXAU_EXECUTION_URL}{execution_id}", headers=headers
            )

            if response.status_code != 200:
                logger.warning(f"invalid {response.status_code=}")
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Invalid Response, {execution_id=}",
                )

            if not (data := response.json()):
                logger.warning(f"no data {response.status_code=}")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Invalid Data, {execution_id=}",
                )

            if (
                data["execution"]["status"] == "completed"
                and data["execution"].get("output") is not None
            ):
                logger.success(f"Got Task Results: {data.keys()=}, {execution_id=}")

                if not isinstance(data["execution"]["output"], list):
                    return TexAuResult(data=[data["execution"]["output"]])

                return TexAuResult(data=data["execution"]["output"])
            elif data["execution"]["status"] == "cookieError":
                logger.error(f"Cookie Error, Cannot Proceed, {execution_id=}")
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Cookie Error, Cannot Proceed, {execution_id=}",
                )
            else:
                logger.warning(f'{data["execution"]["status"]=}, {execution_id=}')
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No Results Found, {execution_id=}",
                )
    except HTTPException as e:
        logger.warning(f"HTTPException re-raised")
        raise e
    except Exception as e:
        logger.critical(f"Exception Getting Task Status: {execution_id=}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Exception Getting Task Status, {execution_id=}",
        )


async def get_status_waiting(
    execution_id: str, max_timeout_counter: int = 18
) -> Optional[TexAuResult]:
    if not execution_id:
        logger.warning("invalid execution id")
        return None

    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
                "Content-Type": "application/json",
            }

            timeout_counter = max_timeout_counter

            while timeout_counter > 0:
                response = await client.get(
                    f"{API_CONFIG_TEXAU_EXECUTION_URL}{execution_id}", headers=headers
                )

                if response.status_code == 200:
                    if data := response.json():
                        if (
                            data["execution"]["status"] == "completed"
                            and data["execution"].get("output") is not None
                        ):
                            logger.success(
                                f"Got Task Results: {data.keys()=}, {execution_id=}"
                            )

                            if not isinstance(data["execution"]["output"], list):
                                return TexAuResult(data=[data["execution"]["output"]])

                            return TexAuResult(data=data["execution"]["output"])
                        elif data["execution"]["status"] == "cookieError":
                            logger.error(
                                f"Cookie Error, Cannot Proceed, {execution_id=}"
                            )
                            return None
                        else:
                            logger.warning(
                                f'{data["execution"]["status"]=}, {execution_id=}'
                            )

                await asyncio.sleep(API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL)

                timeout_counter = timeout_counter - 1

            logger.warning(
                f"No results in {max_timeout_counter * API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL}s"
            )

            return None
    except Exception as e:
        logger.critical(f"Exception Getting Task Status: {execution_id=}: {str(e)}")
        return None

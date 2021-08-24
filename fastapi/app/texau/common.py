import asyncio
import csv
from typing import Optional, Dict, List

import httpx
from loguru import logger
from pydantic import BaseModel

from app.config import (
    API_CONFIG_LINKEDIN_CSV_FILE,
    API_CONFIG_TEXAU_KEY,
    API_CONFIG_TEXAU_EXECUTION_URL,
    API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL,
)


def read_linkedin_cookie() -> Optional[str]:
    cookie = None

    with open(f"./{API_CONFIG_LINKEDIN_CSV_FILE}", "r") as file:
        csv_reader = csv.reader(file)
        for line in csv_reader:
            if csv_reader.line_num == 2:
                cookie = line[0]
                logger.debug(cookie, "cookie")

    return cookie


async def check_execution_status(
    execution_id: str, max_timeout_counter: int = 18
) -> Optional[Dict]:
    if not execution_id:
        logger.warning("Invalid task_id")
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
                                f"Got Task Results: {data=}, {execution_id=}"
                            )
                            return data["execution"]["output"]
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


class TexAuResponse(BaseModel):
    data: Optional[List[Dict]] = None

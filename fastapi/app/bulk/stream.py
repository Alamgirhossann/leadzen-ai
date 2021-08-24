import asyncio
import json
import os
from datetime import datetime

from loguru import logger
from starlette.requests import Request

from app.config import API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL


async def status_event_generator(
    filename: str, request: Request, max_timeout_in_seconds: int = 90
):
    if not filename:
        yield {
            "event": "end",
            "data": json.dumps(
                {
                    "filename": filename,
                    "ready": False,
                    "errored": True,
                    "url": None,
                }
            ),
        }

    start_time = datetime.now()

    while True:
        if await request.is_disconnected():
            logger.debug("Request disconnected")
            break

        if (datetime.now() - start_time).total_seconds() > max_timeout_in_seconds:
            yield {
                "event": "end",
                "data": json.dumps(
                    {
                        "filename": filename,
                        "ready": False,
                        "errored": True,
                        "url": None,
                    }
                ),
            }
            break

        if os.path.exists(filename):
            logger.success(f"found {filename=}")
            yield {
                "event": "end",
                "data": json.dumps(
                    {
                        "filename": filename,
                        "ready": True,
                        "errored": False,
                        "url": filename.removeprefix("."),
                    }
                ),
            }
            break
        else:
            logger.warning(f"{filename=} not found, waiting")
            yield {
                "event": "update",
                "data": json.dumps(
                    {
                        "filename": filename,
                        "ready": False,
                        "errored": False,
                        "url": None,
                    }
                ),
            }

        await asyncio.sleep(API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL)

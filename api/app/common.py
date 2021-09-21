from typing import Dict, Optional

import httpx
from fastapi import Request, HTTPException, status
from loguru import logger


async def send_request_to_internal_server(
    url: str,
    incoming_request: Request,
    app_request: Optional[Dict] = None,
    request_type: str = "POST",
) -> Dict:
    if not url or not incoming_request:
        logger.warning("Bad Request")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    if not app_request and request_type == "POST":
        logger.warning("Bad Request")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    logger.debug(f"{url=}")
    logger.debug(f"{app_request}")

    if not (auth_header := incoming_request.headers.get("authorization")):
        logger.warning("Unauthorized")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    logger.debug(f"{auth_header=}")

    async with httpx.AsyncClient() as client:
        if request_type == "POST":
            response = await client.post(
                url,
                json=app_request,
                headers={"Authorization": auth_header},
            )
        elif request_type == "GET":
            response = await client.get(
                url,
                headers={"Authorization": auth_header},
            )
        else:
            logger.warning("Invalid Method")
            raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED)

    if not response:
        logger.error("Invalid Response")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if response.status_code != 200:
        logger.error(f"Invalid Response State: {response.status_code=}")
        raise HTTPException(status_code=response.status_code)

    # logger.debug(f"{response.json()=}")
    return response.json()

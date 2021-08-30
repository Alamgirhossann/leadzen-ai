import json
from typing import Dict, Optional

import httpx
from loguru import logger

from app.config import API_CONFIG_TEXAU_KEY, API_CONFIG_TEXAU_URL


async def send_spice_request(data: Dict) -> Optional[str]:
    logger.debug(f"{data=}")
    payload = json.dumps(data)
    headers = {
        "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_TEXAU_URL, headers=headers, data=payload
            )

            if response.status_code != 200:
                logger.error(
                    f"Invalid Status Code: {response.status_code=}, {response.text=}"
                )
                return None

            if not (data := response.json()):
                logger.error(f"Invalid Data")
                return None

            if not (execution_id := data.get("executionId")):
                logger.error(f"Invalid Data")
                return None

            return execution_id
    except Exception as e:
        logger.critical(f"Exception sending to texau: {str(e)}")
        return None

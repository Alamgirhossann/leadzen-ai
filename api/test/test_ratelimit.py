import asyncio

import httpx
import pytest

from app.pipl import PiplRequest, PiplName
from test.common import app, TEST_CONFIG_HEADERS
from loguru import logger


@pytest.mark.asyncio
async def test_rate_limit(app):
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        coroutines = [
            client.post(
                "/api/people/search",
                json=PiplRequest(
                    email="raveen.b@gmail.com", name=PiplName(last_name="Beemsingh")
                ).dict(),
                headers=TEST_CONFIG_HEADERS,
            )
            for x in range(30)
        ]

        responses = await asyncio.gather(*coroutines)

        logger.debug(f"{responses=}")

        checks = [x.status_code == 429 for x in responses if x]

        logger.debug(f"{checks=}")

        assert any(checks)

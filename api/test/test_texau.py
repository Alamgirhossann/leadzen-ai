import asyncio
from typing import Optional

import httpx
import pytest
from loguru import logger

from app.texau import (
    TexAuFindLinkedInPostLikersRequest,
    TexAuExecutionResponse,
    TexAuFindLinkedInPostCommentersRequest,
    TexAuFindProfileRequest,
    TexAuFindCompanyProfileRequest,
    TexAuResult,
)
from test.common import (
    TEST_CONFIG_LINKEDIN_COOKIE,
    TEST_CONFIG_HEADERS,
    TEST_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL,
    TEST_CONFIG_LINKEDIN_POST,
    app,
)


async def wait_for_response(
    app, execution_id: str, max_timeout_counter: int = 24
) -> Optional[TexAuResult]:
    try:
        async with httpx.AsyncClient(app=app, base_url="http://test") as client:
            timeout_counter = max_timeout_counter

            while timeout_counter > 0:
                response = await client.get(
                    f"/api/linkedin/result/{execution_id}",
                    headers=TEST_CONFIG_HEADERS,
                )

                if response.status_code == 200:
                    if data := response.json():
                        logger.debug(data)
                        return data

                await asyncio.sleep(TEST_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL)

                timeout_counter = timeout_counter - 1

            logger.warning(
                f"No results in {max_timeout_counter * TEST_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL}s"
            )

            return None
    except Exception as e:
        logger.critical(f"Exception Getting Task Status: {execution_id=}: {str(e)}")
        return None


@pytest.mark.asyncio
async def test_linkedin_find_likers_of_linkedin_post(app):
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/linkedin/post_likers",
            json=TexAuFindLinkedInPostLikersRequest(
                url=TEST_CONFIG_LINKEDIN_POST,
                cookie=TEST_CONFIG_LINKEDIN_COOKIE,
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        json = response.json()
        assert json

        data = TexAuExecutionResponse(**json)
        assert data
        assert data.execution_id

        results = await wait_for_response(app=app, execution_id=data.execution_id)
        assert results


@pytest.mark.asyncio
async def test_linkedin_find_commenters_of_linkedin_post(app):
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/linkedin/post_commenters",
            json=TexAuFindLinkedInPostCommentersRequest(
                url=TEST_CONFIG_LINKEDIN_POST,
                cookie=TEST_CONFIG_LINKEDIN_COOKIE,
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        json = response.json()
        assert json

        data = TexAuExecutionResponse(**json)
        assert data
        assert data.execution_id

        results = await wait_for_response(app=app, execution_id=data.execution_id)
        assert results


@pytest.mark.asyncio
async def test_linkedin_find_matching_profiles(app):
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/linkedin/matching_profiles",
            json=TexAuFindProfileRequest(
                firstName="Raveen",
                lastName="Beemsingh",
                keywords="",
                cookie=TEST_CONFIG_LINKEDIN_COOKIE,
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        json = response.json()
        assert json

        data = TexAuExecutionResponse(**json)
        assert data
        assert data.execution_id


@pytest.mark.asyncio
async def test_linkedin_find_matching_companies(app):
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/linkedin/matching_profiles_for_company_url",
            json=TexAuFindCompanyProfileRequest(
                name="Wipro",
                cookie=TEST_CONFIG_LINKEDIN_COOKIE,
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        json = response.json()
        assert json

        data = TexAuExecutionResponse(**json)
        assert data
        assert data.execution_id

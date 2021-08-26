import httpx
import pytest

from app.main import app
from app.texau.common import TexAuExecutionResponse
from app.texau.linkedin.commenters import TexAuFindLinkedInPostCommentersRequest
from app.texau.linkedin.email import (
    TexAuFindEmailAndPhoneForLinkedInProfileRequest,
    TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)
from app.texau.linkedin.likers import TexAuFindLinkedInPostLikersRequest
from app.texau.status import get_status_waiting
from test.common import TEST_CONFIG_LINKEDIN_COOKIE, TEST_CONFIG_HEADERS


@pytest.mark.asyncio
async def test_texau_find_likers_of_linkedin_post():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/texau/linkedin/post_likers",
            json=TexAuFindLinkedInPostLikersRequest(
                url="https://www.linkedin.com/pulse/developing-digital-talent-toronto-ravi-kumar-s/?trackingId"
                "=iUSRpLE2Dt56CYpqppezgA%3D%3D",
                cookie=TEST_CONFIG_LINKEDIN_COOKIE,
            ).dict(),
        )

        assert response
        assert response.status_code == 200

        json = response.json()
        assert json

        data = TexAuExecutionResponse(**json)
        assert data
        assert data.execution_id

        results = await get_status_waiting(execution_id=data.execution_id)

        assert results


@pytest.mark.asyncio
async def test_texau_find_email_and_phone_for_linkedin_profile_url():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/texau/linkedin/email_for_profile_url",
            json=TexAuFindEmailAndPhoneForLinkedInProfileRequest(
                urls=[
                    "https://www.linkedin.com/in/sohammondal/",
                    "https://www.linkedin.com/in/luke-runacres/",
                    "https://www.linkedin.com/in/sohammondal/",
                    "https://www.linkedin.com/in/luke-runacres/",
                    "",
                ],
                cookie=TEST_CONFIG_LINKEDIN_COOKIE,
            ).dict(),
        )

        assert response
        assert response.status_code == 200

        json = response.json()
        assert json

        data = TexAuFindEmailAndPhoneForLinkedInProfileResponse(**json)
        assert data

        assert data.filename


@pytest.mark.asyncio
async def test_texau_find_commenters_of_linkedin_post():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/texau/linkedin/post_commenters",
            json=TexAuFindLinkedInPostCommentersRequest(
                url="https://www.linkedin.com/pulse/developing-digital-talent-toronto-ravi-kumar-s/?trackingId"
                "=iUSRpLE2Dt56CYpqppezgA%3D%3D",
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

        results = await get_status_waiting(execution_id=data.execution_id)

        assert results

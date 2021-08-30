import uuid

import httpx
import pytest

from app.credits import ProfileCreditAddRequest
from app.history import SearchHistoryAddRequest
from app.main import app
from test.common import TEST_CONFIG_HEADERS

search_id = str(uuid.uuid4())  # "d6e8d807-a4a2-4b17-9f9e-88dda4b75fd3"


@pytest.mark.asyncio
async def test_profile_credit_history_add():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/credits/profile/add",
            json=ProfileCreditAddRequest(
                search_id=search_id, phone_number="1234567890", search_index=0
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        data = response.json()
        assert data

        assert len(data) > 0


@pytest.mark.asyncio
async def test_profile_credit_history_get_all():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get(
            "/api/credits/profile/all",
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        data = response.json()
        assert data

        assert len(data) > 0


@pytest.mark.asyncio
async def test_profile_credit_get_by_id():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get(
            f"/api/credits/profile/search_id/{search_id}",
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        data = response.json()
        assert data

        assert len(data) > 0

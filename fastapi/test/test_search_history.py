import uuid

import httpx
import pytest

from app.history import SearchHistoryAddRequest
from app.main import app
from test.common import TEST_CONFIG_HEADERS

search_id = str(uuid.uuid4())  # "d6e8d807-a4a2-4b17-9f9e-88dda4b75fd3"


@pytest.mark.asyncio
async def test_search_history_add():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/history/add",
            json=SearchHistoryAddRequest(
                search_id=search_id,
                search_type="type1",
                search_term="search term",
                search_results=[{"a": "b"}, {"c": "d"}],
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        data = response.json()
        assert data

        assert len(data) > 0


@pytest.mark.asyncio
async def test_search_history_get_all():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get(
            "/api/history/all",
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        data = response.json()
        assert data

        assert len(data) > 0


@pytest.mark.asyncio
async def test_search_get_by_id():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get(
            f"/api/history/id/{search_id}",
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        data = response.json()
        assert data

        assert len(data) > 0

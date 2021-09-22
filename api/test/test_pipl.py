import httpx
import pytest

from app.pipl import PiplRequest, PiplName
from test.common import TEST_CONFIG_HEADERS, app


@pytest.mark.asyncio
async def test_people_search(app):
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/people/search",
            json=PiplRequest(
                email="raveen.b@gmail.com", name=PiplName(last_name="Beemsingh")
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

        assert response
        assert response.status_code == 200

        data = response.json()
        assert data

        assert len(data) > 0

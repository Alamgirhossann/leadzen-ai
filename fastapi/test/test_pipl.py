import httpx
import pytest

from app.main import app
from app.pipl.router import PiplRequest, PiplName
from test.common import TEST_CONFIG_HEADERS


@pytest.mark.asyncio
async def test_pipl_search():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/pipl/search",
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
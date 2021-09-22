import httpx
import pytest

from test.common import app
from app.pipl import PiplRequest, PiplName


@pytest.mark.asyncio
async def test_unauthorized(app):
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/people/search",
            json=PiplRequest(
                email="raveen.b@gmail.com", name=PiplName(last_name="Beemsingh")
            ).dict(),
        )

        assert response
        assert response.status_code == 401

from app.main import app_factory, app_startup, app_shutdown

TEST_CONFIG_LINKEDIN_COOKIE = "AQEDAQFGp0UEU2Z4AAABe7wVa2wAAAF8CMM_WE4AYlAdnWtJxqor6CPAKnADTri8WLhBtOI17pM59hkp-Supvkaqx_b3V0ibafU8EXACl-kpFaWzRlrXIzvaXE2nZfNMOIVBZtmiGIx53gLV8Rr0_D3v"
TEST_CONFIG_HEADERS = {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiODFmNjUwN2MtMWIxZi00ZjMxLWI2ZTYtZjM3Yzk1YjlhYTRhIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2MzIyMjg3NTl9.lQukjDtT-MO_1llRKrgl8IeTel3LfBWM7Aui_R7wHI4"
}
TEST_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL = 5
TEST_CONFIG_LINKEDIN_POST = (
    "https://www.linkedin.com/pulse/developing-digital-talent-toronto-ravi-kumar-s/?trackingId"
    "=iUSRpLE2Dt56CYpqppezgA%3D%3D"
)

import pytest


@pytest.fixture
async def app():
    app = app_factory()
    await app_startup(app)
    yield app
    await app_shutdown(app)

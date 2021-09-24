import asyncio

import httpx
import pytest

from app.main import app
from app.saved_list import (
    SavedListAddRequest,
    SavedListResponse,
    SavedListAddNameRequest,
    SavedListName,
)
from test.common import TEST_CONFIG_HEADERS


@pytest.mark.asyncio
async def test_saved_list_add_one():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/saved_list/add",
            json=SavedListAddRequest(
                list_name="A List Name",
                list_description="A List Description",
                content={"a": "b"},
                search_type="A Search Type",
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

    assert response
    assert response.status_code == 200

    json = response.json()
    assert json

    data = SavedListResponse(**json)
    assert data
    assert data.id


@pytest.mark.asyncio
async def test_saved_list_add_another():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/saved_list/add",
            json=SavedListAddRequest(
                list_name="Another List Name",
                list_description="Another List Description",
                content={"c": "d"},
                search_type="Another Search Type",
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

    assert response
    assert response.status_code == 200

    json = response.json()
    assert json

    data = SavedListResponse(**json)
    assert data
    assert data.id


@pytest.mark.asyncio
async def test_saved_list_add_name():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/saved_list/add_name",
            json=SavedListAddNameRequest(
                list_name="Yet Another List Name",
                list_description="Yet Another List Description",
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )

    assert response
    assert response.status_code == 200

    json = response.json()
    assert json

    data = SavedListResponse(**json)
    assert data
    assert data.id


@pytest.mark.asyncio
async def test_saved_list_get_all():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get(
            "/api/saved_list/all",
            headers=TEST_CONFIG_HEADERS,
        )

    assert response
    assert response.status_code == 200

    data = response.json()
    assert data
    assert isinstance(data, list)
    assert len(data) > 1


@pytest.mark.asyncio
async def test_saved_list_get_all_names():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get(
            "/api/saved_list/all/names",
            headers=TEST_CONFIG_HEADERS,
        )

    assert response
    assert response.status_code == 200

    data = response.json()
    assert data
    assert isinstance(data, list)
    assert len(data) > 1


@pytest.mark.asyncio
async def test_saved_list_delete():
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get(
            "/api/saved_list/all/names",
            headers=TEST_CONFIG_HEADERS,
        )

    assert response
    assert response.status_code == 200

    json_response = response.json()
    assert json_response
    assert isinstance(json_response, list)
    assert len(json_response) > 1

    data = [SavedListName(**x) for x in json_response]

    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        coroutines = [
            client.delete(
                f"/api/saved_list/id/{x.id}",
                headers=TEST_CONFIG_HEADERS,
            )
            for x in data
        ]

        responses = await asyncio.gather(*coroutines)

    assert responses
    assert any(responses)
    assert all([x.status_code == 200 for x in responses])

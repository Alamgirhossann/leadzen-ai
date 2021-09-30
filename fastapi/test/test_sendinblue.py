import asyncio

import httpx
import pytest
from app.bulk.router import BulkExportToExcelRequest
from test.common import TEST_CONFIG_HEADERS, app


@pytest.mark.asyncio
async def test_sendinblue_export_excel_sucess_mail(app):
    async with httpx.AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/bulk_upload/export/excel",
            json=BulkExportToExcelRequest(
                profile_urls=["https://www.linkedin.com/in/sauravbarun"],
                hash_key_list=[{"https://www.linkedin.com/in/sauravbarun": "1f798b31709c734b06bb2dc29941470de8e9862f9a292c7be72f6e062b5afd67"}],
            ).dict(),
            headers=TEST_CONFIG_HEADERS,
        )
    assert response
    assert response.status_code == 200





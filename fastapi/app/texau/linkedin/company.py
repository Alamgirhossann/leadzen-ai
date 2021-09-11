import uuid
from typing import Optional

from fastapi import HTTPException
from loguru import logger
from pydantic import BaseModel
from starlette import status

from app.config import (
    API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DETAILS_FUNC_ID,
    API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DETAILS_SPICE_ID,
)
from app.texau.common import TexAuExecutionResponse, TEXAU_PROXY
from app.texau.spice import send_spice_request


class TexAuFindLinkedInCompanyRequest(BaseModel):
    url: Optional[str] = None
    name: Optional[str] = None
    cookie: Optional[str] = None


async def handle_find_company_details(
        request: TexAuFindLinkedInCompanyRequest,
) -> Optional[TexAuExecutionResponse]:
    try:
        execution_id = await send_spice_request(
            data={
                "funcName": API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DETAILS_FUNC_ID,
                "spiceId": API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DETAILS_SPICE_ID,
                "inputs": {
                    "company": request.url,
                    "li_at": request.cookie,
                    "proxy": TEXAU_PROXY,
                },
                "executionName": str(uuid.uuid4()),
            }
        )

        if not execution_id:
            logger.warning("Invalid Task Id")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Task Id"),
            )

        logger.debug(f"{execution_id=}")

        return TexAuExecutionResponse(execution_id=execution_id)
    except HTTPException as e:
        logger.critical(str(e))
        raise e
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )


async def handle_find_email_and_phones_from_website(
        request: TexAuFindLinkedInCompanyRequest,
) -> Optional[TexAuExecutionResponse]:
    try:
        execution_id = await send_spice_request(
            data={
                "funcName": "texau-automation-2-dev-extractEmail",
                "spiceId": "5d5b9d2658ad5ac0f87fd3b7",
                "inputs": {
                    "li_at": request.cookie,
                    "urls": request.url,
                    "proxy": TEXAU_PROXY,
                },
                "executionName": str(uuid.uuid4()),
            }
        )

        if not execution_id:
            logger.warning("Invalid Task Id")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Task Id"),
            )

        logger.debug(f"{execution_id=}")

        return TexAuExecutionResponse(execution_id=execution_id)
    except HTTPException as e:
        logger.critical(str(e))
        raise e
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )


async def handle_find_company_employees_details(
        request: TexAuFindLinkedInCompanyRequest,
) -> Optional[TexAuExecutionResponse]:
    try:
        execution_id = await send_spice_request(
            data={
                "funcName": "texau-automation-1-dev-linkedinCompaniesEmployees",
                "spiceId": "5d403c1ddf129e430077c362",
                "inputs": {
                    "company": request.url,
                    "li_at": request.cookie,
                    "numberOfPagePerCompany": "10",
                    "proxy": TEXAU_PROXY,
                },
                "executionName": str(uuid.uuid4()),
            }
        )

        if not execution_id:
            logger.warning("Invalid Task Id")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Task Id"),
            )

        logger.debug(f"{execution_id=}")

        return TexAuExecutionResponse(execution_id=execution_id)
    except HTTPException as e:
        logger.critical(str(e))
        raise e
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )


async def handle_find_company_domain(
        request: TexAuFindLinkedInCompanyRequest,
) -> Optional[TexAuExecutionResponse]:
    try:
        execution_id = await send_spice_request(
            data={
                "funcName": "texau-automation-new-scripts-dev-nameToDomain",
                "spiceId": "5de7bde6d9b7c045379ea2ba",
                "inputs": {
                    "name": request.name,
                    "proxy": TEXAU_PROXY,
                },
                "executionName": str(uuid.uuid4()),
            }
        )

        if not execution_id:
            logger.warning("Invalid Task Id")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Task Id"),
            )

        logger.debug(f"{execution_id=}")

        return TexAuExecutionResponse(execution_id=execution_id)
    except HTTPException as e:
        logger.critical(str(e))
        raise e
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )


async def handle_find_company_screenshot(
        request: TexAuFindLinkedInCompanyRequest,
) -> Optional[TexAuExecutionResponse]:
    try:
        execution_id = await send_spice_request(
            data={
                "funcName": "texau-automation-2-dev-takeScreenshot",
                "spiceId": "5d5be27b58ad5ac0f882b55d",
                "inputs": {
                    "siteUrl": request.url,
                    "onlyWindow": True,
                    "proxy": TEXAU_PROXY,
                },
                "executionName": str(uuid.uuid4()),
            }
        )

        if not execution_id:
            logger.warning("Invalid Task Id")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Task Id"),
            )

        logger.debug(f"{execution_id=}")

        return TexAuExecutionResponse(execution_id=execution_id)
    except HTTPException as e:
        logger.critical(str(e))
        raise e
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )


async def handle_find_company_tech_stack(
        request: TexAuFindLinkedInCompanyRequest,
) -> Optional[TexAuExecutionResponse]:
    try:
        execution_id = await send_spice_request(
            data={
                "funcName": "texau-automation-2-dev-wappalyzer",
                "spiceId": "5d403c1ddf129e430077c38b",
                "inputs": {
                    "url": request.url,
                    "proxy": TEXAU_PROXY,
                },
                "executionName": str(uuid.uuid4()),
            }
        )

        if not execution_id:
            logger.warning("Invalid Task Id")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("TexAu: Invalid Task Id"),
            )

        logger.debug(f"{execution_id=}")

        return TexAuExecutionResponse(execution_id=execution_id)
    except HTTPException as e:
        logger.critical(str(e))
        raise e
    except Exception as e:
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from TexAu",
        )

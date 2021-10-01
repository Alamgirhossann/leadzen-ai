import json
from typing import List, Optional, Dict
from app.users import fastapi_users
import sys
import time
import httpx
import requests
from nameparser import HumanName
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, status
from loguru import logger
from pydantic import BaseModel, HttpUrl
from starlette import status
from app.credits.common import EmailSearchGetRequest, EmailSearchAddRequest
from app.credits.email import add_email_search, get_email_search, get_email_by_hash_key
from app.credits.admin import deduct_credit
from starlette.responses import JSONResponse
from app.users import get_user
from app.config import (
    API_CONFIG_SNOV_GRANT_TYPE,
    API_CONFIG_SNOV_CLIENT_ID,
    API_CONFIG_SNOV_CLIENT_SECRET,
    API_CONFIG_SNOV_ADD_URL_SEARCH,
    API_CONFIG_SNOV_GET_EMAIL,
    API_CONFIG_SNOV_OAUTH_ACESS_TOKEN,
    API_CONFIG_TEXAU_URL,
    API_CONFIG_TEXAU_EXECUTION_URL,
    API_CONFIG_TEXAU_KEY,
    API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_FUNC_ID,
    API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_SPICE_ID,
    API_CONFIG_SNOV_GET_EMAIL_FROM_NAME,
)

router = APIRouter(prefix="/snov", tags=["Snov"])


class SnovIoRequest(BaseModel):
    url: List[HttpUrl] = []
    hash_key: Optional[str] = None


class TexAuCompanyRequest(BaseModel):
    personName: str
    companyName: Optional[str] = None


async def add_email_into_database(user_id, query_url, email):
    logger.debug(f"{user_id=},>>>{query_url=}>>>>{email=}")
    if user_id and query_url and email:
        await add_email_search(
            request=EmailSearchAddRequest(
                user_id=user_id, query_url=query_url, email_result=email
            )
        )


class TexAuFindLinkedInCompanyRequest(BaseModel):
    url: Optional[str] = None
    name: Optional[str] = None
    cookie: Optional[str] = None


def get_access_token():
    params = {
        "grant_type": API_CONFIG_SNOV_GRANT_TYPE,
        "client_id": API_CONFIG_SNOV_CLIENT_ID,
        "client_secret": API_CONFIG_SNOV_CLIENT_SECRET,
    }
    try:
        res = requests.post(API_CONFIG_SNOV_OAUTH_ACESS_TOKEN, data=params)
        if res.status_code == 200:
            res_text = res.text.encode("ascii", "ignore")
            return json.loads(res_text)["access_token"]
        else:
            raise HTTPException(
                status_code=res.status_code,
                detail="Error Getting Token for snov",
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting Token For snov",
        )


def add_url_for_search(url):
    print("url2", url)
    token = get_access_token()
    params = {"access_token": token, "url": url}
    try:
        res = requests.post(API_CONFIG_SNOV_ADD_URL_SEARCH, data=params)
        if res.status_code == 200:
            logger.debug(f"{res.text}")
            return json.loads(res.text)
        else:
            raise HTTPException(
                status_code=res.status_code,
                detail="Error Adding url for search",
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Adding url for search",
        )


async def check_email_credit_history_exists(hash_key, user):
    logger.debug(f"{hash_key=}>>>{user=}")
    if hash_key or user:
        try:
            return await get_email_by_hash_key(hash_key, user)
        except Exception as e:
            return None
    return None


@router.post("/emails_for_url")
async def get_emails_from_url(
    request: SnovIoRequest,
    background_tasks: BackgroundTasks,
    user=Depends(fastapi_users.get_current_active_user),
):
    status_codes = status.HTTP_500_INTERNAL_SERVER_ERROR
    logger.debug(f"{request=}")
    try:
        url = request.url[0]
        # async with httpx.AsyncClient() as client:
        #     response = await client.post(
        #         API_CONFIG_DATABASE_GET_EMAIL,
        #         json=EmailSearchGetRequest(
        #             user_id=str(user.id),
        #             query_url=url,
        #         ).dict(),
        #     )
        # if response.status_code == 200:
        #     return response.json()
        if request:

            user_credit = await get_user(user)
            if email_history_response := await check_email_credit_history_exists(
                request.hash_key, user
            ):
                logger.debug(f"Email Found>>>>{email_history_response}")
                return email_history_response
            if user_credit.email_credit <= 0:
                raise HTTPException(
                    status_code=status.HTTP_402_PAYMENT_REQUIRED,
                    detail="Insufficient Credits",
                )
            add_url_for_search(url)
            token = get_access_token()
            params = {"access_token": token, "url": url}
            async with httpx.AsyncClient() as client:
                res = await client.post(API_CONFIG_SNOV_GET_EMAIL, data=params)
                logger.debug(f"snov result>>{res.text=}")
                if res.status_code == 200 and not "false" in res.text:
                    if not (data := res.json()):
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Snov: Data not found",
                        )
                    if "success" in data.keys():
                        logger.debug(f'{len(data["data"]["emails"])=}')
                        if data["success"]:
                            if len(data["data"]["emails"]) > 0:
                                email_data = data["data"]["emails"]
                                email = email_data[0]["email"]
                                valid = email_data[0]["status"]
                                if valid == "valid" or valid == "unknown":
                                    background_tasks.add_task(
                                        add_email_into_database,
                                        str(user.id),
                                        request.hash_key,
                                        email,
                                    )
                                    background_tasks.add_task(
                                        deduct_credit, "EMAIL", user
                                    )
                                    return email
                            return None
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="Snov: Data not found",
                        )
                    else:
                        raise HTTPException(
                            status_code=res.status_code,
                            detail="Error Getting Data From snov",
                        )

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.critical(str(e))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print("Exception" + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from snov",
        )


@router.post("/emails_for_company")
async def get_emails_from_domain(request: TexAuFindLinkedInCompanyRequest):
    try:
        token = get_access_token()
        params = {
            "access_token": token,
            "domain": request.url,
            "type": "personal",
            "limit": 10,
            "lastId": 0,
            "positions[]": ["Founder", "Director", "Chief", "President", "COO", "CEO"],
        }
        async with httpx.AsyncClient() as client:
            res = await client.get(
                "https://api.snov.io/v2/domain-emails-with-info", params=params
            )

            if res.status_code == 200:
                return json.loads(res.text)

            elif res.status_code == 400:
                print("in 400")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=str("Snov: Bad request"),
                )

            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=str("Snov: Data not found"),
                )

    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print(exc_type, exc_tb.tb_lineno)
        logger.critical(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting data from snov",
        )


async def get_company_domain(company_name: Optional[str] = None) -> Optional[str]:
    if not company_name:
        logger.warning("Invalid company name")
        return None
    payload = {
        "funcName": API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_FUNC_ID,
        "spiceId": API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_SPICE_ID,
        "inputs": {"name": company_name},
    }
    headers = {
        "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
        "Content-Type": "application/json",
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_TEXAU_URL, headers=headers, json=payload
            )

            if response.status_code != 200:
                logger.error(
                    f"Invalid Status Code: {response.status_code=}, {response.text=}"
                )
                return None

            if not (data := response.json()):
                logger.error(f"Invalid Data")
                return None
            logger.debug("ExecutionId>>>>" + data.get("executionId"))
            if not (task_id := data.get("executionId")):
                logger.error(f"Invalid Data")
                return None
            logger.debug("task_id>>>>" + task_id)
            return task_id
    except Exception as e:
        logger.critical(f"Exception sending to texau: {str(e)}")
        return None


@router.post("/email_from_person_details")
async def search_company_email(request: TexAuCompanyRequest):
    logger.debug(f"{request=}")
    company_name = request.companyName
    if not company_name:
        logger.warning("Company name not found")
        raise HTTPException(
            status_code=404,
            detail=str("Company name not foundd"),
        )
    person_name = request.personName
    name = HumanName(person_name)
    if not (name.first and name.last):
        logger.warning("First Name and Last Name required")
        raise HTTPException(
            status_code=404,
            detail=str("Snov: First Name or Last Name not Found"),
        )

    execution_id = await get_company_domain(company_name)
    if not execution_id:
        logger.warning("Error from textau request")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error Getting task_id from textau",
        )
    try:
        headers = {
            "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
            "Content-Type": "application/json",
        }
        async with httpx.AsyncClient() as client:
            cnt = 0
            while cnt < 3:
                response = await client.get(
                    f"{API_CONFIG_TEXAU_EXECUTION_URL}{execution_id}", headers=headers
                )

                if not response:
                    return JSONResponse(
                        status_code=404,
                        content={"message": "No response from texau execution"},
                    )
                elif response.status_code != 200:
                    return JSONResponse(
                        status_code=response.status_code,
                        content={"message": "Bad Response from texau"},
                    )
                data = response.json()
                if data["execution"]["status"] == "completed":
                    break
                cnt += 1
                time.sleep(10)
        domain = data.get("execution", {}).get("output", {}).get("domain", "")
        if not domain:
            return JSONResponse(
                status_code=404,
                content={"message": "No domain found"},
            )
        access_token = get_access_token()
        payload = {
            "access_token": access_token,
            "domain": domain,
            "firstName": name.first,
            "lastName": name.last,
        }
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_SNOV_GET_EMAIL_FROM_NAME, data=payload
            )

        if not response:
            return JSONResponse(
                status_code=404,
                content={"message": "No Response from Snov"},
            )
        elif not (data := response.json()):
            return JSONResponse(
                status_code=404,
                content={"message": "No data found from Snov"},
            )
        email_data = data.get("data", {})
        return email_data
    except Exception as e:
        logger.critical(f"Exception in Getting Emails, {str(e)}")
        return JSONResponse(
            status_code=401,
            content={"message": "Error Getting Emails"},
        )

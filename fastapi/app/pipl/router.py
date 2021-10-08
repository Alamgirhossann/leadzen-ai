import ast
import asyncio
import json
import uuid
from collections import ChainMap
from typing import Optional, List, Tuple, Dict
from urllib.parse import urlencode
import sys
import httpx
from fastapi import APIRouter, HTTPException, status, BackgroundTasks, Depends
from fastapi_cache.decorator import cache
from loguru import logger
from pydantic import BaseModel
from sentry_sdk import capture_message

from app.config import (
    API_CONFIG_PIPL_API_KEY,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_PIPL_BASE_URL,
    API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS,
    API_CONFIG_MAX_RESULTS_PER_CALL,
    API_CONFIG_CHECK_EMAIL,
)
from app.credits.admin import deduct_credit
from app.database import database
from app.pipl.email import (
    execute_task as execute_email_task,
    PiplDetailsFromEmailRequest,
    PiplDetailsFromEmailResponse,
)
from app.pipl.profile_url import (
    execute_task as execute_profile_task,
    PiplDetailsFromProfileUrlRequest,
    PiplDetailsFromProfileUrlResponse,
)
from app.profile_search import get_profile_search, add_profile
from app.users import fastapi_users, get_user
import requests

router = APIRouter(prefix="/pipl", tags=["PIPL"])


class PiplName(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class PiplRequest(BaseModel):
    email: Optional[str] = None
    name: Optional[PiplName] = None
    url: Optional[str] = None
    hash_key: Optional[str] = None
    type: Optional[str] = None
    result: Optional[List[dict]] = None


@router.post("/search")
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def people_search(
    app_request: PiplRequest,
    background_tasks: BackgroundTasks,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f" {user=},>>>>> {type(user)}")

    try:

        params = {}
        is_credit_applied = False
        if app_request.type != 'PIPL_REC':
            if app_request.email:
                params["email"] = app_request.email

            if app_request.name:
                if app_request.name.first_name:
                    params["first_name"] = app_request.name.first_name
                if app_request.name.last_name:
                    params["last_name"] = app_request.name.last_name

            if app_request.url:
                params["url"] = app_request.url

            if not params:
                logger.warning("No Valid Request Parameters")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Request"
                )
            params["key"] = API_CONFIG_PIPL_API_KEY

        if app_request.hash_key:
            is_credit_applied = True
        # params["match_requirements"] = "phones"
        logger.debug(f"{params=}")

        if is_credit_applied:
            response = await get_profile_search(app_request.hash_key, user)
            logger.debug(f"is_credit_applied>>>{response=}, {user=}")
            if response:

                logger.debug(
                    f">>type response result>>{type(response.get('search_results'))}"
                )
                json_data = eval(response.get("search_results"))
                logger.debug(f"{json_data=},>>>>>>>>>>>>{type(json_data)}")

                return json_data
            else:
                logger.debug(f"Profile not found")
                # breakpoint()
                user_response = await get_user(user)

                logger.debug(f"{user_response=}, {type(user_response)}")
                if user_response and user_response.profile_credit <= 0:
                    logger.warning("Insufficient Credits")
                    raise HTTPException(
                        status_code=status.HTTP_402_PAYMENT_REQUIRED,
                        detail="Insufficient Credits",
                    )
                search_type = ""
                if app_request.type == "PIPL_REC":
                    search_type = "PIPL"
                    pipl_res = app_request.result
                    logger.debug(
                        f" $$$$$$$$$$$$$$$$$$$$$$$$$in pipl res >>>>{pipl_res=}"
                    )
                else:
                    search_type = "texAu"
                    pipl_res = await send_pipl_request(params)
                logger.debug(f"{pipl_res=}, >> {type(pipl_res)}")
                print("phones....", pipl_res)
                if pipl_res:
                    logger.debug(f" in pipl res >>>>{user_response=}")
                    if pipl_res[0].get("phones"):
                        credit_res = await deduct_credit("PROFILE", user_response)
                        logger.debug(f"{credit_res=}")
                    request = {
                        "search_type": search_type,
                        "hash_key": app_request.hash_key,
                        "search_results": pipl_res,
                    }
                    pipl_res = await add_email_verification_data(pipl_res)
                    background_tasks.add_task(
                        add_profile, request=request, user=user_response
                    )
                    # add_profile_res = await add_profile(request, user_response)
                    # logger.debug(f"{add_profile_res=}")
                return pipl_res
        else:
            logger.debug(f"Credit Not applied")
            pipl_res = await send_pipl_request(params)
            return pipl_res
    except HTTPException as e:
        logger.warning(f"HTTPException re-raised")
        raise e
    except Exception as e:
        logger.critical(f"Exception in PIPL search: {str(e)}")
        return None


async def add_email_verification_data(email_verification_request):
    emails = []

    for res in email_verification_request:
        if res.get("emails"):
            for email_dict in res.get("emails"):
                emails.append(email_dict["address"])

    if len(emails) != 0:
        async def check_email_validity(
                email: str, client: httpx.AsyncClient
        ) -> Optional[Dict[str, str]]:
            try:
                if not (response := await client.get(f"{API_CONFIG_CHECK_EMAIL}={email}")):
                    logger.error(f"no response, {email=}")
                    return None

                if response.status_code != 200:
                    logger.error(f"Invalid response {response.status_code=}, {email=}")
                    return None

                if response.text == "ok" or response.text == "ok_for_all|ok_for_all":
                    return {email: "valid"}
                else:
                    return {email: "Not Valid"}
            except Exception as e:
                logger.critical(f"Exception {email=}: {str(e)}")
                return None

        async with httpx.AsyncClient() as client:
            coroutines = [await check_email_validity(email=x, client=client) for x in emails]
            results = coroutines

        results = [x for x in results if x]  # remove None's
        email_validation_results = dict(
            ChainMap(*results)
        )  # convert list of dicts to one dict

        if not email_validation_results:
            logger.error("No email validation results")
            return email_verification_request

        for res in email_verification_request:
            for email_dict in res.get("emails"):
                email = email_dict["address"]
                email_dict["valid"] = email_validation_results.get(email, "Not Valid")

        return email_verification_request
    else:
        return email_verification_request



async def send_pipl_request(params):
    url = f"{API_CONFIG_PIPL_BASE_URL}/?{urlencode(params)}"
    logger.debug(f"{url=}")
    print("ur;;;;;;",url)
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if not response.status_code == 200:
            logger.warning(
                f"Invalid Status Code: {response.status_code=}, {response.text=}"
            )
            raise HTTPException(
                status_code=response.status_code, detail="Error Searching PIPL"
            )
        if not (data := response.json()):
            logger.warning(f"Empty Response")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Empty Response",
            )
        logger.debug(data.keys())
        print("data    ",data)
        if data["@persons_count"] == 1 and data.get("person"):
            logger.success("found 1 person")
            return [data.get("person")]
        elif data["@persons_count"] > 1 and data.get("possible_persons"):
            logger.success(f'found {data["@persons_count"]} persons')
            return [x for x in data.get("possible_persons") if x][
                :API_CONFIG_MAX_RESULTS_PER_CALL
            ]
        else:
            logger.warning(f"Invalid Response")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid Response",
            )


@router.post("/bulk/email", response_model=PiplDetailsFromEmailResponse)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def bulk_find_details_for_email(
    app_request: PiplDetailsFromEmailRequest,
    background_tasks: BackgroundTasks,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{app_request=}, {user=}")

    if not app_request.filename:
        app_request.filename = (
            f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        )

    logger.debug(f"{app_request.filename=}")

    background_tasks.add_task(execute_email_task, request=app_request)

    return PiplDetailsFromEmailResponse(filename=app_request.filename)


@router.post(
    "/bulk/profile_url",
    response_model=PiplDetailsFromProfileUrlResponse,
)
@cache(expire=API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS)
async def bulk_find_details_for_profile_url(
    app_request: PiplDetailsFromProfileUrlRequest,
    background_tasks: BackgroundTasks,
    user=Depends(fastapi_users.get_current_active_user),
):
    logger.debug(f"{app_request=}, {user=}")

    if not app_request.filename:
        app_request.filename = (
            f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
        )

    logger.debug(f"{app_request.filename=}")

    background_tasks.add_task(execute_profile_task, request=app_request)

    return PiplDetailsFromProfileUrlResponse(filename=app_request.filename)

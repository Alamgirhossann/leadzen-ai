import asyncio
import itertools
import json
import os
import sys
import urllib
from typing import Dict, List, Optional, Union, Any, Coroutine

import httpx
import jmespath
import pandas as pd
import requests
from aiolimiter import AsyncLimiter
from fastapi import HTTPException, BackgroundTasks
from fastapi.encoders import jsonable_encoder
from loguru import logger
from sentry_sdk import capture_message
from starlette import status
from fastapi.responses import JSONResponse

from app.config import (
    API_CONFIG_PIPL_RATE_LIMIT_MAX_CALL_COUNT,
    API_CONFIG_PIPL_RATE_LIMIT_DURATION_IN_SECONDS,
    API_CONFIG_CHECK_EMAIL,
    API_CONFIG_VERIFY_PHONE_URL,
)
from app.credits.admin import deduct_credit
from app.credits.profile import bulk_add_credit_profile
from app.profile_search import get_profile_search, add_profile
from app.users import get_user
from urllib.parse import urlparse, urlunparse


async def verify_phones(phones: List[Dict]):
    logger.debug(f"{phones=}")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                API_CONFIG_VERIFY_PHONE_URL,
                data=json.dumps({"phones": phones}),
            )

        if not response:
            logger.error("Invalid Response")
            return None

        if response.status_code != 200:
            logger.error(f"Invalid Status Code: {response.status_code=}")
            return None

        if not (data := response.json()):
            logger.error("Invalid Response Data")
            return None

        logger.debug(f"{data=}")

        verified_phones = [x["raw_phone"] for x in data if x["status"] == "Success"]
        logger.debug(f"{verified_phones}")

        return verified_phones
    except Exception as e:
        logger.critical(f"Exception Verifying Phones: {e}")
        return None

async def add_email_verification_data(email_verification_request):
    
    async def check_email_validity(
        email, client
    ):
        try:
            if not (response := await client.get(f"{API_CONFIG_CHECK_EMAIL}={email}")):
                logger.error(f"no response, {email=}")
                return None

            if response.status_code != 200:
                logger.error(f"Invalid response {response.status_code=}, {email=}")
                return None

            if response.text == "ok" or response.text == "ok_for_all|ok_for_all":
                return email
            else:
                return None
        except Exception as e:
            logger.critical(f"Exception {email=}: {str(e)}")
            return None

    
    async with httpx.AsyncClient() as client:
            coroutines = [await check_email_validity(email=x, client=client) for x in email_verification_request]
            results = coroutines
    if results:
        results = [x for x in results if x]  # remove None's
        
        return results
    
    


async def filter_data(person: Dict, slug: str, is_email_required: bool) -> Dict:
    logger.debug(f"{person=}---{slug=}---{is_email_required=}")
    result = {
        "Input": slug,
        "Names": None,
        "Emails": None,
        "Phones": None,
        "Gender": None,
        "Addresses": None,
        "Jobs": None,
        "Educations": None,
        "Relationships": None,
        "User_ids": None,
        "Images": None,
        "Urls": None,
    }

    if "names" in person:
        names = jmespath.search("names[*].display", person)
        result["Names"] = ", ".join(names)

    if "emails" in person:
        emails = jmespath.search("emails[*].address", person)
        if emails:
            if verified_email := await add_email_verification_data(emails):
                logger.debug(verified_email)
                result["Emails"] = verified_email


    if "phones" in person:
        phones = jmespath.search("phones[*].display_international", person)
        if phones:
            if verified_phones := await verify_phones(phones=phones):
                result["Phones"] = verified_phones
            

    if "gender" in person:
        gender = jmespath.search("gender", person)
        result["Gender"] = gender.get("content", "unknown")

    if "addresses" in person:
        addresses = jmespath.search("addresses[*].display", person)
        result["Addresses"] = " | ".join(addresses)

    if "jobs" in person:
        jobs = jmespath.search("jobs[*].display", person)
        result["Jobs"] = " | ".join(jobs)

    if "educations" in person:
        educations = jmespath.search("educations[*].display", person)
        result["Educations"] = " | ".join(educations)

    if "relationships" in person:
        relationships = jmespath.search("relationships[*].names[*].display", person)
        result["Relationships"] = ", ".join(list(itertools.chain(*relationships)))

    if "user_ids" in person:
        user_ids = jmespath.search("user_ids[*].content", person)
        result["User_ids"] = ", ".join(user_ids)

    if "images" in person:
        images = jmespath.search("images[*].url", person)
        result["Images"] = ", ".join(images)

    if "urls" in person:
        urls = jmespath.search("urls[*].url", person)
        result["Urls"] = ", ".join(urls)

    return result


async def write_to_file(responses: List[Dict], filename: str):
    try:
        logger.debug(f"writing {responses=} responses")
        logger.debug(f"{type(responses)=}----{responses=}")
        df = pd.DataFrame([x for x in responses if x])
        logger.debug(df.head())

        if filename.endswith(".xlsx"):
            df.to_excel(filename, index=False)
        else:
            df.to_csv(filename, index=False)

        os.sync()

        logger.success(f"Saved to {filename=}")
    except Exception as e:
        logger.critical(f"Exception Saving filename={filename!r}: {e}")


async def get_pipl_response(hash_key_list, url, user, client):
    logger.debug("In get_people............")
    pipl_response = None
    user_response = None
    try:
        for item in hash_key_list:
            keys_in_item = list(item.keys())
            values_in_item = list(item.values())
            is_record_present = False
            parsed = urlparse(url)
            url_split_temp = parsed.query.split("&")[0]
            split_url = url_split_temp.split("=")[1]
            if keys_in_item[0] == urllib.parse.unquote(split_url):
                logger.debug(
                    f"{keys_in_item[0]=}>>{urllib.parse.unquote(split_url)}>>>>{keys_in_item[0] == urllib.parse.unquote(split_url)=}"
                )
                hash_key = values_in_item[0]
                logger.debug(f"$$${hash_key=}>>> ")
                response = await get_profile_search(hash_key, user)
                logger.debug(f"{hash_key=}>>> {response=}")
                if response:
                    # logger.debug(f"profile found >>>{response=}>>>>")
                    is_record_present = True

                    logger.debug(
                        f"profile found >>>{type(pipl_response)=}>>>>{pipl_response=}"
                    )

                else:
                    logger.debug("Profile not found")
                    user_response = await get_user(user)

                    logger.debug(f"{user_response=}, {type(user_response)}")
                    if user_response and user_response.profile_credit <= 0:
                        logger.warning("Insufficient Credits")
                        raise HTTPException(
                            status_code=status.HTTP_402_PAYMENT_REQUIRED,
                            detail="Insufficient Credits",
                        )

                pipl_response = await client.get(url)
                logger.debug(f"{pipl_response=}>>>{is_record_present=},{user_response=},>>>{user_response=}")
                return pipl_response, is_record_present, user_response, hash_key
    except Exception as e:
        logger.critical(f"Exception in PIPL search: {e}")
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        return None


async def search_one_texAu(
        url: str,
        client: httpx.AsyncClient,
        slug: str,
        limiter: AsyncLimiter,
        hash_key_list: List[Dict],
        user,
        search_id: str,
        search_index: List[Dict],
) -> Optional[List[Dict]]:
    try:
        pipl_response = None
        is_record_present = None
        user_response = None
        hash_key = None
        async with limiter:
            if hash_key_list:
                pipl_response, is_record_present, user_response, hash_key = await get_pipl_response(hash_key_list, url,
                                                                                                    user, client)

                if pipl_response and pipl_response.status_code != 200:
                    logger.debug("not pipl_response.status_code == 200")
                    if pipl_response.status_code in [403, 429]:
                        # https://docs.pipl.com/reference/#rate-limiting-information
                        capture_message(
                            message=f"PIPL Rate Limit Hit, {url=}, {pipl_response.status_code =}"
                        )

                    logger.warning(
                        f"Invalid Status Code: {pipl_response.status_code=}, {pipl_response.text=}"
                    )
                    return None

                if not (data := pipl_response.json()):
                    logger.warning("Empty Response")
                    return None
                logger.debug(f"data 200>>>{data=}")
                logger.debug(data.keys())

                if data["@persons_count"] == 1 and data.get("person"):
                    logger.debug(
                        f'In data["@persons_count"] == 1 and data.get("person"){data["@persons_count"] == 1 and data.get("person")=} '
                    )
                    result = await filter_data(
                        person=data.get("person"), slug=slug, is_email_required=False
                    )
                    logger.debug(f"{is_record_present=}")
                    await check_credit_deduct_and_add_profile(data, is_record_present, result, search_id, search_index,
                                                              user_response, hash_key)

                    return [result]
                elif data["@persons_count"] > 1 and data.get("possible_persons"):
                    return None
                    # return [
                    #     filter_data(person=x, slug=slug)
                    #     for x in data.get("possible_persons")
                    #     if x
                    # ]

                else:
                    logger.warning(f"{data=}")
                    return None
    except HTTPException as e:
        logger.warning("HTTPException re-raised")
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print("Exception" + str(e))
        raise e
    except Exception as e:
        logger.critical(f"Exception in PIPL search: {e}")
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print("Exception" + str(e))
        return None


async def check_credit_deduct_and_add_profile(
        data, is_record_present, result, search_id, search_index, user_response, hash_key
):
    if result and not is_record_present:
        credit_res = await deduct_credit("PROFILE", user_response)
        logger.debug(f"{credit_res=}")
        request_add_profile = {
            "search_type": "texAu",
            "hash_key": hash_key,
            "search_results": [data.get("person")],
        }
        add_profile_res = await add_profile(request_add_profile, user_response)
        print("add_profile_res>>>>", add_profile_res)
        result_set = data.get("person")
        logger.debug(f"{result_set.get('phones')=}")
        add_profile_credit_history = await save_profile_credit(
            result_set, search_id, search_index, user_response, hash_key
        )
        logger.debug(f"{add_profile_credit_history=}")


async def save_profile_credit(
        result_set, search_id, search_index, user_response, hash_key
):
    phones = result_set.get("phones")
    phone_list = [str(phone.get("number")) for phone in phones]
    logger.debug(f"{phone_list=}>>>{search_index}>>>{type(search_index)}")
    add_profile_credit_history = None
    for item in search_index:
        pairs = item.items()
        for key, value in pairs:
            if hash_key == key:
                add_profile_credit_history = await bulk_add_credit_profile(
                    search_id, phone_list, int(value), user_response
                )
    return add_profile_credit_history


async def get_pipl_response_for_pipl_export(key, key1, value, user):
    pipl_response = None

    if key1 == value:
        is_credit_applied = False
        hash_key = value
        logger.debug(f">>>,{value=}")
        response = await get_profile_search(value, user)
        user_response = None
        logger.debug(f"get profile >>> {user=}")
        if response:

            logger.debug(
                f">>type response result>>{type(response.get('search_results'))}"
            )
            json_data = eval(response.get("search_results"))
            logger.debug(f",>>>>>>>>>>>>{type(json_data)}")
            pipl_response = {
                k: v for list_item in json_data for (k, v) in list_item.items()
            }

        else:
            logger.debug("Profile not found>>>")
            temp_json = json.loads(key)
            logger.debug(
                f"{type(temp_json)=}>>{temp_json.keys()}>>>{temp_json.get('phones')=}"
            )
            if temp_json.get("phones"):
                is_credit_applied = True
                user_response = await get_user(user)
                logger.debug(f"{user_response=}, {type(user_response)}")
                if user_response and user_response.profile_credit <= 0:
                    logger.warning("Insufficient Credits")
                    raise HTTPException(
                        status_code=status.HTTP_402_PAYMENT_REQUIRED,
                        detail="Insufficient Credits",
                    )
                pipl_response = temp_json
        return pipl_response, is_credit_applied, user_response, hash_key


async def search_one_pipl(
        index_of_rec: str,
        client: httpx.AsyncClient,
        slug: str,
        limiter: AsyncLimiter,
        hash_key_list: List[Dict],
        user,
        search_id: str,
        search_index: List[Dict],
) -> Optional[List[Dict]]:
    try:

        async with limiter:
            logger.debug(
                f"{ len(hash_key_list)=},>>>{type(hash_key_list)}>>>{index_of_rec=}"
            )
            result = None
            pipl_response = None
            for search_rec in search_index:
                search_rec_pairs = search_rec.items()
                for key1, value1 in search_rec_pairs:
                    if value1 == index_of_rec:
                        logger.debug(f"{value1}>>>{index_of_rec}>>>{key1}")
                        for item in hash_key_list:

                            pairs = item.items()
                            for key, value in pairs:
                                if key1 == value:
                                    (
                                        pipl_response,
                                        is_credit_applied, user_response, hash_key
                                    ) = await get_pipl_response_for_pipl_export(
                                        key, key1, value, user
                                    )

                                    if not (data := pipl_response):
                                        logger.warning("Empty Response")
                                        return None
                                    logger.debug("data 200>>>")
                                    logger.debug(data.keys())
                                    result = await filter_data(
                                        person=data, slug=slug, is_email_required=False
                                    )
                                    logger.debug(f"{is_credit_applied=}")
                                    if result and is_credit_applied:
                                        credit_res = await deduct_credit(
                                            "PROFILE", user_response
                                        )
                                        logger.debug(f"{credit_res=}")
                                        request_add_profile = {
                                            "search_type": "PIPL",
                                            "hash_key": hash_key,
                                            "search_results": [data],
                                        }
                                        add_profile_res = await add_profile(
                                            request_add_profile, user_response
                                        )
                                        logger.debug(f"{add_profile_res=}")

                                        add_profile_credit_history = (
                                            await save_profile_credit(
                                                data,
                                                search_id,
                                                search_index,
                                                user_response,
                                                hash_key,
                                            )
                                        )

                                        logger.debug(f"{add_profile_credit_history=}")
                                    return [result]

    except HTTPException as e:
        logger.warning("HTTPException re-raised")
        raise e
    except Exception as e:
        logger.critical(f"Exception in PIPL search: {e}")
        return None


async def search_all_by_texAu(
        urls: List[str],
        slugs: List[str],
        hash_key_list: List[Dict],
        search_id: str,
        search_index: List[Dict],
        user,
) -> Optional[List[Dict]]:
    if len(urls) != len(slugs):
        logger.warning(f"{len(urls)=} is not equal to {len(slugs)=}")
        return None

    try:
        rate_limiter = AsyncLimiter(
            API_CONFIG_PIPL_RATE_LIMIT_MAX_CALL_COUNT,
            API_CONFIG_PIPL_RATE_LIMIT_DURATION_IN_SECONDS,
        )

        async with httpx.AsyncClient() as client:
            coroutines = [
                search_one_texAu(
                    url=urls[p],
                    client=client,
                    slug=slugs[p],
                    limiter=rate_limiter,
                    hash_key_list=hash_key_list,
                    user=user,
                    search_id=search_id,
                    search_index=search_index,
                )
                for p, v in enumerate(urls)
            ]
            results = await asyncio.gather(*coroutines)

            results = [
                x for x in results if x
            ]  # remove the None's else chain/flatten operation will fail

            if not any(results):
                logger.warning("No Results Found")
                return None

            return list(itertools.chain(*results))
    except Exception as e:
        logger.critical(f"Exception Searching PIPL: {e}")
        return None


async def search_all_by_pipl(
        urls: List[str],
        slugs: List[str],
        hash_key_list: List[Dict],
        search_id: str,
        search_index: List[Dict],
        user,
) -> Optional[List[Dict]]:
    if len(urls) != len(slugs):
        logger.warning(f"{len(urls)=} is not equal to {len(slugs)=}")
        return None

    try:
        rate_limiter = AsyncLimiter(
            API_CONFIG_PIPL_RATE_LIMIT_MAX_CALL_COUNT,
            API_CONFIG_PIPL_RATE_LIMIT_DURATION_IN_SECONDS,
        )

        async with httpx.AsyncClient() as client:
            coroutines = [
                search_one_pipl(
                    index_of_rec=urls[p],
                    client=client,
                    slug=slugs[p],
                    limiter=rate_limiter,
                    hash_key_list=hash_key_list,
                    user=user,
                    search_id=search_id,
                    search_index=search_index,
                )
                for p, v in enumerate(urls)
            ]
            results = await asyncio.gather(*coroutines)

            results = [
                x for x in results if x
            ]  # remove the None's else chain/flatten operation will fail

            if not any(results):
                logger.warning("No Results Found")
                return None

            return list(itertools.chain(*results))
    except Exception as e:
        logger.critical(f"Exception Searching PIPL: {e}")
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        return None


async def search_one(
        url: str, client: httpx.AsyncClient, slug: str, limiter: AsyncLimiter
) -> Union[None, tuple[Any, dict], tuple[None, None]]:
    try:

        async with limiter:
            if not url:
                return None
            response = await client.get(url)

            if response.status_code != 200:
                if response.status_code in [403, 429]:
                    # https://docs.pipl.com/reference/#rate-limiting-information
                    capture_message(
                        message=f"PIPL Rate Limit Hit, {url=}, {response.status_code =}"
                    )

                logger.warning(
                    f"Invalid Status Code: {response.status_code=}, {response.text=}"
                )
                return None

            if not (data := response.json()):
                logger.warning("Empty Response")
                return None
            logger.debug(data)
            # logger.debug(data.keys())
            parsed = urlparse(url)
            url_split_temp = parsed.query.split("&")[0]
            split_url = url_split_temp.split("=")[1]
            linkedin_url = urllib.parse.unquote(split_url)
            logger.debug(f"{linkedin_url=}")
            if data["@persons_count"] == 1 and data.get("person"):
                parsed = urlparse(url)
                url_split_temp = parsed.query.split("&")[0]
                split_url = url_split_temp.split("=")[1]
                linkedin_url = urllib.parse.unquote(split_url)
                logger.debug(f"{linkedin_url=}")
                return data.get("person"), await filter_data(person=data.get("person"), slug=linkedin_url,
                                                             is_email_required=True)

                # return [filter_data(person=data.get("person"), slug=slug)]
            elif data["@persons_count"] > 1 and data.get("possible_persons"):
                # return [
                #     filter_data(person=x, slug=slug)
                #     for x in data.get("possible_persons")
                #     if x
                #
                return None, None
            else:
                logger.warning(f"{data=}")
                return None, None
    except Exception as e:
        logger.critical(f"Exception in PIPL search: {e}")
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        return None


async def search_all(urls: List[str], slugs: List[str]) -> Optional[List[Dict]]:
    if len(urls) != len(slugs):
        logger.warning(f"{len(urls)=} is not equal to {len(slugs)=}")
        return None

    try:
        rate_limiter = AsyncLimiter(
            API_CONFIG_PIPL_RATE_LIMIT_MAX_CALL_COUNT,
            API_CONFIG_PIPL_RATE_LIMIT_DURATION_IN_SECONDS,
        )

        async with httpx.AsyncClient() as client:
            coroutines = [
                search_one(
                    url=urls[p], client=client, slug=slugs[p], limiter=rate_limiter
                )
                for p, v in enumerate(urls)
            ]
            results = await asyncio.gather(*coroutines)

            results = [
                x for x in results if x
            ]  # remove the None's else chain/flatten operation will fail

            if not any(results):
                logger.warning("No Results Found")
                return None
            logger.debug(f"{list(itertools.chain(results))=}")
            return list(itertools.chain(results))
    except Exception as e:
        logger.critical(f"Exception Searching PIPL: {e}")
        return None

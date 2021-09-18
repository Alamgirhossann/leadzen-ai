import asyncio
import itertools
import os
import sys
import urllib
from typing import Dict, List, Optional

import httpx
import jmespath
import pandas as pd
from aiolimiter import AsyncLimiter
from fastapi import HTTPException, BackgroundTasks
from loguru import logger
from sentry_sdk import capture_message
from starlette import status

from app.config import (
    API_CONFIG_PIPL_RATE_LIMIT_MAX_CALL_COUNT,
    API_CONFIG_PIPL_RATE_LIMIT_DURATION_IN_SECONDS,
)
from app.credits.admin import deduct_credit
from app.profile_search import get_profile_search, add_profile
from app.users import get_user
from urllib.parse import urlparse, urlunparse


def filter_data(person: Dict, slug: str) -> Dict:
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
        result["Emails"] = ", ".join(emails)

    if "phones" in person:
        phones = jmespath.search("phones[*].display_international", person)
        result["Phones"] = ", ".join(phones)

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
        logger.debug(f"writing {len(responses)=} responses")

        df = pd.DataFrame([x for x in responses if x])
        logger.debug(df.head())

        if filename.endswith(".xlsx"):
            df.to_excel(filename, index=False)
        else:
            df.to_csv(filename, index=False)

        os.sync()

        logger.success(f"Saved to {filename=}")
    except Exception as e:
        logger.critical(f"Exception Saving {filename=}: {str(e)}")


async def search_one(
        url: str, client: httpx.AsyncClient, slug: str, limiter: AsyncLimiter, hash_key_list: List[Dict], user
, background_tasks=BackgroundTasks) -> Optional[List[Dict]]:
    try:
        logger.debug("110 url>>>>>" + str(url))
        hash_key = None
        user_response = None
        pipl_response = None
        async with limiter:
            if hash_key_list:
                print("116 In request>>>", hash_key_list)
                # hash_key_list=[x for x in request.hash_key_list]
                print("118 hash_key_list>>>", hash_key_list)
                for item in hash_key_list:

                    # print("121 key , value>>", item.key,'>>>>',item.values())
                    pairs = item.items()

                    for key, value in pairs:
                        print("125 if key == url>>",key, url, key == url)
                        parsed = urlparse(url)
                        print("Query>>>>>>>>",parsed.query)
                        urlSplit=parsed.query.split('&')[0]
                        splittedUrl = urlSplit.split("=")[1]
                        print("splittedUrl>>>",splittedUrl)
                        print("131 if key == splittedUrl>>", key, url, key == splittedUrl)

                        print("decoded url>>>", urllib.parse.unquote(splittedUrl))
                        if key == urllib.parse.unquote(splittedUrl):
                            print("128 In If url==key")
                            hash_key = value
                            response = await get_profile_search(hash_key, user)
                            logger.debug(f"is_credit_applied>>>{response=}, {user=}")
                            if response:
                                logger.debug(f"profile found >>>{response=}")
                                return response.get('search_results')
                            else:
                                logger.debug(f"Profile not found")
                                user_response = await get_user(user)

                                logger.debug(f"{user_response=}, {type(user_response)}")
                                if user_response and user_response.profile_credit <= 0:
                                    logger.warning("Insufficient Credits")
                                    raise HTTPException(
                                        status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Insufficient Credits"
                                    )
                                pipl_response = await client.get(url)

            if not pipl_response.status_code == 200:
                if pipl_response.status_code == 403 or pipl_response.status_code == 429:
                    # https://docs.pipl.com/reference/#rate-limiting-information
                    capture_message(
                        message=f"PIPL Rate Limit Hit, {url=}, {pipl_response.status_code =}"
                    )

                logger.warning(
                    f"Invalid Status Code: {pipl_response.status_code=}, {pipl_response.text=}"
                )
                return None

            if not (data := pipl_response.json()):
                logger.warning(f"Empty Response")
                return None

            logger.debug(data.keys())

            if data["@persons_count"] == 1 and data.get("person"):

                result = filter_data(person=data.get("person"), slug=slug)
                if result:
                    credit_res = await deduct_credit("PROFILE", user_response)
                    logger.debug(f"{credit_res=}")
                    request_add_profile = {
                        "search_type": "texAu",
                        "hash_key": hash_key,
                        "search_results":
                            [[data.get("person")]]

                    }
                    add_profile_res = await add_profile(request_add_profile,user_response)
                    print('add_profile_res>>>>',add_profile_res)
                    # background_tasks.add_task(add_profile, request=request_add_profile, user=user)
                return [result]
            elif data["@persons_count"] > 1 and data.get("possible_persons"):
                return [
                    filter_data(person=x, slug=slug)
                    for x in data.get("possible_persons")
                    if x
                ]
            else:
                logger.warning(f"{data=}")
                return None
    except HTTPException as e:
        logger.warning(f"HTTPException re-raised")
        raise e
    except Exception as e:
        logger.critical(f"Exception in PIPL search: {str(e)}")
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        return None


async def search_all(urls: List[str], slugs: List[str], hash_key_list: List[Dict], user) -> Optional[List[Dict]]:
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
                    url=urls[p], client=client, slug=slugs[p], limiter=rate_limiter, hash_key_list=hash_key_list,
                    user=user
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
        logger.critical(f"Exception Searching PIPL: {str(e)}")
        return None

import asyncio
import itertools
import os
from typing import Dict, List, Optional

import httpx
import jmespath
import pandas as pd
from aiolimiter import AsyncLimiter
from loguru import logger
from sentry_sdk import capture_message

from app.config import (
    API_CONFIG_PIPL_RATE_LIMIT_MAX_CALL_COUNT,
    API_CONFIG_PIPL_RATE_LIMIT_DURATION_IN_SECONDS,
)


def filter_data(person: Dict, slug: str) -> Dict:
    result = {
        "input": slug,
        "names": None,
        "emails": None,
        "phones": None,
        "gender": None,
        "addresses": None,
        "jobs": None,
        "educations": None,
        "relationships": None,
        "user_ids": None,
        "images": None,
        "urls": None,
    }

    if "names" in person:
        names = jmespath.search("names[*].display", person)
        result["names"] = ", ".join(names)

    if "emails" in person:
        emails = jmespath.search("emails[*].address", person)
        result["emails"] = ", ".join(emails)

    if "phones" in person:
        phones = jmespath.search("phones[*].display_international", person)
        result["phones"] = ", ".join(phones)

    if "gender" in person:
        gender = jmespath.search("gender", person)
        result["gender"] = gender.get("content", "unknown")

    if "addresses" in person:
        addresses = jmespath.search("addresses[*].display", person)
        result["addresses"] = " | ".join(addresses)

    if "jobs" in person:
        jobs = jmespath.search("jobs[*].display", person)
        result["jobs"] = " | ".join(jobs)

    if "educations" in person:
        educations = jmespath.search("educations[*].display", person)
        result["educations"] = " | ".join(educations)

    if "relationships" in person:
        relationships = jmespath.search("relationships[*].names[*].display", person)
        result["relationships"] = ", ".join(list(itertools.chain(*relationships)))

    if "user_ids" in person:
        user_ids = jmespath.search("user_ids[*].content", person)
        result["user_ids"] = ", ".join(user_ids)

    if "images" in person:
        images = jmespath.search("images[*].url", person)
        result["images"] = ", ".join(images)

    if "urls" in person:
        urls = jmespath.search("urls[*].url", person)
        result["urls"] = ", ".join(urls)

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
    url: str, client: httpx.AsyncClient, slug: str, limiter: AsyncLimiter
) -> Optional[List[Dict]]:
    try:
        logger.debug(url)

        async with limiter:
            response = await client.get(url)

            if not response.status_code == 200:
                if response.status_code == 403 or response.status_code == 429:
                    capture_message(
                        message=f"PIPL Rate Limit Hit, {url=}, {response.status_code =}"
                    )

                logger.warning(
                    f"Invalid Status Code: {response.status_code=}, {response.text=}"
                )
                return None

            if not (data := response.json()):
                logger.warning(f"Empty Response")
                return None

            logger.debug(data.keys())

            if data["@persons_count"] == 1 and data.get("person"):
                return [filter_data(person=data.get("person"), slug=slug)]
            elif data["@persons_count"] > 1 and data.get("possible_persons"):
                return [
                    filter_data(person=x, slug=slug)
                    for x in data.get("possible_persons")
                    if x
                ]
            else:
                logger.warning(f"{data=}")
                return None
    except Exception as e:
        logger.critical(f"Exception in PIPL search: {str(e)}")
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

            return list(itertools.chain(*results))
    except Exception as e:
        logger.critical(f"Exception Searching PIPL: {str(e)}")
        return None

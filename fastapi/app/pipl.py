import asyncio
import itertools
import os
import uuid
from typing import Optional, List, Dict

import httpx
import jmespath
import pandas as pd
from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from loguru import logger
from piplapis.search import SearchAPIRequest
from pydantic import BaseModel

from app.config import (
    API_CONFIG_PIPL_API_KEY,
    API_CONFIG_BULK_OUTGOING_DIRECTORY,
    API_CONFIG_PIPL_BASE_URL,
)

router = APIRouter(prefix="/pipl", tags=["PIPL"])


class PiplName(BaseModel):
    first_name: str
    last_name: str


class PiplRequest(BaseModel):
    email: Optional[str] = None
    name: Optional[PiplName] = None
    url: Optional[str] = None


@router.post("/search")
async def people_search(request: PiplRequest):
    logger.debug(f"{request=}")
    try:
        request = SearchAPIRequest(
            email=request.email,
            first_name=request.name.first_name,
            last_name=request.name.last_name,
            url=request.url,
            match_requirements="phones",
            api_key=API_CONFIG_PIPL_API_KEY,
        )

        if not (response := request.send()):
            logger.warning("No Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No Results"
            )

        response_data = None

        if response.person:
            logger.success("single rec")
            response_data = [response.person]
        elif response.possible_persons:
            logger.success("multiple records")
            response_data = response.possible_persons

        logger.success(f"{response_data=}")

        if not response_data:
            logger.warning("Invalid Response")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No Results",
            )

        return JSONResponse(content=jsonable_encoder(response_data))
    except Exception as e:
        logger.critical(f"Exception Searching PIPL: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Error Searching PIPL"
        )


class PiplFindDetailsFromEmailRequest(BaseModel):
    emails: List[str]
    filename: Optional[str] = None


class PiplFindDetailsFromEmailResponse(BaseModel):
    filename: str


@router.post("/find_details_for_email", response_model=PiplFindDetailsFromEmailResponse)
async def bulk_people_search(
    request: PiplFindDetailsFromEmailRequest, background_tasks: BackgroundTasks
):
    logger.debug(f"{request=}")

    def filter_data(data: Dict, email: str) -> Dict:
        result = {
            "input": email,
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

        if "names" in data:
            names = jmespath.search("names[*].display", data)
            result["names"] = ", ".join(names)

        if "emails" in data:
            emails = jmespath.search("emails[*].address", data)
            result["emails"] = ", ".join(emails)

        if "phones" in data:
            phones = jmespath.search("phones[*].display_international", data)
            result["phones"] = ", ".join(phones)

        if "gender" in data:
            gender = jmespath.search("gender", data)
            result["gender"] = gender.get("content", "unknown")

        if "addresses" in data:
            addresses = jmespath.search("addresses[*].display", data)
            result["addresses"] = " | ".join(addresses)

        if "jobs" in data:
            jobs = jmespath.search("jobs[*].display", data)
            result["jobs"] = " | ".join(jobs)

        if "educations" in data:
            educations = jmespath.search("educations[*].display", data)
            result["educations"] = " | ".join(educations)

        if "relationships" in data:
            relationships = jmespath.search("relationships[*].names[*].display", data)
            result["relationships"] = ", ".join(list(itertools.chain(*relationships)))

        if "user_ids" in data:
            user_ids = jmespath.search("user_ids[*].content", data)
            result["user_ids"] = ", ".join(user_ids)

        if "images" in data:
            images = jmespath.search("images[*].url", data)
            result["images"] = ", ".join(images)

        if "urls" in data:
            urls = jmespath.search("urls[*].url", data)
            result["urls"] = ", ".join(urls)

        return result

    async def search_one(email, client) -> Optional[List[Dict]]:
        try:
            url = f"{API_CONFIG_PIPL_BASE_URL}/?email={email}&key={API_CONFIG_PIPL_API_KEY}"
            logger.debug(url)

            response = await client.get(url)

            if not response.status_code == 200:
                logger.warning(
                    f"Invalid Status Code: {response.status_code=}, {response.text=}"
                )
                return None

            if not (data := response.json()):
                logger.warning(f"Empty Response")
                return None

            logger.debug(data.keys())

            if data["@persons_count"] == 1 and data.get("person"):
                return [filter_data(data=data.get("person"), email=email)]
            elif data["@persons_count"] > 1 and data.get("possible_persons"):
                return [
                    filter_data(data=x, email=email)
                    for x in data.get("possible_persons")
                    if x
                ]
            else:
                return None
        except Exception as e:
            logger.critical(f"Exception in PIPL search: {str(e)}")
            return None

    async def search_all(emails) -> Optional[List[Dict]]:
        try:
            async with httpx.AsyncClient() as client:
                coroutines = [
                    search_one(email=email, client=client) for email in emails if email
                ]
                results = await asyncio.gather(*coroutines)

                return list(itertools.chain(*results))
        except Exception as e:
            logger.critical(f"Exception Searching PIPL: {str(e)}")
            return None

    async def write_to_file(responses: List[Dict], filename: str):
        try:
            logger.debug(f"writing {len(responses)=} responses")

            df = pd.DataFrame([x for x in responses if x])
            logger.debug(df.head())

            df.to_csv(filename, index=False)

            os.sync()

            logger.success(f"Saved to {filename=}")
        except Exception as e:
            logger.critical(f"Exception Saving {filename=}: {str(e)}")

    async def execute_task(emails: List[str], filename: str):
        if not (responses := await search_all(emails=emails)):
            logger.error("Error Getting Data")
            return

        if not any(responses):
            logger.error("no valid responses found")
            return

        await write_to_file(responses=responses, filename=filename)

    if not request.filename:
        filename = f"{API_CONFIG_BULK_OUTGOING_DIRECTORY}/{str(uuid.uuid4())}.csv"
    else:
        filename = request.filename

    logger.debug(f"{filename=}")

    background_tasks.add_task(
        execute_task,
        emails=request.emails,
        filename=filename,
    )

    return PiplFindDetailsFromEmailResponse(filename=filename)

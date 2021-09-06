import uuid
from typing import Optional, List, Dict

from elasticsearch import AsyncElasticsearch, NotFoundError
from elasticsearch.helpers import async_streaming_bulk
from loguru import logger
from tqdm import tqdm

from app.config import API_CONFIG_ELASTICSEARCH_URL_WITH_USER_PASS
from app.elasticsearch.requests import (
    ElasticsearchQueryRequest,
    ElasticsearchAddRequest,
    ElasticsearchAddjsonRequest
)
from app.requests import (
    ContactIndexDeleteRequest,
    ContactDeleteRequest,
)

es = AsyncElasticsearch(
    [API_CONFIG_ELASTICSEARCH_URL_WITH_USER_PASS],
    verify_certs=True,
)


async def add(request: ElasticsearchAddRequest) -> Optional[bool]:
    if not es:
        logger.warning("Elasticsearch not initialized")
        return None

    async def row_generator(index_name: str, rows: List[Dict]) -> Dict:
        for row in rows:
            yield {
                "_op_type": "create",
                "_index": index_name,
                "_id": str(uuid.uuid4()),
                "doc": row,
            }

    try:
        progress = tqdm(unit="rows", total=len(request.records))
        successes = 0

        if not (await es.indices.exists(index=request.index_name)):
            await es.indices.create(index=request.index_name)

        async for ok, action in async_streaming_bulk(
            client=es,
            index=request.index_name,
            actions=row_generator(
                index_name=request.index_name,
                rows=request.records,
            ),
            raise_on_exception=False,
        ):
            progress.update(1)
            successes += ok

        logger.success(f"Database Add Completed, {successes=}, {len(request.records)}")
        return True
    except Exception as e:
        logger.critical("Exception Adding to Elasticsearch: " + str(e))
        return None


async def delete_index(request: ContactIndexDeleteRequest) -> Optional[bool]:
    if not es:
        logger.warning("Elasticsearch not initialized")
        return None

    try:
        if not (await es.indices.exists(index=request.index_name)):
            logger.warning(f"{request.index_name=} Doesnt Exist")
            return False

        if not await es.delete_by_query(
            index=request.index_name, body={"query": {"match_all": {}}}
        ):
            return False
        return True
    except Exception as e:
        logger.critical("Exception Deleting Index: " + str(e))
        return None


async def delete(request: ContactDeleteRequest) -> Optional[bool]:
    if not es:
        logger.warning("Elasticsearch not initialized")
        return None

    try:
        if not await es.delete(index=request.index_name, id=request.id):
            return False
        return True
    except NotFoundError as e:
        logger.critical("Id Not Found: " + str(e))
        return None
    except Exception as e:
        logger.critical("Exception Deleting Id: " + str(e))
        return None


async def query(request: ElasticsearchQueryRequest) -> Optional[List[Dict]]:
    if not es:
        logger.warning("Elasticsearch not initialized")
        return None

    try:
        if not (
            results := await es.search(
                index=request.index_name,
                body=request.query,
                size=request.limit,
            )
        ):
            logger.warning("No Search Results")
            return None

        return [
            x["_source"]["doc"] | {"_index": x["_index"], "_id": x["_id"]}
            for x in results["hits"]["hits"]
        ]
    except Exception as e:
        logger.critical("Exception Searching Elasticsearch: " + str(e))
        return None


async def shutdown():
    if not es:
        logger.warning("Elasticsearch not initialized")
        return None

    await es.close()
    logger.warning("Elasticsearch Client Shutdown")


async def status():
    if not es:
        return {"msg": "Elasticsearch is not initialized"}

    return await es.cluster.health()


async def get(index: str, id: str) -> Optional[Dict]:
    if not es:
        logger.warning("Elasticsearch not initialized")
        return None

    try:
        if not (contact := await es.get(index=index, id=id)):
            return None

        return contact["_source"]["doc"] | {
            "_index": contact["_index"],
            "_id": contact["_id"],
        }
    except Exception as e:
        logger.critical(f"Exception Getting Contact, {index=}, {id=}: {str(e)}")
        return None


async def search(index: str, query: str, limit: int):
    if not es:
        logger.warning("Elasticsearch not initialized")
        return None

    try:
        if not (
            results := await es.search(
                index=index,
                body={"query": {"multi_match": {"query": query}}},
                size=limit,
            )
        ):
            logger.warning("No Search Results")
            return None

        return [
            x["_source"]["doc"] | {"_index": x["_index"], "_id": x["_id"]}
            for x in results["hits"]["hits"]
        ]
    except Exception as e:
        logger.critical("Exception Searching Elasticsearch: " + str(e))
        return None

async def add_json(request: ElasticsearchAddjsonRequest) -> Optional[bool]:
    if not es:
        logger.warning("Elasticsearch not initialized")
        return None

    async def row_generator(index_name: str, rows: Dict) -> Dict:
        for k in rows:
            logger.debug(k)
            logger.debug(type(rows[k]))
            if type(rows[k])!=str:
                for v in rows[k]:
                    logger.debug(v)
                    yield {
                        "_op_type": "create",
                        "_index": index_name,
                        '_type': '_doc',
                        "_id": str(uuid.uuid4()),
                        "_source": v
                    }
            else:
                yield {
                        "_op_type": "create",
                        "_index": index_name,
                        '_type': '_doc',
                        "_id": str(uuid.uuid4()),
                        "_source": rows[k]
                    }

    try:
        progress = tqdm(unit="rows", total=len(request.records))
        successes = 0

        if not (await es.indices.exists(index=request.index_name)):
            await es.indices.create(index=request.index_name)

        async for ok, action in async_streaming_bulk(
            client=es,
            index=request.index_name,
            actions=row_generator(
                index_name=request.index_name,
                rows=request.records,
            ),
            raise_on_exception=False,
        ):
            progress.update(1)
            successes += ok

        logger.success(f"Database Add Completed, {successes=}, {len(request.records)}")
        return True
    except Exception as e:
        logger.critical("Exception Adding to Elasticsearch: " + str(e))
        return None

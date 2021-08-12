from fastapi import APIRouter
from loguru import logger
from elasticsearch import Elasticsearch

router = APIRouter(prefix="/filter", tags=["Customize Search"])


@router.get("/location")
async def get_location(search_location: str = None):
    print("Query Param>>>>", search_location)
    es = Elasticsearch()
    query_res = {}
    if search_location:
        query_res = {
            "query": {
                "wildcard": {
                    "location": f"*{search_location}*"
                }
            }
        }
    else:
        query_res = {"query": {"match_all": {}}}

    res = es.search(index="people_location", body=query_res)

    for hit in res['hits']['hits']:
        print(">>>>", hit)
    return res

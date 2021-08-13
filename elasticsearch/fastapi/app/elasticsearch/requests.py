from typing import Dict, List

from pydantic import BaseModel, constr


class ElasticsearchQueryRequest(BaseModel):
    index_name: constr(
        to_lower=True, strip_whitespace=True, min_length=3
    ) = "analystt.*"
    query: Dict
    limit: int = 10


class ElasticsearchAddRequest(BaseModel):
    index_name: constr(
        to_lower=True, strip_whitespace=True, min_length=3
    ) = "analystt.default"
    records: List[Dict]

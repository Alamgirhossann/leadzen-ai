from functools import reduce
from typing import Optional, Dict

import pandas as pd
from elasticsearch_dsl import Q
from loguru import logger

from app.config import API_CONFIG_MANDATORY_COLUMNS
from app.requests import ContactAddRequest, ContactSearchRequest


def check_for_mandatory_columns(df: pd.DataFrame) -> bool:
    checks = [x in df.columns for x in API_CONFIG_MANDATORY_COLUMNS]
    logger.debug(f"{checks=}")
    return all(checks)


def spread_comma_seperated_texts(df: pd.DataFrame) -> pd.DataFrame:
    df.PhoneNumbers = df.PhoneNumbers.apply(
        lambda x: None if not x else str(x).replace(",", ", ")
    )

    if "Vehicles" in df.columns:
        df.Vehicles = df.Vehicles.apply(
            lambda x: None if not x else str(x).replace(",", ", ")
        )

    if "Addresses" in df.columns:
        df.Addresses = df.Addresses.apply(
            lambda x: None if not x else str(x).replace(",", ", ")
        )

    if "Companies" in df.columns:
        df.Companies = df.Companies.apply(
            lambda x: None if not x else str(x).replace(",", ", ")
        )

    return df


def clean_and_convert_to_dataframe(
    request: ContactAddRequest,
) -> Optional[pd.DataFrame]:
    try:
        if not (data := [x.dict() for x in request.contacts]):
            logger.warning("No data in add request")
            return None

        df = pd.DataFrame(data)

        return spread_comma_seperated_texts(df=df)
    except Exception as e:
        logger.critical("Exception converting add request to dataframe: " + str(e))
        return None


# def make_elasticsearch_queries(request: ContactSearchRequest) -> Optional[Dict]:
#     queries = []
#
#     if request.customer_names:
#         temp_queries = [Q("match", CustomerName=x) for x in request.customer_names]
#         combined_queries = reduce(lambda x, y: x | y, temp_queries)
#         logger.debug(f"{combined_queries=}")
#         queries.append(combined_queries)
#
#     if request.addresses:
#         temp_queries = [Q("match", Addresses=x) for x in request.addresses]
#         combined_queries = reduce(lambda x, y: x | y, temp_queries)
#         logger.debug(f"{combined_queries=}")
#         queries.append(combined_queries)
#
#     if request.phone_numbers:
#         temp_queries = [Q("match", PhoneNumbers=x) for x in request.phone_numbers]
#         combined_queries = reduce(lambda x, y: x | y, temp_queries)
#         logger.debug(f"{combined_queries=}")
#         queries.append(combined_queries)
#
#     if request.companies:
#         temp_queries = [Q("match", Companies=x) for x in request.companies]
#         combined_queries = reduce(lambda x, y: x | y, temp_queries)
#         logger.debug(f"{combined_queries=}")
#         queries.append(combined_queries)
#
#     if not queries:
#         logger.warning("No Queries")
#         return None
#
#     logger.debug(f"{queries=}")
#     final_query = reduce(lambda x, y: x & y, queries)
#
#     logger.debug(f"{final_query=}")
#     return final_query.to_dict()

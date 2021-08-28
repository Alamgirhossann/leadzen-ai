import asyncio
from typing import Dict, Optional, List

import httpx
from fastapi import HTTPException
from loguru import logger
from starlette import status

from app.config import (
    API_CONFIG_TEXAU_KEY,
    API_CONFIG_TEXAU_EXECUTION_URL,
    API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL,
)
from app.texau.common import TexAuResult


async def get_status_once(execution_id: str) -> TexAuResult:
    # try:
    #     async with httpx.AsyncClient() as client:
    #         headers = {
    #             "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
    #             "Content-Type": "application/json",
    #         }
    #
    #         response = await client.get(
    #             f"{API_CONFIG_TEXAU_EXECUTION_URL}{execution_id}", headers=headers
    #         )
    #
    #         if response.status_code != 200:
    #             logger.warning(f"invalid {response.status_code=}")
    #             raise HTTPException(
    #                 status_code=response.status_code,
    #                 detail=f"Invalid Response, {execution_id=}",
    #             )
    #
    #         if not (data := response.json()):
    #             logger.warning(f"no data {response.status_code=}")
    #             raise HTTPException(
    #                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #                 detail=f"Invalid Data, {execution_id=}",
    #             )
    #
    #         if (
    #             data["execution"]["status"] == "completed"
    #             and data["execution"].get("output") is not None
    #         ):
    #             logger.success(f"Got Task Results: {data.keys()=}, {execution_id=}")
    #
    #             if not isinstance(data["execution"]["output"], list):
    #                 return TexAuResult(data=[data["execution"]["output"]])
    #
    #             return TexAuResult(data=data["execution"]["output"])
    #         elif data["execution"]["status"] == "cookieError":
    #             logger.error(f"Cookie Error, Cannot Proceed, {execution_id=}")
    #             raise HTTPException(
    #                 status_code=status.HTTP_403_FORBIDDEN,
    #                 detail=f"Cookie Error, Cannot Proceed, {execution_id=}",
    #             )
    #         else:
    #             logger.warning(f'{data["execution"]["status"]=}, {execution_id=}')
    #             raise HTTPException(
    #                 status_code=status.HTTP_404_NOT_FOUND,
    #                 detail=f"No Results Found, {execution_id=}",
    #             )
    # except HTTPException as e:
    #     logger.warning(f"HTTPException re-raised")
    #     raise e
    # except Exception as e:
    #     logger.critical(f"Exception Getting Task Status: {execution_id=}: {str(e)}")
    #     raise HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #         detail=f"Exception Getting Task Status, {execution_id=}",
    #     )
    result = [
        {
            "url": "https://www.linkedin.com/in/abhishekrab?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACjqfjABzUmS5DGfnTHIHgCVKABV6E73ISQ",
            "currentJob": "none",
            "pastJob": "none",
            "name": "R. Abhishek B.E, MBA.,",
            "firstName": "R.",
            "lastName": "Abhishek B.E, MBA.,",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/D5635AQHuxI1II_5pPg/profile-framedphoto-shrink_100_100/0/1628529976577?e=1629867600&v=beta&t=NIlaj71grelD3tFOIhAJmRONBXBZwI-JyBJYvLLPDsc",
            "job": "Networking globally for creating a progressive & a prosperous world together!",
            "location": "Karnataka, India",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.989Z"
        },
        {
            "url": "https://www.linkedin.com/in/abhishek-gupta-1990?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAWb3vYBWNkN_IaWxaopX-d4cUvm8Jeea1o",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek Gupta",
            "firstName": "Abhishek",
            "lastName": "Gupta",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQGV1ALjWpARBA/profile-displayphoto-shrink_100_100/0/1565816154279?e=1635379200&v=beta&t=3UhhAk2MsBWohr_Dg0U7tOD0W51MCW7utZJdqxOYkmU",
            "job": "Senior Consultant at Deloitte Consulting | Carnegie Mellon - Tepper MBA",
            "location": "Pittsburgh, PA",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "url": "https://www.linkedin.com/in/abhishek-kumar-55b35517?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAANuzdcBBgB5QVyCwaAvDBOuOyWSmT-6eNM",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek Kumar",
            "firstName": "Abhishek",
            "lastName": "Kumar",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQGoIE4A3tiheg/profile-displayphoto-shrink_100_100/0/1516625971983?e=1635379200&v=beta&t=zX8a4AGolnkkN1S3aAddAtb2MijusDFgtQGcxxP1TaY",
            "job": "Buying&Merchandising-Beverly Hills Polo Club (Apparel Group)",
            "location": "United Arab Emirates",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "url": "https://www.linkedin.com/in/abhisheksmakkar?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAH1BRkBR919tKreBtmIqqL32bU51if79cI",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek Singh Makkar",
            "firstName": "Abhishek",
            "lastName": "Singh Makkar",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQHlpFVGHAVNrQ/profile-displayphoto-shrink_100_100/0/1516347978519?e=1635379200&v=beta&t=Vgek3NoLzM8DlctkQE3NdxGhcEPsdb2eM9KAHpvBMOE",
            "job": "Restaurateur, Small Business Owner",
            "location": "Redmond, WA",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "url": "https://www.linkedin.com/in/abhishek-kumar-953824205?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADRE8k8BhPhWEXPBBIvllSoWTLSLG6t_VC0",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek Kumar",
            "firstName": "Abhishek",
            "lastName": "Kumar",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEeC75NLg2-Ig/profile-displayphoto-shrink_100_100/0/1617211181084?e=1635379200&v=beta&t=xU7A2XXAMFqO-sG8_9dzz1p8H_WACubHujsfx8u-ICg",
            "job": "Done-For-You Bestselling Book for Entrepreneurs, Coaches & Consultants 🚀 Author Associate at BestsellingBook.com 🌟",
            "location": "Boca Raton, FL",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "url": "https://www.linkedin.com/in/pandaabhishek?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAABCFbsABidoqCwh4vW07NxRxvR9_Kg-3Jcg",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek Panda",
            "firstName": "Abhishek",
            "lastName": "Panda",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQE_xPd_YqLRsA/profile-displayphoto-shrink_100_100/0/1516662920732?e=1635379200&v=beta&t=amJ--NiMSXDwzcbhG0JjwML7tw_H1rx3XimKnMD0vKo",
            "job": "Network Engineer-3 at Charter Communications",
            "location": "Englewood, CO",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "url": "https://www.linkedin.com/in/abhishek-raichura?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAABvqlzABNzZoDm0F0j_ptZURL61CXmGhsbs",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek Raichura",
            "firstName": "Abhishek",
            "lastName": "Raichura",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQHe0Q_7CdTOkw/profile-displayphoto-shrink_100_100/0/1589625605596?e=1635379200&v=beta&t=dQ8-3tyUrKNmalh9lm0zhktF72_xj1PoC1z3A7m9eO8",
            "job": "I build website that helps you Unravel your Online Presence",
            "location": "Rajkot",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "url": "https://www.linkedin.com/in/abhishek-john-57519896?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAABRQ_ikBwtzHMCCS2SgCzYJFlf70Hl4-K2s",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek John",
            "firstName": "Abhishek",
            "lastName": "John",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEznCYmqUs_3g/profile-displayphoto-shrink_100_100/0/1516814119172?e=1635379200&v=beta&t=mTEbU56_QN7_N2BbVIZ5fjQpAIBu6L_rs01V17_15NI",
            "job": "Research",
            "location": "Boston, MA",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "url": "https://www.linkedin.com/in/abhishek-c-773923a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAHqhocBkxbZSgD58ZLNwvQa-4-deiwrFfs",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek C.",
            "firstName": "Abhishek",
            "lastName": "C.",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQHqQ_LUIyHOmw/profile-displayphoto-shrink_100_100/0/1537885697995?e=1635379200&v=beta&t=dtq6CwU_kJKXp5BovCvY5KO1siUGE3Xl_A80NmkcaxM",
            "job": "Director at Overseas Corporate Professional",
            "location": "St Petersburg, FL",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "url": "https://www.linkedin.com/in/abhishek-singh-wstudios?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACnruvMBQc6Ru6PWuREYLuxvqDLHTtcpjTY",
            "currentJob": "none",
            "pastJob": "none",
            "name": "Abhishek Singh",
            "firstName": "Abhishek",
            "lastName": "Singh",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQFzpf2oZcBcbg/profile-displayphoto-shrink_100_100/0/1629231980358?e=1635379200&v=beta&t=3pxop_I9Ga6cdJZ-YE7ckIA1gq2HlB-VenYJQZwl_Jk",
            "job": "Founder & CEO | Customer 1st | E-Commerce & Brand Management | Photo Shoot & Campaigns | In house International Model | Creator | Learner | Growth Hacker",
            "location": "Greater Delhi Area",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "People",
            "timestamp": "2021-08-24T04:44:09.990Z"
        },
        {
            "name": "Abhishek Basumata",
            "firstName": "Abhishek",
            "lastName": "Basumata",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Manager at Abhishek Farming Ltd.",
            "url": "https://www.linkedin.com/in/abhishek-basumata-1b046b48",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQFYg6I2Cjfeaw/profile-displayphoto-shrink_100_100/0/1604408007424?e=1635379200&v=beta&t=kxbr3dmrfqeRes49cfBPeMr065ZFtkJ-w5k-nDkzvKI",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek De",
            "firstName": "Abhishek",
            "lastName": "De",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Manager at Deloitte Consulting LLP",
            "url": "https://www.linkedin.com/in/abhishek-de-b0643316",
            "profilePicture": "none",
            "location": "Greater Philadelphia",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Bansal",
            "firstName": "Abhishek",
            "lastName": "Bansal",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Owner, Abhishek, Inc.",
            "url": "https://www.linkedin.com/in/abhishek-bansal-8311b220",
            "profilePicture": "none",
            "location": "New Alexandria, VA",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "abhishek verma",
            "firstName": "abhishek",
            "lastName": "verma",
            "currentJob": "none",
            "pastJob": "none",
            "job": "abhishek verma at dhndhe",
            "url": "https://www.linkedin.com/in/abhishek-verma-40935917a",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek .",
            "firstName": "Abhishek",
            "lastName": ".",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Bring world best talent to play in Bay Area, CA",
            "url": "https://www.linkedin.com/in/abhishek-19856640",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQFUt8hWgk_zlQ/profile-displayphoto-shrink_100_100/0/1516903569363?e=1635379200&v=beta&t=lEKNY9ukJvd523fQyw5utlE7Z1xcRTQWhjE0xFtt5F8",
            "location": "San Francisco, CA",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Ankit Abhishek",
            "firstName": "Ankit",
            "lastName": "Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Management Consultant",
            "url": "https://www.linkedin.com/in/ankit-abhishek-b9a30b45",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQFIP8KpvjC4Ng/profile-displayphoto-shrink_100_100/0/1517397139700?e=1635379200&v=beta&t=wYCnwNDyxz6dA4B6WZ_aiQiMDyYWxcpSepwfuz5remY",
            "location": "Boston, MA",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Dcosta",
            "firstName": "Abhishek",
            "lastName": "Dcosta",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Deputy General Manager at McKinsey & Company",
            "url": "https://www.linkedin.com/in/abhishek-dcosta-53915818a",
            "profilePicture": "none",
            "location": "New York City Metropolitan Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Gupta",
            "firstName": "Abhishek",
            "lastName": "Gupta",
            "currentJob": "none",
            "pastJob": "none",
            "job": ".net consultant",
            "url": "https://www.linkedin.com/in/-868a4b126",
            "profilePicture": "none",
            "location": "Greater Chattanooga",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Mandlik",
            "firstName": "Abhishek",
            "lastName": "Mandlik",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Manager at Deloitte Consulting US",
            "url": "https://www.linkedin.com/in/abhishek-mandlik-6a1415a9",
            "profilePicture": "none",
            "location": "Mount Juliet, TN",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Kumar",
            "firstName": "Abhishek",
            "lastName": "Kumar",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Study at Massachusetts Institute of Technology (MIT).",
            "url": "https://www.linkedin.com/in/abhishek-kumar-026773114",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5103AQFVzsYDSVrMtA/profile-displayphoto-shrink_100_100/0/1517373598579?e=1635379200&v=beta&t=H5DEEzHPAlI9o11-txpCEDdo2kBQcdWVXrk1CO0NM00",
            "location": "Cambridge, MA",
            "timestamp": "Tue, 24 Aug 2021 04:44:18 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Reddy",
            "firstName": "Abhishek",
            "lastName": "Reddy",
            "currentJob": "none",
            "pastJob": "none",
            "job": "MD/Entrepreneur",
            "url": "https://www.linkedin.com/in/abhishek-reddy-4537308b",
            "profilePicture": "none",
            "location": "Fort Wayne, IN",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Kumar Singh Abhishek Kumar Singh",
            "firstName": "Abhishek",
            "lastName": "Kumar Singh Abhishek Kumar Singh",
            "currentJob": "none",
            "pastJob": "none",
            "job": "General Manager at Nike",
            "url": "https://www.linkedin.com/in/abhishek-kumar-singh-abhishek-kumar-singh-504087202",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQGOg7E2xzhSKQ/profile-displayphoto-shrink_100_100/0/1607957975544?e=1635379200&v=beta&t=6_5otsj4kN8dr2PSxUEFVDWwveGF4cy1ilfSuPNdXp8",
            "location": "Los Angeles, CA",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Abhishek",
            "firstName": "Abhishek",
            "lastName": "Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Student at Penn State University.",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-3b603415b",
            "profilePicture": "none",
            "location": "University Park, PA",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Subhan",
            "firstName": "Abhishek",
            "lastName": "Subhan",
            "currentJob": "none",
            "pastJob": "none",
            "job": "President",
            "url": "https://www.linkedin.com/in/abhishek-subhan-7a520a55",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5103AQFvdb0UTxd3Kg/profile-displayphoto-shrink_100_100/0/1516848128354?e=1635379200&v=beta&t=G3EapgU-K5nEzDI339doSYYCeQnSJZySXqGGcsv2Q80",
            "location": "Downers Grove, IL",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "ABhishek pirojiwal",
            "firstName": "ABhishek",
            "lastName": "pirojiwal",
            "currentJob": "none",
            "pastJob": "none",
            "job": "owner at om distributor",
            "url": "https://www.linkedin.com/in/abhishek-pirojiwal-6505ba5b",
            "profilePicture": "none",
            "location": "Youngstown, OH",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Thakur",
            "firstName": "Abhishek",
            "lastName": "Thakur",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Recruitment Specialist",
            "url": "https://www.linkedin.com/in/abhishek-thakur-291475188",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5103AQEKrfuYION0cw/profile-displayphoto-shrink_100_100/0/1559579018538?e=1635379200&v=beta&t=46HBMwjtk_XAOa7ISYSrq4U9SYCXGxaL-uFEXr3Aucc",
            "location": "Wilmington, DE",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Abhishek",
            "firstName": "Abhishek",
            "lastName": "Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Lead at American express",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-9094877",
            "profilePicture": "none",
            "location": "Phoenix, AZ",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Christian",
            "firstName": "Abhishek",
            "lastName": "Christian",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Team Lead at Maximus",
            "url": "https://www.linkedin.com/in/abhishek-christian-5052a2170",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQHz_r1sbdbmuQ/profile-displayphoto-shrink_100_100/0/1536114748185?e=1635379200&v=beta&t=zy83iZ7ZCL-XQoFcHyLVfC7SM9pFoGPJRRgGsPdQSeY",
            "location": "Jersey City, NJ",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Krishnan",
            "firstName": "Abhishek",
            "lastName": "Krishnan",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Research Scientist at Google",
            "url": "https://www.linkedin.com/in/abhishek-krishnan-2903237",
            "profilePicture": "none",
            "location": "San Francisco Bay Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Abhishek",
            "firstName": "Abhishek",
            "lastName": "Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "EXECUTIVE SECY at R.L. Schreiber, Inc.",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-2762b06",
            "profilePicture": "none",
            "location": "Floral Park, NY",
            "timestamp": "Tue, 24 Aug 2021 04:44:20 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Bajaj",
            "firstName": "Abhishek",
            "lastName": "Bajaj",
            "currentJob": "none",
            "pastJob": "none",
            "job": "--",
            "url": "https://www.linkedin.com/in/abhishek-bajaj-28507291",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQEtxGf38qYwEg/profile-displayphoto-shrink_100_100/0/1629285815579?e=1635379200&v=beta&t=CdnE388xWkgf-MB99szzeSajEQRz-SW_g81bmQP-y1U",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Abhishek",
            "firstName": "Abhishek",
            "lastName": "Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Title at Kaplan Financial",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-62560410",
            "profilePicture": "none",
            "location": "Climax Springs, MO",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek vaishanv Abhishek",
            "firstName": "Abhishek",
            "lastName": "vaishanv Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "--",
            "url": "https://www.linkedin.com/in/abhishek-vaishanv-abhishek-194974188",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Singh Abhishek",
            "firstName": "Abhishek",
            "lastName": "Singh Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "--",
            "url": "https://www.linkedin.com/in/abhishek-singh-abhishek-35883041",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Belgaum Abhishek",
            "firstName": "Abhishek",
            "lastName": "Belgaum Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "--",
            "url": "https://www.linkedin.com/in/abhishek-belgaum-abhishek-06354073",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "abhishek Abhishek.Am47",
            "firstName": "abhishek",
            "lastName": "Abhishek.Am47",
            "currentJob": "none",
            "pastJob": "none",
            "job": "--",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-am47-4b224593",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "abhishek Abhishek.Srivastava",
            "firstName": "abhishek",
            "lastName": "Abhishek.Srivastava",
            "currentJob": "none",
            "pastJob": "none",
            "job": "--",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-srivastava-76619416",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "abhishek dixit",
            "firstName": "abhishek",
            "lastName": "dixit",
            "currentJob": "none",
            "pastJob": "none",
            "job": "sales",
            "url": "https://www.linkedin.com/in/abhishek-dixit-a9461b177",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5103AQFhzdClUnATfA/profile-displayphoto-shrink_100_100/0/1544640706995?e=1635379200&v=beta&t=1exzpeHhVl6yQUuQ8O7RvTbG9QqVyVeGa7h0ZWNA5x4",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Kumar",
            "firstName": "Abhishek",
            "lastName": "Kumar",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Direct Admit Student to the Kelley School of Business",
            "url": "https://www.linkedin.com/in/abhishek-kumar-8329241bb",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQEMRuSa9PTv9g/profile-displayphoto-shrink_100_100/0/1628693465053?e=1635379200&v=beta&t=-T2xmP0opphrj-CeRSv-nCXuGZ0ABcu-FNWmPzrHzcM",
            "location": "Greater Chicago Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "abhishek Abhishek_Redij",
            "firstName": "abhishek",
            "lastName": "Abhishek_Redij",
            "currentJob": "none",
            "pastJob": "none",
            "job": "--",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-redij-81847829",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:21 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "abhishek Abhishek",
            "firstName": "abhishek",
            "lastName": "Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Student at Fairleigh Dickinson University",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-8b158b16",
            "profilePicture": "none",
            "location": "Jersey City, NJ",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Abhishek.Agnihotri",
            "firstName": "Abhishek",
            "lastName": "Abhishek.Agnihotri",
            "currentJob": "none",
            "pastJob": "none",
            "job": "System Admin at MediaAgility",
            "url": "https://www.linkedin.com/in/abhishek-abhishek-agnihotri-2201b074",
            "profilePicture": "none",
            "location": "Princeton, NJ",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Singh",
            "firstName": "Abhishek",
            "lastName": "Singh",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Tata Consultancy Services",
            "url": "https://www.linkedin.com/in/abhishek-singh-1015b515b",
            "profilePicture": "none",
            "location": "Germantown, TN",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek lal",
            "firstName": "Abhishek",
            "lastName": "lal",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Area Sales Manager at Britannia Industries Ltd",
            "url": "https://www.linkedin.com/in/abhishek-lal-a99142185",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQFyb8lD8weEqA/profile-displayphoto-shrink_100_100/0/1627321650304?e=1635379200&v=beta&t=SaZiHf-HaxHaHCqb1cgdDL9A7xcLggzhQmLweLf9074",
            "location": "Patna",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek A.",
            "firstName": "Abhishek",
            "lastName": "A.",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Mechanical Engineer at Prismview",
            "url": "https://www.linkedin.com/in/abajri",
            "profilePicture": "none",
            "location": "Logan, UT",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek A.",
            "firstName": "Abhishek",
            "lastName": "A.",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Vice President, Engineering - Kaia, Voice and Knowledge Platform @ Outreach",
            "url": "https://www.linkedin.com/in/abhishek-a-13b5a995",
            "profilePicture": "none",
            "location": "Greater Seattle Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Zunjare",
            "firstName": "Abhishek",
            "lastName": "Zunjare",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Digital Entrepreneur •• Author of E-Book •• Business Stretgy Analyst •• SMM Manager",
            "url": "https://www.linkedin.com/in/abhishek-zunjare-b39318161",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5103AQHe00JsL1Vh-Q/profile-displayphoto-shrink_100_100/0/1576086355575?e=1635379200&v=beta&t=TMNOiiovES34d9FNyaNEGsOaGzMFDbbF11eJHLHtKnQ",
            "location": "Buldhana",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Shetty",
            "firstName": "Abhishek",
            "lastName": "Shetty",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Managing Director",
            "url": "https://www.linkedin.com/in/abhishekshetty",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQGxATrA9dCUNw/profile-displayphoto-shrink_100_100/0/1605181512633?e=1635379200&v=beta&t=s8j9HSfseBiRSDhDSDJnz4BqBf2vhdtM-UHIHR_Ya7I",
            "location": "Chicago, IL",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Singh",
            "firstName": "Abhishek",
            "lastName": "Singh",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Manager at ZS",
            "url": "https://www.linkedin.com/in/abhishek-singh-aa1b103a",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQGBY5Jq_MofbA/profile-displayphoto-shrink_100_100/0/1606193499484?e=1635379200&v=beta&t=8safXCRn6CXICXVc0ewg323oGRL3mBdOH5rxv25Hxqc",
            "location": "Philadelphia, PA",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Rana",
            "firstName": "Abhishek",
            "lastName": "Rana",
            "currentJob": "none",
            "pastJob": "none",
            "job": "I am looking forward in having an opportunity in the field of electrical engineering",
            "url": "https://www.linkedin.com/in/abhishek-rana-38127b64",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQFq_rjmRRCp6w/profile-displayphoto-shrink_100_100/0/1579988743047?e=1635379200&v=beta&t=EC1j75zhkyF8ffjwTZ6_EGPwWGAhgEdRNq_Qx-uNde8",
            "location": "New York City Metropolitan Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:23 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Saraf",
            "firstName": "Abhishek",
            "lastName": "Saraf",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Summer Consultant at Boston Consulting Group (BCG) | MBA Candidate at UC Berkeley, Haas School of Business",
            "url": "https://www.linkedin.com/in/abhishek-saraf",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQGs3SB8W9K3Fw/profile-displayphoto-shrink_100_100/0/1602577775274?e=1635379200&v=beta&t=VGZ52wyXDvbgoOzTtLsZg7V5erg0RMTKO_IEGdWibuU",
            "location": "Berkeley, CA",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek .",
            "firstName": "Abhishek",
            "lastName": ".",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Lead Recruiter - Pharmaceutical and Life Sciences Division",
            "url": "https://www.linkedin.com/in/abhishek-7b599b12a",
            "profilePicture": "none",
            "location": "San Francisco Bay Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Mathur",
            "firstName": "Abhishek",
            "lastName": "Mathur",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Real Estate Innovator, Investor, Speaker, Board Director",
            "url": "https://www.linkedin.com/in/mathurpriamcapital",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQHHsOckgy5Eqw/profile-displayphoto-shrink_100_100/0/1516491991020?e=1635379200&v=beta&t=f1_DmkpJVB-SmuypcA0ioIr7SmBqJkIB6T26gSIQv20",
            "location": "Nashville, TN",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Abhishek",
            "firstName": "Abhishek",
            "lastName": "Abhishek",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Business Analyst",
            "url": "https://www.linkedin.com/in/sahuabhishek",
            "profilePicture": "none",
            "location": "Greater Delhi Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Chhonkar",
            "firstName": "Abhishek",
            "lastName": "Chhonkar",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Project Leader at BCG | Kellogg MBA",
            "url": "https://www.linkedin.com/in/abhishekchhonkar",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQEJbIfpkJF7Gw/profile-displayphoto-shrink_100_100/0/1517241132791?e=1635379200&v=beta&t=EGuyBIJdfb16HHGO6iMpBoK1d86goEH3Ox4FqV7vgeM",
            "location": "Chicago, IL",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Sansanwal 🌱",
            "firstName": "Abhishek",
            "lastName": "Sansanwal 🌱",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Product Manager @ Neutrify | 2x TEDx Speaker | Cornell University | #40Under40",
            "url": "https://www.linkedin.com/in/iswiftshek",
            "profilePicture": "none",
            "location": "Ithaca, NY",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Bose",
            "firstName": "Abhishek",
            "lastName": "Bose",
            "currentJob": "none",
            "pastJob": "none",
            "job": "MIT | Tesla | EY | IITKGP",
            "url": "https://www.linkedin.com/in/abhishekbose95",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEZkRlpK-LD6A/profile-displayphoto-shrink_100_100/0/1609489324029?e=1635379200&v=beta&t=lM8nr4UI90_Vh2oAThJWF6Y-wtCNvjkLJLjf_bR9SAI",
            "location": "Cambridge, MA",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Goel",
            "firstName": "Abhishek",
            "lastName": "Goel",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Founder | CEO | Chief Behavior Expert",
            "url": "https://www.linkedin.com/in/theabhishekgoel",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQFQo1BW2WlT9Q/profile-displayphoto-shrink_100_100/0/1592861197403?e=1635379200&v=beta&t=nYkVlPxgUKkB7ZdJSht2HurRvcmFuNsmbP6U4DAa4Sc",
            "location": "Dallas-Fort Worth Metroplex",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Anchal",
            "firstName": "Abhishek",
            "lastName": "Anchal",
            "currentJob": "none",
            "pastJob": "none",
            "job": "IT Consulting / Talent Acquisition",
            "url": "https://www.linkedin.com/in/aanchal",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQFkWSa82TFVwA/profile-displayphoto-shrink_100_100/0/1516345986301?e=1635379200&v=beta&t=sCYWWZwA_bKG_YDdtf9fQsA9Gy5a-GgA_JJAuB6AA4E",
            "location": "Irving, TX",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Atmakuri",
            "firstName": "Abhishek",
            "lastName": "Atmakuri",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Business Development | Contact Center Operations | Digital Marketing | Sales Strategy | TA |",
            "url": "https://www.linkedin.com/in/abhishek-atmakuri",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQFpypqnyd9W_A/profile-displayphoto-shrink_100_100/0/1588446687891?e=1635379200&v=beta&t=JjrtN-8d4nQyKwL7Rolrs-layIO3c5yYFdFgb99U9ww",
            "location": "Hyderabad",
            "timestamp": "Tue, 24 Aug 2021 04:44:25 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Panditrao",
            "firstName": "Abhishek",
            "lastName": "Panditrao",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Principal at ZS",
            "url": "https://www.linkedin.com/in/abhishek-panditrao-39b6bba",
            "profilePicture": "none",
            "location": "San Mateo, CA",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Balakrishnan",
            "firstName": "Abhishek",
            "lastName": "Balakrishnan",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Strategist at BCG BrightHouse l Purpose and Innovation",
            "url": "https://www.linkedin.com/in/abhishekbalak",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQE_C0Z0sBzpeA/profile-displayphoto-shrink_100_100/0/1589383487630?e=1635379200&v=beta&t=Gcn8nPIH3DMyuPfFUynnA0aMa1UYmNAiMUp-HV5Toqo",
            "location": "Greater Boston",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Iyer",
            "firstName": "Abhishek",
            "lastName": "Iyer",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Specialist Consultant - Supply Chain at Bain & Company",
            "url": "https://www.linkedin.com/in/iyerabhishek",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQG-JJm1hGX8UA/profile-displayphoto-shrink_100_100/0/1601044919023?e=1635379200&v=beta&t=R0rX6mX-48t0vlJAMn_IsBtKhRLw_fZMCjPYzRFtN1U",
            "location": "Atlanta, GA",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Kumar",
            "firstName": "Abhishek",
            "lastName": "Kumar",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Manager at PwC",
            "url": "https://www.linkedin.com/in/abhishekkumar93",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQHSNm8BpwveIQ/profile-displayphoto-shrink_100_100/0/1610737994249?e=1635379200&v=beta&t=hULze59yFgp9_go0Wm9z-jRZ-XE3y186V4Tbw0az6qE",
            "location": "New York City Metropolitan Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Chandra",
            "firstName": "Abhishek",
            "lastName": "Chandra",
            "currentJob": "none",
            "pastJob": "none",
            "job": "CEO @ Recora Health | Co-Founder Spring Health | WEF Technology Pioneer | 30U30 Consumer Tech",
            "url": "https://www.linkedin.com/in/chandraabhishek",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQFdV4nhtO0T1w/profile-displayphoto-shrink_100_100/0/1516790038996?e=1635379200&v=beta&t=-UlEvbkbxAkerZSCY-oSC4cq69i0INoKNYjLHk3IeNk",
            "location": "New York, NY",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Patel",
            "firstName": "Abhishek",
            "lastName": "Patel",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Chemical Engineering Student at Villanova University",
            "url": "https://www.linkedin.com/in/abhishekpatel1208",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQFJ8pZ6gxk8ZA/profile-displayphoto-shrink_100_100/0/1584141702039?e=1635379200&v=beta&t=PrMOH0m6toPXLyVUBtojFjExatOdU3vXcC07_kqXrwc",
            "location": "New York City Metropolitan Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek .",
            "firstName": "Abhishek",
            "lastName": ".",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Software Engineer at Stripe (We're hiring!)",
            "url": "https://www.linkedin.com/in/abhishek-9467161a",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/D5635AQHTuu5qFHxpKA/profile-framedphoto-shrink_200_200/0/1623005550881?e=1629867600&v=beta&t=UFO2I_2WFNoXBwLkg0TBAMM7xTK3iSo6pz1mBJ6KFrY",
            "location": "Greater Seattle Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Shirali",
            "firstName": "Abhishek",
            "lastName": "Shirali",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Associate Partner (Senior Expert) at McKinsey & Company",
            "url": "https://www.linkedin.com/in/abhishekshirali",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQFNHEnhyrr2vw/profile-displayphoto-shrink_100_100/0/1543188035547?e=1635379200&v=beta&t=ycN8t8Rvvd5yL3Bugb1IQR6jcm0xtTIgjwnYF0mXY0Y",
            "location": "Atlanta, GA",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek T.",
            "firstName": "Abhishek",
            "lastName": "T.",
            "currentJob": "none",
            "pastJob": "none",
            "job": "quantum world technology",
            "url": "https://www.linkedin.com/in/abhishek-t-241450128",
            "profilePicture": "none",
            "location": "Raleigh-Durham-Chapel Hill Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Jagatap AJ",
            "firstName": "Abhishek",
            "lastName": "Jagatap AJ",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Chief Operating Officer at SOMETHING",
            "url": "https://www.linkedin.com/in/abhishek-jagatap-aj-06b8bb155",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQGXdkphFAi16Q/profile-displayphoto-shrink_100_100/0/1597901527854?e=1635379200&v=beta&t=DcOPd_EBf2cpW5n_GdwNtq-7GEscAJOEK-iOdzQ8ooM",
            "location": "Jamkhandi",
            "timestamp": "Tue, 24 Aug 2021 04:44:29 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Shankar",
            "firstName": "Abhishek",
            "lastName": "Shankar",
            "currentJob": "none",
            "pastJob": "none",
            "job": "President at Tech Mahindra",
            "url": "https://www.linkedin.com/in/abhishek-shankar-955555",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQGDbujSo8ILQw/profile-displayphoto-shrink_100_100/0/1516240678998?e=1635379200&v=beta&t=tb55Udny0E2tKr443-isT4x2KDA_0B4l3PErojKxF5M",
            "location": "Princeton, NJ",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Choudhary",
            "firstName": "Abhishek",
            "lastName": "Choudhary",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Subject Matter Expert",
            "url": "https://www.linkedin.com/in/abhishek-choudhary-258422149",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Khemka",
            "firstName": "Abhishek",
            "lastName": "Khemka",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Vice President at Goldman Sachs",
            "url": "https://www.linkedin.com/in/abhishek-khemka-329ba23",
            "profilePicture": "none",
            "location": "New York, NY",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "谢克ABHISHEK",
            "firstName": "谢克ABHISHEK",
            "lastName": "",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Investigation Specialist-CN Risk and Compliance Operations at Amazon HSK Certified",
            "url": "https://www.linkedin.com/in/abhishek-%E8%B0%A2%E5%85%8B-7a2623138",
            "profilePicture": "none",
            "location": "Hyderabad",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Chandwani",
            "firstName": "Abhishek",
            "lastName": "Chandwani",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Building | HBS, INDmoney, BCG, IIT KGP",
            "url": "https://www.linkedin.com/in/abhishekchandwani",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQH52I7EyLdHyw/profile-displayphoto-shrink_100_100/0/1610299535247?e=1635379200&v=beta&t=tm7mpwtMJeG_PY9S6yEeAu5jVF3wBD8qeNuGGRE83hc",
            "location": "New York, NY",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek C.",
            "firstName": "Abhishek",
            "lastName": "C.",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Sr. Technical Recruiter at DISYS",
            "url": "https://www.linkedin.com/in/abhishek-c-680435166",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5103AQEB8Fn27W90Bg/profile-displayphoto-shrink_100_100/0/1563564354836?e=1635379200&v=beta&t=kJYgmTXu7Tk1Zq7Y0T6Ia1uoC1c2jAZRcoDm4bs0x44",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Srivastava",
            "firstName": "Abhishek",
            "lastName": "Srivastava",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Founder and CEO at Global Trade Inc.",
            "url": "https://www.linkedin.com/in/abhishek-srivastava-75295b93",
            "profilePicture": "none",
            "location": "Woodridge, IL",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Arijit",
            "firstName": "Abhishek",
            "lastName": "Arijit",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Consultant at ZS",
            "url": "https://www.linkedin.com/in/abhishekarijit",
            "profilePicture": "none",
            "location": "Philadelphia, PA",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Choudhary",
            "firstName": "Abhishek",
            "lastName": "Choudhary",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Procurement Specialist at Marriott Hotels",
            "url": "https://www.linkedin.com/in/abhishek-choudhary-ab4b1918b",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEWDhtyHB12xw/profile-displayphoto-shrink_100_100/0/1591695075632?e=1635379200&v=beta&t=2XrvdPe_8D2TeMSBAv58YjfqA427XvqpK3nbFeoNuUg",
            "location": "India",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek .",
            "firstName": "Abhishek",
            "lastName": ".",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Managing Consultant - Government Healthcare and MMIS Systems",
            "url": "https://www.linkedin.com/in/abhishek-810a37b",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQFHcoQRT64mfQ/profile-displayphoto-shrink_100_100/0/1517706137730?e=1635379200&v=beta&t=rtny3O_BFc5OxlrmfPWJbU7XQKwHlaOBiamUvvRpd3E",
            "location": "Sacramento, CA",
            "timestamp": "Tue, 24 Aug 2021 04:44:31 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek arora",
            "firstName": "Abhishek",
            "lastName": "arora",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Software Developer at Accenture",
            "url": "https://www.linkedin.com/in/abhishek-arora-389b8560",
            "profilePicture": "none",
            "location": "Pune",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Bhatt",
            "firstName": "Abhishek",
            "lastName": "Bhatt",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Senior Director, Brand Marketing at CNBC | Author",
            "url": "https://www.linkedin.com/in/abhishekbhatt",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQH6Cqy2-tHdjQ/profile-displayphoto-shrink_100_100/0/1572024410778?e=1635379200&v=beta&t=y9ILD9IvN1W1sgcF6jq7VeHyQkUxiYnGsK2R82Ld-Cc",
            "location": "New York City Metropolitan Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Verma",
            "firstName": "Abhishek",
            "lastName": "Verma",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Manager at Deloitte",
            "url": "https://www.linkedin.com/in/abhishekkverma",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEXyrby2-Y8Vg/profile-displayphoto-shrink_100_100/0/1517270130939?e=1635379200&v=beta&t=Zd3UNG_GyRFGcXb9XU8PL2xyL6nYbFqhvf6GU29o7Dw",
            "location": "Atlanta, GA",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Ramanathan Iyer",
            "firstName": "Abhishek",
            "lastName": "Ramanathan Iyer",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Product Owner @ Nike | Duke",
            "url": "https://www.linkedin.com/in/abhishek-iyer27",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEryc_Tu59Kuw/profile-displayphoto-shrink_100_100/0/1573884451210?e=1635379200&v=beta&t=288_W1vqAEbTPLXxZgLjy4J_K0dlOX8RQs7ZNFkvXLU",
            "location": "Beaverton, OR",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek S.",
            "firstName": "Abhishek",
            "lastName": "S.",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Partner at Boston Consulting Group",
            "url": "https://www.linkedin.com/in/abshroff",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQFc-PUQGjX-bg/profile-displayphoto-shrink_100_100/0/1612719412848?e=1635379200&v=beta&t=N2snmV3u7rmYcWSodTPhbYUUPk3UEKULRIq-K0xOvb4",
            "location": "Chicago, IL",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Pratapa",
            "firstName": "Abhishek",
            "lastName": "Pratapa",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Apple in Seattle",
            "url": "https://www.linkedin.com/in/abhishek-pratapa-40a82988",
            "profilePicture": "none",
            "location": "Seattle, WA",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Goyal",
            "firstName": "Abhishek",
            "lastName": "Goyal",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Senior Associate, Corporate Performance Management at PwC",
            "url": "https://www.linkedin.com/in/goyalabhishek",
            "profilePicture": "none",
            "location": "Greater Chicago Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Jobanputra",
            "firstName": "Abhishek",
            "lastName": "Jobanputra",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Associate Director at PwC",
            "url": "https://www.linkedin.com/in/abhishek-jobanputra",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQGB-qcnBPF44g/profile-displayphoto-shrink_100_100/0/1516868796718?e=1635379200&v=beta&t=xd7fsGVq9Svg9jmrejSk2CniIdOKFkPnLhFm2JCe9bg",
            "location": "Mumbai Suburban district",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Pandey",
            "firstName": "Abhishek",
            "lastName": "Pandey",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Technical Recruiter at MILLENNIUM SILICON SERVICES (INDIA) PRIVATE LIMITED",
            "url": "https://www.linkedin.com/in/abhishek-pandey-066370102",
            "profilePicture": "none",
            "location": "Southfield, MI",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Reddy Tummala",
            "firstName": "Abhishek",
            "lastName": "Reddy Tummala",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Senior Consultant at Deloitte Consulting",
            "url": "https://www.linkedin.com/in/abhishek-reddy-tummala-9861b216",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQHm_Wk3dzSEIQ/profile-displayphoto-shrink_100_100/0/1516582187193?e=1635379200&v=beta&t=jrZQJpgX1Ea_V5d2_Pusi9l2H8K6HZYnQinJcjHRxMc",
            "location": "Minneapolis, MN",
            "timestamp": "Tue, 24 Aug 2021 04:44:33 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Banerjee",
            "firstName": "Abhishek",
            "lastName": "Banerjee",
            "currentJob": "none",
            "pastJob": "none",
            "job": "IIM Calcutta | IIT Kharagpur | Founder & CEO - Tigonis (Bengal Building Solutions Pvt Ltd)",
            "url": "https://www.linkedin.com/in/abhishek-banerjee-58583179",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEGV-vuiXCFxA/profile-displayphoto-shrink_100_100/0/1600836448145?e=1635379200&v=beta&t=b1ZAyzq-B2dKZ95dnYuZJ5VDhebnl7S680bPTS0oq7c",
            "location": "Kolkata",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Kumar Sah",
            "firstName": "Abhishek",
            "lastName": "Kumar Sah",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Mobile App Developer at India Today | Problem Solver",
            "url": "https://www.linkedin.com/in/abhishek-kumar-sah-737948144",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQG1CoCk8Tfltw/profile-displayphoto-shrink_100_100/0/1624805815154?e=1635379200&v=beta&t=QXqCzr1230PO5EzBujvhZdeSSabN4RD5qwjtr3C5t64",
            "location": "Delhi, India",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Rajput",
            "firstName": "Abhishek",
            "lastName": "Rajput",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Vice President at Goldman Sachs",
            "url": "https://www.linkedin.com/in/abhishek-rajput-67660117",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQGUJvkq9NK2fA/profile-displayphoto-shrink_100_100/0/1516632447744?e=1635379200&v=beta&t=kpHjC47lyUEwodZMrRtytWxILyy0g4sQwmedme5m1mw",
            "location": "New York, NY",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek S.",
            "firstName": "Abhishek",
            "lastName": "S.",
            "currentJob": "none",
            "pastJob": "none",
            "job": "NYU Stern School of Business",
            "url": "https://www.linkedin.com/in/abhisheksone",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQHw4_8Eemow1Q/profile-displayphoto-shrink_100_100/0/1586914686496?e=1635379200&v=beta&t=J7Dy2UllbtbKPktUGU4RspqQMNvdLDhwpT9jvfJThWQ",
            "location": "New York, NY",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Parekh",
            "firstName": "Abhishek",
            "lastName": "Parekh",
            "currentJob": "none",
            "pastJob": "none",
            "job": "MBA Candidate at Northwestern University - Kellogg School of Management",
            "url": "https://www.linkedin.com/in/abhishek-s-parekh",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4D03AQGPHHqr_5dTSQ/profile-displayphoto-shrink_100_100/0/1612371107682?e=1635379200&v=beta&t=zL2yvCxN4H6HZPUkC1mqxRQRPL-N1tV6E61dsq13DQ4",
            "location": "New York, NY",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Ratani",
            "firstName": "Abhishek",
            "lastName": "Ratani",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Entrepreneur, World Traveler, Former President and CTO at Red Ventures, Technologist, Leader",
            "url": "https://www.linkedin.com/in/abhishekratani",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQFDUg8LmeTqBg/profile-displayphoto-shrink_100_100/0/1517720863193?e=1635379200&v=beta&t=KjHkYJnU8TzlVM9nDcLDgfq49-A5UYGehFdyrQPfRS8",
            "location": "Charlotte Metro",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "ABHISHEK MAJUMDAR, PMP",
            "firstName": "ABHISHEK",
            "lastName": "MAJUMDAR, PMP",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Senior Manager at Deloitte Consulting",
            "url": "https://www.linkedin.com/in/abhishek-majumdar-pmp-9805971a",
            "profilePicture": "none",
            "location": "United States",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Bhatnagar",
            "firstName": "Abhishek",
            "lastName": "Bhatnagar",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Partner at McKinsey & Company, P&L owner, Service Ops leader",
            "url": "https://www.linkedin.com/in/abhishek-bhatnagar-164a07",
            "profilePicture": "none",
            "location": "Atlanta, GA",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Kumar",
            "firstName": "Abhishek",
            "lastName": "Kumar",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Senior Director | Strategy & Transactions | EY-Parthenon",
            "url": "https://www.linkedin.com/in/skmrabhishek",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEk3YEcyiuvwA/profile-displayphoto-shrink_100_100/0/1517745175022?e=1635379200&v=beta&t=4bHlWL9IXhHeIV-yVb6Um-SMO2BRRKv2NZ0yrNFvLpk",
            "location": "Greater Chicago Area",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        },
        {
            "name": "Abhishek Jha",
            "firstName": "Abhishek",
            "lastName": "Jha",
            "currentJob": "none",
            "pastJob": "none",
            "job": "Co-Founder & CEO, Elucidata (We are hiring!)",
            "url": "https://www.linkedin.com/in/abhishek-jha-ba20a821",
            "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQE54cBWWo6AtQ/profile-displayphoto-shrink_100_100/0/1584561514109?e=1635379200&v=beta&t=vEe3pLPhT8zecvfj9icQO0MG_tkLxZO1FFOOGr9oaNU",
            "location": "San Francisco, CA",
            "timestamp": "Tue, 24 Aug 2021 04:44:35 GMT",
            "query": "https://www.linkedin.com/search/results/people/?firstName=abhishek",
            "category": "people"
        }
    ]

    return TexAuResult(data=result)


async def get_status_waiting(
        execution_id: str, max_timeout_counter: int = 18
) -> Optional[TexAuResult]:
    if not execution_id:
        logger.warning("invalid execution id")
        return None

    try:
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"APIKey {API_CONFIG_TEXAU_KEY}",
                "Content-Type": "application/json",
            }

            timeout_counter = max_timeout_counter

            while timeout_counter > 0:
                response = await client.get(
                    f"{API_CONFIG_TEXAU_EXECUTION_URL}{execution_id}", headers=headers
                )

                if response.status_code == 200:
                    if data := response.json():
                        if (
                                data["execution"]["status"] == "completed"
                                and data["execution"].get("output") is not None
                        ):
                            logger.success(
                                f"Got Task Results: {data.keys()=}, {execution_id=}"
                            )

                            if not isinstance(data["execution"]["output"], list):
                                return TexAuResult(data=[data["execution"]["output"]])

                            return TexAuResult(data=data["execution"]["output"])
                        elif data["execution"]["status"] == "cookieError":
                            logger.error(
                                f"Cookie Error, Cannot Proceed, {execution_id=}"
                            )
                            return None
                        else:
                            logger.warning(
                                f'{data["execution"]["status"]=}, {execution_id=}'
                            )

                await asyncio.sleep(API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL)

                timeout_counter = timeout_counter - 1

            logger.warning(
                f"No results in {max_timeout_counter * API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL}s"
            )

            return None
    except Exception as e:
        logger.critical(f"Exception Getting Task Status: {execution_id=}: {str(e)}")
        return None

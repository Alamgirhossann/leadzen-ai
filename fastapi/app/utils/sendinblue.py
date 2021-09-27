from __future__ import print_function
import time
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from pprint import pprint
from loguru import logger
import httpx
from fastapi import HTTPException
from starlette import status
from app.config import API_CONFIG_SENDINBLUE_API_KEY,API_CONFIG_SENDINBLUE_EMAIL_VERIFICATION_TEMPLATE_ID

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key[
    "api-key"
] = API_CONFIG_SENDINBLUE_API_KEY

api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
    sib_api_v3_sdk.ApiClient(configuration)
)


def sendinblue_email_verification(templates_id, name, email_to, link):
    template_id = templates_id
    to = [{"email": email_to}]
    reply_to = {"email": "malhar@analystt.ai", "name": "LeadZen.ai"}
    params = {"name": name, "link": link}
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=to, reply_to=reply_to, template_id=template_id, params=params
    )

    try:
        api_response = api_instance.send_transac_email(send_smtp_email)
        logger.success(f"Verification Email Sent, {api_response=}")
    except ApiException as e:
        logger.critical("Error>>>" + str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="BadRequest for email verification",
        )

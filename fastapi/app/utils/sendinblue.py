from __future__ import print_function
import time
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from pprint import pprint

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = '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'

api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))


def sendinblue_email_verification(first_name,email_to,verification_link):
    template_id = 2
    to = [{"email":email_to}]
    reply_to = {"email":"malhar@analystt.ai","name":"Analystt AI Technology Pvt Ltd"}
    params = {"firstname":first_name,"verificationlink":verification_link}
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=to, reply_to=reply_to, template_id=template_id,params=params)

    try:
        api_response = api_instance.send_transac_email(send_smtp_email)
        logger.success(f"Verification Email Sent, {api_response=}")
    except HTTPException as e:
        raise e


sendinblue_email_verification("dahf","kishan.jaiswal@kapso.in","faad")
import requests

from app.texau.linkedin.email_phone import (
    TexAuFindEmailAndPhoneForLinkedInProfileRequest,
    TexAuFindEmailAndPhoneForLinkedInProfileResponse,
)
from test.common import TEST_CONFIG_API_BASE_URL


def test_texau_find_matching_linkedin_profiles():
    assert True


def test_texau_find_email_and_phone_for_linkedin_profile_url():
    response = requests.post(
        f"{TEST_CONFIG_API_BASE_URL}/api/texau/find_email_and_phone_for_linkedin_profile_url",
        json=TexAuFindEmailAndPhoneForLinkedInProfileRequest(
            urls=[
                "https://www.linkedin.com/in/sohammondal/",
                "https://www.linkedin.com/in/luke-runacres/",
                "https://www.linkedin.com/in/sohammondal/"
                "https://www.linkedin.com/in/luke-runacres/",
                "",
            ],
            cookie="AQEDAQFGp0UCVdaAAAABe2AWLdIAAAF7hCKx0k4AeljWlYLJWzMzPyxIRAjQSo6OK5dVCVSSBXpy2J0DZrt9uyOICBu64noYRNWpJUHXEOm20kpdqFB5JFh6Az2QHDSH4_YwdnPjnqXEjJ8ihhF0Mo8D",
        ).dict(),
    )

    assert response
    assert response.status_code == 200

    json = response.json()
    assert json

    data = TexAuFindEmailAndPhoneForLinkedInProfileResponse(**json)
    assert data

    assert data.filename

import os
from urllib.parse import quote
API_CONFIG_JWT_SECRET = "aaf00868db8310a63b1ee2053b0a458bd4c10272bd47495461ac8d6e34834273"  # Generated using: openssl rand -hex 32

API_CONFIG_DATABASE_URL=os.getenv("API_CONFIG_DATABASE_URL","postgresql://munifadmin:plena-code-TORPEDO-etc@peopledb.c1h7mjd0doow.ap-south-1.rds.amazonaws.com:6442/person_pinaki")

API_CONFIG_INTERNAL_URL = os.getenv("API_CONFIG_INTERNAL_URL", "http://localhost:12005")
API_CONFIG_REDIS_URL = os.getenv("API_CONFIG_REDIS_URL", "redis://localhost")
API_CONFIG_RATELIMIT_ALLOWED_COUNT = int(
    os.getenv("API_CONFIG_RATELIMIT_ALLOWED_COUNT", "6")
)
API_CONFIG_RATELIMIT_ALLOWED_DURATION = int(
    os.getenv("API_CONFIG_RATELIMIT_ALLOWED_DURATION", "60")
)

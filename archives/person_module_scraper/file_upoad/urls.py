from django.urls import path
from .views import get_file, home, result, download
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path("", login_required(home), name="home"),
    path("upload", login_required(get_file), name="upload"),
    path("result", login_required(result), name="result"),
    path("download/<int:id>", login_required(download), name="download"),
]

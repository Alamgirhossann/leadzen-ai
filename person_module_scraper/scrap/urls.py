from django.urls import path
from .views import scrap
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path("<int:id>", login_required(scrap), name="scrap"),
]

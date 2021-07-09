from django.urls import path
from .views import Login, signup, register, Auth_login, Logout
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path("signup", signup, name="signup"),
    path("register", register, name="register"),
    path("login", Login, name="login"),
    path("auth-login", Auth_login, name="auth-login"),
    path("logout", Logout, name="logout"),
]

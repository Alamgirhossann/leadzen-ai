from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
import re
from rest_framework.decorators import api_view
from password_validator import PasswordValidator
from loguru import logger
from django.contrib import messages

# Create your views here.
def signup(request):
    return render(request, "signup.html")


@api_view(["GET"])
def Login(request):
    return render(request, "login.html")


@api_view(["GET"])
def Logout(request):
    auth.logout(request)
    return redirect("/account/login")


@api_view(["POST"])
def Auth_login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = auth.authenticate(username=email, password=password)
    if user is not None:
        auth.login(request, user)
        return redirect("/")
    else:
        messages.error(request, "Invalid credentials")
        return redirect("/account/login")


def validate_password(password):
    schema = PasswordValidator()
    schema.min(8).max(
        100
    ).has().uppercase().has().lowercase().has().digits().has().no().spaces().has().symbols()
    chk_password = schema.validate(password)
    return chk_password


@api_view(["POST"])
def register(request):
    response = {}
    first = request.data.get("first", "").strip()
    last = request.data.get("last", "").strip()
    try:
        if first == "" or last == "":
            response["error"] = "First name or last name cannot be blank"
            logger.error(response["error"])
            messages.error(request, response["error"])
            return redirect("/account/signup")
        email = request.data.get("email").rstrip()
        password = request.data.get("password")
        pattern = r"\"?([-a-zA-Z0-9.`?{}]+@\w+\.\w+)\"?"
        chk_mail = re.match(pattern, email)
        chk_password = validate_password(password)
        if chk_mail is None:
            response["error"] = "Invalid Email"
            logger.error(response["error"])
            messages.error(request, response["error"])
            return redirect("/account/signup")

        if not chk_password:
            response["error"] = "Invalid password type."
            logger.error(response["error"])
            messages.error(request, response["error"])
            return redirect("/account/signup")
        user = User.objects.filter(email__exact=email)
        if user.exists():
            response["error"] = "User Exists"
            logger.error(response["error"])
            messages.error(request, response["error"])
            return redirect("/account/signup")
        else:
            response["message"] = "Signup Successfull"
            # response["data"] = {"first": first, "last": last, "email": email}
            User.objects.create_user(
                email=email,
                username=first + " " + last,
                first_name=first,
                last_name=last,
                password=password,
            )
            return redirect("/account/login")
    except Exception as e:
        logger.exception(e)
        messages.error(request, "Something went wrong while signup")
        return redirect("/account/signup")

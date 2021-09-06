import React, { useState, useEffect } from "react";
import "./Style/style.css";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import validator from "validator";
import Header from "../SharedComponent/Header";
import axios from "axios";
import { useHistory } from "react-router-dom";

const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const LogIn = (props) => {
  const [historyState, setHistoryState] = useState("");
  const [userSession, setUserSession] = useState(false);
  useEffect(() => {
    if (props.location.state !== undefined) {
      // console.log("history",props.location.state)
      if (props.location.state.userRegistrationEmail) {
        setHistoryState(props.location.state.userRegistrationEmail);
      }
      if (props.location.state.userSession) {
        setUserSession(true);
      }
    }
  }, []);

  const history = useHistory();
  const user = {
    name: "",
    email: "",
    subscription: {
      product: "",
      price: "",
      period: "",
      status: "",
      last_renewal: "",
      expiry_date: "",
      profile_credits: "",
      mail_credits: "",
    },
  };
  const urlString = window.location.href;
  const url = new URL(urlString);
  const emailVerified = url.searchParams.get("emailVerified");
  const email = url.searchParams.get("email");

  const [userLogin, setUserLogin] = useState({
    email: email || "",
    password: "",
    error: "",
  });

  const [isValid, setValid] = useState(false);
  const [response, setResponse] = useState({ ok: null, message: null });
  const [showPass, setShowPass] = useState(false);
  const [userVerifiedStatus, setUserVerifiedStatus] = useState(true);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handlePassClick = (e) => {
    e.preventDefault();
    if (showPass === true) setShowPass(false);
    else setShowPass(true);
  };

  const Robot = () => {
    if (response.message) {
      return (
        <div className="col-md-6 robot-container order-md-12">
          <div className="sign-up-robot text-center ps-4 pe-7 pt-2 pb-7 mb-4">
            <img
              style={{ width: "20px" }}
              src="assets/images/Group 2221.png"
              alt=""
            />
            {!userLogin.error ? (
              <p className="fw-bold">
                Hey Buddy, Time to take the lead.
                <br /> {!userLogin.error ? response.message : userLogin.error}
                <br />{" "}
                <Link to="/signUp" className="text-danger text-decoration-none">
                  Sign up
                </Link>{" "}
                to begin.{" "}
              </p>
            ) : (
              <p className="fw-bold">
                Hey Buddy, Time to take the lead.
                <br /> {userLogin.error} <br />{" "}
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="col-md-6 robot-container order-md-12">
        <div className="sign-up-robot ps-4 pe-7 pt-2 pb-7 mb-4">
          <h3>Hi</h3>
          <p className="fw-bold">
            I am <span className="text-danger">Jarv!</span> <br />
            Are you ready to unlock opportunities with the{" "}
            <span className="text-danger">
              most intelligent AI based platform?{" "}
            </span>
          </p>
        </div>
      </div>
    );
  };

  function handleError(status) {
    console.error(`Got HTTP Error ${status}`);
  }

  function handleUnAuthorized(response = null) {
    console.log("User is UnAuthorized");
    alert("Please Logout and LogIn Again");
  }

  const formData = new FormData();
  formData.set("username", userLogin.email);
  formData.set("password", userLogin.password);

  const fetchData = async () => {
    try {
      const fetchResponse = await axios.post(
        apiServer + "/auth/jwt/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      async function handleSuccess(fetchResponse) {
        let json_res = await fetchResponse.data;
        console.log("json_res", json_res);
        try {
          const userStatusResponse = await axios.get(apiServer + "/users/me", {
            headers: {
              Authorization: `Bearer ${json_res.access_token}`,
            },
          });
          async function handleUserSuccess() {
            const userStatus = await userStatusResponse;
            console.log("userStatus>>>>>>>>", userStatus);

            setResponse({ ...response, ok: true });

            if (userStatus.data.is_verified === false) {
              console.log("in if");
              setUserVerifiedStatus(false);
            } else {
              Cookies.set("user_email", userLogin.email, { expires: 0.08 });
              Cookies.set("user_id", userStatus.data.id);
              Cookies.set("user_token", json_res.access_token, {
                expires: 0.08,
              });
              console.log("userVerifiedStatus.....");
              if (userStatus.data.onboarded === false) {
                console.log("in user render");
                history.push({
                  pathname: "/firstTimeUser",
                });
              } else {
                history.push({
                  pathname: "/repeatedUser",
                });
              }
            }
          }

          switch (userStatusResponse.status) {
            case 200:
              return await handleUserSuccess(userStatusResponse);
            case 401:
              return handleUnAuthorized(userStatusResponse);
            default:
              return handleError(userStatusResponse);
          }
        } catch (err) {
          handleError(err);
        }
      }

      switch (fetchResponse.status) {
        case 200:
          return await handleSuccess(fetchResponse);
        case 401:
          return handleUnAuthorized(fetchResponse);
        default:
          return handleError(fetchResponse);
      }
    } catch (err) {
      handleError(err);
      setResponse({ ...response, message: "user not found" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userLogin.email || !userLogin.password) {
      setUserLogin({
        ...userLogin,
        error: "Email and Password cannot be blank!",
      });
      alert("Email and Password cannot be blank!");
    } else {
      setValid(true);
      setUserLogin({ ...userLogin, error: "" });
    }
    if (!validator.isEmail(userLogin.email)) {
      setUserLogin({ ...userLogin, error: "Invalid Email" });
      setValid(false);
      // alert("Invalid Email");
    }
    if (
      !validator.isStrongPassword(userLogin.password, {
        minLength: 8,
        minLowercase: 1,
        maxlength: 50,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setUserLogin({ ...userLogin, error: "Invalid Password" });
      setValid(false);
      // alert("Invalid Password!");
    }

    fetchData();
  };

  return (
    <div>
      <Header user={user} />
      {emailVerified ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>{email}</strong> You have verified successfully.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      {historyState !== "" ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>{historyState}</strong> please check your email for
          verification.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      {userSession ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Your session expired. Please Login again.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      <div className="main-content-area overflow-hidden">
        <div className="main-wrapper">
          <div className="container-fluid">
            <div className="form-container">
              <div className="signup-wrapper py-4 px-md-6">
                <div className="row align-items-center">
                  {!userVerifiedStatus ? <Redirect to="/unverified" /> : null}
                  <div className="col-md-6 order-md-1">
                    <div className="sign-up-form">
                      <div className="text-center">
                        <h3 className="fw-bolder">Welcome to Analystt.ai</h3>
                        <h5 className="text-danger mb-4">
                          Most Intelligent Lead Generation Platform
                        </h5>
                      </div>
                      <form className="sign-up-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="w-100"
                            autoComplete="off"
                            value={userLogin.email}
                            onChange={handleInput}
                            name="email"
                            placeholder="Enter your email"
                            id="email"
                            required
                          />
                        </div>
                        <div className="mb-3 password-input">
                          <input
                            type={showPass ? "text" : "password"}
                            className="w-100"
                            autoComplete="off"
                            value={userLogin.password}
                            onChange={handleInput}
                            name="password"
                            placeholder="Enter your password"
                            id="password"
                            required
                          />
                          <Link to="" onClick={handlePassClick}>
                            <img
                              src="assets/images/combined-eye.png"
                              style={{
                                position: "absolute",
                                top: "13px",
                                right: "10px",
                              }}
                            />
                          </Link>
                        </div>
                        <div className="mb-1 d-block d-md-flex justify-content-end">
                          <p>
                            <Link
                              to="#"
                              // to="/resetPassword"
                              // onClick={() =>
                              //   Cookies.set("forgot_email", form.email)
                              // }
                              className="small text-secondary"
                            >
                              Forgot your password?
                            </Link>
                          </p>
                        </div>
                        <button type="submit" className="btn text-white w-100">
                          Sign In
                        </button>
                        <div className="text-center mt-2">
                          <span>Sign In using: </span>
                        </div>
                        <div className="signup-login-with mt-3">
                          <div className="row">
                            <div className="col-sm-6">
                              <a
                                href="#"
                                className="btn btn-light p-2 d-flex justify-content-center align-items-center mb-3"
                              >
                                <img
                                  src="assets/images/Google.png"
                                  alt="title"
                                />{" "}
                                Google
                              </a>
                            </div>
                            <div className="col-sm-6">
                              <a
                                href="#"
                                className="btn btn-light p-2 d-flex justify-content-center align-items-center mb-3"
                              >
                                <img
                                  src="assets/images/LinkedIn.png"
                                  alt="title"
                                />{" "}
                                LinkedIn
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-secondary m-0">
                            Don't have an account?{" "}
                            <Link to="/signUp" className="text-danger">
                              Sign Up
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                  <Robot />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cookie px-5 mt-2">
          <div className="cookie-message">
            <p className="text-center mt-3">
              We use cookies to improve your browsing experience. By accepting
              this, you agree to our privacy policy{" "}
              <button className="cookie-btn">Cookies</button>
            </p>
          </div>
          <div className="jarv-position">
            <img
              className="jarv-robot"
              src="assets/images/user-robot-icon.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

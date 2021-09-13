import React from "react";
import "./Style/style.css";
import { Link } from "react-router-dom";

const SignUpError = () => {
  return (
    <div>
      <header class="header-area">
        <nav class="header-navbar navbar navbar-expand-xl bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="index.html">
              <img src="assets/images/header-brand-black.png" alt="" />
            </a>
          </div>
        </nav>
      </header>

      <div class="main-content-area overflow-hidden">
        <div class="main-wrapper">
          <div class="container-fluid">
            <div class="form-container">
              <div class="signup-wrapper py-4 px-md-6">
                <div class="row align-items-center">
                  <div class="col-md-6 robot-container order-md-12">
                    <div class="sign-up-error-page">
                      <p class="fw-bold">
                        <img
                          style={{ width: "20px" }}
                          src="assets/images/Group 2221.png"
                          alt=""
                        />
                        Hey [User], <br />
                        looks like you’ve been taking the ‘lead’ already. The
                        username already exists. Try{" "}
                        <Link to="/login" className="text-danger">
                          logging in
                        </Link>{" "}
                        in instead
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6 order-md-1">
                    <div class="sign-up-form">
                      <div class="text-center">
                        <h2>Create a free account</h2>
                        <h5 class="text-danger mb-3">
                          Get 5 Free Credits for Leads Now !
                        </h5>
                      </div>
                      <form class="sign-up-form" class="#">
                        <div class="mb-3">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Enter your email"
                            id="email"
                          />
                        </div>
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Username"
                            id="username"
                          />
                        </div>
                        <div class="mb-3 password-input">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            id="password"
                          />
                        </div>
                        <button type="submit" class="btn text-white w-100 px-1">
                          Grab Your 5 Free Credits Now
                        </button>
                        <div class="text-center mt-2">
                          <span>Sign Up using: </span>
                        </div>
                        <div class="signup-login-with mt-3">
                          <div class="row">
                            <div class="col-sm-6">
                              <a
                                href="#"
                                class="btn btn-light p-2 d-flex justify-content-center align-items-center mb-3"
                              >
                                <img
                                  src="assets/images/Google.png"
                                  alt="title"
                                />{" "}
                                Google
                              </a>
                            </div>
                            <div class="col-sm-6">
                              <a
                                href="#"
                                class="btn btn-light p-2 d-flex justify-content-center align-items-center mb-3"
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
                        <div class="text-center">
                          <p class="text-secondary m-0">
                            Already have an account?{" "}
                            <Link
                              to="/login"
                              class="text-danger text-decoration-none"
                            >
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cookie px-4 mt-2">
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

export default SignUpError;

import React from "react";
import { Link } from "react-router-dom";

const LoginEmailUnverifiedError = () => {
  return (
    <div className="container-body">
      <header className="header-area">
        <nav className="header-navbar navbar navbar-expand-xl bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="index.html">
              <img src="assets/images/header-brand-black.png" alt=""/>
            </a>
          </div>
        </nav>
      </header>

      <div className="main-content-area overflow-hidden">
        <div className="main-wrapper">
          <div className="container-fluid">
            <div className="form-container">
              <div className="signup-wrapper py-4 px-md-6">
                <div className="row align-items-center">
                  <div className="col-md-6 robot-container order-md-12">
                    <div className="sign-up-email-error">
                      <p className="fw-bold text-center">
                        <img
                            style={{width: "20px"}}
                            src="assets/images/Group 2221.png"
                            alt=""
                        />{" "}
                        <br/>
                        <span className="text-danger"> Sorry!</span>
                        <br/>
                        Please Verify your Email by clicking the link sent to
                        your Email
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 order-md-1">
                    <div className="sign-up-form">
                      <div className="text-center">
                        <h3 className="fw-bolder">Welcome to Analystt.ai</h3>
                        <h5 className="text-danger mb-4">
                          Most Intelligent Lead Generation Platform
                        </h5>
                      </div>
                      <form className="sign-up-form">
                        <div className="mb-3">
                          <input
                            type="email"
                            name="email"
                            className="w-100"
                            placeholder="Enter your email"
                            id="email"
                          />
                        </div>
                        <div className="mb-3 password-input">
                          <input
                            type="password"
                            name="password"
                            className="w-100"
                            placeholder="Enter your password"
                            id="password"
                          />
                        </div>
                        <div className="mb-1 d-block d-md-flex justify-content-end">
                          <p>
                            <Link
                              to="/resetPassword"
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

export default LoginEmailUnverifiedError;

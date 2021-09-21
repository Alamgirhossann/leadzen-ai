import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const NavBar = (props) => {
  const [user, setUser] = useState();
  // const [userRes, setUserRes] = useState();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
  useEffect(async () => {
    await getUser();
  }, []);

  const getUser = async (e = null) => {
    try {
      console.log("In credit check>>>>>>>>");
      const user_res = await fetch(apiServer + "/users/me", {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      console.log("user_res>>>>>>>>", user_res);
      if (user_res.status === 200) {
        const response = await user_res.json();
        console.log("in success status....", response);
        setUser(response);
      }
    } catch (err) {
      // handleError(err);
      // setResponse({ ...response, message: "user not found" });
    }
  };
  if (props.newEvent) {
    props.newEvent.on("updateCredit", getUser);
  }
  useEffect(() => {
    console.log("User useEffect>>>", user);
  }, [user]);
  function handleSetLinkedInCookie() {
    const cookie = prompt("Please paste your LinkedIn cookie here");
    if (!cookie) {
      alert("Invalid Cookie");
    }
    Cookies.set("user_linkedin_cookie", cookie);
  }

  const handleLogout = (event) => {
    console.log("document.cookie()...handle", document.cookie);
    Cookies.remove("user_token", { path: "" });
    Cookies.remove("user_email", { path: "" });
    console.log("document.cookie()...", document.cookie);
  };

  return (
    <div style={{ paddingRight: "0px" }}>
      <nav
        className="header-navbar navbar navbar-expand-xl bg-light"
        style={{ paddingRight: "0px" }}
      >
        <div className="container-fluid">
          <ul className="navbar-nav-profile navbar-nav align-items-center ms-auto">
            <li className="nav-item me-md-4 me-3">
              <NavLink exact activeClassName=" active-class" to="/repeatedUser">
                <img
                  className="blue"
                  src="assets/images/home.png"
                  alt="home here"
                />
                <span className="ps-2">Home</span>
              </NavLink>
            </li>

            <li className="nav-item me-md-4 me-3">
              <NavLink exact activeClassName=" active-class" to="/savedList">
                <img src="assets/images/menu-saved-list.png" alt="saved here" />
                <span className="ps-2">Saved lists</span>
              </NavLink>
            </li>

            <li className="nav-item me-md-4 me-3">
              <NavLink exact activeClassName=" active-class" to="/history">
                <img src="assets/images/menu-history.png" alt="history here" />
                <span className="ps-2">History</span>
              </NavLink>
            </li>

            <li className="nav-item me-md-4 me-3">
              <NavLink exact activeClassName=" active-class" to="/realTimePage">
                <img src="assets/images/trending-up.png" alt="tranding here" />
                <span className="ps-2">Trending Leads</span>
              </NavLink>
            </li>

            <li className="nav-item me-md-4 me-3">
              <li className="nav-item dropdown">
                <a
                  className="credit-btn btn btn-outline-danger nav-link"
                  href="/profile"
                >
                  {user?.profile_credit + user?.email_credit} Credits Left
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <p className="dropdown-item">
                      <img
                        src="assets/images/pro-codesandbox.png"
                        alt="title"
                      />
                      My Credits
                    </p>
                  </li>

                  <li>
                    <div className="dropdown-progress">
                      <p className="small">
                        Profile credits used: {user?.profile_credit} /{" "}
                        {user?.total_profile_credits}
                      </p>
                      <div className="progress mb-2">
                        <div
                          className="progress-bar"
                          style={{
                            width: user
                              ? 100 -
                                (user.profile_credit /
                                  user.total_profile_credits) *
                                  100 +
                                "%"
                              : "45%",
                          }}
                          role="progressbar"
                          aria-valuenow={user ? user.profile_credit : "45"}
                          aria-valuemin="0"
                          aria-valuemax={
                            user ? user.total_profile_credits : "100"
                          }
                        />
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="dropdown-progress">
                      <p className="small">
                        Mail credits used: {user?.email_credit} /{" "}
                        {user?.total_email_credits}
                      </p>
                      <div className="progress mb-2">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: user
                              ? 100 -
                                (user.email_credit / user.total_email_credits) *
                                  100 +
                                "%"
                              : "65%",
                          }}
                          aria-valuenow={user ? user.email_credit : "5"}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>

                      <span className="small">Limit resets in 5 days</span>
                    </div>
                  </li>
                </ul>
              </li>
            </li>

            <li className="nav-item">
              <li className="nav-item dropdown">
                <a
                  className="profile-avata nav-link"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  <img src="assets/images/author-image.png" alt="search here" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <div className="dropdown-credit">
                      <span className="fw-bold">
                        {user?.profile_credit + user?.email_credit} credits
                        <br /> pending
                      </span>
                      <img src="assets/images/credit-icon.png" alt="title" />
                    </div>
                  </li>
                  <li>
                    <a className="dropdown-item active" href="#">
                      Upgrade to premium
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://leadzen.ai/pricing/"
                    >
                      Buy Credits
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/profile">
                      Profile Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item disabled" href="/history">
                      Export History
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleSetLinkedInCookie}
                    >
                      Set LinkedIn Cookie
                    </a>
                  </li>
                  <li>
                    <div onClick={(event) => handleLogout(event)}>
                      <Link className="dropdown-item" to="/login">
                        <span className="text-muted me-3">Logout</span>{" "}
                        <img src="assets/images/logout-icon.png" alt="image" />
                      </Link>
                    </div>
                  </li>
                </ul>
              </li>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;

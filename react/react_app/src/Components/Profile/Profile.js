import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../SharedComponent/Header";
import axios from "axios";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
const Profile = () => {
  const acess_token = Cookies.get("user_token");
  const [user, setUser] = useState();
  const [status_user, setStatusUser] = useState("Not Active");
  useEffect(async () => {
    try {
      const userStatusResponse = await axios.get(apiServer + "/users/me", {
        headers: {
          Authorization: `Bearer ${acess_token}`,
        },
      });
      const userStatus = await userStatusResponse;
      if (userStatus.status == 200) {
        if(userStatus.data.is_active)
        {
          setStatusUser("Active")
        }
        console.log("kishan", userStatus);
        setUser({
          name: userStatus.data.username,
          email: userStatus.data.email,
          subscription: {
            product: "Free Analystt",
            email_credit: userStatus.data.email_credit,
            profile_credit: userStatus.data.profile_credit,
            period: "Yearly",
            last_renewal: "01/02/2020",
            expiry_date: "02/08/2021",
            profile_credits: 500,
            mail_credits: 1000,
          },
        });
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  }, []);

  return (
    <div>
      <Header user={user?.name && user} />

      <div className="main-content-area pt-4">
        <div className="main-wrapper">
          <div className="container-fluid">
            <div className="bg-light rounded-3 py-3 px-4 mb-4">
              <h3 className="m-0">
                <a
                  href="/repeatedUser"
                  className="text-decoration-none text-dark"
                >
                  <span className="me-1">
                    <img src="assets/images/back-union.png" alt="title" />
                  </span>{" "}
                </a>
                Profile
              </h3>
            </div>
            <div className="bg-light rounded-3 p-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="main-profile mb-4">
                    <img src="assets/images/author-image5.png" alt="title" />
                    <div className="ms-4 ms-md-5">
                      <h6>{user?.name}</h6>
                      <span className="word-wrap">{user?.email}</span>
                      <a href="/logIn">
                        <button
                          type="submit"
                          className="btn btn-sign-out mt-3 d-block py-1 px-3"
                        >
                          Sign Out
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-1 d-block d-md-flex justify-content-end mt-3">
                    <a href="http://lead-gen.analystt.ai/pricing/">
                      <button type="submit" className="btn btn-renew py-1 px-3">
                        Renew Plan
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              {/*<div className="pb-4">*/}
              {/*  <div className="container-bg p-2">*/}
              {/*    <div className="">*/}
              {/*      <div className="row">*/}
              {/*        <div className="col">*/}
              {/*          <h3 className="fw-bold fs-5">Change Password</h3>*/}
              {/*        </div>*/}
              {/*        <div className="col">*/}
              {/*          <div className="accordion-header">*/}
              {/*            <button*/}
              {/*              className="accordion-button "*/}
              {/*              type="button"*/}
              {/*              data-bs-toggle="collapse"*/}
              {/*              data-bs-target="#collapseOne"*/}
              {/*              style={{*/}
              {/*                background: "white",*/}
              {/*                borderRadius: "50%",*/}
              {/*                paddingRight: "15px",*/}
              {/*                border: "none",*/}
              {/*              }}*/}
              {/*            ></button>*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*      </div>*/}

              {/*      <div id="collapseOne">*/}
              {/*        <div class="mb-3 row text-right">*/}
              {/*          <label for="inputPassword" class="col-sm-2 ">*/}
              {/*            Current Password*/}
              {/*          </label>*/}
              {/*          <div class="col-sm-10 d-flex align-items-center" >*/}
              {/*            <div>*/}
              {/*              <input*/}
              {/*                style={{ borderRadius:"10px",outline:"none" }}*/}
              {/*                type="password"*/}
              {/*                className=""*/}
              {/*                id="inputPassword"*/}
              {/*              />*/}
              {/*              <div>*/}
              {/*               <a href="#">Forgot your password ?</a>*/}
              {/*              </div>*/}
              {/*            </div>*/}
              {/*          </div>*/}
              {/*        </div>*/}

              {/*        <div class="mb-3 row text-right">*/}
              {/*          <label for="inputPassword" class="col-sm-2 ">*/}
              {/*            New Password*/}
              {/*          </label>*/}
              {/*          <div className="col-sm-10 d-flex align-items-center" >*/}
              {/*            <input style={{ borderRadius:"10px",outline:"none"}} type="password" class="" id="inputPassword" />*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*        <div class="mb-3 row text-right">*/}
              {/*          <label for="inputPassword" class="col-sm-2 ">*/}
              {/*            Verify Password*/}
              {/*          </label>*/}
              {/*          <div class="col-sm-10 d-flex align-items-center">*/}
              {/*            <input style={{ borderRadius:"10px",outline:"none" }} type="password" class="" id="inputPassword" />*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              <div className="table-responsive pb-4">
                <div className="container-bg p-2">
                  <table className="table table-product">
                    <thead>
                      <tr>
                        <th className="fw-bold fs-5">Subscription Details</th>
                        <th className="text-white">this is not showing</th>
                        <th className="text-end">
                        </th>
                        <th className="text-end">
                          <button
                            className="accordion-button "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            style={{
                              background: "white",
                              borderRadius: "50%",
                              padding: "0px",
                              border: "none",
                            }}
                          ></button>
                        </th>
                      </tr>
                    </thead>
                    <tbody id="collapseTwo">
                      <tr>
                        <td className="text-center">
                          <p>Total Credit</p>{" "}
                          <span className="text-color">
                            {user?.subscription.email_credit + user?.subscription.profile_credit}
                          </span>
                        </td>
                        <td className="text-center">
                          <p>Email Credit</p>{" "}
                          <span className="text-color">
                            {user?.subscription.email_credit}
                          </span>
                        </td>
                        <td className="text-center">
                          <p>Profile Credit</p>{" "}
                          <span className="text-color">
                            {user?.subscription.profile_credit}
                          </span>
                        </td>
                        <td className="text-center">
                          <p>Status</p>{" "}
                          <span className="text-active">
                            {status_user}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end ">
          <img
            className="jarv-robot"
            src="assets/images/user-robot-icon.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

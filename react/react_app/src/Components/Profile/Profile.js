import React from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../SharedComponent/Header";

const Profile = () => {
  const fetchData = async () => {
    // TODO:Create api calls to get user profile data from the backend
  };
  const user = {
    name: "John Smith",
    email: "Johnsmith087@hexagon.in",
    subscription: {
      product: "Free Analystt",
      price: "100 INR",
      period: "Yearly",
      status: "Active",
      last_renewal: "01/02/2020",
      expiry_date: "02/08/2021",
      profile_credits: 500,
      mail_credits: 1000,
    },
  };
  return (
    <div>
      <Header user={user} />

      <div className="main-content-area pt-4">
        <div className="main-wrapper">
          <div className="container-fluid">
            <div className="bg-light rounded-3 py-3 px-4 mb-4">
              <h3 className="m-0">
                <a href="/repeatedUser" className="text-decoration-none text-dark">
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
                      <h6>{user.name}</h6>
                      <span className="word-wrap">{user.email}</span>
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

              <div className="table-responsive pb-4">
                <div className="container-bg p-2">
                  <table className="table table-product">
                    <thead>
                      <tr>
                        <th className="fw-bold fs-5">Subscription Details</th>
                        <th className="text-white">this is not showing</th>
                        <th className="text-end">
                          <span className="text-muted">
                            Date of Last Renewal:{" "}
                          </span>
                          &nbsp;{user.subscription.last_renewal}
                        </th>
                        <th className="text-center">
                          {" "}
                          <span className="text-muted">Plan Expiry Date:</span>
                          &nbsp;{user.subscription.expiry_date}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">
                          <p>Product</p>{" "}
                          <span className="text-color">
                            {user.subscription.product}
                          </span>
                        </td>
                        <td className="text-center">
                          <p>Price</p>{" "}
                          <span className="text-color">
                            {user.subscription.price}
                          </span>
                        </td>
                        <td className="text-center">
                          <p>Period</p>{" "}
                          <span className="text-color">
                            {user.subscription.period}
                          </span>
                        </td>
                        <td className="text-center">
                          <p>Status</p>{" "}
                          <span className="text-active">
                            {user.subscription.status}
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

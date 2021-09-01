import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../SharedComponent/Header";

const Pricing = () => {
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
  const [plan, setPlan] = useState();
  const freeSelect = (e) => {
    setPlan("freeAnalystt");
  };
  const soloSelect = (e) => {
    setPlan("soloJarvis");
  };
  const teamSelect = (e) => {
    setPlan("teamJarvis");
  };
  const starkSelect = (e) => {
    setPlan("tonyStark");
  };
  return (
    <div>
      <Header user={user} />

      <div className="text-center px-4 py-3 my-0 container">
        <div className="user-lead-top mb-3 user-widget-box">
          <h5 className="m-3">
            <img src="assets/images/back-union.png" alt="" /> Subscription
          </h5>
        </div>
        <div className="accordion-header user-widget-box">
          <div className="pt-2 pb-1 px-4 text-center">
            <p>
              Make your next client the best customer you've ever had. <br />
              <span className="text-danger fw-bold">
                Get started with your most intelligent analystt
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-3 mt-3">
            <div className="card card-height">
              <div className="card-body">
                <h5 className="text-danger">Free Analystt</h5>
                <p className="fw-bold">INR 0</p>
                <p className="text-center text-bg">55 leads</p>
                <p>5 Full Profile</p>
                <p>50 Email IDs</p>
              </div>
              <div className="px-3 pb-3">
                <button
                  type="submit"
                  onClick={freeSelect}
                  className="btn text-white buy-btn w-100"
                >
                  Buy Plan
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-3 mt-3">
            <div className="card card-height">
              <div className="card-body">
                <h5 className="card-title text-danger">Solo Jarvis</h5>
                <p className="fw-bold">INR 4,999/mo</p>
                <p className="text-center text-bg">540 leads/month</p>
                <p>140 Full Profile</p>
                <p>400 Email IDs</p>
              </div>
              <div className="px-3 pb-3">
                <button
                  type="submit"
                  onClick={soloSelect}
                  className="btn text-white buy-btn w-100"
                >
                  Buy Plan
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-3 mt-3">
            <div className="card card-height">
              <div className="card-body">
                <h5 className="card-title text-danger">Team of Jarvis</h5>
                <p className="fw-bold">INR 9,999/mo</p>
                <p className="text-center text-bg">1000 leads/month</p>
                <p>300 Full Profile</p>
                <p>1000 Email IDs</p>
                <p>Access to training bot</p>
                <p>Deep analytics</p>
              </div>
              <div className="px-3 pb-3">
                <button
                  type="submit"
                  onClick={teamSelect}
                  className="btn text-white buy-btn w-100"
                >
                  Buy Plan
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-3 mt-3">
            <div className="card card-height">
              <div className="card-body">
                <h5 className="card-title text-danger">Tony Stark Mode</h5>
                <p className="fw-bold">INR 14,999/mo</p>
                <p className="text-center text-bg">1000 leads/month</p>
                <p>450 Full Profile</p>
                <p>2000 Email IDs</p>
                <p>Access to training bot</p>
                <p>Deep analytics</p>
              </div>
              <div className="px-3 pb-3">
                <button
                  type="submit"
                  onClick={starkSelect}
                  className="btn text-white buy-btn w-100"
                >
                  Buy Plan
                </button>
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
  );
};

export default Pricing;

import Cookies from "js-cookie";
import React from "react";
import Header from "../SharedComponent/Header";
const ResetLink = () => {
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
  return (
    <div>
      <Header user={user} />
      <div className="main-content-area overflow-hidden">
        <div className="main-wrapper">
          <div className="w-100 pt-5 h-100 d-flex justify-content-center ">
            <div className="reset-container-align">
              <div className="text-center product-container">
                <img
                  style={{ height: "130px" }}
                  src="assets/images/Group 2250.png"
                  alt=""
                />
                <p className="text-danger pt-5 fw-bold">Hey Buddy!</p>
                <p className="para">
                  we have e-mailed you the reset link at{" "}
                  {Cookies.get("forgot_email")} Please check your email.
                </p>
                <p className="pt-5 pb-3">
                  <a href="/logIn" className="text-danger">
                    Back
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetLink;

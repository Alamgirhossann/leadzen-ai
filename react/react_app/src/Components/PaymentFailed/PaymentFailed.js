import React from "react";
import Header from "../SharedComponent/Header";

const PaymentFailed = () => {
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
      <div class="main-content-area overflow-hidden">
        <div className="main-wrapper">
          <div className="w-100 pt-6 h-100 d-flex justify-content-center ">
            <div className="payment-container-align">
              <div className="text-center py-4">
                <img
                  className="pt-3"
                  src="assets/images/Group 2237.png"
                  alt=""
                />
                <p className="text-danger pt-2">Oops</p>
                <p>
                  Looks like there's a problem here. <br /> We were unable to
                  process your payment.{" "}
                </p>
                <p className="pt-4">
                  <a href="#" className="text-danger">
                    Try Again
                  </a>
                </p>
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

export default PaymentFailed;

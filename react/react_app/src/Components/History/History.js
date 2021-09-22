import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import SharedHistory from "../SharedComponent/SharedHistory";
import Header from "../SharedComponent/Header";

const History = () => {
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
      <SharedHistory />
    </div>
  );
};

export default History;

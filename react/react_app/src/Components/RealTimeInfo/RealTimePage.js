import React, { useEffect, useState } from "react";
import "./Style/style.css";
import Header from "../SharedComponent/Header";
import Cookies from "js-cookie";

const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
const email_id = `${process.env.REACT_APP_CONFIG_EMAIL_ID}`;
const RealTimePage = () => {
  const [requirement, setRequirement] = useState();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
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

  const handleUrlChange = (e) => {
    setRequirement(e.target.value);
  };

  const handleSubmit = async () => {
    if (!requirement) {
      alert("Please tell us your requirement");
    } else {
      let user_id = Cookies.get("user_id");
      const inputData = {
        email: email_id,
        message:
          "Requset_from_UserId: " +
          user_id +
          "\n" +
          "\n" +
          "requirement: " +
          requirement,
        subject: "Request_from_UserId",
      };
      try {
        const response = await fetch(apiServer + "/email/send_custom_email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(inputData),
        });
        if (response.ok) {
          var element = document.getElementById("real-time-request");
          element.value = "";
          alert(
            "Request is Sent. You will get an email with the results in a few hours."
          );
        } else {
          alert("Sorry your Request was not sent. Please try again");
        }
      } catch (err) {
        console.log("error", err);
      }
    }
  };
  function changeColorRed(e) {
    e.target.style.color = 'red';
  }
  function changeColorNormal(e) {
    e.target.style.color = 'black';
  }
  const handleautoinput=async (val)=>{
    setRequirement(val)
    let text_val=document.getElementById("real-time-request")
    text_val.value = val
  }
  return (
    <div>
      <Header user={user} />
      <div className="container">
        <div className="map-section">
          <div className="row">
            <div className="col-md-6">
              <img src="assets/images/realtime (9).png" alt="" />
            </div>
            <div className="col-md-6">
              <div className="tranding-lead">
                <img src="assets/images/realtime (5).png" alt="" />
                <h4>Real Time Trending Leads</h4>
                <p>Get Real Time Verified Leads With LeadZen.ai</p>
                <p>Grab your Leads Now !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trends container my-3">
        <div className="">
          <div className="marketing-trend">
            {/*<div className="mb-2 head-btn-style">*/}
            {/*  <div className="row">*/}
            {/*    <div className="col-8">*/}
            {/*      <div className="">*/}
            {/*        <h5 className="m-0">Marketing Trend</h5>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="col-3 d-flex justify-content-end">*/}
            {/*      <form className="search-form-sm ">*/}
            {/*        <div className="input-group">*/}
            {/*          <input*/}
            {/*            id="realtime-page-search-input"*/}
            {/*            type="text"*/}
            {/*            className="form-control"*/}
            {/*            placeholder="Search"*/}
            {/*          />*/}
            {/*          <button className="btn btn-danger" type="submit">*/}
            {/*            <img*/}
            {/*              src="assets/images/small-search-icon.png"*/}
            {/*              alt="title"*/}
            {/*            />*/}
            {/*          </button>*/}
            {/*        </div>*/}
            {/*      </form>*/}
            {/*    </div>*/}
            {/*    <div className="col-1 d-flex justify-content-end">*/}
            {/*      <button*/}
            {/*        type="button"*/}
            {/*        data-bs-toggle="collapse"*/}
            {/*        data-bs-target="#collapseOne"*/}
            {/*      >*/}
            {/*        <img src="assets/images/top-arrow.png" alt="" />*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="container" id="collapseOne">
              {/*<div className="row">*/}
              {/*  <div className="col-md-4 py-3">*/}
              {/*    <div className="item">*/}
              {/*      <div className="lead-card">*/}
              {/*        <div className="text-center">*/}
              {/*          <p style={{ fontSize: "17px" }}>*/}
              {/*            People wanted to switch jobs*/}
              {/*          </p>*/}
              {/*          <p style={{ fontSize: "14px", color: "#00BA4A" }}>*/}
              {/*            2 hours ago{" "}*/}
              {/*          </p>*/}
              {/*          <div*/}
              {/*            style={{*/}
              {/*              fontSize: "16px",*/}
              {/*              background: "#CCE1FF",*/}
              {/*              margin: "0px 50px",*/}
              {/*              borderRadius: "5px",*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            <p>200 Leads</p>*/}
              {/*          </div>*/}
              {/*          <p style={{ fontSize: "16px" }}>*/}
              {/*            Get Real Time Leads with <br /> 200 Credits{" "}*/}
              {/*          </p>*/}
              {/*          <button className="trends-btn">Grab Leads Now</button>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="col-md-4 py-3">*/}
              {/*    <div className="item">*/}
              {/*      <div className="lead-card">*/}
              {/*        <div className="text-center">*/}
              {/*          <p style={{ fontSize: "17px" }}>*/}
              {/*            People wanted to switch jobs*/}
              {/*          </p>*/}
              {/*          <p style={{ fontSize: "14px", color: "#00BA4A" }}>*/}
              {/*            2 hours ago{" "}*/}
              {/*          </p>*/}
              {/*          <div*/}
              {/*            style={{*/}
              {/*              fontSize: "16px",*/}
              {/*              background: "#CCE1FF",*/}
              {/*              margin: "0px 50px",*/}
              {/*              borderRadius: "5px",*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            <p>200 Leads</p>*/}
              {/*          </div>*/}
              {/*          <p style={{ fontSize: "16px" }}>*/}
              {/*            Get Real Time Leads with <br /> 200 Credits{" "}*/}
              {/*          </p>*/}
              {/*          <button className="trends-btn">Grab Leads Now</button>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="col-md-4 py-3">*/}
              {/*    <div className="item">*/}
              {/*      <div className="lead-card">*/}
              {/*        <div className="text-center">*/}
              {/*          <p style={{ fontSize: "17px" }}>*/}
              {/*            People wanted to switch jobs*/}
              {/*          </p>*/}
              {/*          <p style={{ fontSize: "14px", color: "#00BA4A" }}>*/}
              {/*            2 hours ago{" "}*/}
              {/*          </p>*/}
              {/*          <div*/}
              {/*            style={{*/}
              {/*              fontSize: "16px",*/}
              {/*              background: "#CCE1FF",*/}
              {/*              margin: "0px 50px",*/}
              {/*              borderRadius: "5px",*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            <p>200 Leads</p>*/}
              {/*          </div>*/}
              {/*          <p style={{ fontSize: "16px" }}>*/}
              {/*            Get Real Time Leads with <br /> 200 Credits{" "}*/}
              {/*          </p>*/}
              {/*          <button className="trends-btn">Grab Leads Now</button>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="col-md-4 py-3">*/}
              {/*    <div className="item">*/}
              {/*      <div className="lead-card">*/}
              {/*        <div className="text-center">*/}
              {/*          <p style={{ fontSize: "17px" }}>*/}
              {/*            People wanted to switch jobs*/}
              {/*          </p>*/}
              {/*          <p style={{ fontSize: "14px", color: "#00BA4A" }}>*/}
              {/*            2 hours ago{" "}*/}
              {/*          </p>*/}
              {/*          <div*/}
              {/*            style={{*/}
              {/*              fontSize: "16px",*/}
              {/*              background: "#CCE1FF",*/}
              {/*              margin: "0px 50px",*/}
              {/*              borderRadius: "5px",*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            <p>200 Leads</p>*/}
              {/*          </div>*/}
              {/*          <p style={{ fontSize: "16px" }}>*/}
              {/*            Get Real Time Leads with <br /> 200 Credits{" "}*/}
              {/*          </p>*/}
              {/*          <button className="trends-btn">Grab Leads Now</button>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="col-md-4 py-3">*/}
              {/*    <div className="item">*/}
              {/*      <div className="lead-card">*/}
              {/*        <div className="text-center">*/}
              {/*          <p style={{ fontSize: "17px" }}>*/}
              {/*            People wanted to switch jobs*/}
              {/*          </p>*/}
              {/*          <p style={{ fontSize: "14px", color: "#00BA4A" }}>*/}
              {/*            2 hours ago{" "}*/}
              {/*          </p>*/}
              {/*          <div*/}
              {/*            style={{*/}
              {/*              fontSize: "16px",*/}
              {/*              background: "#CCE1FF",*/}
              {/*              margin: "0px 50px",*/}
              {/*              borderRadius: "5px",*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            <p>200 Leads</p>*/}
              {/*          </div>*/}
              {/*          <p style={{ fontSize: "16px" }}>*/}
              {/*            Get Real Time Leads with <br /> 200 Credits{" "}*/}
              {/*          </p>*/}
              {/*          <button className="trends-btn">Grab Leads Now</button>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="col-md-4 py-3">*/}
              {/*    <div className="item">*/}
              {/*      <div className="lead-card">*/}
              {/*        <div className="text-center">*/}
              {/*          <p style={{ fontSize: "17px" }}>*/}
              {/*            People wanted to switch jobs*/}
              {/*          </p>*/}
              {/*          <p style={{ fontSize: "14px", color: "#00BA4A" }}>*/}
              {/*            2 hours ago{" "}*/}
              {/*          </p>*/}
              {/*          <div*/}
              {/*            style={{*/}
              {/*              fontSize: "16px",*/}
              {/*              background: "#CCE1FF",*/}
              {/*              margin: "0px 50px",*/}
              {/*              borderRadius: "5px",*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            <p>200 Leads</p>*/}
              {/*          </div>*/}
              {/*          <p style={{ fontSize: "16px" }}>*/}
              {/*            Get Real Time Leads with <br /> 200 Credits{" "}*/}
              {/*          </p>*/}
              {/*          <button className="trends-btn">Grab Leads Now</button>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="customize-lead container-fluid">
                <div className="text-center pt-3 fs-5">
                  <p>Customise leads as per your requirement.</p>
                  <p className="fw-bolder">Jarv will get that for you</p>
                </div>
                <div className="text-center">
                  <img src="assets/images/g10.png" alt="" />
                  <div className="text-center d-flex justify-content-center">
                    <p>
                      <input
                        id="real-time-request"
                        className="form-control"
                        onBlur={handleUrlChange}
                        onInput={handleUrlChange}
                        placeholder="  Tell us your requirement"
                      />
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      textAlign: "center",
                      marginBottom: "35px",
                    }}
                  >
                    Get a range of leads in real time such as:
                  </p>
                  <div className="row">
                    <div className="col lead-card mx-1 my-3" onClick={(e)=>handleautoinput("Companies got funded today")} >
                      <img
                        style={{ marginTop: "-40px" }}
                        src="assets/images/Group 2523.png"
                        alt=""
                      />
                      <p style={{ fontSize: "14px", textAlign: "center" }} onMouseEnter={changeColorRed} onMouseLeave={changeColorNormal}>
                        Companies got funded today
                      </p>
                    </div>
                    <div className="col lead-card mx-1 my-3" onClick={(e)=>handleautoinput("Companies got M&A today")}>
                      <img
                        style={{ marginTop: "-40px" }}
                        src="assets/images/Group 2523.png"
                        alt=""
                      />
                      <p style={{ fontSize: "14px", textAlign: "center" }} onMouseEnter={changeColorRed} onMouseLeave={changeColorNormal}>
                        Companies got M&A today
                      </p>
                    </div>
                    <div className="col lead-card mx-1 my-3"onClick={(e)=>handleautoinput("Companies Posted jobs today")}>
                      <img
                        style={{ marginTop: "-40px" }}
                        src="assets/images/Group 2523.png"
                        alt=""
                      />
                      <p style={{ fontSize: "14px", textAlign: "center" }} onMouseEnter={changeColorRed} onMouseLeave={changeColorNormal}>
                        Companies Posted jobs today
                      </p>
                    </div>
                    <div className="col lead-card mx-1 my-3" onClick={(e)=>handleautoinput("Investors who funded today")}>
                      <img
                        style={{ marginTop: "-40px" }}
                        src="assets/images/Group 2523.png"
                        alt=""
                      />
                      <p style={{ fontSize: "14px", textAlign: "center" }} onMouseEnter={changeColorRed} onMouseLeave={changeColorNormal}>
                        Investors who funded today
                      </p>
                    </div>
                    <div className="col lead-card mx-1 my-3" onClick={(e)=>handleautoinput("Posted a Looking for a job today")}>
                      <img
                        style={{ marginTop: "-40px" }}
                        src="assets/images/Group 2523.png"
                        alt=""
                      />
                      <p style={{ fontSize: "14px", textAlign: "center" }} onMouseEnter={changeColorRed} onMouseLeave={changeColorNormal}>
                        Posted a Looking for a job today
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      className="trends-btn my-4"
                      style={{ width: "140px" }}
                      onClick={handleSubmit}
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimePage;

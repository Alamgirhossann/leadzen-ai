import React, { useEffect } from "react";

const AskJarvis = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="user-widget-box text-center p-4 my-3">
      <div className="user-promote-logo">
        <img src="assets/images/Group 2117 (1).png" alt="title" />
      </div>
      <div className="user-promote-slider">
        <div className="item">
          <div className="user-promote-item">
            <p className="">
              Want to extract contacts of group members in a LinkedIn group?
            </p>
            <div
              classNameName="px-3 pb-4"
              style={{ position: "absolute", bottom: "15px", content: "" }}
            >
              <a href="/searchResult" className="small m-0">
                Try This
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="user-promote-item">
            <p className="">
              Need a list of companies in semi-conductor space with 1000+
              employees in US?
            </p>
            <div
              classNameName="px-3 pb-4"
              style={{ position: "absolute", bottom: "15px", content: "" }}
            >
              <a href="/searchResult" className="small m-0">
                Try This
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="user-promote-item">
            <p className="">
              Need a detailed list of all the people working for Flipkart?
            </p>
            <div
              classNameName="px-3 pb-4"
              style={{ position: "absolute", bottom: "15px", content: "" }}
            >
              <a href="/searchResult" className="small m-0">
                Try This
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="user-promote-item">
            <p className="">
              Need a detailed list of all the people working for Flipkart?
            </p>
            <div
              classNameName="px-3 pb-4"
              style={{ position: "absolute", bottom: "15px", content: "" }}
            >
              <a href="/searchResult" className="small m-0">
                Try This
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="user-promote-item">
            <p className="">
              Want to extract contacts of group members in a LinkedIn group?
            </p>
            <div
              classNameName="px-3 pb-4"
              style={{ position: "absolute", bottom: "15px", content: "" }}
            >
              <a href="/searchResult" className="small m-0">
                Try This
              </a>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="user-promote-item">
            <p className="">
              Need a detailed list of all the people working for Flipkart?
            </p>
            <div
              classNameName="px-3 pb-4"
              style={{ position: "absolute", bottom: "15px", content: "" }}
            >
              <a href="/searchResult" className="small m-0">
                Try This
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskJarvis;

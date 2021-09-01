import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import AskJarvis from "../SharedComponent/AskJarvis";
import Header from "../SharedComponent/Header";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import UserSearch from "../SharedComponent/UserSearch";
import ExtractContacts from "../SharedComponent/ExtractContacts";
import BulkSearch from "../SharedComponent/BulkSearch";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";
import Cookies from "js-cookie";
import axios from "axios";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;


const FirstTimeUser = () => {
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

    const UpdateUser = async () => {
        try {
            console.log("in update user")

            const fetchResponse = await fetch(apiServer + "/users/me", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${Cookies.get("user_token")}`,
                },
                body: JSON.stringify({"first_time": false}),
            })
            let json_res = await fetchResponse.data;
            console.log("json_res for update user", json_res);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(async () => {
        const script = document.createElement("script");
        script.src = "assets/js/app.js";
        script.async = true;
        UpdateUser()
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };

    }, []);

    function handleCSVFile() {
    }

    return (
        <div>
            <Header user={user}/>

            <div className="modal" id="bulkmodal">
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
                <div className="modal-dialog">
                    <div className="modal-message">
            <p>
              <i className="text-danger">Format to follow:</i> Ensure that the
              first column has the unique values you’re searching for. Download
              the sample below for better understanding.{" "}
            </p>
            <Link>
              <i className="text-danger text-decoration-underline">
                Click here to download csv format
              </i>
            </Link>
          </div>
          <div className="modal-content">
            <form action="/upload" id="mydrop" className="dropzone">
              <div className="dz-message needsclick">
                <button type="button" className="dz-button">
                  Drag and Drop File
                </button>
                <br />
                <button type="button" className="dz-button">
                  OR{" "}
                </button>
                <br />
                <span className="note needsclick">
                  <input type="file" accept=".csv" onChange={handleCSVFile} />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="main-content-area pb-6 pt-2">
        <div className="main-wrapper container-fluid">
          <div className="row">
            <div className="col-md-4 col-lg-3">
                {/* <SpecificSearchBtn/> */}
                <div className="sidebar-search-for sidebar-widget pt-4 my-3">
                    <h6 className="text-danger mb-3">Customize your search</h6>
                    <Filters/>
                </div>
              <BulkSearch />
              <SidebarExtractContact />
            </div>
            <div className="col-md-8 col-lg-9">
              <UserSearch />
              <div>
                <AskJarvis />
              </div>
              <ExtractContacts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeUser;

import React, { useEffect, useState } from "react";
import home from "../../images/menu-home.png";
import brand from "../../images/header-brand-black.png";
import saveList from "../../images/menu-saved-list.png";
import history from "../../images/menu-history.png";
import author from "../../images/author-image.png";
import codeSendBox from "../../images/header-brand-black.png";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import validator from "validator";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import axios from "axios";
import AskJarvis from "../SharedComponent/AskJarvis";
import Header from "../SharedComponent/Header";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import UserSearch from "../SharedComponent/UserSearch";
import ExtractContacts from "../SharedComponent/ExtractContacts";

const FirstTimeUser = () => {
  const [searchText, setSearchText] = useState({ text: null });
  const [customSearch, setCustomSearch] = useState({
    location: null,
    industry: null,
    job_title: null,
    education: null,
    company_name: null,
    keywords: null,
    csv_file: null,
  });
  const [socialMediaSearch, setSocialMediaSearch] = useState({ text: null });
  const [socialMediaType, setSocialMediaType] = useState({
    url: null,
    type: [],
  });
  const handleHeadSearch = (e) => {
    setSearchText({ ...searchText, text: e.target.value });
  };
  const handleHeadSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };
  const handleLocation = (e) => {
    setCustomSearch({ ...customSearch, location: e.target.value });
  };
  const handleIndustry = (e) => {
    setCustomSearch({ ...customSearch, industry: e.target.value });
  };
  const handleJob = (e) => {
    setCustomSearch({ ...customSearch, job_title: e.target.value });
  };
  const handleEducation = (e) => {
    setCustomSearch({ ...customSearch, education: e.target.value });
  };
  const handleCompany = (e) => {
    setCustomSearch({ ...customSearch, company_name: e.target.value });
  };
  const handleKeywords = (e) => {
    setCustomSearch({ ...customSearch, keywords: e.target.value });
  };
  const handleCustomSubmit = (e) => {
    console.log(customSearch);
  };
  const handleCSVFile = (e) => {
    setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
  };
  const handleSocial = (e) => {
    setSocialMediaSearch({ ...socialMediaSearch, text: e.target.value });
  };
  const handleSocialSubmit = (e) => {
    console.log(socialMediaSearch);
  };
  const handleType = (e) => {
    setSocialMediaType({ ...socialMediaType, type: e.target.value });
  };
  const handleURL = (e) => {
    setSocialMediaType({ ...socialMediaType, url: e.target.value });
  };
  const handleTypeSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
    console.log(customSearch);
    console.log(socialMediaType);
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

  useEffect(async () => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    const apiServer = "";
    const apiUrl = "";
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
      }
    } catch (error) {
      console.error("Error while fetching data", error);
    }

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Header user={user} />
      <div className="modal" id="bulkmodal">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <div className="modal-dialog">
          <div classNameName="modal-message">
            <p>
              <i classNameName="text-danger">Format to follow:</i> Ensure that
              the first column has the unique values you’re searching for.
              Download the sample below for better understanding.{" "}
            </p>
            <Link>
              <i classNameName="text-danger text-decoration-underline">
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
              <div className="sidebar-search-for sidebar-widget pt-4 my-3">
                <h6 className="text-danger mb-3">Customize your search</h6>
                <Filters />
              </div>
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

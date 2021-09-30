import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AskJarvis from "../SharedComponent/AskJarvis";
import BulkSearch from "../SharedComponent/BulkSearch";
import ExtractContacts from "../SharedComponent/ExtractContacts";
import Filters from "../SharedComponent/Filters";
import Header from "../SharedComponent/Header";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";
import UserSearch from "../SharedComponent/UserSearch";

const UserGuide = () => {
  const [customSearch, setCustomSearch] = useState({
    location: null,
    industry: null,
    job_title: null,
    education: null,
    company_name: null,
    keywords: null,
    csv_file: null,
  });
  const handleCSVFile = (e) => {
    setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
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
              <SpecificSearchBtn details={true} />
              <div className="sidebar-search-for sidebar-widget pt-4 my-3">
                <h6 className="text-danger mb-3">Customize your search</h6>
                <Filters />
              </div>
              <BulkSearch />
              <SidebarExtractContact />
            </div>
            <div className="col-md-8 col-lg-9">
              <UserSearch />
              <div className="user-widget-box text-center p-4 my-3">
                <div className="user-widget-title">
                  {/* <p className="small text-danger">
                    <u>Hide</u>{" "}
                    <img src="assets/images/user-eye-off.png" alt="title" />
                  </p> */}
                  <h5>Getting Started</h5>
                  <h6 className="text-muted mb-4">
                    Check out some example queries to get familiar with
                    Analystt’s search !
                  </h6>
                  <p className="text-dark">Try these examples</p>
                </div>
                <div className="row">
                  <div className="col-md-12 m-auto">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="user-guide-box p-3 my-3">
                          <button className="user-btn text-white mb-3">
                            <img
                              src="assets/images/user-guide-icon1.png"
                              alt="title"
                            />{" "}
                            https://www.linkedin.c...
                          </button>
                          <p className="text-dark mb-4">
                            Search by LinkedIn Profile URL
                          </p>
                          <a href="/searchResult" className="btn try-it-btn">
                            Try it!
                          </a>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="user-guide-box p-3 my-3">
                          <button className="user-btn text-white  mb-3">
                            <img
                              src="assets/images/user-guide-icon2.png"
                              alt="title"
                            />{" "}
                            John Smith
                          </button>
                          <p className="text-dark mb-4">
                            Search Specific contact by Name
                          </p>
                          <a href="/searchResult" className="btn try-it-btn">
                            Try it!
                          </a>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="user-guide-box p-3 my-3">
                          <button className="user-btn text-white mb-3 mx-1">
                            <img
                              src="assets/images/user-guide-icon3.png"
                              alt="title"
                            />{" "}
                            Designer
                          </button>
                          <button className="user-btn text-white mb-3 mx-1">
                            <img
                              src="assets/images/user-guide-icon4.png"
                              alt="title"
                            />{" "}
                            New York
                          </button>
                          <p className="text-dark mb-4">
                            Search for Designer in New York
                          </p>
                          <a href="/searchResult" className="btn try-it-btn">
                            Try it!
                          </a>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="user-guide-box p-3 my-3">
                          <button className="user-btn text-white  mb-3">
                            Give me list of employee in Amazon
                          </button>
                          <p className="text-dark mb-4">
                            Search as per your requirement
                          </p>
                          <a href="/searchResult" className="btn try-it-btn">
                            Try it!
                          </a>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="user-guide-box p-3 my-3">
                          <button className="user-btn text-white  mb-3">
                            I want contact numbers of my list of customers
                          </button>
                          <p className="text-dark mb-4">
                            Search using csv format
                          </p>
                          <a href="/searchResult" className="btn try-it-btn">
                            Try it!
                          </a>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="user-guide-box p-3 my-3">
                          <button className="user-btn text-white mb-3">
                            Give me contact numbers of people who are following
                            Dunzo on Instagram
                          </button>
                          <p className="text-dark mb-4">
                            Just type your requirement
                          </p>
                          <a href="/searchResult" className="btn try-it-btn">
                            Try it!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="/howToUse" className="text-danger">
                  <u>Take a Demo</u>
                </a>
                <img
                  className="user-author-shape2"
                  src="assets/images/user-robot-icon.png"
                  alt="title"
                />
              </div>
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

export default UserGuide;

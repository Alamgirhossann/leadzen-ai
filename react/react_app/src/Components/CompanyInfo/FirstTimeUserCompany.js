import React, { useEffect, useState } from "react";
import CompanyFilters from "../CompanySharedComponent/CompanyFilters";
import "./Style/style.css";
import AskJarvis from "../SharedComponent/AskJarvis";
import Header from "../SharedComponent/Header";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import UserSearch from "../CompanySharedComponent/UserSearch";
import ExtractContacts from "../SharedComponent/ExtractContacts";
import { Link } from "react-router-dom";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";
import BulkSearch from "../SharedComponent/BulkSearch";

const FirstTimeUserCompany = (props) => {
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
  const [customSearch, setCustomSearch] = useState({
    location: null,
    industry: null,
    job_title: null,
    education: null,
    company_name: null,
    keywords: null,
    csv_file: null,
  });
  const [toggleVal, setToggleVal] = useState();
  const handleCSVFile = (e) => {
    setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
  };
  useEffect(async () => {
    console.log("props>>> firsttimeuser", props);
    // setToggleVal()
  });
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
              <SpecificSearchBtn details={false} />

              <div className="sidebar-search-for sidebar-widget pt-4 my-3">
                <h6 className="text-danger mb-3">Customize your search</h6>
                <CompanyFilters />
              </div>
              <BulkSearch data={true} />
              <SidebarExtractContact data={true} />
            </div>
            <div className="col-md-8 col-lg-9">
              <UserSearch />
              {/*<div>*/}
              {/*  <AskJarvis />*/}
              {/*</div>*/}
              <ExtractContacts data={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeUserCompany;

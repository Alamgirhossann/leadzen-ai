import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import SavedList from "../SavedList/SavedList";
import AskJarvis from "../SharedComponent/AskJarvis";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import UserSearch from "../SharedComponent/UserSearch";
import SharedHistory from "../SharedComponent/SharedHistory";
import BulkSearch from "../SharedComponent/BulkSearch";
import ExtractContacts from "../SharedComponent/ExtractContacts";
import Header from "../SharedComponent/Header";
import Cookies from "js-cookie";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";

const RepeatedUser = () => {
  const history = useHistory();
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
        setMyLeads(result); //Set leads json as object
      }
    } catch (error) {
      console.error("Error while fetching data", error);
    }

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
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

  const user = {
    name: "John Smith",
    email: "johnsmith087@hexagon.in",
    username: "",
    comp: "",
    role: "",
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
  const recommendations = [
    { name: "Robert Brown", role: "Product Manager", comp: "Flipkart" },
    { name: "Lan Bey", role: "CEO", comp: "Amazon UK" },
    { name: "John Smith", role: "Designer", comp: "Flipkart" },
    { name: "Chirs Apple", role: "CFO", comp: "Apple INC" },
    { name: "Stan Joseph", role: "Developer", comp: "Amazon IN" },
    { name: "Stan Joseph", role: "Developer", comp: "Amazon IN" },
  ];
  const handleLogout = (event) => {
    console.log("document.cookie()...handle", document.cookie);
    Cookies.remove("user_token", { path: "" });
    Cookies.remove("user_email", { path: "" });
    console.log("document.cookie()...", document.cookie);
  };
  // console.log("document.cookie()...",Cookies.get("user_token"))
  const handleHeadSearch = (e) => {
    setSearchText({ ...searchText, text: e.target.value });
  };
  const handleHeadSubmit = (e) => {
    e.preventDefault();
    console.log("search Text>>>>>>>>>>>>", searchText);
    if (
      !searchText.text
      // searchText.text === undefined ||
      // searchText.text.toString().length <= 0
    ) {
      alert("Enter details");
      return;
    }
    history.push({
      pathname: "/searchResultTexAu",
      state: { searchText },
    });
  };

  const handleCSVFile = (e) => {
    setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
  };

  const [myLeads, setMyLeads] = useState([]);
  const myTags = [
    {
      tags: ["Tech", "MBA", "USA"],
      search_date: "05/05/2021",
      mail_used: 15,
      profile_used: 22,
    },
  ];
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
              <ExtractContacts />
              <div style={{ background: "white", borderRadius: "20px" }}>
                <SharedHistory />
              </div>

              {/*<div className="user-widget-box text-center p-4 my-3">*/}
              {/*  <h6 className="user-magic-title">*/}
              {/*    {" "}*/}
              {/*    <img*/}
              {/*      src="assets/images/start-user-magic.png"*/}
              {/*      alt="title"*/}
              {/*    />{" "}*/}
              {/*    Magic Recommendations*/}
              {/*  </h6>*/}
              {/*  <p className="text-muted mb-3">*/}
              {/*    {" "}*/}
              {/*    Hey, Based on your latest search intrest, these are best magic*/}
              {/*    recommendation for you !!{" "}*/}
              {/*    <span className="text-danger">~Jarv</span>*/}
              {/*  </p>*/}
              {/*  <div className="px-5 pxlg-7 mb-3 row">*/}
              {/*    {recommendations.map((data) => (*/}
              {/*      <div className="col-6 col-sm-4 col-lg-3 col-xl-2">*/}
              {/*        <div className="user-author-item my-2">*/}
              {/*          <img*/}
              {/*            src="assets/images/user-athor-pic.png"*/}
              {/*            alt="title"*/}
              {/*          />*/}
              {/*          <h6 className="small m-0">{data.name}</h6>*/}
              {/*          <small>{data.role}</small>*/}
              {/*          <br></br>*/}
              {/*          <small>{data.comp}</small>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*  <img*/}
              {/*    src="assets/images/user-robot-icon.png"*/}
              {/*    alt="#"*/}
              {/*    className="user-author-shape"*/}
              {/*  />*/}
              {/*  <a href="/searchResult" className="text-danger">*/}
              {/*    View List*/}
              {/*  </a>*/}
              {/*</div>*/}

              {/*<div>*/}
              {/*  <AskJarvis />*/}
              {/*</div>*/}
              {/*<div style={{ background: "white", borderRadius: "20px" }}>*/}
              {/*  <SavedList />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatedUser;

import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SavedList from "../SavedList/SavedList";
import SearchResult from "../SearchResult/SearchResult";
import AskJarvis from "../SharedComponent/AskJarvis";
import Header from "../SharedComponent/Header";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import UserSearch from "../SharedComponent/UserSearch";
import SharedHistory from "../SharedComponent/SharedHistory";

const RepeatedUser = () => {
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
  const [socialMediaSearch, setSocialMediaSearch] = useState({ text: null });
  const [socialMediaType, setSocialMediaType] = useState({
    url: null,
    type: [],
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

  const handleHeadSearch = (e) => {
    setSearchText({ ...searchText, text: e.target.value });
  };
  const handleHeadSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
    return <Redirect to="/searchResult" />;
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
    return <Redirect to="/searchResult" />;
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
    setSocialMediaType({
      ...socialMediaType,
      type: [socialMediaType.type, e.target.value],
    });
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
  const [myLeads, setMyLeads] = useState([
    {
      name: "John Smith",
      desc: "English Speaker",
      comp: "Hexagon AB",
      search_date: "12/05/2021",
      mail_used: 7,
      profile_used: 5,
    },
    {
      name: "Joe Mama",
      desc: "English Speaker",
      comp: "Apple INC",
      search_date: "05/05/2021",
      mail_used: 12,
      profile_used: 9,
    },
  ]);
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
        ></button>
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
              <div className="sidebar-search-for sidebar-widget pt-4 my-3">
                <h6 className="text-danger mb-3">Customize your search</h6>
                <Filters />
              </div>
              <SidebarExtractContact />
            </div>
            <div className="col-md-8 col-lg-9">
              <UserSearch />
              <div style={{ background: "white", borderRadius: "20px" }}>
                <SharedHistory />
              </div>

              <div className="user-widget-box text-center p-4 my-3">
                <h6 className="user-magic-title">
                  {" "}
                  <img
                    src="assets/images/start-user-magic.png"
                    alt="title"
                  />{" "}
                  Magic Recommendations
                </h6>
                <p className="text-muted mb-3">
                  {" "}
                  Hey, Based on your latest search intrest, these are best magic
                  recommendation for you !!{" "}
                  <span className="text-danger">~Jarvis</span>
                </p>
                <div className="px-5 pxlg-7 mb-3 row">
                  {recommendations.map((data) => (
                    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                      <div className="user-author-item my-2">
                        <img
                          src="assets/images/user-athor-pic.png"
                          alt="title"
                        />
                        <h6 className="small m-0">{data.name}</h6>
                        <small>{data.role}</small>
                        <br></br>
                        <small>{data.comp}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <img
                  src="assets/images/user-robot-icon.png"
                  alt="#"
                  className="user-author-shape"
                />
                <a href="/history" className="text-danger">
                  View List
                </a>
              </div>

              <div>
                <AskJarvis />
              </div>
              <div style={{ background: "white", borderRadius: "20px" }}>
                <SavedList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatedUser;

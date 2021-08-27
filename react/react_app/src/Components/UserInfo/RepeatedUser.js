import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import SavedList from "../SavedList/SavedList";
import AskJarvis from "../SharedComponent/AskJarvis";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import UserSearch from "../SharedComponent/UserSearch";
import SharedHistory from "../SharedComponent/SharedHistory";
import Cookies from "js-cookie";

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
      <header className="header-area">
        <nav className="header-navbar navbar navbar-expand-xl bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/repeatedUser">
              <img src="assets/images/header-brand-black.png" alt="title" />
            </a>

            <ul className="navbar-nav-profile navbar-nav align-items-center ms-auto">
              <li className="nav-item me-md-4 me-3">
                <a className="nav-icon-menu nav-link" href="/">
                  <img src="assets/images/menu-home.png" alt="home here" />
                  <span className="text-danger">Home</span>
                </a>
              </li>
              <li className="nav-item me-md-4 me-3">
                <a className="nav-icon-menu nav-link" href="/savedList">
                  <img
                    src="assets/images/menu-saved-list.png"
                    alt="saved here"
                  />
                  Saved lists
                </a>
              </li>
              <li className="nav-item me-md-4 me-3">
                <a className="nav-icon-menu nav-link" href="/history">
                  <img
                    src="assets/images/menu-history.png"
                    alt="history here"
                  />
                  History
                </a>
              </li>
              <li className="nav-item me-md-4 me-3">
                <li className="nav-item dropdown">
                  <a
                    className="credit-btn btn btn-outline-danger nav-link"
                    href="#"
                  >
                    4 Credits Left
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <p className="dropdown-item">
                        <img
                          src="assets/images/pro-codesandbox.png"
                          alt="title"
                        />{" "}
                        My Credits
                      </p>
                    </li>
                    <li>
                      <div className="dropdown-progress">
                        <p className="small">
                          Profile credits used:{" "}
                          {user.subscription.profile_credits} / 1000
                        </p>
                        <div className="progress mb-2">
                          <div
                            className="progress-bar"
                            style={{ width: "45%" }}
                            role="progressbar"
                            aria-valuenow="45"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="dropdown-progress">
                        <p className="small">
                          {" "}
                          Mail credits used: {user.subscription.mail_credits} /
                          2000
                        </p>
                        <div className="progress mb-2">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "65%" }}
                            aria-valuenow="65"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>

                        <span className="small">Limit resets in 5 days</span>
                      </div>
                    </li>
                  </ul>
                </li>
              </li>
              <li className="nav-item">
                <li className="nav-item dropdown">
                  <a
                    className="profile-avata nav-link"
                    data-bs-toggle="dropdown"
                    href="#"
                  >
                    <img
                      src="assets/images/author-image.png"
                      alt="search here"
                    />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="dropdown-credit">
                        <span className="fw-bold">
                          {user.subscription.profile_credits +
                            user.subscription.mail_credits}{" "}
                          credits <br /> pending
                        </span>
                        <img src="assets/images/credit-icon.png" alt="title" />
                      </div>
                    </li>
                    <li>
                      <a className="dropdown-item active" href="#">
                        Upgrade to premium
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/pricing">
                        Buy Credits
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profile Settings
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="history">
                        Export History
                      </a>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <span
                          className="text-muted me-3"
                          onClick={(event) => handleLogout(event)}
                        >
                          Logout
                        </span>{" "}
                        <img src="assets/images/logout-icon.png" alt="image" />
                      </Link>
                    </li>
                  </ul>
                </li>
              </li>
            </ul>
          </div>
        </nav>
      </header>

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
                  <span className="text-danger">~Jarv</span>
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
                <a href="/searchResult" className="text-danger">
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

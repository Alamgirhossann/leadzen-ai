import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../SharedComponent/Pagination";

const SearchResult = (props) => {
  const [customSearch, setCustomSearch] = useState({
    location: null,
    industry: null,
    job_title: null,
    education: null,
    company_name: null,
    keywords: null,
    csv_file: null,
  });
  const [searchText, setSearchText] = useState();
  const [socialMediaType, setSocialMediaType] = useState({
    url: null,
    type: [],
  });
  const [socialMediaSearch, setSocialMediaSearch] = useState({ text: null });
  const [resultData, setSearchResult] = useState({ data: null });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLeads, setCurrentLeads] = useState([]);
  let data1 = {};
  const [myLeads, setMyLeads] = useState([]);
  let today = new Date();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  const paginate = (pageNumber) => {
    setCurrentLeads([]);
    setCurrentPage(pageNumber);

    setCurrentLeads(myLeads.slice(pageNumber * 10 - 10, pageNumber * 10));
    console.log(
      "currentLeads>>>",
      currentLeads,
      pageNumber * 10 - 10,
      pageNumber * 10,
      myLeads.slice(pageNumber * 10 - 10, pageNumber * 10)
    );
  };
  today = dd + "/" + mm + "/" + yyyy;
  useEffect(async () => {
    console.log("Props STate>>>>", props.location.state.searchText.text);
    // await fetchData(props.location.state.searchText.text);
    // console.log("after fetch>>>>");
    if (props.location.pathname.includes("/searchResultTexAu")) {
      let isEmail = props.location.state.searchText.text.includes("@");
      let words = WordCount(props.location.state.searchText.text);
      let isMultiWords = props.location.state.searchText.text.includes(" ");
      let isUrl =
        props.location.state.searchText.text
          .toLowerCase()
          .includes("https://") ||
        props.location.state.searchText.text.toLowerCase().includes("http://");

      // if (isEmail || words >= 0) {
      let reqJson = {};
      let firstNameUser,
        lastNameUser,
        emailUser,
        urlUser = "";
      console.log(
        "check>>>>>>>>>!isUrl && !isEmail && isMultiWords <= 3",
        isEmail,
        isUrl,
        words <= 3,
        !isUrl && !isEmail && isMultiWords
      );
      if (isEmail) {
        emailUser = props.location.state.searchText.text;
      }
      if (!isUrl && !isEmail && isMultiWords) {
        firstNameUser = props.location.state.searchText.text.split(" ")[0];

        switch (words) {
          case 2:
            lastNameUser = props.location.state.searchText.text.split(" ")[1];
            break;
          case 3:
            lastNameUser = props.location.state.searchText.text.split(" ")[2];
            break;
        }
      }
      if (isUrl) {
        urlUser = props.location.state.searchText.text;
      }
      if (emailUser === undefined || emailUser === null) emailUser = "";
      if (lastNameUser === undefined || lastNameUser === null)
        lastNameUser = "";
      if (firstNameUser === undefined || firstNameUser === null)
        firstNameUser = "";
      if (urlUser === undefined) urlUser = "";
      reqJson = {
        email: emailUser,
        firstName: firstNameUser,
        lastName: lastNameUser,
        url: urlUser,
      };
      console.log("reqJson>>>>>>>>", reqJson);
      await fetchData(reqJson);
    }
  }, []);

  useEffect(async () => {
    paginate(1);
  }, [myLeads]);
  function WordCount(str) {
    return str.split(" ").length;
  }
  const fetchData = async (searchText) => {
    console.log("SearchText.....In Result...", searchText);
    const response = await fetch(apiServer + "texAu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(searchText),
    });
    data1 = await response.json();
    console.log("Data>>>>>>>>>>>", data1);

    data1 ? setMyLeads(data1.execution.output) : setLoading(true);
    // setLoading(true);
    data1 ? setSearchResult({ ...resultData, data: data1 }) : setLoading(true);
    data1 ? setLoading(false) : setLoading(true);
    console.log("MyLeads before paginate>>>>>", myLeads);
    // paginate(1);
  };
  console.log("myLeads>>>>>>>>>>>", myLeads);

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const showClick = (e) => {
    e.preventDefault();
    if (!show) setShow(true);
  };
  const clickSelect = (e) => {
    e.preventDefault();
    if (!selected) setSelected(true);
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

  let searchData = { count: 12, total: 250 };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearchSubmit = (e) => {
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
  const handleType = (e) => {
    setSocialMediaType({ ...socialMediaType, type: e.target.value });
  };
  const handleSocialMedia = (e) => {
    setSocialMediaSearch({ ...socialMediaSearch, text: e.target.value });
  };
  const handleTypeSubmit = (e) => {
    e.preventDefault();
    console.log(socialMediaSearch);
  };

  // const handleUnlock = (name) => {
  //   let index = myLeads.findIndex((myLeads) => myLeads.name === name);
  //   let show_value = myLeads[index].show;
  //   if (!show_value) {
  //     myLeads[index] = { ...myLeads[index], show: true };
  //     console.log(myLeads[index]);
  //   }
  //   return false;
  // };

  function handleViewProfile(index, resData) {
    console.log("handleViewProfile>>>>", index, resData, currentPage);

    // history.push({
    //   pathname: "/detailedInfo",
    //   state: { data },
    // });
    // return <SpecificUser details={resData} />;
  }

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
                <a className="nav-icon-menu nav-link" href="#">
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
                          />
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
                          />
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
                      <a className="dropdown-item" href="/history">
                        Export History
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/logIn">
                        <span className="text-muted me-3">Logout</span>{" "}
                        <img src="assets/images/logout-icon.png" alt="image" />
                      </a>
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
              <div className="sidebar-search-for sidebar-widget p-4 my-3">
                <h6 className="text-danger mb-3">Customize your search </h6>
                <div>
                  <p
                    className="text-left top-search"
                    style={{ width: "100px" }}
                  >
                    <img
                      style={{ width: "10px", marginRight: "5px" }}
                      src="assets/images/cil_location-pin.png"
                      alt=""
                    />
                    USA
                    <img
                      className="ps-4"
                      src="assets/images/cross-icon.png"
                      alt=""
                    />
                  </p>
                  <p
                    className="text-left top-search"
                    style={{ width: "130px" }}
                  >
                    <img
                      style={{ width: "8px", marginRight: "5px" }}
                      src="assets/images/pro-profile.png"
                      alt=""
                    />
                    Designer
                    <img
                      className="ps-4"
                      src="assets/images/cross-icon.png"
                      alt=""
                    />
                  </p>
                  <div className="d-flex justify-content-between">
                    <p>
                      <img
                        style={{ width: "10px", marginRight: "5px" }}
                        src="assets/images/combined-eye.png"
                        alt=""
                      />
                      Hide
                    </p>
                    <p className="text-danger">Clear All</p>
                  </div>
                </div>
                <div
                  className="sidebar-accordion accordion"
                  id="accordionExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#one"
                      >
                        <img
                          src="assets/images/accord-map-pin.png"
                          alt="title"
                        />{" "}
                        Location
                      </button>
                    </h2>
                    <div
                      id="one"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <input
                          className="customize-search"
                          onBlur={handleLocation}
                          type="text"
                          placeholder="Search Location"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#two"
                      >
                        <img
                          src="assets/images/accord-coffee.png"
                          alt="title"
                        />{" "}
                        Industry
                      </button>
                    </h2>
                    <div
                      id="two"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <input
                          className="customize-search"
                          onBlur={handleIndustry}
                          type="text"
                          placeholder="Search Industry"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#tree"
                      >
                        <img src="assets/images/accord-award.png" alt="title" />{" "}
                        Job title
                      </button>
                    </h2>
                    <div
                      id="tree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <input
                          className="customize-search"
                          onBlur={handleJob}
                          type="text"
                          placeholder="Search Job title"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#four"
                      >
                        <img src="assets/images/accord-book.png" alt="title" />{" "}
                        Education
                      </button>
                    </h2>
                    <div
                      id="four"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <input
                          className="customize-search"
                          onBlur={handleEducation}
                          type="text"
                          placeholder="Search Education"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#five"
                      >
                        <img
                          src="assets/images/accord-briefcase.png"
                          alt="title"
                        />{" "}
                        Company Name
                      </button>
                    </h2>
                    <div
                      id="five"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <input
                          className="customize-search"
                          onBlur={handleCompany}
                          type="text"
                          placeholder="Search Company Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#six"
                      >
                        <img src="assets/images/accord-key.png" alt="title" />{" "}
                        Keywords
                      </button>
                    </h2>
                    <div
                      id="six"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <input
                          className="customize-search"
                          onBlur={handleKeywords}
                          type="text"
                          placeholder="Search Keywords"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={{ background: "#FB3E3E" }}
                  onClick={handleCustomSubmit}
                  className="btn text-white"
                  type="submit"
                >
                  <span className="pe-1">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>{" "}
                  Search
                </button>
                <p>
                  Bulk Search by uploding{" "}
                  <a
                    href="#"
                    className="text-danger"
                    onChange={handleCSVFile}
                    data-bs-toggle="modal"
                    data-bs-target="#bulkmodal"
                  >
                    csv
                  </a>
                </p>
              </div>
              <div className="sidebar-search-for sidebar-widget p-4 my-3">
                <h6 className="text-danger mb-3"> Now Extract contacts </h6>
                <p>
                  {" "}
                  of Followers, Likers, Commentors & Group Members & Job Seekers
                  From Social Media
                </p>
                <ul className="sidebar-social mt-3 mb-4 list-inline">
                  <li className="list-inline-item">
                    <a href="#">
                      <img
                        src="assets/images/social-facebook.png"
                        alt="title"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <img
                        src="assets/images/social-instagram.png"
                        alt="title"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <img src="assets/images/social-twitter.png" alt="title" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <img
                        src="assets/images/social-linkedin.png"
                        alt="title"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <img src="assets/images/social-youtube.png" alt="title" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <img
                        src="assets/images/social-naukri-com.png"
                        alt="title"
                      />
                    </a>
                  </li>
                </ul>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      onBlur={handleSocialMedia}
                      placeholder="Enter Social media URL"
                    />
                  </div>
                  <div className="dropdown mb-3">
                    <input
                      className="form-control dropdown-toggle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      placeholder="Search your job"
                    />
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div className="dropdown-wraper">
                        <div className="radio-bg">
                          <span>All</span>
                          <input
                            type="checkbox"
                            id="All"
                            value="All"
                            onChange={handleType}
                            checked={socialMediaType.type.includes("All")}
                          />
                        </div>
                        <div className="radio-bg">
                          <span>Follower</span>
                          <input
                            type="checkbox"
                            id="Follower"
                            value="Follower"
                            onChange={handleType}
                            checked={socialMediaType.type.includes("Follower")}
                          />
                        </div>
                        <div className="radio-bg">
                          <span>Likers</span>
                          <input
                            type="checkbox"
                            id="Likers"
                            value="Likers"
                            onChange={handleType}
                            checked={socialMediaType.type.includes("Likers")}
                          />
                        </div>
                        <div className="radio-bg">
                          <span>Commentors</span>
                          <input
                            type="checkbox"
                            id="Comentetors"
                            value="Commentors"
                            onChange={handleType}
                            checked={socialMediaType.type.includes(
                              "Commentors"
                            )}
                          />
                        </div>
                        <div className="radio-bg">
                          <span>Job Seeker</span>
                          <input
                            type="checkbox"
                            id="Job Seeker"
                            value="Job Seeker"
                            onChange={handleType}
                            checked={socialMediaType.type.includes(
                              "Job Seeker"
                            )}
                          />
                        </div>
                        <div className="radio-bg">
                          <span>Group Members</span>
                          <input
                            type="checkbox"
                            id="Group Members"
                            value="Group Members"
                            onChange={handleType}
                            checked={socialMediaType.type.includes(
                              "Group Members"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    style={{ background: "#FB3E3E" }}
                    onClick={handleTypeSubmit}
                    className="btn text-white"
                    type="submit"
                  >
                    <span className="pe-1">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>{" "}
                    Search
                  </button>
                  <p className="m-0">
                    <a href="/userGuide" className="learn-link">
                      Learn More
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-md-8 col-lg-9">
              <div className="user-search-wrapper">
                <div className="detailed-search">
                  <div className="search-promote-content">
                    <form className="form-inline d-flex my-2 my-lg-0">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        onBlur={handleSearch}
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn text-white d-flex ms-3"
                        onClick={handleSearchSubmit}
                        style={{
                          background: "#FB3E3E",
                          position: "absolute",
                          left: "325px",
                        }}
                        type="submit"
                      >
                        <span className="pe-1">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>{" "}
                        Search
                      </button>
                    </form>
                  </div>
                  <div>
                    <small>Last Updated: {today}</small>
                  </div>
                </div>
              </div>
              <div className="user-widget-box  my-3">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <div className="d-flex align-items-center ">
                    <input
                      className="ms-3 me-3"
                      type="checkbox"
                      id="checkbox"
                    />
                    <small className="">
                      <b>{searchData.count}</b> of{" "}
                      <b>{myLeads ? myLeads.length : 0}</b> Searched profiles
                    </small>
                  </div>
                  <div className="d-flex">
                    <small className="unlock-btn">
                      Unlock Profile{" "}
                      <img
                        className="ps-3"
                        src="assets/images/Group 1617.png"
                        alt=""
                      />
                    </small>
                    <small className="unlock-btn">
                      Unlock Mails{" "}
                      <img
                        className="ps-3"
                        src="assets/images/Group 1617.png"
                        alt=""
                      />
                    </small>
                    <small className="export-btn">
                      Export{" "}
                      <img
                        className="ps-3"
                        src="assets/images/export.png"
                        alt=""
                      />
                    </small>
                  </div>
                </div>
              </div>

              <div className="user-widget-box  my-3">
                <div className="search-container mb-2">
                  {currentLeads
                    ? currentLeads.map((data, index) => (
                        <div>
                          <div className="user-container py-2" key={index}>
                            <input
                              className="box ms-3 me-3"
                              type="checkbox"
                              id="checkbox"
                            />
                            <p className="search-author text-danger">
                              <img
                                src={
                                  data.profilePicture
                                    ? data.profilePicture
                                    : "assets/images/author-image.png"
                                }
                                alt=""
                              />
                            </p>
                            <div className="search-user">
                              <p>{data.length === 0 ? null : data.name}</p>
                              <small className="d-block">
                                Works at {data.length === 0 ? null : data.job}
                              </small>
                              <small className="d-block">
                                {data.length === 0 ? null : data.location}
                              </small>
                            </div>
                            <div className="search-email text-center">
                              <small
                                className={show ? "d-block" : "d-block blur"}
                              >
                                alamgirhossann
                              </small>
                              <a href="#" onClick={showClick}>
                                <small className="d-block text-danger">
                                  Unlock
                                </small>
                              </a>
                            </div>
                            <p className="search-view-btn ">
                              <a
                                className="btn"
                                data-toggle="collapse"
                                href={"#collapseExample_" + index}
                                data-target={"#collapseExample_" + index}
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                                onClick={handleViewProfile(index, data)}
                              >
                                View Profile
                              </a>
                            </p>

                            <a href="#" onClick={clickSelect}>
                              <p className="search-close-btn">
                                <img
                                  src={
                                    selected
                                      ? "assets/images/Frame 543.png"
                                      : "assets/images/Group 1863.png"
                                  }
                                  alt=""
                                />
                              </p>
                            </a>
                          </div>
                          <div
                            style={{
                              background: "white",
                              borderRadius: "20px",
                              padding: "20px",
                            }}
                          >
                            <div
                              className="panel-collapse collapse in"
                              id={"collapseExample_" + index}
                            >
                              {/*{handleViewProfile(index, data)}*/}
                              <div className="card card-body">
                                welcome
                                {/*<SpecificUser details={data} />*/}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Pagination
                  postsPerPage={10}
                  totalPosts={myLeads.length}
                  paginate={paginate}
                />
              </div>
              <div className="user-widget-box text-center p-4 my-3">
                <div className="user-promote-logo">
                  <img src="assets/images/user-company-brand.png" alt="title" />
                </div>
                <div className="user-promote-slider">
                  <div className="item">
                    <div className="user-promote-item">
                      <p className="">
                        Want to extract contacts of group members in a LinkedIn
                        group?
                      </p>
                      <div
                        className="px-3 pb-4"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          content: "",
                        }}
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
                        Need a list of companies in semi-conductor space with
                        1000+ employees in US?
                      </p>
                      <div
                        className="px-3 pb-4"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          content: "",
                        }}
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
                        Need a detailed list of all the people working for
                        Flipkart?
                      </p>
                      <div
                        className="px-3 pb-4"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          content: "",
                        }}
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
                        Want to extract contacts of group members in a LinkedIn
                        group?
                      </p>
                      <div
                        className="px-3 pb-4"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          content: "",
                        }}
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
                        Need a detailed list of all the people working for
                        Flipkart?
                      </p>

                      <div
                        className="px-3 pb-4"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          content: "",
                        }}
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
                        Want to extract contacts of group members in a LinkedIn
                        group?
                      </p>
                      <div
                        className="px-3 pb-4"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          content: "",
                        }}
                      >
                        <a href="/searchResult" className="small m-0">
                          Try This
                        </a>
                      </div>
                    </div>
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

export default SearchResult;

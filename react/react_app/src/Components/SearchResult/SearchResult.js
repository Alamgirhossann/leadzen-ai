import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../SharedComponent/Pagination";
import SpecificUser from "../DetailedInfo/SpecificUser";
import Header from "../SharedComponent/Header";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import Filters from "../SharedComponent/Filters";

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
    // console.log("Props STate>>>>", props.location.state.searchText.text);
    if (props.location.pathname.includes("/advanceSearch")) {
      console.log("from advance......", props.location.state.customSearch);
      let json_res = null;
      try {
        const response = await fetch(apiServer + "/texAu/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(props.location.state.customSearch),
        });
        json_res = await response.json();
        console.log("json_res texAu...", json_res);
      } catch (err) {
        console.error("Error: ", err);
      }
    }
    if (props.location.pathname.includes("/searchResult")) {
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
        console.log("Its email");
        emailUser = props.location.state.searchText.text;
      }
      if (!isUrl && !isEmail && isMultiWords) {
        console.log("Its sentence or multiple words");
        firstNameUser = props.location.state.searchText.text.split(" ")[0];

        switch (words) {
          case 2:
            lastNameUser = props.location.state.searchText.text.split(" ")[1];
            break;
          case 3:
            lastNameUser = props.location.state.searchText.text.split(" ")[2];
            break;
          default:
            lastNameUser =
              props.location.state.searchText.text.split(" ")[words - 1];
        }
      }
      if (isUrl) {
        console.log("Its Url");
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
        name: { first_name: firstNameUser, last_name: lastNameUser },
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
    console.log("SearchText.....FetchApi...", apiServer);
    let response,
      json_res = null;
    try {
      response = await fetch(apiServer + "/pipl/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(searchText),
      });

      json_res = await response.json();

      console.log("Data>>>>>>>>>>>", json_res);

      if (!json_res.detail) {
        setMyLeads(json_res);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error: ", err);
    }
  };
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

  var searchData = { count: 12, total: 250 };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };

  const handleCSVFile = (e) => {
    setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
  };

  return (
    <div>
      <Header user={user} />
      <div className="modal" id="UpgradeModal">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="d-flex">
              <div className="pe-4">
                <img
                  style={{ height: "125px", width: "100px" }}
                  src="assets/images/g10.png"
                  alt=""
                />
              </div>
              <div className="text-center">
                <p className="text-danger ">Oops</p>
                <p>
                  looks like you have insufficient credit to access this leads.
                  upgrade your plan now.
                </p>
                <button
                  style={{ background: "#FB3E3E" }}
                  className="btn text-white"
                >
                  {" "}
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <i className="text-danger">Format to follow:</i>
              Ensure that the first column has the unique values you’re
              searching for. Download the sample below for better understanding.
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
                  OR
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
                        </span>
                        Search
                      </button>
                    </form>
                  </div>
                  <div>
                    <small>Last Updated: {today}</small>
                  </div>
                </div>
                <div>
                  <p className="mt-3">
                    Extracted Results for:{" "}
                    <span className="link-style">
                      <img src="assets/images/Vector (2).png" alt="" />{" "}
                      https://www.instagram.com/
                    </span>
                    <span className="link-style">Followers</span>{" "}
                    <a className="text-danger" href="#">
                      Clear All
                    </a>
                  </p>
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
                      <b>{currentLeads.length}</b> of{" "}
                      <b>{myLeads ? myLeads.length : 0}</b> Searched profiles
                    </small>
                  </div>
                  <div className="d-flex">
                    <small className="unlock-btn">
                      Unlock Profile
                      <img
                        className="ps-3"
                        src="assets/images/Group 1617.png"
                        alt=""
                      />
                    </small>
                    <small className="unlock-btn">
                      Unlock Mails
                      <img
                        className="ps-3"
                        src="assets/images/Group 1617.png"
                        alt=""
                      />
                    </small>
                    <small className="export-btn">
                      Export
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
                {loading === false ? (
                  <div className="search-container mb-2">
                    {myLeads.length === 0 ? (
                      <div>
                        <h5>Record not found</h5>
                      </div>
                    ) : currentLeads ? (
                      currentLeads.map((data, index) => (
                        <div>
                          <div className="user-container py-2" key={index}>
                            <input
                              className="box ms-3 me-3"
                              type="checkbox"
                              id="checkbox"
                            />
                            <p className="search-author text-danger">
                              <img
                                src="assets/images/author-image.png"
                                alt=""
                              />
                            </p>
                            <div className="search-user">
                              <p>
                                {data.names.length === 0
                                  ? null
                                  : data.names[0]._display}
                              </p>
                              <small className="d-block">
                                Works at{" "}
                                {data.jobs.length === 0
                                  ? null
                                  : data.jobs[0]._display}
                              </small>
                              <small className="d-block">
                                {data.addresses.length === 0
                                  ? null
                                  : data.addresses[0]._display}
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
                              {/* <div className="card card-body"> */}
                              <SpecificUser details={data} />
                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h5>Record not found</h5>
                    )}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
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

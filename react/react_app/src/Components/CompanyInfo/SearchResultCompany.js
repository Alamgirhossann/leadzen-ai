import React, { useEffect, useState } from "react";
import "./Style/style.css";
import Header from "../SharedComponent/Header";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";

import { Link } from "react-router-dom";
import CompanyFilters from "../CompanySharedComponent/CompanyFilters";
import BulkSearch from "../SharedComponent/BulkSearch";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Pagination from "../SharedComponent/Pagination";

const SearchResultCompany = (props) => {
  const [customSearch, setCustomSearch] = useState({
    name: null,
    location: null,
    industry: null,
    employeeCount: null,
  });
  const [loading, setLoading] = useState(true);
  const tempCookie = Cookies.get("user_linkedin_cookie");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLeads, setCurrentLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  let today = new Date();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  const [searchId, setSearchId] = useState();
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
  today = dd + "/" + mm + "/" + yyyy;
  const paginate = (pageNumber) => {
    setCurrentLeads([]);
    setCurrentPage(pageNumber);
    setCurrentLeads(
      myLeads && Array.isArray(myLeads)
        ? myLeads.slice(pageNumber * 10 - 10, pageNumber * 10)
        : 0
    );
  };

  useEffect(() => {
    paginate(1);
  }, [myLeads]);
  useEffect(async () => {
    let requestForTexAu = {};
    if (props.location.state.customSearch) {
      setCustomSearch(props.location.state.customSearch);
      console.log(
        "from advance.customSearch filters .....",
        props.location.state.customSearch
      );
      setLoading(true);
      requestForTexAu = {
        name: props.location.state.customSearch.name
          ? props.location.state.customSearch.name
          : "",

        industry: props.location.state.customSearch.industry
          ? [props.location.state.customSearch.industry]
          : [],
        location: props.location.state.customSearch.location
          ? [props.location.state.customSearch.location]
          : [],
        employeeCount: props.location.state.customSearch.employeeCount
          ? [props.location.state.customSearch.employeeCount]
          : [],
      };
      const endpoint = "/texau/linkedin/matching_profiles_for_company_url";
      const inputData = requestForTexAu;
      inputData.cookie = tempCookie;
      await sendForExecution(endpoint, inputData);
    }
    if (props.location.pathname.includes("/company_result_by_name")) {
      console.log("......from name .....", props.location.state.requestTexAu);
      setLoading(true);
      requestForTexAu = {
        name: props.location.state.requestTexAu.name,
        industry: [],
        location: [],
        employeeCount: [],
      };
      const endpoint = "/texau/linkedin/matching_profiles_for_company_url";
      const inputData = requestForTexAu;
      inputData.cookie = tempCookie;
      await sendForExecution(endpoint, inputData);
    }
    if (props.location.pathname.includes("/result_by_history_type3")) {
      try {
        const response = await fetch(
          apiServer + `/history/id/${props.location.state.details.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );

        let json_res = await response.json();
        setSearchId(json_res.search_id);
        console.log("Data>>>>>>>>>>>loading..", json_res, loading);
        setLoading(false);

        setMyLeads(json_res.search_results);
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  }, []);

  const sendForExecution = async (endpoint, inputData) => {
    function handleError(status) {
      setLoading(false);
      setMyLeads([]);
      console.error(`Got HTTP Error ${status}`);
      // alert("Error Searching For Leads");
    }

    console.log(`endpoint: ${endpoint}, inputData: ${inputData}`);
    console.log(inputData);

    try {
      const response = await fetch(apiServer + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify(inputData),
      });

      function handleUnAuthorized(response = null) {
        console.log("User is UnAuthorized");
        alert("Please Logout and LogIn Again");
        setLoading(false);
        setMyLeads([]);
      }

      async function handleSuccess(response) {
        let json = await response.json();
        if (!json || !json.execution_id) {
          handleError(response);
        }

        console.log(`Got Response ${json}`);
        checkExecutionStatus(json.execution_id);
      }

      switch (response.status) {
        case 200:
          return await handleSuccess(response);
        case 401:
          return handleUnAuthorized(response);
        default:
          return handleError(response);
      }
    } catch (err) {
      console.error(`Exception Getting Data from ${endpoint}`);
      console.error(err);
      handleError(500);
    }
  };

  const checkExecutionStatus = (executionId = null) => {
    if (!executionId) {
      console.log("executionId is Null");
      return;
    }

    let timeoutId;

    const intervalId = setInterval(async () => {
      console.log("In interval.....");
      try {
        const response = await fetch(
          apiServer + `/texau/result/${executionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );

        function handleError() {
          if (timeoutId) clearTimeout(timeoutId);
          clearInterval(intervalId);

          setLoading(false);
          setMyLeads("");
        }

        async function handleSuccess(response) {
          const json = await response.json();
          if (!json || !json.data) {
            console.warn(`Invalid Data`);
            return handleError();
          }

          console.log(json);

          setLoading(false);
          if (timeoutId) clearTimeout(timeoutId);
          clearInterval(intervalId);

          setMyLeads(json.data);
          await saveSearchedRecord(json.data, "texAuCompany");
        }

        function handleUnAuthorized(response = null) {
          console.log("User is UnAuthorized");
          handleError();
          alert("Please Logout and LogIn Again");
        }

        function handleCookieError() {
          // got cookie error - no need to check again, results will not change
          console.log("Response cookie error", response.statusText);
          handleError();
        }

        function handleNotFound() {
          console.log("Not Found Yet, Waiting...");
        }

        switch (response.status) {
          case 200:
            return handleSuccess(response);
          case 401:
            return handleUnAuthorized(response);
          case 403:
            return handleCookieError();
          case 404:
            return handleNotFound();
          default:
            return handleError();
        }
      } catch (e) {
        console.error("Exception>>", e);
      }
    }, 5 * 1000);

    timeoutId = setTimeout(function () {
      console.error("record not found within 5 Min");
      clearInterval(intervalId);
      // TODO: show appropriate ui actions like stop spinners and show error message etc
    }, 5 * 60 * 1000);
  };

  const saveSearchedRecord = async (response, searchType) => {
    // console.log("In saveSearchedRecord...searchTerm", searchTerm);
    let search_term = "";

    if (props.location.pathname.includes("/searchResultCompany")) {
      let values = Object.values(props.location.state.customSearch);

      search_term = values.filter(Boolean).toString();

      console.log("Values Only.....>>>>", search_term);
    }
    let requestForSaveSearch = {
      search_id: uuidv4(),
      search_type: searchType,
      search_term: JSON.stringify(search_term),
      search_results: response,
    };
    console.log("In saveSearchedRecord...", requestForSaveSearch);
    try {
      const response = await fetch(apiServer + "/history/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify(requestForSaveSearch),
      });

      const result = response.json();
      result.then((value) => {
        console.log("value >>>>> ", value);
        if (value) setSearchId(value.search_id);
      });
      console.log("response from saveResult>>>", result, result.search_id);
    } catch (e) {
      console.error("Exception>>", e);
    }
  };

  return (
    <div>
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
                    looks like you have insufficient credit to access this
                    leads. upgrade your plan now.
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
                searching for. Download the sample below for better
                understanding.
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
                    <input type="file" accept=".csv" />
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
                  {/*<div className="px-4">*/}
                  {/*  <CustomizeButton />*/}
                  {/*</div>*/}
                  <CompanyFilters customSearch={customSearch} />
                </div>
                <BulkSearch data={true} />
                <SidebarExtractContact data={true} />
              </div>
              <div className="col-md-8 col-lg-9">
                <div className="user-search-wrapper">
                  <div className="detailed-search">
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
                        id="selectAll"
                        name="selectAll"
                        // onChange={handleLeadSelectAll}
                        // checked={isCheckAll}
                      />
                      <small className="">
                        <b>{currentLeads.length}</b> of{" "}
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
                      <button
                        // onClick={handleLeadSelectionExportExcel}
                        className="export-btn"
                        // disabled={selectedLeads.length === 0 ? true : false}
                      >
                        Export{" "}
                        <img
                          className="ps-3"
                          src="assets/images/export.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  {loading === false ? (
                    <div className="search-container mb-2">
                      {myLeads && myLeads.length === 0 ? (
                        <div>
                          <h5>Records not found</h5>
                        </div>
                      ) : currentLeads ? (
                        currentLeads.map((data, index) => (
                          <div>
                            <div className="user-container py-2">
                              <input
                                className="box ms-3 me-3"
                                type="checkbox"
                                id="checkbox"
                              />
                              <div className="search-author text-danger d-flex align-items-center">
                                <img
                                  style={{ borderRadius: "50%" }}
                                  src={
                                    data.logoUrl
                                      ? data.logoUrl
                                      : "assets/images/Group 2367.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="search-user">
                                <div className="row">
                                  <div className="col d-flex align-items-center">
                                    <div>
                                      <p className="d-block">{data.name} </p>
                                      <small className="d-block">
                                        {/*<img*/}
                                        {/*  src="assets/images/accord-map-pin.png"*/}
                                        {/*  alt=""*/}
                                        {/*/>*/}
                                        {/*Alpharetta, Georgia*/}
                                      </small>
                                    </div>
                                  </div>
                                  <div className="col d-flex align-items-center">
                                    <small>{data.description}</small>
                                  </div>
                                </div>
                              </div>

                              <div className="search-view-btn d-flex align-items-center">
                                <a className="button">View Employee</a>
                              </div>
                              <div className="search-close-btn d-flex align-items-center">
                                <a href="#">
                                  <img
                                    src={"assets/images/Group 1863.png"}
                                    alt=""
                                  />
                                </a>
                              </div>
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
                                id={
                                  "collapseExample_" + `${currentPage}${index}`
                                }
                              >
                                {/*{specificUserDetails?.map((spec) => (*/}
                                {/*  <span>*/}
                                {/*    {spec.index === `${currentPage}${index}` ? (*/}
                                {/*      <span>*/}
                                {/*        <SpecificUser details={spec.details} />*/}
                                {/*      </span>*/}
                                {/*    ) : null}*/}
                                {/*  </span>*/}
                                {/*))}{" "}*/}
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
                    totalPosts={myLeads ? myLeads.length : 1}
                    paginate={paginate}
                  />
                </div>
                {/*<div className="user-widget-box text-center p-4 my-3">*/}
                {/*  <div className="user-promote-logo">*/}
                {/*    <img src="assets/images/user-company-brand.png" alt="title" />*/}
                {/*  </div>*/}
                {/*  <div className="user-promote-slider">*/}
                {/*    <div className="item">*/}
                {/*      <div className="user-promote-item">*/}
                {/*        <p className="">*/}
                {/*          Want to extract contacts of group members in a LinkedIn*/}
                {/*          group?*/}
                {/*        </p>*/}
                {/*        <div*/}
                {/*          className="px-3 pb-4"*/}
                {/*          style={{*/}
                {/*            position: "absolute",*/}
                {/*            bottom: "5px",*/}
                {/*            content: "",*/}
                {/*          }}*/}
                {/*        >*/}
                {/*          <a href="/searchResult" className="small m-0">*/}
                {/*            Try This*/}
                {/*          </a>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="item">*/}
                {/*      <div className="user-promote-item">*/}
                {/*        <p className="">*/}
                {/*          Need a list of companies in semi-conductor space with*/}
                {/*          1000+ employees in US?*/}
                {/*        </p>*/}
                {/*        <div*/}
                {/*          className="px-3 pb-4"*/}
                {/*          style={{*/}
                {/*            position: "absolute",*/}
                {/*            bottom: "5px",*/}
                {/*            content: "",*/}
                {/*          }}*/}
                {/*        >*/}
                {/*          <a href="/searchResult" className="small m-0">*/}
                {/*            Try This*/}
                {/*          </a>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="item">*/}
                {/*      <div className="user-promote-item">*/}
                {/*        <p className="">*/}
                {/*          Need a detailed list of all the people working for*/}
                {/*          Flipkart?*/}
                {/*        </p>*/}
                {/*        <div*/}
                {/*          className="px-3 pb-4"*/}
                {/*          style={{*/}
                {/*            position: "absolute",*/}
                {/*            bottom: "5px",*/}
                {/*            content: "",*/}
                {/*          }}*/}
                {/*        >*/}
                {/*          <a href="/searchResult" className="small m-0">*/}
                {/*            Try This*/}
                {/*          </a>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="item">*/}
                {/*      <div className="user-promote-item">*/}
                {/*        <p className="">*/}
                {/*          Want to extract contacts of group members in a LinkedIn*/}
                {/*          group?*/}
                {/*        </p>*/}
                {/*        <div*/}
                {/*          className="px-3 pb-4"*/}
                {/*          style={{*/}
                {/*            position: "absolute",*/}
                {/*            bottom: "5px",*/}
                {/*            content: "",*/}
                {/*          }}*/}
                {/*        >*/}
                {/*          <a href="/searchResult" className="small m-0">*/}
                {/*            Try This*/}
                {/*          </a>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="item">*/}
                {/*      <div className="user-promote-item">*/}
                {/*        <p className="">*/}
                {/*          Need a detailed list of all the people working for*/}
                {/*          Flipkart?*/}
                {/*        </p>*/}

                {/*        <div*/}
                {/*          className="px-3 pb-4"*/}
                {/*          style={{*/}
                {/*            position: "absolute",*/}
                {/*            bottom: "5px",*/}
                {/*            content: "",*/}
                {/*          }}*/}
                {/*        >*/}
                {/*          <a href="/searchResult" className="small m-0">*/}
                {/*            Try This*/}
                {/*          </a>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="item">*/}
                {/*      <div className="user-promote-item">*/}
                {/*        <p className="">*/}
                {/*          Want to extract contacts of group members in a LinkedIn*/}
                {/*          group?*/}
                {/*        </p>*/}
                {/*        <div*/}
                {/*          className="px-3 pb-4"*/}
                {/*          style={{*/}
                {/*            position: "absolute",*/}
                {/*            bottom: "5px",*/}
                {/*            content: "",*/}
                {/*          }}*/}
                {/*        >*/}
                {/*          <a href="/searchResult" className="small m-0">*/}
                {/*            Try This*/}
                {/*          </a>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCompany;

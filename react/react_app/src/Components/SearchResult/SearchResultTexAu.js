import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { Link } from "react-router-dom";
import Pagination from "../SharedComponent/Pagination";
import Header from "../SharedComponent/Header";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import SpecificUser from "../DetailedInfo/SpecificUser";
import BulkSearch from "../SharedComponent/BulkSearch";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

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
  const [specificUserDetails, setSpecificUserDetails] = useState([
    { index: null, details: null },
  ]);
  const [unlockEmailDetails, setUnlockEmailDetails] = useState([
    { index: null, details: null },
  ]);
  const [searchTerm, setSearchTerm] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLeads, setCurrentLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [wait, setWait] = useState(null);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const tempCookie = Cookies.get("user_linkedin_cookie");

  const [searchId, setSearchId] = useState();
  let today = new Date();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  const paginate = (pageNumber) => {
    setCurrentLeads([]);
    setCurrentPage(pageNumber);
    setCurrentLeads(
      myLeads && Array.isArray(myLeads)
        ? myLeads.slice(pageNumber * 10 - 10, pageNumber * 10)
        : 0
    );
  };
  useEffect(async () => {
    console.log("in search term useeffect...", searchTerm);
  }, [searchTerm]);
  today = dd + "/" + mm + "/" + yyyy;
  useEffect(async () => {
    console.log(">>>>>>>>>>", props);
    if (
      props.location.pathname.includes("/result_by_name") ||
      props.location.pathname.includes("/advanceSearch")
    ) {
      let requestForTexAu = {};
      if (props.location.state.requestTexAu) {
        console.log(
          "from advance. requestTexAu name.....",
          props.location.state.requestTexAu
        );
        setSearchTerm(props.location.state.requestTexAu);
        console.log("serc", searchTerm);
        requestForTexAu = props.location.state.requestTexAu;
        setLoading(true);
      }
      let keyword = null;
      let isKeyword,
        isEducation = false;
      if (props.location.state.customSearch) {
        setSearchTerm(props.location.state.customSearch);
        setCustomSearch(props.location.state.customSearch);
        console.log(
          "from advance.customSearch filters .....",
          props.location.state.customSearch
        );
        if (props.location.state.customSearch.search_type)
          if (props.location.state.customSearch.keywords) isKeyword = true;
        if (props.location.state.customSearch.education) isEducation = true;
        if (isKeyword && isEducation)
          keyword =
            props.location.state.customSearch.keywords +
            " " +
            props.location.state.customSearch.education;

        if (!isEducation && isKeyword)
          keyword = props.location.state.customSearch.keywords;
        if (!isKeyword && isEducation)
          keyword = props.location.state.customSearch.education;
        requestForTexAu = {
          firstName: "",
          lastName: "",
          title: props.location.state.customSearch.job_title
            ? props.location.state.customSearch.job_title
            : "",
          keywords: keyword ? keyword : "",
          industry: props.location.state.customSearch.industry
            ? [props.location.state.customSearch.industry]
            : [],
          location: props.location.state.customSearch.location
            ? [props.location.state.customSearch.location]
            : [],
          currentCompany: props.location.state.customSearch.company_name
            ? [props.location.state.customSearch.company_name]
            : [],
          pastCompany: [],
        };
        console.log("request....", requestForTexAu);
        setLoading(true);
      }
      const endpoint = "/texau/linkedin/matching_profiles";
      const inputData = requestForTexAu;
      inputData.cookie = tempCookie;
      await sendForExecution(endpoint, inputData);
    }

    if (props.location.pathname.includes("/social_url_search")) {
      if (!props.location.state) {
        console.warn("no state found");
        return;
      }

      console.log(`state data: ${props.location.state}`);

      const inputData = props.location.state.data;
      const endpoint = props.location.state.endpoint;
      setSearchTerm(props.location.state.data);
      setLoading(true);

      await sendForExecution(endpoint, inputData);
    }

    if (props.location.pathname.includes("/result_by_history_type1")) {
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
  }, [props.location.state.customSearch]);

  const sendForExecution = async (endpoint, inputData) => {
    function handleError(status) {
      setLoading(false);
      setMyLeads([]);
      console.error(`Got HTTP Error ${status}`);
      alert("Error Searching For Leads");
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
          await saveSearchedRecord(json.data, "texAu");
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

  useEffect(() => {}, [loading]);

  useEffect(() => {
    paginate(1);
  }, [myLeads]);

  useEffect(() => console.log(specificUserDetails), [specificUserDetails]);
  console.log("myLeads>>>>>>>>>>>", myLeads);

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleUnlockEmail = async (e, index, data) => {
    setWait(`${currentPage}${index}`)
    e.preventDefault();
    console.log("in handle unlock>>>>", data);
    // try {
    let isDuplicate = false;

    unlockEmailDetails.map((spec) => {
      console.log("spec email>>>", spec.index);
      if (spec.index === `${currentPage}${index}`) {
        isDuplicate = true;
      }
    });
    console.log("isDuplicate>>>>", isDuplicate);
    if (isDuplicate === false) {
      let requestForSaveEmailCredit = {
        user_id: Cookies.get("user_id"),
        search_id: searchId,
        email_addresses: ["sff", "ddsg"],
        search_index: parseInt(`${currentPage}${index}`),
      };
      try {
        const response = await fetch(apiServer + "/credits/email/bulk_add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(requestForSaveEmailCredit),
        });

        const result = response.json();

        console.log("response from saveResult>>>", result, result.search_id);
      } catch (e) {
        console.error("Exception>>", e);
      }
      let urls="";
    for(let i=0;i<data.url.length;i++){
      if(data.url[i]=='?')
      {
        break;
      }
      else
      {
        urls=urls+data.url[i]
      }
    }
    let url=[urls]
      let requestforemail={
              url: url
      }
    try{
         const response_email = await fetch(apiServer + "/snov/emails_for_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(requestforemail),
        });
        const result_email = await response_email.json();
        if(result_email.detail){
          setUnlockEmailDetails((prev) => [
        ...prev,
        {
          index: `${currentPage}${index}`,
          details: { email: `Not Found` },
        },
      ]);
        }
        else{
          setUnlockEmailDetails((prev) => [
        ...prev,
        {
          index: `${currentPage}${index}`,
          details: { email: result_email },
        },
      ]);
        }
      }catch(e){
        console.log(e)
      }
    } else {
      unlockEmailDetails?.map((spec) => {
        console.log(
          "Check details>>>>",
          spec.index,
          spec.details === "Record Not Found"
        );
      });
    }
    setWait(null)
  };

  useEffect(() => {
    setShow(new Array(myLeads.length).fill().map((item) => false));
  }, [currentLeads]);

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

  const handleCSVFile = (e) => {
    setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
  };

  const saveSearchedRecord = async (response, searchType) => {
    console.log("In saveSearchedRecord...searchTerm", searchTerm);

    let requestForSaveSearch = {
      search_id: uuidv4(),
      search_type: searchType,
      search_term: JSON.stringify(searchTerm),
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

  const handleProfile = async (index, data) => {
    let reqJsonPipl = {
      email: "",
      name: { first_name: "", last_name: "" },
      url: data.url,
    };
    console.log("in Handle profile...", `${currentPage}${index}`, data);
    try {
      let isDuplicate = false;

      specificUserDetails.map((spec) => {
        console.log("spec>>>", spec.index);
        if (spec.index === `${currentPage}${index}`) {
          isDuplicate = true;
        }
      });
      console.log("isDuplicate>>>>", isDuplicate);
      if (isDuplicate === false) {
        console.log("In Fetch......");
        const response = await fetch(apiServer + "/pipl/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(reqJsonPipl),
        });

        let json_res = await response.json();
        console.log("Data Pipl..>>>>>>>>>>>", json_res);
        let phones = [];
        if (json_res) {
          for (let i = 0; i < json_res.length; i++) {
            let obj = json_res[i];
            console.log("in for loop pipl>>>", obj, ">>>>", obj.phones.length);
            for (let j = 0; j < obj.phones.length; j++) {
              phones.push(obj.phones[j].number);
            }
          }
          console.log("Phones>>>>>>", phones);
          let requestForSaveProfileCredit = {
            search_id: searchId,
            phone_numbers: phones,
            search_index: `${currentPage}${index}`,
          };
          try {
            const response = await fetch(
              apiServer + "/credits/profile/bulk_add",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${Cookies.get("user_token")}`,
                },
                body: JSON.stringify(requestForSaveProfileCredit),
              }
            );

            const result = response.json();

            console.log("response from saveResult>>>", result);
          } catch (e) {
            console.error("Exception>>", e);
          }
          setSpecificUserDetails((prev) => [
            ...prev,
            { index: `${currentPage}${index}`, details: json_res[0] },
          ]);
        } else {
          console.log("In setSpecificUserDetails else");
          setSpecificUserDetails((prev) => [
            ...prev,
            { index: `${currentPage}${index}`, details: "Record Not Found" },
          ]);
          console.log(
            "In setSpecificUserDetails else ress....",
            specificUserDetails
          );
        }
      }

      console.log("specificUser>>>>>>>", specificUserDetails);
      specificUserDetails?.map((spec) => {
        console.log(
          "Check details>>>>",
          spec.index,
          spec.details === "Record Not Found"
        );
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const handleLeadSelectionChange = (e) => {
    const { id, checked } = e.target;
    setSelectedLeads([...selectedLeads, id]);
    if (!checked) {
      setSelectedLeads(selectedLeads.filter((item) => item !== id));
    }
  };

  const handleLeadSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setSelectedLeads(currentLeads.map((li) => li.url || li.profileLink));
    if (isCheckAll) {
      setSelectedLeads([]);
    }
  };

  const handleLeadSelectionExportExcel = (e) => {
    e.preventDefault();

    const executeExport = async () => {
      function handleError(response = null) {
        console.error(`Error, Status Code: ${response?.status}`);
        alert("Error Exporting File");
      }

      try {
        const inputData = { profile_urls: selectedLeads };
        console.log(inputData);

        const response = await fetch(apiServer + "/bulk_upload/export/excel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(inputData),
        });

        async function handleSuccess(response) {
          const data = await response.json();
          if (!data) {
            return handleError();
          }
          console.log(data);
          alert(
            "Exported excel file is sent to your email. Please check your spam filter if our email has" +
              " not arrived in a reasonable time. Cheers!"
          );
        }

        function handleUnAuthorized(response = null) {
          console.log("User is UnAuthorized");
          alert("Please Logout and LogIn Again");
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
        console.error("Error: ", err);
        handleError();
      }
    };

    if (!selectedLeads) {
      console.warn("No Selected Leads");
      return;
    }

    executeExport();
  };

  console.log("isCheck....", selectedLeads);

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
              <SpecificSearchBtn/>
              <div className="sidebar-search-for sidebar-widget pt-4 my-3">
                <h6 className="text-danger mb-3">Customize your search </h6>
                <Filters customSearch={customSearch} />
              </div>
              <BulkSearch />
              <SidebarExtractContact />
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
                      onChange={handleLeadSelectAll}
                      checked={isCheckAll}
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
                      onClick={handleLeadSelectionExportExcel}
                      className="export-btn"
                      disabled={selectedLeads.length === 0 ? true : false}
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
                          <div className="user-container py-2" key={index}>
                            <input
                              className="box ms-3 me-3"
                              id={data.url || data.profileLink}
                              type="checkbox"
                              name={data.name}
                              checked={selectedLeads.includes(
                                data.url || data.profileLink
                              )}
                              onChange={handleLeadSelectionChange}
                            />
                            <div className="search-author text-danger ">
                              <img
                                  style={{borderRadius:"50%"}}
                                  src={
                                    data.profilePicture
                                        ? data.profilePicture
                                        : "assets/images/author-image.png"
                                  }
                                  alt=""
                              />
                            </div>
                            <div className="search-user ps-3">
                              <p>{data.length === 0 ? null : data.name}</p>
                              <small className="d-block">
                                Works at {data.length === 0 ? null : data.job}
                              </small>
                              <small className="d-block">
                                {data.length === 0 ? null : data.location}
                              </small>
                            </div>
                            <div className='linkedin-icon d-flex justify-content-end'>
                              <span><a href="#"><img src="assets/images/linkedin1.png" alt="" /></a></span>
                            </div>
                            <div className="search-email text-center">
                              <small
                              // className={
                              //   show[index] ? "d-block" : "d-block blur"
                              // }
                              >
                                {unlockEmailDetails?.map((spec) => (
                                  <span>
                                    {spec.index === `${currentPage}${index}`
                                      ? spec.details.email
                                      : null}
                                  </span>
                                ))}
                              </small>
                              {wait ===`${currentPage}${index}`?<p>please wait...</p>:
                              <a
                                href="#"
                                onClick={(e) =>
                                  handleUnlockEmail(e, index, data)
                                }
                              >
                                <small className="d-block text-danger">
                                  Unlock
                                </small>
                              </a>}
                            </div>
                            <p className="search-view-btn ">
                              <a
                                  className="btn button"
                                  data-toggle="collapse"
                                  href={
                                  "#collapseExample_" + `${currentPage}${index}`
                                }
                                data-target={
                                  "#collapseExample_" + `${currentPage}${index}`
                                }
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                                onClick={() => handleProfile(index, data)}
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
                              id={"collapseExample_" + `${currentPage}${index}`}
                            >
                              {specificUserDetails?.map((spec) => (
                                <span>
                                  {spec.index === `${currentPage}${index}` ? (
                                    <span>
                                      <SpecificUser details={spec.details} />
                                    </span>
                                  ) : null}
                                </span>
                              ))}{" "}
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
  );
};

export default SearchResult;

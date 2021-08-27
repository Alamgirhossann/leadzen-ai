import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { Link } from "react-router-dom";
import Pagination from "../SharedComponent/Pagination";
import Header from "../SharedComponent/Header";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import SpecificUser from "../DetailedInfo/SpecificUser";
import BulkSearch from "../SharedComponent/BulkSearch";
import Cookies from "js-cookie";
import { func } from "prop-types";

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
    {index: null, details: null},
  ]);
  const [resultData, setSearchResult] = useState({data: null});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLeads, setCurrentLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  let today = new Date();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  const paginate = (pageNumber) => {
    setCurrentLeads([]);
    setCurrentPage(pageNumber);
    setCurrentLeads(
      myLeads.length > 0
        ? myLeads.slice(pageNumber * 10 - 10, pageNumber * 10)
        : 0
    );
  };
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
        requestForTexAu = props.location.state.requestTexAu;
        setLoading(true);
        setSearchType(props.location.state.requestTexAu.searchType);
      }
      let keyword = null;
      let isKeyword,
        isEducation = false;
      if (props.location.state.customSearch) {
        setCustomSearch(props.location.state.customSearch);
        console.log(
          "from advance.customSearch filters .....",
          props.location.state.customSearch
        );
        if (props.location.state.customSearch.search_type)
          setSearchType(props.location.state.customSearch.search_type);
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
      try {
        const response = await fetch(apiServer + "/texau/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(requestForTexAu),
        });

        if (response.status === 400) {
          // handle 400
          setLoading(false);
          setMyLeads({});
        }

        if (response.status === 500) {
          // handle 500
          setLoading(false);
          setMyLeads({});
        }

        if (response.status === 404) {
          setLoading(false);
          setMyLeads({});
        }

        let json_res = await response.json();
        console.log(
          "Data>>>>> execution_id >>>>>>",
          json_res,
          json_res.execution_id
        );
        if (!json_res.execution_id) {
          setLoading(false);
          setMyLeads({});
        }
        checkExecutionStatus(json_res.execution_id);
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  }, [props.location.state.customSearch]);

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
          apiServer + `/texau/check_status/${executionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("response>>>>", response);
        function handleError() {
          if (timeoutId) clearTimeout(timeoutId);
          clearInterval(intervalId);

          setLoading(false);
          setMyLeads("");
        }

        if (response.status === 403) {
          // got cookie error - no need to check again, results will not change
          console.log("Response cookie error", response.statusText);
          handleError();
          return;
        }

        if (response.status === 200) {
          // got the response
          const data = await response.json();
          console.log("Data>>>>", data, ">>>>>", response);
          if (!data) {
            console.warn(`Invalid Data`);
            handleError();
            return;
          }

          setLoading(false);
          if (timeoutId) clearTimeout(timeoutId);
          clearInterval(intervalId);

          if (data.data) setMyLeads(data.data);

          return;
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

  useEffect(async () => {
    paginate(1);
  }, [myLeads]);

  useEffect(() => console.log(specificUserDetails), [specificUserDetails]);
  console.log("myLeads>>>>>>>>>>>", myLeads);

  const [show, setShow] = useState();
  const [selected, setSelected] = useState(false);
  const showClick = (e, index) => {
    e.preventDefault();
    console.log("inside showClick");
    if (!show[index]) {
      console.log(show);
      console.log("inside showClick if");
      setShow(
        show.map((value, i) => {
          if (index === i) return true;
          else return value;
        })
      );
      console.log(show);
    }
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

  const saveSearchedRecord = async (response, searchType, url) => {
    console.log("In saveSearchedRecord");
    let requestForSaveSearch = {
      result: response.toString(),
      search_type: searchType,
      search_param: url,
    };
    console.log("In saveSearchedRecord...", requestForSaveSearch);
    try {
      const response = await fetch(
        apiServer + "/search_result/save_search_result",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(requestForSaveSearch),
        }
      );
      console.log("response from saveResult>>>", response);
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
        console.log(
          "Data>>>>>>>>>>>",
          JSON.stringify(json_res),
          ">>>>",
          searchType
        );

        if (json_res) {
          saveSearchedRecord(JSON.stringify(json_res), searchType, data.url);
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

  const handleChange = e => {
    const {id, checked} = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(currentLeads.map(li => li.url));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const handleExcel = e => {
    e.preventDefault()
    const fetchData = async () => {
      try {
        console.log("go", isCheck)
        const fetchResponse = await fetch(apiServer + "/exportExcel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(isCheck),
        });

        const data = await fetchResponse.json();
        console.log("Data>>>>>>>>>>>", data);
      } catch (err) {
        console.error("Error: ", err);
      }
    };

    fetchData();
  }
  console.log("isCheck....", isCheck)
  return (
      <div>
        <Header user={user}/>

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
                        onChange={handleSelectAll}
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
                    <button onClick={handleExcel} className="export-btn" disabled={isCheck.length === 0 ? true : false}>
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
                                id={data.url}
                                type="checkbox"
                                name={data.name}
                                checked={isCheck.includes(data.url)}
                                onChange={handleChange}

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
                                className={
                                  show[index] ? "d-block" : "d-block blur"
                                }
                              >
                                abc@xyz.com
                              </small>
                              <a href="#" onClick={(e) => showClick(e, index)}>
                                <small className="d-block text-danger">
                                  Unlock
                                </small>
                              </a>
                            </div>
                            <p className="search-view-btn ">
                              <a
                                className="btn"
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

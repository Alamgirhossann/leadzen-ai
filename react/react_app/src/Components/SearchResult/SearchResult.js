import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { Link } from "react-router-dom";
import Pagination from "../SharedComponent/Pagination";
import SpecificUser from "../DetailedInfo/SpecificUser";
import Header from "../SharedComponent/Header";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import Filters from "../SharedComponent/Filters";
import BulkSearch from "../SharedComponent/BulkSearch";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";

const SearchResult = (props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
  const [searchType, setSearchType] = useState("");
  const [searchId, setSearchId] = useState();
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
    if (props.location.pathname.includes("/searchResult")) {
      console.log("Request..", props.location.state.reqJsonPipl);
      setSearchTerm(props.location.state.reqJsonPipl);
      try {
        const response = await fetch(apiServer + "/pipl/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(props.location.state.reqJsonPipl),
        });

        let json_res = await response.json();

        console.log("Data>>>>>>>>>>>loading..", json_res, loading);
        setLoading(false);
        if (!json_res.detail) {
          setMyLeads(json_res);
          await saveSearchedRecord(json_res, "PIPL");
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    }
    if (props.location.pathname.includes("/search_by_history_type2")) {
      console.log(
        "in result from hisry pipl>>>>",
        props.location.state.details
      );
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

        console.log("Data>>>>>>>>>>>loading..", json_res, loading);
        setLoading(false);

        setMyLeads(json_res.search_results);
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  }, []);

  useEffect(async () => {
    paginate(1);
  }, [myLeads]);

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

  const saveSearchedRecord = async (response, searchType) => {
    console.log("In saveSearchedRecord");

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

  const handleUnlockEmail = async (e, index, data) => {
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

      setUnlockEmailDetails((prev) => [
        ...prev,
        {
          index: `${currentPage}${index}`,
          details: { email: `email_${currentPage}${index}@test.com` },
        },
      ]);
    } else {
      unlockEmailDetails?.map((spec) => {
        console.log(
          "Check details>>>>",
          spec.index,
          spec.details === "Record Not Found"
        );
      });
    }
  };

  const handleProfile = async (index, data) => {
    console.log(
      "in Handle profile...",
      `${currentPage}${index}`,
      "DAta>>>",
      data
    );
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
        let phones = [];
        if (data) {
          console.log("in data>>>>", data.phones);
          if (data.phones) {
            for (let j = 0; j < data.phones.length; j++) {
              phones.push(data.phones[j].number);
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
          }
          setSpecificUserDetails((prev) => [
            ...prev,
            { index: `${currentPage}${index}`, details: data },
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
                        {/* <SpecificSearchBtn/> */}
                        <div className="sidebar-search-for sidebar-widget pt-4 my-3">
                            <h6 className="text-danger mb-3">Customize your search</h6>
                            <Filters/>
                        </div>
                        <BulkSearch/>
                        <SidebarExtractContact/>
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <div className="user-search-wrapper">
                            <div className="detailed-search">
                                <div>
                                    <small>Last Updated: {today}</small>
                                </div>
                            </div>
                            <div>
                                <p className="mt-3">
                                    Extracted Results for:{" "}
                                    <span className="link-style">
                                            <img src="assets/images/Vector (2).png" alt=""/>{" "}
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
                                style={{borderRadius:"50%"}}
                                src="assets/images/author-image.png"
                                alt=""
                              />
                            </p>
                            <div className="search-user pe-3">
                              <p>
                                {data.names === undefined ||
                                data.names.length === 0
                                  ? null
                                  : data.names[0].display}
                              </p>
                              <small className="d-block">
                                Works at{" "}
                                {data.jobs === undefined ||
                                data.jobs.length === 0
                                  ? null
                                  : data.jobs[0].display}
                              </small>
                              <small className="d-block">
                                {data.addresses === undefined ||
                                data.addresses.length === 0
                                  ? null
                                  : data.addresses[0].display}
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

                              <a
                                href="#"
                                onClick={(e) =>
                                  handleUnlockEmail(e, index, data)
                                }
                              >
                                <small className="d-block text-danger">
                                  Unlock
                                </small>
                              </a>
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

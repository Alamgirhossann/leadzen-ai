import React, { useEffect, useState, useCallback } from "react";
import "./Style/style.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import Header from "../SharedComponent/Header";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import CustomizeButton from "../SharedComponent/CustomizeButton";
import AskJarvis from "../SharedComponent/AskJarvis";

const SearchResult = () => {
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
  let data = {};
  const [myLeads, setMyLeads] = useState([
    {
      name: "John Smith",
      desc: "English Speaker",
      comp: "Hexagon AB",
      search_date: "12/05/2021",
      address: "6720 Ulster Court, Alpharetta, Georgia",
      show: false,
    },
    {
      name: "Joe Mama",
      desc: "English Speaker",
      comp: "Apple INC",
      search_date: "05/05/2021",
      address: "6720 Ulster Court, Alpharetta, Georgia",
      show: false,
    },
  ]);
  var today = new Date();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;
  useEffect(async () => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(apiServer);
    data = await response.json();
    data ? setSearchResult({ ...resultData, data: data }) : setLoading(true);
    data ? setLoading(false) : setLoading(true);
  };
  let index;
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
  const handleUnlock = (name) => {
    let index = myLeads.findIndex((myLeads) => myLeads.name === name);
    let show_value = myLeads[index].show;
    if (!show_value) {
      myLeads[index] = { ...myLeads[index], show: true };
      console.log(myLeads[index]);
    }
    return false;
  };
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState();
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(offset);
  };
  return (
    <div>
      <Header user={user} />
      <div class="modal" id="UpgradeModal">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <div class="modal-dialog">
          <div class="modal-content">
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
                  class="btn text-white"
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
        ></button>
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
                <div className="px-4">
                  <CustomizeButton />
                </div>
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
                      <b>{searchData.count}</b> of
                      <b>{searchData.total}</b> Searched profiles
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
                <div className="search-container mb-2">
                  {myLeads.map((data) => (
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <p className="search-author text-danger">
                        <img src="assets/images/author-image.png" alt="" />
                      </p>
                      <div className="search-user">
                        <p>{data.name}</p>
                        <small className="d-block">Works at {data.comp}</small>
                        <small className="d-block">{data.address}</small>
                      </div>
                      <div className="search-email text-center">
                        <small className={show ? "d-block" : "d-block blur"}>
                          alamgirhossann
                        </small>
                        <a href="#" onClick={showClick}>
                          <small className="d-block text-danger">Unlock</small>
                        </a>
                      </div>

                      <p className="search-view-btn ">
                        <a href="/detailedInfo" className="button">
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
                  ))}
                </div>

                {!loading ? (
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <p className="search-author text-danger">
                        <img src="assets/images/author-image.png" alt="" />
                      </p>

                      <div className="search-user">
                        <p>{resultData.data.names[0]._display}</p>
                        <small className="d-block">
                          Works at {resultData.data.jobs[0].organization}
                        </small>
                        <small className="d-block">
                          {resultData.data.addresses[0]._display}
                        </small>
                      </div>
                      <div className="search-email text-center">
                        <small className={show ? "d-block" : "d-block blur"}>
                          alamgirhossann
                        </small>
                        <a href="#" onClick={showClick}>
                          <small className="d-block text-danger">Unlock</small>
                        </a>
                      </div>
                      <p className="search-view-btn ">
                        <a href="/detailedInfo" className="button">
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
                  </div>
                ) : null}
              </div>
              <div className="d-flex justify-content-center">
                <div className="number-align"> 1 </div>
                <div className="ps-3 d-flex align-items-center"> 2 </div>
                <div className="ps-3 d-flex align-items-center"> 3 </div>
                <div className="ps-3 d-flex align-items-center"> 4 </div>
                <div className="ps-3 d-flex align-items-center"> 5 </div>
                <div className="ps-3 d-flex align-items-center"> 6 </div>
                <div
                  className="ps-3 d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#UpgradeModal"
                >
                  {" "}
                  Next{" "}
                </div>
              </div>
              <AskJarvis />
              {/* <div className="user-widget-box text-center p-4 my-3">
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
                        classNameName="px-3 pb-4"
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
                        classNameName="px-3 pb-4"
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
                        classNameName="px-3 pb-4"
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
                        classNameName="px-3 pb-4"
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

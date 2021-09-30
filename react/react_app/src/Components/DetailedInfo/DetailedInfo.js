import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SpecificUser from "./SpecificUser";
import { Link } from "react-router-dom";
import AskJarvis from "../SharedComponent/AskJarvis";
import Header from "../SharedComponent/Header";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import CustomizeButton from "../SharedComponent/CustomizeButton";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";

const DetailedInfo = () => {
  const [resultData, setSearchResult] = useState({ data: null });
  const [loading, setLoading] = useState(true);
  let data = {};
  useEffect(async () => {
    fetchData();
  }, []);
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
  const fetchData = async () => {
    let response = null;
    let json_res = null;
    try {
      response = await fetch(apiServer);
      json_res = await response.json();
      json_res
        ? setSearchResult({ ...resultData, data: json_res })
        : setLoading(true);
      json_res ? setLoading(false) : setLoading(true);
    } catch (err) {
      console.error("error : ", err);
    }
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;
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

  const handleHeadSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleHeadSearchSubmit = (e) => {
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
  const [show, setShow] = useState(false);
  const showClick = (e) => {
    e.preventDefault();
    if (!show) setShow(true);
  };
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
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
  const details = {
    name: "Joe Mama",
    desc: "English Speaker",
    comp: {
      name: "Hexagon AB",
      address: "6720 Ulster Court, Alpharetta, Georgia",
    },
    email: ["Chris07@hexagon.com", "chris12@gmail.com", "chris2194@apple.com"],
    phone_num: [
      { number: "404-786-5546", type: "telephone" },
      { number: "404-786-4732", type: "mobile" },
      { number: "421-230-3235", type: "mobile" },
      { number: "123-456-7890", type: "mobile" },
    ],
    username: [{ name: "christophe.heyman", since: "23-12-2010" }],
    urls: ["Prizmgoogle.net", "john.hexagon.com", "prizma2.google.com"],
    gender: "Male",
    age: "35",
    languages: ["English", "French"],
    social_media: {
      facebook: "chris.facebook.com",
      twitter: "chris.twitter.com",
      instagram: "instagram.chris.com",
      linkedin: "chris.linkedin.com",
    },
    companies: [
      {
        name: "Hexagon AB",
        role: "Software Engineer",
        since: "12-05-2019",
        url: "apicsassociation.com",
      },
      {
        name: "Catavolt",
        role: "Software Engineer",
        since: "12-05-2017",
        url: "google.com",
      },
      {
        name: "Infor",
        role: "Software Engineer",
        since: "12-05-2015",
        url: "ga.com",
      },
      {
        name: "MAPICS",
        role: "Software Engineer",
        since: "12-05-2011",
        url: "atlanta.com",
      },
    ],
    education: [
      {
        name: "APICS",
        since: "2011 - 2013",
        location: "Texas, USA",
        url: "apicsassociation.com",
      },
      {
        name: "Ghent University",
        since: "2009 - 2011",
        location: "New York, USA",
        url: "Ghentuniversity.com",
      },
      {
        name: "St. Jozef Institute",
        since: "2009 - 2005",
        location: "Texas, USA",
        url: "apicsassociation.com",
      },
    ],
    locations: [
      "Texas, USA",
      "New York, USA",
      "Tbilisi, Georgia",
      "London, UK",
      "Dubai, UAE",
      "Atlanta, Georgia",
    ],
    related_profiles: [
      { name: "Stan Joseph", url: "stan_joseph.com" },
      { name: "Robert Brown", url: "robert_brown.com" },
      { name: "Dan Schmitt", url: "banschmitt.in" },
      { name: "Lan Bey", url: "labney.com" },
      { name: "Stan Joseph", url: "stanjosepy.io" },
      { name: "Lanre Bey", url: "lanrebey.in" },
    ],
    rating: 4.5,
  };
  const searchData = { count: 12, total: 250 };
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
              <SpecificSearchBtn />
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
                    <form className=" d-flex my-2 my-lg-0">
                      <input
                        id="detailed-info-search-input"
                        className="form-control mr-sm-2"
                        type="search"
                        onBlur={handleHeadSearch}
                        onInput={handleHeadSearch}
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn text-white w-auto d-flex ms-3"
                        onClick={handleHeadSearchSubmit}
                        style={{ background: "#FB3E3E" }}
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

              {!loading ? (
                <div className="user-widget-box  mt-3">
                  <div className="info-container">
                    <div className="user-info-container">
                      <input
                        className="info-box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <p className="info-author text-danger">
                        <img src="assets/images/author-image.png" alt="" />
                      </p>
                      <div className="info-user">
                        <p>{resultData.data.names[0]._display}</p>
                      </div>
                      <div className="info-location">
                        <small className="d-block">
                          Works at {resultData.data.jobs[0].organization}
                        </small>
                        <small className="d-block">
                          {resultData.data.addresses[0]._display}
                        </small>
                      </div>
                      <div className="info-email text-center">
                        <small className="d-block">
                          {resultData.data.emails[1].address}
                        </small>
                      </div>
                      <p className="info-download-btn">
                        <img src="assets/images/Group 1899.png" alt="" />
                      </p>
                      <p className="info-up-btn">
                        <img src="assets/images/Group 1900.png" alt="" />
                      </p>
                      <p className="info-plus-btn">
                        <img src="assets/images/Group 1863.png" alt="" />
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "20px",
                  marginTop: "20px",
                }}
              >
                <SpecificUser details={details} />
              </div>

              <div className="user-widget-box  my-3">
                {myLeads.map((data) => (
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
                        <a href="" className="button">
                          View Profile
                        </a>
                      </p>
                      <p className="search-close-btn">
                        <img src="assets/images/Group 1863.png" alt="" />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <AskJarvis />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedInfo;

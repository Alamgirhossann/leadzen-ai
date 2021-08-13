import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Filters = () => {
  const history = useHistory();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
  const [locationRes, setLocationRes] = useState([]);
  const [customSearch, setCustomSearch] = useState({
    location: null,
    industry: null,
    job_title: null,
    education: null,
    company_name: null,
    keywords: null,
    csv_file: null,
  });

  const handleLocationOnChange = async (e) => {
    if (e.target.value && e.target.value.length > 3) {
      // try {
      //   const response = await fetch(
      //     apiServer + "/filter/location?search_location=" + e.target.value,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Accept: "application/json",
      //       },
      //     }
      //   );
      //   let loc_res = await response.json();
      //   setLocationRes(loc_res.hits.hits);
      //   console.log("loc_res>>>>", loc_res.hits.hits);
      // } catch (err) {
      //   console.error("Error: ", err);
      // }
    }
  };
  const handleLocation = async (e) => {
    console.log("In handle location>>>>>>");
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
    console.log(">>>>>>>>>>>>",customSearch, customSearch.location);

    history.push({
      pathname: "/advanceSearch",
      state: { customSearch },
    });
  };
  const handleCSVFile = (e) => {
    setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
  };

  const handleCloseCompany = (type) => {
    console.log("In HandleCloseCompany......", type);
    if (type === "location") {
      setCustomSearch({ ...customSearch, location: "" });
    }
    if (type === "industry") {
      setCustomSearch({ ...customSearch, industry: "" });
    }
    if (type === "job_title") {
      setCustomSearch({ ...customSearch, job_title: "" });
    }
    if (type === "education") {
      setCustomSearch({ ...customSearch, education: "" });
    }
    if (type === "company_name") {
      setCustomSearch({ ...customSearch, company_name: "" });
    }
    if (type === "keywords") {
      setCustomSearch({ ...customSearch, keywords: "" });
    }
  };
  return (
    <div>
      <div className="sidebar-search-for sidebar-widget px-4 pb-3 my-3">
        <div className="sidebar-accordion accordion" id="accordionExample">
          <div className="accordion-item">
            <div>
              {customSearch.location ? (
                <p
                  className="text-left top-search"
                  style={{ width: "fit-content" }}
                >
                  <img
                    style={{ width: "10px", marginRight: "5px" }}
                    src="assets/images/cil_location-pin.png"
                    alt=""
                  />
                  {customSearch.location}
                  <img
                    className="ps-4"
                    src="assets/images/cross-icon.png"
                    alt=""
                    onClick={() => handleCloseCompany("location")}
                  />
                </p>
              ) : null}
              {customSearch.industry ? (
                <p
                  className="text-left top-search"
                  style={{ width: "fit-content" }}
                >
                  <img
                    style={{ width: "8px", marginRight: "5px" }}
                    src="assets/images/pro-profile.png"
                    alt=""
                  />
                  {customSearch.industry}
                  <img
                    className="ps-4"
                    src="assets/images/cross-icon.png"
                    alt=""
                    onClick={() => handleCloseCompany("industry")}
                  />
                </p>
              ) : null}
              {customSearch.job_title ? (
                <p
                  className="text-left top-search"
                  style={{ width: "fit-content" }}
                >
                  <img
                    style={{ width: "8px", marginRight: "5px" }}
                    src="assets/images/pro-profile.png"
                    alt=""
                  />
                  {customSearch.job_title}
                  <img
                    className="ps-4"
                    src="assets/images/cross-icon.png"
                    alt=""
                    onClick={() => handleCloseCompany("job_title")}
                  />
                </p>
              ) : null}
              {customSearch.education ? (
                <p
                  className="text-left top-search"
                  style={{ width: "fit-content" }}
                >
                  <img
                    style={{ width: "8px", marginRight: "5px" }}
                    src="assets/images/pro-profile.png"
                    alt=""
                  />
                  {customSearch.education}
                  <img
                    className="ps-4"
                    src="assets/images/cross-icon.png"
                    alt=""
                    onClick={() => handleCloseCompany("education")}
                  />
                </p>
              ) : null}
              {customSearch.company_name ? (
                <p
                  className="text-left top-search"
                  style={{ width: "fit-content" }}
                >
                  <img
                    style={{ width: "8px", marginRight: "5px" }}
                    src="assets/images/pro-profile.png"
                    alt=""
                  />
                  {customSearch.company_name}
                  <img
                    className="ps-4"
                    src="assets/images/cross-icon.png"
                    alt=""
                    onClick={() => handleCloseCompany("company_name")}
                  />
                </p>
              ) : null}
              {customSearch.keywords ? (
                <p
                  className="text-left top-search"
                  style={{ width: "fit-content" }}
                >
                  <img
                    style={{ width: "8px", marginRight: "5px" }}
                    src="assets/images/pro-profile.png"
                    alt=""
                  />
                  {customSearch.keywords}
                  <img
                    className="ps-4"
                    src="assets/images/cross-icon.png"
                    alt=""
                    onClick={() => handleCloseCompany("keywords")}
                  />
                </p>
              ) : null}
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
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#one"
              >
                <img src="assets/images/accord-map-pin.png" alt="title" />
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
                  onChange={handleLocationOnChange}
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
                <img src="assets/images/accord-coffee.png" alt="title" />
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
                <img src="assets/images/accord-award.png" alt="title" />
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
                <img src="assets/images/accord-briefcase.png" alt="title" />
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
                <img src="assets/images/accord-key.png" alt="title" />
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
          </span>
          Search
        </button>

        <p>
          Bulk Search by uploding
          <a
            // href="#"
            className="text-danger"
            onChange={handleCSVFile}
            data-bs-toggle="modal"
            data-bs-target="#bulkmodal"
          >
            csv
          </a>
        </p>
      </div>
    </div>
  );
};
export default Filters;

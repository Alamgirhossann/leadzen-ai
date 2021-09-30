import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Filters = (props) => {
  const history = useHistory();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
  const [isHide, setIsHide] = useState(true);
  const [customSearch, setCustomSearch] = useState({
    location: null,
    industry: null,
    job_title: null,
    education: null,
    company_name: null,
    keywords: null,
    csv_file: null,
  });

  const handleLocation = async (e) => {
    console.log("handleLocation, e.target.value=", e.target.value);
    setCustomSearch({ ...customSearch, location: e.target.value });
  };
  const handleIndustry = (e) => {
    console.log("handleIndustry, e.target.value=", e.target.value);
    setCustomSearch({ ...customSearch, industry: e.target.value });
  };
  const handleJob = (e) => {
    console.log("handleJob, e.target.value=", e.target.value);
    setCustomSearch({ ...customSearch, job_title: e.target.value });
  };
  const handleEducation = (e) => {
    console.log("handleEducation, e.target.value=", e.target.value);
    setCustomSearch({ ...customSearch, education: e.target.value });
  };
  const handleCompany = (e) => {
    console.log("handleCompany, e.target.value=", e.target.value);
    setCustomSearch({ ...customSearch, company_name: e.target.value });
  };
  const handleKeywords = (e) => {
    console.log("handleKeywords, e.target.value=", e.target.value);
    setCustomSearch({ ...customSearch, keywords: e.target.value });
  };
  const handleCustomSubmit = (e) => {
    console.log(">>>>>>>>>>>>", customSearch, customSearch.location);
    history.push({
      pathname: "/advanceSearch",
      state: { customSearch },
    });
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

  useEffect(() => {
    if (props.customSearch) {
      setCustomSearch(props.customSearch);
    }
  }, [props]);

  const handleHide = () => {
    setIsHide(!isHide);
  };

  const handleClearAll = () => {
    setCustomSearch({ location: "" });
  };

  return (
    <div>
      <div className="sidebar-search-for sidebar-widget px-4 pb-3 my-3">
        <div className="sidebar-accordion accordion" id="accordionExample">
          <div className="accordion-item">
            <div>
              {isHide && customSearch.location ? (
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
              {isHide && customSearch.industry ? (
                <p
                  className="text-left top-search"
                  style={{ width: "fit-content" }}
                >
                  <img
                    style={{ width: "8px", marginRight: "5px" }}
                    src="assets/images/pro-profile.png"
                    alt=""
                  />
                  {isHide && customSearch.industry}
                  <img
                    className="ps-4"
                    src="assets/images/cross-icon.png"
                    alt=""
                    onClick={() => handleCloseCompany("industry")}
                  />
                </p>
              ) : null}
              {isHide && customSearch.job_title ? (
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
              {isHide && customSearch.education ? (
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
              {isHide && customSearch.company_name ? (
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
              {isHide && customSearch.keywords ? (
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
                <a onClick={() => handleHide()}>
                  <img
                    style={{ width: "10px", marginRight: "5px" }}
                    src="assets/images/combined-eye.png"
                    alt=""
                  />
                  {isHide ? <h7> Hide</h7> : <h7> Show </h7>}
                </a>
                <a className="text-danger" onClick={() => handleClearAll()}>
                  Clear All
                </a>
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
                  id="filter-search-location-input"
                  className="customize-search w-100"
                  type="text"
                  placeholder="Search Location"
                  onChange={handleLocation}
                  onInput={handleLocation}
                  value={customSearch.location}
                  list="location"
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
                  id="filter-search-industry-input"
                  className="customize-search w-100"
                  onChange={handleIndustry}
                  onInput={handleIndustry}
                  value={customSearch.industry}
                  type="text"
                  placeholder="Search Industry"
                  list="industry"
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
                  id="filter-search-job-input"
                  className="customize-search w-100"
                  value={customSearch.job_title}
                  onChange={handleJob}
                  onInput={handleJob}
                  type="text"
                  placeholder="Search Job title"
                  list="job-title"
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
                  id="filter-search-education-input"
                  className="customize-search w-100"
                  value={customSearch.education}
                  onChange={handleEducation}
                  onInput={handleEducation}
                  type="text"
                  placeholder="Search Education"
                  list="education"
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
                  id="filter-search-company-input"
                  className="customize-search w-100"
                  value={customSearch.company_name}
                  onChange={handleCompany}
                  onInput={handleCompany}
                  type="text"
                  placeholder="Search Company Name"
                  list="company"
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
                  id="filter-search-keywords-input"
                  className="customize-search w-100"
                  value={customSearch.keywords}
                  onChange={handleKeywords}
                  onInput={handleKeywords}
                  type="text"
                  placeholder="Search Keywords"
                  list="keywords"
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
      </div>
    </div>
  );
};
export default Filters;

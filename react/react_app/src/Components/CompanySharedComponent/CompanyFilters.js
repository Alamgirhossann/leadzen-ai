import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const CompanyFilters = (props) => {
  const history = useHistory();
  const [isHide, setIsHide] = useState(true);
  const [customSearch, setCustomSearch] = useState({
    company_name: null,
    location: null,
    industry: null,
    employee_count: null,
    price_base: null,
    interest_based: null,
  });

  const handleName = (e) => {
    setCustomSearch({ ...customSearch, company_name: e.target.value });
  };
  const handleLocation = (e) => {
    setCustomSearch({ ...customSearch, location: e.target.value });
  };
  const handleIndustry = (e) => {
    setCustomSearch({ ...customSearch, industry: e.target.value });
  };
  const handleEmployeeCount = (e) => {
    setCustomSearch({ ...customSearch, employee_count: e.target.value });
  };
  const handlePriceBased = (e) => {
    setCustomSearch({ ...customSearch, price_base: e.target.value });
  };
  const handleInterestBased = (e) => {
    setCustomSearch({ ...customSearch, interest_based: e.target.value });
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    console.log("handleCustomSubmit....", customSearch);
    history.push({
      pathname: "/searchResultCompany",
      state: { customSearch },
    });
  };

  const handleCloseCompany = (type) => {
    console.log("In HandleCloseCompany......", type);

    if (type === "company_name") {
      setCustomSearch({ ...customSearch, company_name: "" });
    }
    if (type === "location") {
      setCustomSearch({ ...customSearch, location: "" });
    }
    if (type === "industry") {
      setCustomSearch({ ...customSearch, industry: "" });
    }

    if (type === "employee_count") {
      setCustomSearch({ ...customSearch, employee_count: "" });
    }
    if (type === "price_base") {
      setCustomSearch({ ...customSearch, price_base: "" });
    }
    if (type === "interest_based") {
      setCustomSearch({ ...customSearch, interest_based: "" });
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
    <div className="sidebar-search-for sidebar-widget px-4 pb-3 my-3">
      <div className="sidebar-accordion accordion" id="accordionExample">
        <div className="accordion-item">
          <div>
            {isHide && customSearch.company_name ? (
              <p
                className="text-left top-search"
                style={{ width: "fit-content" }}
              >
                <img
                  style={{ width: "8px", marginRight: "5px" }}
                  src="assets/images/Group 2346.png"
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
                  src="assets/images/accord-coffee.png"
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

            {isHide && customSearch.employee_count ? (
              <p
                className="text-left top-search"
                style={{ width: "fit-content" }}
              >
                <img
                  style={{ width: "8px", marginRight: "5px" }}
                  src="assets/images/users.png"
                  alt=""
                />
                {customSearch.employee_count}
                <img
                  className="ps-4"
                  src="assets/images/cross-icon.png"
                  alt=""
                  onClick={() => handleCloseCompany("employee_count")}
                />
              </p>
            ) : null}
            {isHide && customSearch.price_base ? (
              <p
                className="text-left top-search"
                style={{ width: "fit-content" }}
              >
                <img
                  style={{ width: "8px", marginRight: "5px" }}
                  src="assets/images/Group 2314.png"
                  alt=""
                />
                {customSearch.price_base}
                <img
                  className="ps-4"
                  src="assets/images/cross-icon.png"
                  alt=""
                  onClick={() => handleCloseCompany("price_base")}
                />
              </p>
            ) : null}
            {isHide && customSearch.interest_based ? (
              <p
                className="text-left top-search"
                style={{ width: "fit-content" }}
              >
                <img
                  style={{ width: "8px", marginRight: "5px" }}
                  src="assets/images/Group 2315.png"
                  alt=""
                />
                {customSearch.interest_based}
                <img
                  className="ps-4"
                  src="assets/images/cross-icon.png"
                  alt=""
                  onClick={() => handleCloseCompany("interest_based")}
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
              <img src="assets/images/Group 2346.png" alt="title" />
              Name
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
                onChange={handleName}
                value={customSearch.company_name}
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
              <img src="assets/images/accord-map-pin.png" alt="title" />
              Location
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
                onChange={handleLocation}
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
              data-bs-target="#tree"
            >
              <img src="assets/images/accord-coffee.png" alt="title" />
              Industry
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
                onChange={handleIndustry}
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
              data-bs-target="#four"
            >
              <img src="assets/images/users.png" alt="title" />
              Employee Count
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
                onChange={handleEmployeeCount}
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
              data-bs-target="#five"
            >
              <img src="assets/images/Group 2314.png" alt="title" /> Price Based
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
                onChange={handlePriceBased}
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
              data-bs-target="#six"
            >
              <img src="assets/images/Group 2315.png" alt="title" />
              Interest Based
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
                onChange={handleInterestBased}
                type="text"
                placeholder="Search Company Name"
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
  );
};

export default CompanyFilters;

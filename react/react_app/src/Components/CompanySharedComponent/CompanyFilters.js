import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const CompanyFilters = (props) => {
  const history = useHistory();
  const [isHide, setIsHide] = useState(true);
  const [customSearch, setCustomSearch] = useState({
    name: null,
    location: null,
    industry: null,
    employeeCount: null,
  });

  const handleName = (e) => {
    setCustomSearch({ ...customSearch, name: e.target.value });
  };
  const handleLocation = (e) => {
    setCustomSearch({ ...customSearch, location: e.target.value });
  };
  const handleIndustry = (e) => {
    setCustomSearch({ ...customSearch, industry: e.target.value });
  };
  const handleEmployeeCount = (e) => {
    setCustomSearch({ ...customSearch, employeeCount: e.target.value });
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

    if (type === "name") {
      setCustomSearch({ ...customSearch, name: "" });
    }
    if (type === "location") {
      setCustomSearch({ ...customSearch, location: "" });
    }
    if (type === "industry") {
      setCustomSearch({ ...customSearch, industry: "" });
    }

    if (type === "employeeCount") {
      setCustomSearch({ ...customSearch, employeeCount: "" });
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
            {isHide && customSearch.name ? (
              <p
                className="text-left top-search"
                style={{ width: "fit-content" }}
              >
                <img
                  style={{ width: "8px", marginRight: "5px" }}
                  src="assets/images/Group 2346.png"
                  alt=""
                />
                {customSearch.name}
                <img
                  className="ps-4"
                  src="assets/images/cross-icon.png"
                  alt=""
                  onClick={() => handleCloseCompany("name")}
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

            {isHide && customSearch.employeeCount ? (
              <p
                className="text-left top-search"
                style={{ width: "fit-content" }}
              >
                <img
                  style={{ width: "8px", marginRight: "5px" }}
                  src="assets/images/users.png"
                  alt=""
                />
                {customSearch.employeeCount}
                <img
                  className="ps-4"
                  src="assets/images/cross-icon.png"
                  alt=""
                  onClick={() => handleCloseCompany("employeeCount")}
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
                value={customSearch.name}
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

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const UserSearch = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState({ text: null });

  const handleHeadSearch = (e) => {
    setSearchText({ ...searchText, text: e.target.value });
  };

  const handleHeadSubmit = (e) => {
    e.preventDefault();

    if (!searchText.text) {
      alert("Enter details");
      return;
    }
    let requestTexAu = {
      name: searchText.text,
    };
    history.push({
      pathname: "/company_result_by_name",
      state: { requestTexAu },
    });
  };

  function handleSubmit(e) {
    console.log("in Submit.......", searchText);
  }

  return (
    <div>
      <div className="user-widget-box p-4 my-3">
        <div className="user-search-wrapper">
          <img
            className="search-promote-image"
            src="assets/images/user-success-image.png"
            alt="title"
          />
          <div className="search-promote-content">
            <form
              onSubmit={handleHeadSubmit}
              className="search-form4 d-flex mb-3"
            >
              <div className="input-group">
                <div className="input-placeholder">
                  <input
                    id="user-search-input"
                    className="ps-3"
                    name="searchString"
                    onChange={handleHeadSearch}
                    required
                  />
                  <div className="placeholder">
                    Eg: I want to <span>IT companies in mumbai</span> with more than 10 employees{" "}
                  </div>
                </div>
                <button
                  className="btn text-white"
                  // onClick={handleHeadSubmit}
                  type="submit"
                >
                  <span className="pe-1">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>{" "}
                  Search
                </button>
              </div>
            </form>
            <p className="fst-italic">
              Hey, Get started by putting a{" "}
              <span className="text-danger">company name, company website URL</span> or{" "}
              <br /> state your requirement above
            </p>
            <a href="/userGuide" className="text-danger">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
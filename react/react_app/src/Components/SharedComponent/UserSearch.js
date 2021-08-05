import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const UserSearch = () => {
  const [searchText, setSearchText] = useState({ text: null });
  const handleHeadSearch = (e) => {
    setSearchText({ ...searchText, text: e.target.value });
  };
  const handleHeadSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };
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
            <form action="#" className="search-form4 d-flex mb-3">
              <div className="input-group">
                <div className="input-placeholder">
                  <input
                    className="ps-3"
                    onBlur={handleHeadSearch}
                    type="text"
                    required
                  />
                  <div className="placeholder">
                    Eg: I want to <span>email IDs</span> of people following{" "}
                    <span>Flipkart Facebook Page</span>
                  </div>
                </div>
                <button
                  className="btn text-white"
                  onClick={handleHeadSubmit}
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
              <span className="text-danger">name, social media URL</span> or{" "}
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

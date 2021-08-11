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
  function WordCount(str) {
    return str.split(" ").length;
  }
  const handleHeadSubmit = (e) => {
    e.preventDefault();
    let isUrl,
      isEmail,
      isMultiWords,
      words = null;
    let firstNameUser,
      lastNameUser,
      emailUser,
      urlUser = "";
    console.log("search Text>>>>>>>>>>>>", searchText.text);
    if (!searchText.text) {
      alert("Enter details");
      return;
    } else {
      isEmail = searchText.text.includes("@");
      words = WordCount(searchText.text);
      isMultiWords = searchText.text.includes(" ");
      isUrl =
        searchText.text.toLowerCase().includes("https://") ||
        searchText.text.toLowerCase().includes("http://");

      if (isEmail) {
        console.log("Its email");
        emailUser = searchText.text;
      }
      if (!isUrl && !isEmail && isMultiWords) {
        console.log("Its sentence or multiple words");
        firstNameUser = searchText.text.split(" ")[0];

        switch (words) {
          case 2:
            lastNameUser = searchText.text.split(" ")[1];
            break;
          case 3:
            lastNameUser = searchText.text.split(" ")[2];
            break;
          default:
            lastNameUser = searchText.text.split(" ")[words - 1];
        }
      }
      if (isUrl) {
        console.log("Its Url");
        urlUser = searchText.text;
      }
    }
    if (emailUser === undefined || emailUser === null) emailUser = "";
    if (lastNameUser === undefined || lastNameUser === null) lastNameUser = "";
    if (firstNameUser === undefined || firstNameUser === null)
      firstNameUser = "";
    if (urlUser === undefined) urlUser = "";
    let reqJsonPipl = {
      email: emailUser,
      name: { first_name: "", last_name: "" },
      url: urlUser,
    };

    if (isUrl || isEmail) {
      history.push({
        pathname: "/searchResult",
        state: { reqJsonPipl },
      });
    }
    let requestTexAu = {
      firstName: firstNameUser,
      lastName: lastNameUser,
      title: "",
      keywords: "",
      industry: [],
      location: [],
      currentCompany: [],
      pastCompany: [],
    };
    if (!isUrl && !isEmail && isMultiWords) {
      history.push({
        pathname: "/searchResultTexAu",
        state: { requestTexAu },
      });
    }
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
                    id="inputText"
                    className="ps-3"
                    name="searchString"
                    onChange={handleHeadSearch}
                    required
                  />
                  <div className="placeholder">
                    Eg: I want to <span>email IDs</span> of people following{" "}
                    <span>Flipkart Facebook Page</span>
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

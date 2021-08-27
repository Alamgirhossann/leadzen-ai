import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import extractDomain from "extract-domain";

const ExtractContacts = () => {
  const [socialMediaData, setSocialMediaData] = useState({
    url: null,
    type: "Likers",
  });

  const history = useHistory();

  const allowedDomains = ["linkedin.com"];
  const tempCookie =
    "AQEDAQFGp0UCVdaAAAABe2AWLdIAAAF7qCvLu04AcqhIb82grlYAcZhj_-h2n29gx0DaQeazGVcQu4OAyCmP_fgyH47Ial6nZOGcIuivmbjNPDnFHaaOR1EbEcJioDrM_xMpE-rHNd44Rwwno2VEaJK2";

  const handleTypeChange = (e) => {
    setSocialMediaData({ ...socialMediaData, type: e.target.value });
  };

  const handleUrlChange = (e) => {
    setSocialMediaData({ ...socialMediaData, url: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(socialMediaData);

    if (!socialMediaData.url) {
      console.log("No Social Media URL");
      alert("No Social URL Provided");
      return;
    }

    const urlDomain = extractDomain(socialMediaData.url);

    console.log(`urlDomain: ${urlDomain}`);

    if (!allowedDomains.includes(urlDomain)) {
      alert(
        `Only URLs from the following domains are supported at this time: \n\n${allowedDomains}`
      );
      return;
    }

    switch (socialMediaData.type) {
      case "Commenters":
        sendToHistory({
          endpoint: "/texau/linkedin/post_commenters",
          data: {
            url: socialMediaData.url,
            cookie: tempCookie,
          },
        });
        break;
      case "Likers":
      default:
        sendToHistory({
          endpoint: "/texau/linkedin/post_likers",
          data: {
            url: socialMediaData.url,
            cookie: tempCookie,
          },
        });
        break;
    }

    function sendToHistory(state = null) {
      if (!state) {
        console.warn("Invalid state");
        return;
      }
      history.push({
        pathname: "/social_url_search",
        state: state,
      });
    }
  };

  return (
    <div className="user-widget-box p-4 my-3 text-center">
      <h5 className="text-danger">Now Extract contacts</h5>
      <p className="text-dark mb-3">
        {/*of Followers, Likers, Commentors & Group Members & Job Seekers From*/}
        of Likers and Commenters From Supported Social Media Posts
      </p>
      <ul className="user-widget-social mt-3 mb-4 list-inline">
        {/*<li className="list-inline-item">*/}
        {/*  <a href="#">*/}
        {/*    <img src="assets/images/social-facebook.png" alt="title" />*/}
        {/*  </a>*/}
        {/*</li>*/}
        {/*<li className="list-inline-item">*/}
        {/*  <a href="#">*/}
        {/*    <img src="assets/images/social-instagram.png" alt="title" />*/}
        {/*  </a>*/}
        {/*</li>*/}
        {/*<li className="list-inline-item">*/}
        {/*  <a href="#">*/}
        {/*    <img src="assets/images/social-twitter.png" alt="title" />*/}
        {/*  </a>*/}
        {/*</li>*/}
        <li className="list-inline-item">
          <a href="#">
            <img src="assets/images/social-linkedin.png" alt="title" />
          </a>
        </li>
        {/*<li className="list-inline-item">*/}
        {/*  <a href="#">*/}
        {/*    <img src="assets/images/social-youtube.png" alt="title" />*/}
        {/*  </a>*/}
        {/*</li>*/}
        {/*<li className="list-inline-item">*/}
        {/*  <a href="#">*/}
        {/*    <img src="assets/images/social-naukri-com.png" alt="title" />*/}
        {/*  </a>*/}
        {/*</li>*/}
      </ul>
      <form action="#" className="search-form-lg m-auto">
        <div className="input-group">
          <input
            id="social-media-url"
            type="url"
            className="form-control"
            onBlur={handleUrlChange}
            placeholder="Paste Social Media URL"
          />
          {/*<button*/}
          {/*  className="btn btn-danger"*/}
          {/*  // onClick={handleTypeSubmit}*/}
          {/*  type="submit"*/}
          {/*>*/}
          {/*  <img src="assets/images/social-search-past.png" alt="title" />*/}
          {/*</button>*/}
        </div>
      </form>

      <div className="radio-form-check d-block my-3">
        {/*<div className="form-check form-check-inline">*/}
        {/*  <input*/}
        {/*    className="form-check-input"*/}
        {/*    type="radio"*/}
        {/*    onChange={handleType}*/}
        {/*    name="inlineRadioOptions"*/}
        {/*    value="All"*/}
        {/*    id="inlineRadio1"*/}
        {/*  />*/}
        {/*  <label className="form-check-label" for="inlineRadio1">*/}
        {/*    All*/}
        {/*  </label>*/}
        {/*</div>*/}
        {/*<div className="form-check form-check-inline">*/}
        {/*  <input*/}
        {/*    className="form-check-input"*/}
        {/*    type="checkbox"*/}
        {/*    name="inlineRadioOptions"*/}
        {/*    id="inlineRadio2"*/}
        {/*    checked*/}
        {/*  />*/}
        {/*  <label className="form-check-label" for="inlineRadio2">*/}
        {/*    Followers*/}
        {/*  </label>*/}
        {/*</div>*/}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="Likers"
            checked={socialMediaData.type.includes("Likers")}
            onChange={handleTypeChange}
          />
          <label className="form-check-label" for="inlineRadio3">
            Likers
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="inlineRadioOptions"
            id="inlineRadio4"
            value="Commenters"
            checked={socialMediaData.type.includes("Commenters")}
            onChange={handleTypeChange}
          />
          <label className="form-check-label" for="inlineRadio4">
            Commenters
          </label>
        </div>
        {/*<div className="form-check form-check-inline">*/}
        {/*  <input*/}
        {/*    className="form-check-input"*/}
        {/*    type="checkbox"*/}
        {/*    name="inlineRadioOptions"*/}
        {/*    id="inlineRadio5"*/}
        {/*  />*/}
        {/*  <label className="form-check-label" for="inlineRadio5">*/}
        {/*    Job Seekers*/}
        {/*  </label>*/}
        {/*</div>*/}
        {/*<div className="form-check form-check-inline">*/}
        {/*  <input*/}
        {/*    className="form-check-input"*/}
        {/*    type="checkbox"*/}
        {/*    name="inlineRadioOptions"*/}
        {/*    id="inlineRadio6"*/}
        {/*  />*/}
        {/*  <label className="form-check-label" for="inlineRadio6">*/}
        {/*    Group Members*/}
        {/*  </label>*/}
        {/*</div>*/}
      </div>

      <button
        style={{ background: "#FB3E3E" }}
        className="btn text-white"
        type="submit"
        onClick={handleSubmit}
      >
        <span className="pe-1">
          <FontAwesomeIcon icon={faSearch} />
        </span>{" "}
        Search
      </button>
      <p className="m-0 mt-2">
        <a href="#" className="text-danger">
          Learn More{" "}
        </a>
      </p>
    </div>
  );
};

export default ExtractContacts;

import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import extractDomain from "extract-domain";
import Cookies from "js-cookie";

const SidebarExtractContact = () => {
  const [socialMediaData, setSocialMediaData] = useState({
    url: null,
    type: "Likers",
  });
  const history = useHistory();
  const allowedDomains = ["linkedin.com"];
  const tempCookie = Cookies.get("user_linkedin_cookie");

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
    <div>
      <div className="sidebar-search-for sidebar-widget p-4 my-3">
        <h6 className="text-danger mb-3">Now Extract contacts</h6>
        <p>
          {/*of Followers, Likers, Commentors & Group Members & Job Seekers From*/}
          of Likers and Commenters From Supported Social Media Posts
        </p>
        <ul className="sidebar-social mt-3 mb-4 list-inline">
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

        <form>
          <div className="mb-3">
            <input
              type="url"
              className="form-control"
              onBlur={handleUrlChange}
              placeholder="Paste Social Media URL"
            />
          </div>
          <div className="dropdown mb-3">
            <input
              className="form-control dropdown-toggle"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              placeholder="Search Type"
            />

            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div className="dropdown-wraper">
                {/*<div className="radio-bg">*/}
                {/*  <span>All</span>*/}
                {/*  <input*/}
                {/*    type="checkbox"*/}
                {/*    id="All"*/}
                {/*    value="All"*/}
                {/*    onChange={handleType}*/}
                {/*    checked={socialMediaType.type.includes("All")}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div className="radio-bg">*/}
                {/*  <span>Follower</span>*/}
                {/*  <input*/}
                {/*    type="checkbox"*/}
                {/*    id="Follower"*/}
                {/*    value="Follower"*/}
                {/*    onChange={handleType}*/}
                {/*    checked={socialMediaType.type.includes("Follower")}*/}
                {/*  />*/}
                {/*</div>*/}
                <div className="radio-bg">
                  <span>Likers</span>
                  <input
                    type="checkbox"
                    id="Likers"
                    value="Likers"
                    name="inlineRadioOptions"
                    onChange={handleTypeChange}
                    checked={socialMediaData.type.includes("Likers")}
                  />
                </div>
                <div className="radio-bg">
                  <span>Commenters</span>
                  <input
                    type="checkbox"
                    id="Commenters"
                    value="Commenters"
                    name="inlineRadioOptions"
                    onChange={handleTypeChange}
                    checked={socialMediaData.type.includes("Commenters")}
                  />
                </div>
                {/*<div className="radio-bg">*/}
                {/*  <span>Job Seeker</span>*/}
                {/*  <input*/}
                {/*    type="checkbox"*/}
                {/*    id="Job Seeker"*/}
                {/*    value="Job Seeker"*/}
                {/*    onChange={handleType}*/}
                {/*    checked={socialMediaType.type.includes("Job Seeker")}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div className="radio-bg">*/}
                {/*  <span>Group Members</span>*/}
                {/*  <input*/}
                {/*    type="checkbox"*/}
                {/*    id="Group Members"*/}
                {/*    value="Group Members"*/}
                {/*    onChange={handleType}*/}
                {/*    checked={socialMediaType.type.includes("Group Members")}*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>

          <button
            style={{ background: "#FB3E3E" }}
            onClick={handleSubmit}
            className="btn text-white"
            type="submit"
          >
            <span className="pe-1">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            Search
          </button>

          <p className="m-0">
            <a href="/userGuide" className="learn-link">
              Learn More
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SidebarExtractContact;

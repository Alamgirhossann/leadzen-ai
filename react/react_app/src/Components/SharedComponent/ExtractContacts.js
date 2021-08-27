import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const ExtractContacts = () => {
  const [socialMediaType, setSocialMediaType] = useState({
    url: null,
    type: [],
  });
  const [socialMediaSearch, setSocialMediaSearch] = useState({ text: null });
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
  const handleType = (e) => {
    setSocialMediaType({ ...socialMediaType, type: e.target.value });
  };
  const handleTypeSubmit = async (e) => {
    e.preventDefault();
    console.log(socialMediaSearch);
    console.log(socialMediaType.url);

    const inputData = {
      url:
        "https://www.linkedin.com/pulse/developing-digital-talent-toronto-ravi-kumar-s/?trackingId=iUSRpLE2Dt56CYpqppezgA%3D%3D",
      cookie:
        "AQEDAQFGp0UCVdaAAAABe2AWLdIAAAF7qCvLu04AcqhIb82grlYAcZhj_-h2n29gx0DaQeazGVcQu4OAyCmP_fgyH47Ial6nZOGcIuivmbjNPDnFHaaOR1EbEcJioDrM_xMpE-rHNd44Rwwno2VEaJK2",
    };
    try {
      console.log(inputData);
      const response = await fetch(apiServer + "/texau/linkedin/post_likers", {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });

      if (response.statusCode === 404) {
        alert("No Post Likers");
        return;
      }

      if (response.statusCode !== 200) {
        alert("Error Finding Post Likers");
        console.log(await response.json());
        return;
      }

      const json = await response.json();
      if (!json) {
        alert("No Post Likers Found");
        return;
      }

      console.log(json);
      // checkExecutionStatus(json.execution_id);
    } catch (err) {
      console.error("Error: ", err);
      alert("Error Uploading File, Please Try Again Later");
    }
  };

  const handleURL = (e) => {
    setSocialMediaType({ ...socialMediaType, url: e.target.value });
    console.log(e.target.value);
  };

  return (
    <div className="user-widget-box p-4 my-3 text-center">
      <h5 className="text-danger">Now Extract contacts</h5>
      <p className="text-dark mb-3">
        of Followers, Likers, Commentors & Group Members & Job Seekers From
        Social Media
      </p>
      <ul className="user-widget-social mt-3 mb-4 list-inline">
        <li className="list-inline-item">
          <a href="#">
            <img src="assets/images/social-facebook.png" alt="title" />
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#">
            <img src="assets/images/social-instagram.png" alt="title" />
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#">
            <img src="assets/images/social-twitter.png" alt="title" />
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#">
            <img src="assets/images/social-linkedin.png" alt="title" />
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#">
            <img src="assets/images/social-youtube.png" alt="title" />
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#">
            <img src="assets/images/social-naukri-com.png" alt="title" />
          </a>
        </li>
      </ul>
      <form action="#" className="search-form-lg m-auto">
        <div className="input-group">
          <input
            id="social-media-url"
            type="text"
            className="form-control"
            onBlur={handleURL}
            placeholder="Paste Social Media URL"
          />
          <button
            className="btn btn-danger"
            // onClick={handleTypeSubmit}
            type="submit"
          >
            <img src="assets/images/social-search-past.png" alt="title" />
          </button>
        </div>
      </form>

      <div className="radio-form-check d-block my-3">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={handleType}
            name="inlineRadioOptions"
            id="inlineRadio1"
          />
          <label className="form-check-label" for="inlineRadio1">
            All
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="inlineRadioOptions"
            id="inlineRadio2"
            checked
          />
          <label className="form-check-label" for="inlineRadio2">
            Followers
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="inlineRadioOptions"
            id="inlineRadio3"
            checked
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
          />
          <label className="form-check-label" for="inlineRadio4">
            Commentors
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="inlineRadioOptions"
            id="inlineRadio5"
          />
          <label className="form-check-label" for="inlineRadio5">
            Job Seekers
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="inlineRadioOptions"
            id="inlineRadio6"
          />
          <label className="form-check-label" for="inlineRadio6">
            Group Members
          </label>
        </div>
      </div>

      <button
        style={{ background: "#FB3E3E" }}
        className="btn text-white"
        type="submit"
        onClick={async (e) => handleTypeSubmit(e)}
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

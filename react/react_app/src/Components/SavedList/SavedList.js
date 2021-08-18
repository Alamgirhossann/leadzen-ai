import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../SharedComponent/Header";

const SavedList = () => {
  const [serachText, setSearchText] = useState({ text: null });
  const fetchData = async () => {
    // TODO:Create api calls to get user profile data from the backend
  };
  const handleSearch = (e) => {
    setSearchText({ ...serachText, text: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(serachText);
  };
  // TODO: Get user info from backend
  const user = {
    name: "John Smith",
    email: "Johnsmith087@hexagon.in",
    subscription: {
      product: "Free Analystt",
      price: "100 INR",
      period: "Yearly",
      status: "Active",
      last_renewal: "01/02/2020",
      expiry_date: "02/08/2021",
      profile_credits: 500,
      mail_credits: 1000,
    },
  };

  var myLeads = [
    {
      name: "John Smith",
      desc: "English Speaker",
      comp: "Hexagon AB",
      search_date: "12/05/2021",
    },
    {
      name: "Joe Mama",
      desc: "English Speaker",
      comp: "Apple INC",
      search_date: "05/05/2021",
    },
  ];
  var productLeads = [
    {
      name: "Ty Neadik",
      desc: "German Speaker",
      comp: "Microsoft AB",
      search_date: "14/05/2021",
    },
    {
      name: "Mike Hunt",
      desc: "Japanese Speaker",
      comp: "Amazon INC",
      search_date: "17/05/2021",
    },
  ];
  const handleDelete = (name) => {
    // TODO: Remove element from database if delete is pressed
    let index = myLeads.splice(
      myLeads.findIndex((myLeads) => myLeads.name === name),
      1
    );
    console.log(index + " " + name);
  };
  return (
    <div>
      <Header user={user} />

      <div className="text-center p-4 my-3">
        <div className="user-lead-top mb-2 head-btn-style">
          <div className="d-flex align-items-center">
            <h5 className="m-0">
              <a href="/repeatedUser"><img src="assets/images/back-union.png" alt="" /></a>
                Saved Leads
            </h5>
          </div>
          <form className="search-form-sm">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={handleSearch}
              />
              <button
                className="btn btn-danger"
                onClick={handleSubmit}
                type="submit"
              >
                <img src="assets/images/small-search-icon.png" alt="title" />
              </button>
            </div>
          </form>
        </div>
        <div className="lead-accordion accordion" id="accordionExample2">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button alignment"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                style={{
                  background: "white",
                  borderRadius: "15px",
                  padding: "10px",
                }}
              >
                <div className=" first-grid head-align">
                  <span className="me-3 fw-bold">My Leads</span>
                  <span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 2.00012H2C1.73478 2.00012 1.48043 2.10548 1.29289 2.29302C1.10536 2.48055 1 2.73491 1 3.00012V10.0001C1 10.2653 1.10536 10.5197 1.29289 10.7072C1.48043 10.8948 1.73478 11.0001 2 11.0001H9C9.26522 11.0001 9.51957 10.8948 9.70711 10.7072C9.89464 10.5197 10 10.2653 10 10.0001V6.50012"
                        stroke="#A3A3A3"
                        stroke-width="0.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.25 1.24987C9.44891 1.05096 9.7187 0.939209 10 0.939209C10.2813 0.939209 10.5511 1.05096 10.75 1.24987C10.9489 1.44878 11.0607 1.71856 11.0607 1.99987C11.0607 2.28117 10.9489 2.55096 10.75 2.74987L6 7.49987L4 7.99987L4.5 5.99987L9.25 1.24987Z"
                        stroke="#A3A3A3"
                        stroke-width="0.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="second-grid">
                  <input
                    type="text"
                    className="description"
                    placeholder="Add Description..."
                  />
                </div>
                <div className="third-grid">
                  <span className="d-flex justify-content-end">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.3077 4.08669C10.5486 4.10653 10.7283 4.31711 10.709 4.55803C10.7055 4.59769 10.3894 8.51244 10.2074 10.1545C10.0942 11.1736 9.42102 11.7937 8.40485 11.8124C7.62727 11.8258 6.8771 11.8334 6.14385 11.8334C5.35343 11.8334 4.58285 11.8246 3.82043 11.8089C2.8451 11.7896 2.17018 11.1573 2.05993 10.1586C1.87618 8.50194 1.56177 4.59711 1.55885 4.55803C1.53902 4.31711 1.71868 4.10594 1.9596 4.08669C2.19702 4.08028 2.41168 4.24711 2.43093 4.48744C2.4328 4.51276 2.56133 6.10738 2.7014 7.68511L2.72954 7.99996C2.80009 8.78417 2.8716 9.53773 2.92968 10.0624C2.9921 10.6299 3.29835 10.9228 3.83852 10.9339C5.29685 10.9648 6.78493 10.9665 8.3891 10.9374C8.9631 10.9263 9.27343 10.6393 9.3376 10.0583C9.51843 8.42844 9.83343 4.52711 9.83693 4.48744C9.85618 4.24711 10.0691 4.07911 10.3077 4.08669ZM7.36815 0.16687C7.90365 0.16687 8.3744 0.527953 8.51265 1.04537L8.66082 1.78095C8.7087 2.02209 8.92031 2.19819 9.16533 2.20205L11.0797 2.20212C11.3212 2.20212 11.5172 2.39812 11.5172 2.63962C11.5172 2.88112 11.3212 3.07712 11.0797 3.07712L9.18242 3.07703C9.17948 3.07709 9.17653 3.07712 9.17357 3.07712L9.15933 3.07654L3.10761 3.07705C3.10291 3.0771 3.0982 3.07712 3.09348 3.07712L3.0845 3.07654L1.1875 3.07712C0.946 3.07712 0.75 2.88112 0.75 2.63962C0.75 2.39812 0.946 2.20212 1.1875 2.20212L3.10142 2.20154L3.16035 2.19781C3.37985 2.16933 3.56227 2.00262 3.60682 1.78095L3.74857 1.07162C3.89265 0.527953 4.3634 0.16687 4.8989 0.16687H7.36815ZM7.36815 1.04187H4.8989C4.7589 1.04187 4.63582 1.13579 4.60023 1.27054L4.46432 1.95304C4.44704 2.03948 4.42189 2.12279 4.3897 2.20228H7.87753C7.8453 2.12279 7.82009 2.03948 7.80273 1.95304L7.66098 1.2437C7.63123 1.13579 7.50815 1.04187 7.36815 1.04187Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample2"
            >
              <div className="accordion-body">
                {myLeads.map((data) => (
                  <div className="container-style mb-2">
                    <div key={data.name} className="save-list-container">
                      <p className="save-profile text-danger">
                        <img src="assets/images/author-image.png" alt="" />
                      </p>
                      <p className="save-name">{data.name}</p>
                      <div className="save-speaker">
                        <div>
                          <small className="d-block">{data.desc}</small>
                          <small className="d-block">
                            Works at {data.comp}
                          </small>
                        </div>
                      </div>
                      <div className="save-date">
                        <div>
                          <small className="d-block">Search Date</small>
                          <small className="d-block">{data.search_date}</small>
                        </div>
                      </div>

                      <p className="save-view-btn">
                        <a href="/detailedInfo" className="button">
                          View Profile
                        </a>
                      </p>
                      <a
                        href="savedList"
                        onClick={(name) => handleDelete(data.name)}
                      >
                        <p className="save-close-btn">
                          <img src="assets/images/close-user.png" alt="" />
                        </p>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed alignment"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                style={{
                  background: "white",
                  borderRadius: "15px",
                  padding: "10px",
                }}
              >
                <div className=" first-grid head-align">
                  <span className="me-3 fw-bold">Product Designer Leads</span>
                  <span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 2.00012H2C1.73478 2.00012 1.48043 2.10548 1.29289 2.29302C1.10536 2.48055 1 2.73491 1 3.00012V10.0001C1 10.2653 1.10536 10.5197 1.29289 10.7072C1.48043 10.8948 1.73478 11.0001 2 11.0001H9C9.26522 11.0001 9.51957 10.8948 9.70711 10.7072C9.89464 10.5197 10 10.2653 10 10.0001V6.50012"
                        stroke="#A3A3A3"
                        stroke-width="0.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.25 1.24987C9.44891 1.05096 9.7187 0.939209 10 0.939209C10.2813 0.939209 10.5511 1.05096 10.75 1.24987C10.9489 1.44878 11.0607 1.71856 11.0607 1.99987C11.0607 2.28117 10.9489 2.55096 10.75 2.74987L6 7.49987L4 7.99987L4.5 5.99987L9.25 1.24987Z"
                        stroke="#A3A3A3"
                        stroke-width="0.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="second-grid">
                  <input
                    type="text"
                    className="description"
                    placeholder="Add Description..."
                  />
                </div>
                <div className="third-grid">
                  <span className="d-flex justify-content-end">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.3077 4.08669C10.5486 4.10653 10.7283 4.31711 10.709 4.55803C10.7055 4.59769 10.3894 8.51244 10.2074 10.1545C10.0942 11.1736 9.42102 11.7937 8.40485 11.8124C7.62727 11.8258 6.8771 11.8334 6.14385 11.8334C5.35343 11.8334 4.58285 11.8246 3.82043 11.8089C2.8451 11.7896 2.17018 11.1573 2.05993 10.1586C1.87618 8.50194 1.56177 4.59711 1.55885 4.55803C1.53902 4.31711 1.71868 4.10594 1.9596 4.08669C2.19702 4.08028 2.41168 4.24711 2.43093 4.48744C2.4328 4.51276 2.56133 6.10738 2.7014 7.68511L2.72954 7.99996C2.80009 8.78417 2.8716 9.53773 2.92968 10.0624C2.9921 10.6299 3.29835 10.9228 3.83852 10.9339C5.29685 10.9648 6.78493 10.9665 8.3891 10.9374C8.9631 10.9263 9.27343 10.6393 9.3376 10.0583C9.51843 8.42844 9.83343 4.52711 9.83693 4.48744C9.85618 4.24711 10.0691 4.07911 10.3077 4.08669ZM7.36815 0.16687C7.90365 0.16687 8.3744 0.527953 8.51265 1.04537L8.66082 1.78095C8.7087 2.02209 8.92031 2.19819 9.16533 2.20205L11.0797 2.20212C11.3212 2.20212 11.5172 2.39812 11.5172 2.63962C11.5172 2.88112 11.3212 3.07712 11.0797 3.07712L9.18242 3.07703C9.17948 3.07709 9.17653 3.07712 9.17357 3.07712L9.15933 3.07654L3.10761 3.07705C3.10291 3.0771 3.0982 3.07712 3.09348 3.07712L3.0845 3.07654L1.1875 3.07712C0.946 3.07712 0.75 2.88112 0.75 2.63962C0.75 2.39812 0.946 2.20212 1.1875 2.20212L3.10142 2.20154L3.16035 2.19781C3.37985 2.16933 3.56227 2.00262 3.60682 1.78095L3.74857 1.07162C3.89265 0.527953 4.3634 0.16687 4.8989 0.16687H7.36815ZM7.36815 1.04187H4.8989C4.7589 1.04187 4.63582 1.13579 4.60023 1.27054L4.46432 1.95304C4.44704 2.03948 4.42189 2.12279 4.3897 2.20228H7.87753C7.8453 2.12279 7.82009 2.03948 7.80273 1.95304L7.66098 1.2437C7.63123 1.13579 7.50815 1.04187 7.36815 1.04187Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample2"
            >
              <div className="accordion-body">
                {productLeads.map((data) => (
                  <div className="container-style mb-2">
                    <div className="save-list-container">
                      <p className="save-profile text-danger">
                        <img src="assets/images/author-image.png" alt="" />
                      </p>
                      <p className="save-name">{data.name}</p>
                      <div className="save-speaker">
                        <div>
                          <small className="d-block">{data.desc}</small>
                          <small className="d-block">
                            Works at {data.comp}
                          </small>
                        </div>
                      </div>
                      <div className="save-date">
                        <div>
                          <small className="d-block">Search Date</small>
                          <small className="d-block">{data.search_date}</small>
                        </div>
                      </div>

                      <p className="save-view-btn">
                        <a href="/detailedInfo" className="button">
                          View Profile
                        </a>
                      </p>
                      <p className="save-close-btn">
                        <img src="assets/images/close-user.png" alt="" />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedList;

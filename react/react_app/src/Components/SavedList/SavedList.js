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
                    <button className='m-0'>
                        <img className='m-0' src="assets/images/edit (4).png" alt=""/>
                    </button>
                </div>
                  <div className="second-grid">
                      <input
                          type="text"
                          className="description"
                          placeholder="Add Description..."
                      />
                  </div>
                  <div className="third-grid">
                      <div className="d-flex justify-content-end">
                          <button className="m-0">
                              <img className='m-0' src="assets/images/Delete.png" alt=""/>
                          </button>
                      </div>
                  </div>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
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
                          Unlock Profile
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
                      <button className="m-0">
                          <img className='m-0' src="assets/images/edit (4).png" alt=""/>
                      </button>
                  </div>
                  <div className="second-grid">
                      <input
                          type="text"
                          className="description"
                          placeholder="Add Description..."
                      />
                  </div>
                  <div className="third-grid">
                      <div className="d-flex justify-content-end">
                          <button className="m-0">
                              <img className='m-0' src="assets/images/Delete.png" alt=""/>
                          </button>
                      </div>

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
                        Unlock Profile
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

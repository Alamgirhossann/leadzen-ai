import React, { useEffect, useState } from "react";
import "./Style/style.css";
import Header from "../CompanySharedComponent/Header";
import SidebarExtractContact from "../CompanySharedComponent/SidebarExtractContact";
import AskJarvis from "../CompanySharedComponent/AskJarvis";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CompanyFilters from "../CompanySharedComponent/CompanyFilters";
import BulkSearch from "../CompanySharedComponent/BulkSearch";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";

const SearchResultCompany = (props) => {
  const [customSearch, setCustomSearch] = useState({
    location: null,
    industry: null,
    job_title: null,
    education: null,
    company_name: null,
    keywords: null,
    csv_file: null,
  });
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

  useEffect(async () => {
    if (props.location.state.customSearch) {
      setCustomSearch(props.location.state.customSearch);
      console.log(
        "from advance.customSearch filters .....",
        props.location.state.customSearch
      );
    }
  }, []);

  return (
    <div>
      <div>
        <Header user={user} />
        <div class="modal" id="UpgradeModal">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
          <div class="modal-dialog">
            <div class="modal-content">
              <div className="d-flex">
                <div className="pe-4">
                  <img
                    style={{ height: "125px", width: "100px" }}
                    src="assets/images/g10.png"
                    alt=""
                  />
                </div>
                <div className="text-center">
                  <p className="text-danger ">Oops</p>
                  <p>
                    looks like you have insufficient credit to access this
                    leads. upgrade your plan now.
                  </p>
                  <button
                    style={{ background: "#FB3E3E" }}
                    class="btn text-white"
                  >
                    {" "}
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="bulkmodal">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
          <div className="modal-dialog">
            <div className="modal-message">
              <p>
                <i className="text-danger">Format to follow:</i>
                Ensure that the first column has the unique values you’re
                searching for. Download the sample below for better
                understanding.
              </p>
              <Link>
                <i className="text-danger text-decoration-underline">
                  Click here to download csv format
                </i>
              </Link>
            </div>
            <div className="modal-content">
              <form action="/upload" id="mydrop" className="dropzone">
                <div className="dz-message needsclick">
                  <button type="button" className="dz-button">
                    Drag and Drop File
                  </button>
                  <br />
                  <button type="button" className="dz-button">
                    OR
                  </button>
                  <br />
                  <span className="note needsclick">
                    <input type="file" accept=".csv" />
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="main-content-area pb-6 pt-2">
          <div className="main-wrapper container-fluid">
            <div className="row">
              <div className="col-md-4 col-lg-3">
                <SpecificSearchBtn details={false} />
                <div className="sidebar-search-for sidebar-widget pt-4 my-3">
                  <h6 className="text-danger mb-3">Customize your search</h6>
                  {/*<div className="px-4">*/}
                  {/*  <CustomizeButton />*/}
                  {/*</div>*/}
                  <CompanyFilters customSearch={customSearch} />
                </div>
                <BulkSearch />
                <SidebarExtractContact />
              </div>
              <div className="col-md-8 col-lg-9">
                <div className="user-search-wrapper">
                  <div className="detailed-search">
                    <div className="search-promote-content">
                      <form className="form-inline d-flex my-2 my-lg-0">
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn text-white d-flex ms-3"
                          style={{
                            background: "#FB3E3E",
                            position: "absolute",
                            left: "325px",
                          }}
                          type="submit"
                        >
                          <span className="pe-1">
                            <FontAwesomeIcon icon={faSearch} />
                          </span>
                          Search
                        </button>
                      </form>
                    </div>
                    <div>
                      <small>Last Updated: 21/05/2021</small>
                    </div>
                  </div>
                </div>
                <div className="user-widget-box  my-3">
                  <div className="d-flex align-items-center justify-content-between py-3">
                    <div className="d-flex align-items-center ">
                      <input
                        className="ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <small className="">
                        <b>6</b> of
                        <b>250</b> Searched profiles
                      </small>
                    </div>
                    <div className="d-flex">
                      <small className="unlock-btn">
                        Unlock Profile
                        <img
                          className="ps-3"
                          src="assets/images/Group 1617.png"
                          alt=""
                        />
                      </small>
                      <small className="unlock-btn">
                        Unlock Mails
                        <img
                          className="ps-3"
                          src="assets/images/Group 1617.png"
                          alt=""
                        />
                      </small>
                      <small className="export-btn">
                        Export
                        <img
                          className="ps-3"
                          src="assets/images/export.png"
                          alt=""
                        />
                      </small>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <div className="search-author text-danger d-flex align-items-center">
                        <img
                          className=""
                          src="assets/images/Group 2367.png"
                          alt=""
                        />
                      </div>
                      <div className="search-user">
                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div>
                              <p className="d-block">Hexagon AB </p>
                              <small className="d-block">
                                <img
                                  src="assets/images/accord-map-pin.png"
                                  alt=""
                                />
                                Alpharetta, Georgia
                              </small>
                            </div>
                          </div>
                          <div className="col d-flex align-items-center">
                            <small>
                              Hexagon AB is a publicly listed global <br />{" "}
                              information technology company
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="search-email text-center">
                        <div className="">
                          <small className="d-block text-danger">300</small>
                          <small className="d-block">Employee</small>
                        </div>
                      </div>

                      <div className="search-view-btn d-flex align-items-center">
                        <a href="/detailedInfo" className="button">
                          View Employee
                        </a>
                      </div>
                      <div className="search-close-btn d-flex align-items-center">
                        <a href="#">
                          <img src={"assets/images/Group 1863.png"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <div className="search-author text-danger d-flex align-items-center">
                        <img
                          className=""
                          src="assets/images/Group 2367.png"
                          alt=""
                        />
                      </div>
                      <div className="search-user">
                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div>
                              <p className="d-block">Hexagon AB </p>
                              <small className="d-block">
                                <img
                                  src="assets/images/accord-map-pin.png"
                                  alt=""
                                />
                                Alpharetta, Georgia
                              </small>
                            </div>
                          </div>
                          <div className="col d-flex align-items-center">
                            <small>
                              Hexagon AB is a publicly listed global <br />{" "}
                              information technology company
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="search-email text-center">
                        <div className="">
                          <small className="d-block text-danger">300</small>
                          <small className="d-block">Employee</small>
                        </div>
                      </div>

                      <div className="search-view-btn d-flex align-items-center">
                        <a href="/detailedInfo" className="button">
                          View Employee
                        </a>
                      </div>
                      <div className="search-close-btn d-flex align-items-center">
                        <a href="#">
                          <img src={"assets/images/Group 1863.png"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <div className="search-author text-danger d-flex align-items-center">
                        <img
                          className=""
                          src="assets/images/Group 2367.png"
                          alt=""
                        />
                      </div>
                      <div className="search-user">
                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div>
                              <p className="d-block">Hexagon AB </p>
                              <small className="d-block">
                                <img
                                  src="assets/images/accord-map-pin.png"
                                  alt=""
                                />
                                Alpharetta, Georgia
                              </small>
                            </div>
                          </div>
                          <div className="col d-flex align-items-center">
                            <small>
                              Hexagon AB is a publicly listed global <br />{" "}
                              information technology company
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="search-email text-center">
                        <div className="">
                          <small className="d-block text-danger">300</small>
                          <small className="d-block">Employee</small>
                        </div>
                      </div>

                      <div className="search-view-btn d-flex align-items-center">
                        <a href="/detailedInfo" className="button">
                          View Employee
                        </a>
                      </div>
                      <div className="search-close-btn d-flex align-items-center">
                        <a href="#">
                          <img src={"assets/images/Group 1863.png"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <div className="search-author text-danger d-flex align-items-center">
                        <img
                          className=""
                          src="assets/images/Group 2367.png"
                          alt=""
                        />
                      </div>
                      <div className="search-user">
                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div>
                              <p className="d-block">Hexagon AB </p>
                              <small className="d-block">
                                <img
                                  src="assets/images/accord-map-pin.png"
                                  alt=""
                                />
                                Alpharetta, Georgia
                              </small>
                            </div>
                          </div>
                          <div className="col d-flex align-items-center">
                            <small>
                              Hexagon AB is a publicly listed global <br />{" "}
                              information technology company
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="search-email text-center">
                        <div className="">
                          <small className="d-block text-danger">300</small>
                          <small className="d-block">Employee</small>
                        </div>
                      </div>

                      <div className="search-view-btn d-flex align-items-center">
                        <a href="/detailedInfo" className="button">
                          View Employee
                        </a>
                      </div>
                      <div className="search-close-btn d-flex align-items-center">
                        <a href="#">
                          <img src={"assets/images/Group 1863.png"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <div className="search-author text-danger d-flex align-items-center">
                        <img
                          className=""
                          src="assets/images/Group 2367.png"
                          alt=""
                        />
                      </div>
                      <div className="search-user">
                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div>
                              <p className="d-block">Hexagon AB </p>
                              <small className="d-block">
                                <img
                                  src="assets/images/accord-map-pin.png"
                                  alt=""
                                />
                                Alpharetta, Georgia
                              </small>
                            </div>
                          </div>
                          <div className="col d-flex align-items-center">
                            <small>
                              Hexagon AB is a publicly listed global <br />{" "}
                              information technology company
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="search-email text-center">
                        <div className="">
                          <small className="d-block text-danger">300</small>
                          <small className="d-block">Employee</small>
                        </div>
                      </div>

                      <div className="search-view-btn d-flex align-items-center">
                        <a href="/detailedInfo" className="button">
                          View Employee
                        </a>
                      </div>
                      <div className="search-close-btn d-flex align-items-center">
                        <a href="#">
                          <img src={"assets/images/Group 1863.png"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <div className="search-author text-danger d-flex align-items-center">
                        <img
                          className=""
                          src="assets/images/Group 2367.png"
                          alt=""
                        />
                      </div>
                      <div className="search-user">
                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div>
                              <p className="d-block">Hexagon AB </p>
                              <small className="d-block">
                                <img
                                  src="assets/images/accord-map-pin.png"
                                  alt=""
                                />
                                Alpharetta, Georgia
                              </small>
                            </div>
                          </div>
                          <div className="col d-flex align-items-center">
                            <small>
                              Hexagon AB is a publicly listed global <br />{" "}
                              information technology company
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="search-email text-center">
                        <div className="">
                          <small className="d-block text-danger">300</small>
                          <small className="d-block">Employee</small>
                        </div>
                      </div>

                      <div className="search-view-btn d-flex align-items-center">
                        <a href="/detailedInfo" className="button">
                          View Employee
                        </a>
                      </div>
                      <div className="search-close-btn d-flex align-items-center">
                        <a href="#">
                          <img src={"assets/images/Group 1863.png"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <div className="search-author text-danger d-flex align-items-center">
                        <img
                          className=""
                          src="assets/images/Group 2367.png"
                          alt=""
                        />
                      </div>
                      <div className="search-user">
                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div>
                              <p className="d-block">Hexagon AB </p>
                              <small className="d-block">
                                <img
                                  src="assets/images/accord-map-pin.png"
                                  alt=""
                                />
                                Alpharetta, Georgia
                              </small>
                            </div>
                          </div>
                          <div className="col d-flex align-items-center">
                            <small>
                              Hexagon AB is a publicly listed global <br />{" "}
                              information technology company
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="search-email text-center">
                        <div className="">
                          <small className="d-block text-danger">300</small>
                          <small className="d-block">Employee</small>
                        </div>
                      </div>

                      <div className="search-view-btn d-flex align-items-center">
                        <a href="/detailedInfo" className="button">
                          View Employee
                        </a>
                      </div>
                      <div className="search-close-btn d-flex align-items-center">
                        <a href="#">
                          <img src={"assets/images/Group 1863.png"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-widget-box  my-3">
                  <div className="search-container mb-2">
                    <div className="user-container py-2">
                      <input
                        className="box ms-3 me-3"
                        type="checkbox"
                        id="checkbox"
                      />
                      <div className="search-author text-danger d-flex align-items-center">
                        <img
                          className=""
                          src="assets/images/Group 2367.png"
                          alt=""
                        />
                      </div>
                      <div className="search-user">
                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div>
                              <p className="d-block">Hexagon AB </p>
                              <small className="d-block">
                                <img
                                  src="assets/images/accord-map-pin.png"
                                  alt=""
                                />
                                Alpharetta, Georgia
                              </small>
                            </div>
                          </div>
                          <div className="col d-flex align-items-center">
                            <small>
                              Hexagon AB is a publicly listed global <br />{" "}
                              information technology company
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="search-email text-center">
                        <div className="">
                          <small className="d-block text-danger">300</small>
                          <small className="d-block">Employee</small>
                        </div>
                      </div>

                      <div className="search-view-btn d-flex align-items-center">
                        <a href="/detailedInfo" className="button">
                          View Employee
                        </a>
                      </div>
                      <div className="search-close-btn d-flex align-items-center">
                        <a href="#">
                          <img src={"assets/images/Group 1863.png"} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="number-align"> 1 </div>
                  <div className="ps-3 d-flex align-items-center"> 2 </div>
                  <div className="ps-3 d-flex align-items-center"> 3 </div>
                  <div className="ps-3 d-flex align-items-center"> 4 </div>
                  <div className="ps-3 d-flex align-items-center"> 5 </div>
                  <div className="ps-3 d-flex align-items-center"> 6 </div>
                  <div
                    className="ps-3 d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#UpgradeModal"
                  >
                    {" "}
                    Next{" "}
                  </div>
                </div>
                <AskJarvis />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCompany;

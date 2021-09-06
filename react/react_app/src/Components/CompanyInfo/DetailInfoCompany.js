import React from "react";
import "./Style/style.css";
import AskJarvis from "../SharedComponent/AskJarvis";
import Header from "../SharedComponent/Header";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import CustomizeButton from "../SharedComponent/CustomizeButton";
import { Link } from "react-router-dom";
import CompanyFilters from "../CompanySharedComponent/CompanyFilters";
import SpecificCompany from "./SpecificCompany";
import BulkSearch from "../SharedComponent/BulkSearch";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";

const DetailInfoCompany = () => {
  // const details = {
  //     name: "Joe Mama",
  //     desc: "English Speaker",
  //     comp: {
  //       name: "Hexagon AB",
  //       address: "6720 Ulster Court, Alpharetta, Georgia",
  //     },
  //     email: ["Chris07@hexagon.com", "chris12@gmail.com", "chris2194@apple.com"],
  //     phone_num: [
  //       { number: "404-786-5546", type: "telephone" },
  //       { number: "404-786-4732", type: "mobile" },
  //       { number: "421-230-3235", type: "mobile" },
  //       { number: "123-456-7890", type: "mobile" },
  //     ],
  //     username: [{ name: "christophe.heyman", since: "23-12-2010" }],
  //     urls: ["Prizmgoogle.net", "john.hexagon.com", "prizma2.google.com"],
  //     gender: "Male",
  //     age: "35",
  //     languages: ["English", "French"],
  //     social_media: {
  //       facebook: "chris.facebook.com",
  //       twitter: "chris.twitter.com",
  //       instagram: "instagram.chris.com",
  //       linkedin: "chris.linkedin.com",
  //     },
  //     companies: [
  //       {
  //         name: "Hexagon AB",
  //         role: "Software Engineer",
  //         since: "12-05-2019",
  //         url: "apicsassociation.com",
  //       },
  //       {
  //         name: "Catavolt, Part of Hexagon",
  //         role: "Software Engineer",
  //         since: "12-05-2017",
  //         url: "google.com",
  //       },
  //       {
  //         name: "Infor- Atlanta, GA, USA",
  //         role: "Software Engineer",
  //         since: "12-05-2015",
  //         url: "ga.com",
  //       },
  //       {
  //         name: "MAPICS, Inc.- Atlanta, GA, USA",
  //         role: "Software Engineer",
  //         since: "12-05-2011",
  //         url: "atlanta.com",
  //       },
  //     ],
  //     education: [
  //       {
  //         name: "APICS- Association for Operation Management",
  //         since: "2011 - 2013",
  //         location: "Texas, USA",
  //         url: "apicsassociation.com",
  //       },
  //       {
  //         name: "Ghent University",
  //         since: "2009 - 2011",
  //         location: "New York, USA",
  //         url: "Ghentuniversity.com",
  //       },
  //       {
  //         name: "St.Jozef Institute",
  //         since: "2009 - 2005",
  //         location: "Texas, USA",
  //         url: "apicsassociation.com",
  //       },
  //     ],
  //     locations: [
  //       "Texas, USA",
  //       "New York, USA",
  //       "Tbilisi, Georgia",
  //       "London, UK",
  //       "Dubai, UAE",
  //       "Atlanta, Georgia",
  //     ],
  //     related_profiles: [
  //       { name: "Stan Joseph", url: "stan_joseph.com" },
  //       { name: "Robert Brown", url: "robert_brown.com" },
  //       { name: "Dan Schmitt", url: "banschmitt.in" },
  //       { name: "Lan Bey", url: "labney.com" },
  //       { name: "Stan Joseph", url: "stanjosepy.io" },
  //       { name: "Lanre Bey", url: "lanrebey.in" },
  //     ],
  //     rating: 4.5,
  //   };
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
  return (
    <div>
      <Header user={user} />
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
              <i className="text-danger">Format to follow:</i> Ensure that the
              first column has the unique values you’re searching for. Download
              the sample below for better understanding.{" "}
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
                  OR{" "}
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
                <div className="px-4">
                  <CustomizeButton />
                </div>
                <CompanyFilters />
              </div>
              <BulkSearch />
              <SidebarExtractContact />
            </div>
            <div className="col-md-8 col-lg-9">
              <div className="user-search-wrapper">
                <div className="detailed-search">
                  <div className="search-promote-content">
                    <form className=" d-flex my-2 my-lg-0">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn text-white w-auto d-flex ms-3"
                        style={{ background: "#FB3E3E" }}
                        type="submit"
                      >
                        <span className="pe-1">
                          {/* <FontAwesomeIcon icon={faSearch} /> */}
                        </span>{" "}
                        Search
                      </button>
                    </form>
                  </div>
                  <div>
                    <small>Last Updated: 21/05/2021</small>
                  </div>
                </div>
              </div>

              <div className="user-widget-box  mt-3">
                <div className="info-container">
                  <div className="user-info-container">
                    <input
                      className="info-box ms-3 me-3"
                      type="checkbox"
                      id="checkbox"
                    />
                    <p className="info-author text-danger">
                      <img src="assets/images/Group 2367.png" alt="" />
                    </p>
                    <div className="info-user">
                      <p>Hexagon AB</p>
                      <small>Alpharetta, Georgia</small>
                    </div>
                    <div className="info-location">
                      <div className="d-flex justify-content-between">
                        <small className="d-block">
                          Hexagon AB is a publicly listed global information
                          technology company
                        </small>
                      </div>
                    </div>
                    <p className="info-up-btn">
                      <small className="d-block">
                        <span className="text-danger">300</span> Employee
                      </small>
                    </p>
                    <div className="info-email text-center">
                      <small className="d-block"></small>
                    </div>
                    <p className="info-download-btn">
                      <a href="#">
                        <img src="assets/images/Group 1899.png" alt="" />
                      </a>
                    </p>
                    <p className="info-plus-btn">
                      <a href="#">
                        <img src="assets/images/Group 1863.png" alt="" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "20px",
                  marginTop: "15px",
                }}
              >
                <SpecificCompany />
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

              <div>
                <AskJarvis />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfoCompany;

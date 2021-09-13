import React, { useEffect } from "react";
import "./Style/style.css";
// import { Map, GoogleApiWrapper } from "google-maps-react";

const SpecificCompany = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
      <section className="item-section mt-3">
        <div className="phone-child-div ">
          <div className="px-3">
            <p className="specific-page-title">Description</p>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque ornare pharetra nisi, vel venenatis orci
                scelerisque in. Vestibulum sollicitudin sapien eget tellus
                semper, et congue mauris pharetra.{" "}
              </p>
            </div>
            <p className="specific-page-title">Founded Year</p>
            <div>
              <p>2001</p>
            </div>
            <p className="specific-page-title">Company Headquarter</p>
            <div>
              <p>Alpharetta, Georgia</p>
            </div>
          </div>
          <div className="px-3">
            <p className="specific-page-title">Company Type</p>
            <div>
              <p>Information technology company</p>
            </div>
            <p className="specific-page-title">Company Website</p>
            <div>
              <p>https//HexagonAB.com</p>
            </div>
            <p className="specific-page-title">Company Email id</p>
            <div>
              <p>Support@HexagonAB.com</p>
            </div>
            <p className="specific-page-title">Phone Number</p>
            <div>
              <p>+91 888 888 8888</p>
            </div>
            <p className="specific-page-title">Employee Rating</p>
            <div>
              <p>4.5 Rating</p>
            </div>
          </div>
          <div className="px-3">
            <p className="specific-page-title">Recent News</p>
            <div>
              <p>
                Slack is needed if the Digital Transformation of Healthcare is
                to succeed
              </p>
              <div className="d-flex justify-content-between border-bottom">
                <p>Forbes</p>
                <p>03 Aug 2021</p>
              </div>
            </div>
            <div>
              <p>
                Slack is needed if the Digital Transformation of Healthcare is
                to succeed
              </p>
              <div className="d-flex justify-content-between">
                <p>Forbes</p>
                <p>03 Aug 2021</p>
              </div>
            </div>
            <p className="specific-page-title">Overall Culture Rating</p>
            <p>Rating</p>
          </div>
        </div>
      </section>
      <section className="item-section">
        <div className="row">
          <div className="col-md-6 pe-5">
            <p className="specific-page-title">Business Description</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque ornare pharetra nisi, vel venenatis orci scelerisque
              in. x
            </p>
          </div>
          <div className="col-md-6">
            <img src="assets/images/image 174.png" alt="" />
            <p className="text-center">
              Website Screenshot (As on 21 August 2021)
            </p>
          </div>
        </div>
      </section>
      <section className="item-section">
        <p className="specific-page-title">Teams/Key members</p>
        <div class="user-promote-slider">
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <img className="" src="assets/images/user-athor-pic.png" alt="" />
            </div>
            <p className="d-block mt-3">Robert</p>
          </div>
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <img className="" src="assets/images/user-athor-pic.png" alt="" />
            </div>
            <p className="d-block mt-3">Robert</p>
          </div>
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <img className="" src="assets/images/user-athor-pic.png" alt="" />
            </div>
            <p className="d-block mt-3">Robert</p>
          </div>
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <img className="" src="assets/images/user-athor-pic.png" alt="" />
            </div>
            <p className="d-block mt-3">Robert</p>
          </div>
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <img className="" src="assets/images/user-athor-pic.png" alt="" />
            </div>
            <p className="d-block mt-3">Robert</p>
          </div>
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <img className="" src="assets/images/user-athor-pic.png" alt="" />
            </div>
            <p className="d-block mt-3">Robert</p>
          </div>
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <img className="" src="assets/images/user-athor-pic.png" alt="" />
            </div>
            <p className="d-block mt-3">Robert</p>
          </div>
        </div>
      </section>
      <section className="item-section">
        <div className="row">
          <div className="col-md-6">
            <p className="specific-page-title">Office Locations</p>
            <img src="assets/images/map.png" alt="" />
          </div>
          <div className="col-md-6">
            <p className="specific-page-title">List of Office Location </p>
            <div>
              <p>Texas, USA</p>
              <p>New York, USA</p>
              <p>Tbilisi, Georgia</p>
              <p>London, UK</p>
              <p>Dubai, UAE</p>
              <p>Atlanta, Georgia</p>
              <p>Atlanta, Georgia</p>
              <p>Atlanta, Georgia</p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="item-section">
        <div>
          <p className="specific-page-title">Hiring People</p>
          <div className="row">
            <div className="col-md-3">
              <div className="lead-card">
                <div className="text-center">
                  <img src="assets/images/user-athor-pic.png" alt="" />
                  <p style={{ fontSize: "17px" }}>Robert Brown</p>
                  <small style={{ fontSize: "14px", color: "#858585" }}>
                    HR{" "}
                  </small>
                  <p>+81 888 888 8888</p>
                  <p>RobertB@Hexagon.in</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="lead-card">
                <div className="text-center">
                  <img src="assets/images/user-athor-pic.png" alt="" />
                  <p style={{ fontSize: "17px" }}>Robert Brown</p>
                  <small style={{ fontSize: "14px", color: "#858585" }}>
                    HR{" "}
                  </small>
                  <p>+81 888 888 8888</p>
                  <p>RobertB@Hexagon.in</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="lead-card">
                <div className="text-center">
                  <img src="assets/images/user-athor-pic.png" alt="" />
                  <p style={{ fontSize: "17px" }}>Robert Brown</p>
                  <small style={{ fontSize: "14px", color: "#858585" }}>
                    HR{" "}
                  </small>
                  <p>+81 888 888 8888</p>
                  <p>RobertB@Hexagon.in</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="lead-card">
                <div className="text-center">
                  <img src="assets/images/user-athor-pic.png" alt="" />
                  <p style={{ fontSize: "17px" }}>Robert Brown</p>
                  <small style={{ fontSize: "14px", color: "#858585" }}>
                    HR{" "}
                  </small>
                  <p>+81 888 888 8888</p>
                  <p>RobertB@Hexagon.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className="specific-page-title">Hiring Openings</p>
            <div className="row">
              <div className="col-md-3">
                <div className="lead-card">
                  <div className="text-center">
                    <p style={{ fontSize: "17px" }}>Software Developer</p>
                    <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                      2 Openings{" "}
                    </small>
                    <p>Alpheratta, Georgia</p>
                    <a href="#">Visit</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="lead-card">
                  <div className="text-center">
                    <p style={{ fontSize: "17px" }}>Software Developer</p>
                    <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                      2 Openings{" "}
                    </small>
                    <p>Alpheratta, Georgia</p>
                    <a href="#">Visit</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="lead-card">
                  <div className="text-center">
                    <p style={{ fontSize: "17px" }}>Software Developer</p>
                    <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                      2 Openings{" "}
                    </small>
                    <p>Alpheratta, Georgia</p>
                    <a href="#">Visit</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="lead-card">
                  <div className="text-center">
                    <p style={{ fontSize: "17px" }}>Software Developer</p>
                    <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                      2 Openings{" "}
                    </small>
                    <p>Alpheratta, Georgia</p>
                    <a href="#">Visit</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="item-section">
        <div className="row">
          <div className="col-md-4">
            <p className="specific-page-title">Website Teafic</p>
            <img src="assets/images/Group 2431.png" alt="" />
          </div>
          <div className="col-md-4">
            <p className="specific-page-title"> Websites visits per day</p>
            <img src="assets/images/Group 2432.png" alt="" />
          </div>
          <div className="col-md-4">
            <p className="specific-page-title">Social presence</p>
            <div className="ms-2 mb-3">
              <div className="d-flex">
                <div className="col">
                  <div className="d-flex">
                    <div className="me-2">
                      <img
                        style={{ height: "32px", width: "32px" }}
                        src="assets/images/social-facebook.png"
                        alt=""
                      />
                    </div>
                    <div className="me-2">
                      <img
                        style={{ height: "32px", width: "32px" }}
                        src="assets/images/social-twitter.png"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <img
                        style={{ height: "32px", width: "32px" }}
                        src="assets/images/social-instagram.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-3">
                    <div className="me-2">
                      <img
                        style={{ height: "32px", width: "32px" }}
                        src="assets/images/social-linkedin.png"
                        alt=""
                      />
                    </div>
                    <div className="me-2">
                      <img
                        style={{ height: "32px", width: "32px" }}
                        src="assets/images/social-printarest.png"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <img
                        style={{ height: "32px", width: "32px" }}
                        src="assets/images/social-mideum.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="item-section">
        <p className="specific-page-title">Social Post</p>
        <div className="row">
          <div className="col-md-3">
            <div className="lead-card">
              <img src="assets/images/laptop.png" alt="" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              <a href="#">Visit</a>
            </div>
          </div>
          <div className="col-md-3">
            <div className="lead-card">
              <img src="assets/images/laptop.png" alt="" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              <a href="#">Visit</a>
            </div>
          </div>
          <div className="col-md-3">
            <div className="lead-card">
              <img src="assets/images/laptop.png" alt="" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              <a href="#">Visit</a>
            </div>
          </div>
          <div className="col-md-3">
            <div className="lead-card">
              <img src="assets/images/laptop.png" alt="" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              <a href="#">Visit</a>
            </div>
          </div>
        </div>
      </section> */}

      <section className="item-section">
        <p className="specific-page-title">Competitors</p>
        <div className="row">
          <div className="col-md-3">
            <div className="lead-card">
              <div className="border-bottom">
                <div className="d-flex justify-content-center">
                  <img src="assets/images/Group 2445.png" alt="" />
                </div>
                <p className="text-center">Unifonic</p>
                <div className="d-flex justify-content-between">
                  <p>HQ</p>
                  <p>New York, USA</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Employees</p>
                  <p>216</p>
                </div>
              </div>
              <p>
                Unifonic is a Tech company offering an enterprise focused
                platform for customer engagement in emerging markets.{" "}
              </p>
              <a href="#">View Company</a>
            </div>
          </div>
          <div className="col-md-3">
            <div className="lead-card">
              <div className="border-bottom">
                <div className="d-flex justify-content-center">
                  <img src="assets/images/Group 2445.png" alt="" />
                </div>
                <p className="text-center">Unifonic</p>
                <div className="d-flex justify-content-between">
                  <p>HQ</p>
                  <p>New York, USA</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Employees</p>
                  <p>216</p>
                </div>
              </div>
              <p>
                Unifonic is a Tech company offering an enterprise focused
                platform for customer engagement in emerging markets.{" "}
              </p>
              <a href="#">View Company</a>
            </div>
          </div>
          <div className="col-md-3">
            <div className="lead-card">
              <div className="border-bottom">
                <div className="d-flex justify-content-center">
                  <img src="assets/images/Group 2445.png" alt="" />
                </div>
                <p className="text-center">Unifonic</p>
                <div className="d-flex justify-content-between">
                  <p>HQ</p>
                  <p>New York, USA</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Employees</p>
                  <p>216</p>
                </div>
              </div>
              <p>
                Unifonic is a Tech company offering an enterprise focused
                platform for customer engagement in emerging markets.{" "}
              </p>
              <a href="#">View Company</a>
            </div>
          </div>
          <div className="col-md-3">
            <div className="lead-card">
              <div className="border-bottom">
                <div className="d-flex justify-content-center">
                  <img src="assets/images/Group 2445.png" alt="" />
                </div>
                <p className="text-center">Unifonic</p>
                <div className="d-flex justify-content-between">
                  <p>HQ</p>
                  <p>New York, USA</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Employees</p>
                  <p>216</p>
                </div>
              </div>
              <p>
                Unifonic is a Tech company offering an enterprise focused
                platform for customer engagement in emerging markets.{" "}
              </p>
              <a href="#">View Company</a>
            </div>
          </div>
        </div>
      </section>

      <section className="item-section">
        <p className="specific-page-title">Competitor Analysis</p>
        <table className="w-100">
          <thead className="table-head ">
            <tr className="p-5">
              <th className="text-secondary" scope="col">
                {/* Hexagon AB */}
              </th>
              <th className="text-secondary" scope="col">
                Hexagon AB
              </th>
              <th className="text-secondary" scope="col">
                Google
              </th>
              <th className="text-secondary" scope="col">
                Techpeek
              </th>
              <th className="text-secondary" scope="col">
                Sigma
              </th>
              <th className="text-secondary" scope="col">
                EcoTech
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="specific-page-title under-border">Twitter</td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
            </tr>
            <tr className="">
              <td className="specific-page-title under-border">Instagram</td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
            </tr>
            <tr className="">
              <td className="specific-page-title under-border">Facebook</td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
            </tr>
            <tr className="">
              <td className="specific-page-title under-border">Linkedin</td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
              <td className="under-border">
                <span className="text-danger">10K</span> Followers
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="item-section">
        <p className="specific-page-title">Tech Stack</p>
        <div className="row">
          <div className="col-md-3">
            <div className="stack-card">
              <div className="under-border">
                <p>Ads</p>
                <p>22 Products used</p>
              </div>
              <div className="mute-color">
                <p>DoubleClick.Net</p>
                <p>AdRoll</p>
                <p>Google Floodlight Sales</p>
              </div>
              <p className="text-danger">+ 19 others</p>
              <div className="text-center">
                <a href="#">Visit</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stack-card">
              <div className="under-border">
                <p>Ads</p>
                <p>22 Products used</p>
              </div>
              <div className="mute-color">
                <p>DoubleClick.Net</p>
                <p>AdRoll</p>
                <p>Google Floodlight Sales</p>
              </div>
              <p className="text-danger">+ 19 others</p>
              <div className="text-center">
                <a href="#">Visit</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stack-card">
              <div className="under-border">
                <p>Ads</p>
                <p>22 Products used</p>
              </div>
              <div className="mute-color">
                <p>DoubleClick.Net</p>
                <p>AdRoll</p>
                <p>Google Floodlight Sales</p>
              </div>
              <p className="text-danger">+ 19 others</p>
              <div className="text-center">
                <a href="#">Visit</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stack-card">
              <div className="under-border">
                <p>Ads</p>
                <p>22 Products used</p>
              </div>
              <div className="mute-color">
                <p>DoubleClick.Net</p>
                <p>AdRoll</p>
                <p>Google Floodlight Sales</p>
              </div>
              <p className="text-danger">+ 19 others</p>
              <div className="text-center">
                <a href="#">Visit</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center">
        <button className=" see-less-btn">See Less</button>
      </div>
    </div>
  );
};

// export default GoogleApiWrapper({
//   apiKey: "API_KEY",
// })(SpecificCompany);

export default SpecificCompany;

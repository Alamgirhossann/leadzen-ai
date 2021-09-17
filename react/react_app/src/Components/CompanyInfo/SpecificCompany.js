import React, { useEffect, useState } from "react";
import "./Style/style.css";
import SpecificUser from "../DetailedInfo/SpecificUser";
import Cookies from "js-cookie";
// import { Map, GoogleApiWrapper } from "google-maps-react";
import { v4 as uuidv4 } from "uuid";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const SpecificCompany = ({ data }) => {
  // const [openProfile, setOpenProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchId, setSearchId] = useState();
  const [specificUserDetails, setSpecificUserDetails] = useState([
    { index: null, details: null },
  ]);
  console.log("specific company data", data);

  let slicedArray = [];
  if (data) {
    if (data["4"] && data["4"].emails) {
      slicedArray = data["4"].emails.slice(0, 10);
    }
  }

  // const slicedArray = data["4"].emails.slice(0, 10);
  console.log("slicedArray", slicedArray);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleError(status) {
    console.error(`Got HTTP Error ${status}`);
  }

  function handleNotFound() {
    console.log("Not Found Yet, Waiting...");
  }

  function handleCookieError(response) {
    console.log("Response cookie error", response.statusText);
    handleError();
  }

  function handleUnAuthorized(response = null) {
    console.log("User is UnAuthorized");
    handleError();
    alert("Please Logout and LogIn Again");
  }

  const handleProfile = async (index, data) => {
    // setOpenProfile(true);
    setCurrentPage(`${currentPage}${index}`);
    let reqJsonPipl = {
      email: "",
      name: { first_name: "", last_name: "" },
      url: data,
    };
    console.log("in Handle profile...", `${currentPage}${index}`, data);
    try {
      let isDuplicate = false;

      specificUserDetails.map((spec) => {
        console.log("spec>>>", spec.index);
        if (spec.index === `${currentPage}${index}`) {
          isDuplicate = true;
        }
      });
      console.log("isDuplicate>>>>", isDuplicate);
      if (isDuplicate === false) {
        console.log("In Fetch......");
        const response = await fetch(apiServer + "/pipl/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(reqJsonPipl),
        });

        async function handleSuccess(response) {
          let json_res = await response.json();
          console.log("Data Pipl..>>>>>>>>>>>", json_res);
          let phones = [];
          if (json_res) {
            for (let i = 0; i < json_res.length; i++) {
              let obj = json_res[i];
              console.log("in for loop pipl>>>", obj, ">>>>");
              if (obj.phones) {
                for (let j = 0; j < obj.phones.length; j++) {
                  phones.push(obj.phones[j].number);
                }
              }
            }
            console.log("Phones>>>>>>", phones);
            if (phones.length >= 1) {
              let requestForSaveProfileCredit = {
                search_id: uuidv4(),
                phone_numbers: phones,
                search_index: `${currentPage}${index}`,
              };
              try {
                const response = await fetch(
                  apiServer + "/credits/profile/bulk_add",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      Authorization: `Bearer ${Cookies.get("user_token")}`,
                    },
                    body: JSON.stringify(requestForSaveProfileCredit),
                  }
                );

                const result = response.json();

                console.log("response from saveResult>>>", result);
              } catch (e) {
                console.error("Exception>>", e);
              }
              setSpecificUserDetails((prev) => [
                ...prev,
                { index: `${currentPage}${index}`, details: json_res[0] },
              ]);
            } else {
              setSpecificUserDetails((prev) => [
                ...prev,
                {
                  index: `${currentPage}${index}`,
                  details: "Record Not Found",
                },
              ]);
            }
          } else {
            console.log("In setSpecificUserDetails else");
            setSpecificUserDetails((prev) => [
              ...prev,
              { index: `${currentPage}${index}`, details: "Record Not Found" },
            ]);
            console.log(
              "In setSpecificUserDetails else ress....",
              specificUserDetails
            );
          }
        }

        switch (response.status) {
          case 200:
            return handleSuccess(response);
          case 401:
            return handleUnAuthorized(response);
          case 403:
            return handleCookieError();
          case 404:
            return handleNotFound();
          default:
            return handleError();
        }
      }

      console.log("specificUser>>>>>>>", specificUserDetails);
      specificUserDetails?.map((spec) => {
        console.log(
          "Check details>>>>",
          spec.index,
          spec.details === "Record Not Found"
        );
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  console.log("currenrtt", currentPage);
  return data ? (
    <div>
      <section className="item-section mt-3">
        <div className="phone-child-div ">
          <div className="px-3">
            <p className="specific-page-title">Description</p>
            <div>
              <p>Not Found</p>
            </div>
            <p className="specific-page-title">Founded Year</p>
            <div>
              <p>Not Found</p>
            </div>
            <p className="specific-page-title">Company Headquarter</p>
            <div>
              <p>Not Found</p>
            </div>
          </div>
          <div className="px-3">
            <p className="specific-page-title">Company Type</p>
            <div>
              <p>Not Found</p>
            </div>
            <p className="specific-page-title">Company Website</p>
            <div>
              <p>
                {data["0"] ? data["0"].data[0].websiteUrl || "" : "not Found"}
              </p>
            </div>
            <p className="specific-page-title">Company Email id</p>
            <div>
              {data["1"] && data["1"].data
                ? data["1"].data.map((user) => <p>{user.emails}</p>)
                : "Not Found"}
              {/*<p>Support@HexagonAB.com</p>*/}
            </div>
            <p className="specific-page-title">Phone Number</p>
            <div>
              <p>Not Found</p>
            </div>
          </div>
        </div>
      </section>
      <section className="item-section">
        <div className="row">
          <div className="col-md-6 pe-5">
            <p className="specific-page-title">Business Description</p>
            <p>Not Found</p>
          </div>
          <div className="col-md-6">
            <img
              src={
                data["0"] ? data["0"].data[0].url || "Not Found" : "Not Found"
              }
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="item-section">
        <p className="specific-page-title">Teams/Key members</p>
        <div className="user-promote-slider">
          {slicedArray.map((user, index) => (
            <div className="text-center" key={index}>
              <div className="d-flex justify-content-center">
                <img
                  className=""
                  src="assets/images/user-athor-pic.png"
                  alt=""
                />
              </div>
              <p className="d-block mt-3">
                {user.firstName + " " + user.lastName || ""}
              </p>
              {/*<button onClick={() => handleProfile(index, user.sourcePage)}>*/}
              {/*  {" "}*/}
              {/*  unlock profile{" "}*/}
              {/*</button>*/}
              <p className="search-view-btn ">
                <a
                  className="btn button"
                  data-toggle="collapse"
                  href={"#collapseExample_" + `${index}`}
                  data-target={"#collapseExample_" + `${index}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => handleProfile(index, user.sourcePage)}
                >
                  View Profile
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
      {specificUserDetails?.map((spec) => (
        <span>
          {/*{openProfile ? (*/}
          {/*  <span>*/}
          {/*    <SpecificUser details={spec.details} />*/}
          {/*  </span>*/}
          {/*) : null}*/}
          {spec.index === `${currentPage}` ? (
            <span>
              <SpecificUser details={spec.details} />
            </span>
          ) : null}
        </span>
      ))}{" "}
      <section className="item-section">
        <div className="row">
          <div className="col-md-4">
            <p className="specific-page-title">Website Teafic</p>
            <p>Not Found</p>
          </div>
          <div className="col-md-4">
            <p className="specific-page-title"> Websites visits per day</p>
            <p> Not Found</p>
          </div>
          <div className="col-md-4">
            <p className="specific-page-title">Social presence</p>
            {data["3"] ? (
              data["3"].data.length > 0 ? (
                <div className="ms-2 mb-3">
                  <div className="d-flex">
                    <div className="col">
                      <div className="d-flex">
                        <div className="me-2">
                          <a
                            href={data["3"].data[0].facebook || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-facebook.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="me-2">
                          <a
                            href={data["3"].data[0].twitter || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-twitter.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="">
                          <a
                            href={data["3"].data[0].instagram || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-instagram.png"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                      <div className="d-flex mt-3">
                        <div className="me-2">
                          <a
                            href={data["3"].data[0].linkedin || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-linkedin.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="me-2">
                          <a
                            href={data["3"].data[0].pinterest || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-printarest.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="">
                          <a
                            href={data["3"].data[0].youtube || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-mideum.png"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            ) : (
              "Not Found"
            )}
          </div>
        </div>
      </section>
      <section className="item-section">
        <p className="specific-page-title">Tech Stack</p>
        {data["2"] ? (
          data["2"].data.length > 0 ? (
            <div className="row">
              <div className="col-md-3">
                <div className="stack-card">
                  <div className="under-border">
                    <p>{data["2"].data[0].name}</p>
                  </div>
                  <div className="mute-color">
                    <p>{data["2"].data[0].categories}</p>
                  </div>
                  <div className="text-center">
                    <a href={data["2"].data[0].website} target="_blank">
                      Visit
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stack-card">
                  <div className="under-border">
                    <p>{data["2"].data[1].name}</p>
                  </div>
                  <div className="mute-color">
                    <p>{data["2"].data[1].categories}</p>
                  </div>
                  <div className="text-center">
                    <a href={data["2"].data[1].website} target="_blank">
                      Visit
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stack-card">
                  <div className="under-border">
                    <p>{data["2"].data[2].name}</p>
                  </div>
                  <div className="mute-color">
                    <p>{data["2"].data[2].categories}</p>
                  </div>
                  <div className="text-center">
                    <a href={data["2"].data[2].website} target="_blank">
                      Visit
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stack-card">
                  <div className="under-border">
                    <p>{data["2"].data[3].name}</p>
                  </div>
                  <div className="mute-color">
                    <p>{data["2"].data[3].categories}</p>
                  </div>
                  <div className="text-center">
                    <a href={data["2"].data[3].website} target="_blank">
                      Visit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        ) : (
          "Not Found"
        )}
      </section>
      <div className="text-center">
        <button className=" see-less-btn">See Less</button>
      </div>
    </div>
  ) : (
    <h5> Record Not Found </h5>
  );
};
// export default GoogleApiWrapper({
//   apiKey: "API_KEY",
// })(SpecificCompany);

export default SpecificCompany;

import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Moment from "react-moment";
import Header from "../SharedComponent/Header";
import SpecificUser from "../DetailedInfo/SpecificUser";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const SavedList = (props) => {
  const [serachText, setSearchText] = useState({ text: null });
  const [userInfo, setUserInfo] = useState([]);
  const [specificUserDetails, setSpecificUserDetails] = useState({
    index: "",
    details: "",
  });
  useEffect(() => {
    fetchData();
  }, []);
  function handleUnAuthorized(response = null) {
    console.log("User is UnAuthorized");
    alert("Please Logout and LogIn Again");
  }

  function handleError(response = null) {
    console.error(`Error, Status Code: ${response?.status}`);
    alert("Please Try after sometime");
  }
  const fetchData = async () => {
    try {
      const response = await fetch(apiServer + "/save_list/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      async function handleSuccess(response) {
        const result = await response.json();
        console.log("result in save List", result);
        setUserInfo(result);
      }
      switch (response.status) {
        case 200:
          return await handleSuccess(response);
        case 401:
          return handleUnAuthorized(response);
        default:
          return handleError(response);
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.info("user in state", userInfo);
  const handleSearch = (e) => {
    setSearchText({ ...serachText, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(serachText);
  };

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

  async function handleDelete(id) {
    try {
      const response = await fetch(apiServer + `/save_list/id/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      async function handleSuccess(response) {
        const result = await response.json();
        console.log("record deleted", result);
        alert("record deleted Successfully");
      }
      switch (response.status) {
        case 200:
          return await handleSuccess(response);
        case 401:
          return handleUnAuthorized(response);
        default:
          return handleError(response);
      }
    } catch (e) {
      console.error(e);
    }
  }
  const handleProfile = async (index, data) => {
    let reqJsonPipl = {
      email: "",
      name: { first_name: "", last_name: "" },
      url: data.save_list_results.url,
    };
    try {
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
            console.log("in for loop pipl>>>", obj, ">>>>", obj.phones.length);
            for (let j = 0; j < obj.phones.length; j++) {
              phones.push(obj.phones[j].number);
            }
          }
          console.log("Phones>>>>>>", phones);

          // let requestForSaveProfileCredit = {
          //   search_id: searchId,
          //   phone_numbers: phones,
          //   search_index: `${currentPage}${index}`,
          // };
          // try {
          //   const response = await fetch(
          //     apiServer + "/credits/profile/bulk_add",
          //     {
          //       method: "POST",
          //       headers: {
          //         "Content-Type": "application/json",
          //         Accept: "application/json",
          //         Authorization: `Bearer ${Cookies.get("user_token")}`,
          //       },
          //       body: JSON.stringify(requestForSaveProfileCredit),
          //     }
          //   );
          //
          //   const result = response.json();
          //
          //   console.log("response from saveResult>>>", result);
          // } catch (e) {
          //   console.error("Exception>>", e);
          // }

          setSpecificUserDetails({
            ...specificUserDetails,
            index: index,
            details: json_res[0],
          });
        } else {
          console.log("In setSpecificUserDetails else");
          setSpecificUserDetails({
            ...specificUserDetails,
            index: index,
            details: "Record Not Found",
          });
          console.log(
            "In setSpecificUserDetails else ress....",
            specificUserDetails
          );
        }
      }
      switch (response.status) {
        case 200:
          return await handleSuccess(response);
        case 401:
          return handleUnAuthorized(response);
        case 404:
          return await handleSuccess(response);
        default:
          return handleError(response);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  console.info("specificUserDetails", specificUserDetails);
  return (
    <div>
      <Header user={user} />

      <div className="text-center p-4 my-3">
        <div className="user-lead-top mb-2 head-btn-style mb-3">
          <div className="d-flex align-items-center">
            <h5 className="m-0">
              <a
                href="/repeatedUser"
                className="text-decoration-none text-dark"
              >
                <span className="me-1">
                  <img src="assets/images/back-union.png" alt="title" />
                </span>{" "}
              </a>
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
          <div className="accordion-item mb-3">
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
                  {/* <button className="m-0">
                    <img
                      className="m-0"
                      src="assets/images/edit (4).png"
                      alt=""
                    />
                  </button> */}
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
                      <img
                        className="m-0"
                        src="assets/images/Delete.png"
                        alt=""
                      />
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
                {userInfo.length > 0 ? (
                  userInfo.map((data) => (
                    <div className="container-style mb-2">
                      <div key={data.id} className="save-list-container">
                        <p className="save-profile text-danger">
                          <img
                            src={
                              data.save_list_results.profilePicture ||
                              "assets/images/author-image.png"
                            }
                            alt=""
                          />
                        </p>
                        <p className="save-name">
                          {data.save_list_results.name}
                        </p>
                        <div className="save-speaker">
                          <div>
                            <small className="d-block">
                              Works at {data.save_list_results.job}
                            </small>
                            {/*<small className="d-block">*/}
                            {/*  Works at {data.comp}*/}
                            {/*</small>*/}
                          </div>
                        </div>
                        <div className="save-date">
                          <div>
                            <small className="d-block">Search Date</small>
                            <small className="d-block">
                              <Moment format="DD/MM/YYYY">
                                {data.save_list_results.timestamp}
                              </Moment>
                            </small>
                          </div>
                        </div>

                        <p className="save-view-btn">
                          <a
                            className="btn button"
                            data-toggle="collapse"
                            href={"#collapseExample_" + `${data.id}`}
                            data-target={"#collapseExample_" + `${data.id}`}
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                            onClick={() => handleProfile(data.id, data)}
                          >
                            View Profile
                          </a>
                        </p>
                        <a
                          href="savedList"
                          onClick={(e) => handleDelete(data.id)}
                        >
                          <p className="save-close-btn">
                            <img src="assets/images/close-user.png" alt="" />
                          </p>
                        </a>
                      </div>
                      <div
                        style={{
                          background: "white",
                          borderRadius: "20px",
                          padding: "20px",
                        }}
                      >
                        <div
                          className="panel-collapse collapse in"
                          id={"collapseExample_" + `${data.id}`}
                        >
                          <span>
                            {specificUserDetails.index === `${data.id}` ? (
                              <span>
                                <SpecificUser
                                  details={specificUserDetails.details}
                                />
                              </span>
                            ) : null}
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Data not Found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedList;

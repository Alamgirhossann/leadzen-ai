import Cookies from "js-cookie";
import React, { useState } from "react";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const SavedListButton = ({ data }) => {
  const [selectedButton, setSelectedButton] = useState(false);
  console.log("e.target", data);

  function handleUnAuthorized(response = null) {
    console.log("User is UnAuthorized");
    alert("Please Logout and LogIn Again");
  }

  function handleError(response = null) {
    console.error(`Error, Status Code: ${response?.status}`);
    alert("Please Try after sometime");
  }

  async function handleSaveList() {
    console.log("dataa", data);
    try {
      const response = await fetch(apiServer + "/save_list/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify({ save_list_results: data, search_type: "texAu" }),
      });
      async function handleSuccess(response) {
        const result = await response.json();
        console.log("response from handleSaveList>>>", result);
        setSelectedButton(true);
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
      console.error("Exception>>", e);
    }
  }

  return (
    <>
      {!selectedButton ? (
        <button
          style={{ background: "none", border: "none" }}
          type="button"
          onClick={() => handleSaveList(data)}
        >
          <img src="assets/images/Group 1863.png" alt="" />
        </button>
      ) : (
        <img src="assets/images/Frame 543.png" alt="" />
      )}
    </>
  );
};

export default SavedListButton;

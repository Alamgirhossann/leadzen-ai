import Cookies from "js-cookie";
import React from "react";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const SavedList = ({ data }) => {
  console.log("e.target", data);
  function handleUnAuthorized(response = null) {
    console.log("User is UnAuthorized");
    alert("Please Logout and LogIn Again");
  }

  function handleError(response = null) {
    console.error(`Error, Status Code: ${response?.status}`);
    alert("Some thing goes wrong");
  }

  async function handleSaveList() {
    console.log("ataa",data)
    try {
      const response = await fetch(apiServer + "/save_list/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify({ save_list_results: data }),
      });
      async function handleSuccess(response) {
        const result = await response.json();
        console.log("response from handleSaveList>>>", result);
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
    <button type="button" onClick={() => handleSaveList(data)}>
      button
    </button>
  );
};

export default SavedList;

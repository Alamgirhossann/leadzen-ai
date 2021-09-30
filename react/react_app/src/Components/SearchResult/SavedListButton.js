import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import PopUp from "../SavedList/PopUp";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const SavedListButton = (props) => {
  let data = props.data;
  let [selectedButton, setSelectedButton] = useState(false);
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState();
  const [change, setChange] = useState(false);
  let handleSaveList = async () => {
    try {
      const response = await fetch(apiServer + "/saved_list/all/names", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      if (response.status === 200) {
        let result = await response.json();
        if (result) {
          setName(result);
          setSelectedButton(true);
          setPopup(true);
        }
      }
      if (response.status === 401) {
        alert("please logout and login again.");
      }
      if (response.status === 404) {
        setSelectedButton(true);
        setPopup(true);
      }
      if (response.status === 500) {
        alert("Internal Server Error Please Try Again");
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  if (change) {
    setChange(false);
    props.changeindex(props.index);
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
        ""
      )}
      {popup ? (
        <div>
          <PopUp
            triger={popup}
            name={name}
            data={data}
            type={props.type}
            indexbool={(changebool) => setChange(changebool)}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SavedListButton;

import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Cookies from "js-cookie";

const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const PopUp = (props) => {
  const [popup, setPopUp] = useState(props.triger);
  const [formname, setFormName] = useState(false);
  const [searchicon, setSearchIcon] = useState(true);
  const [name, setName] = useState();
  const [search, setSearch] = useState("");
  let handleSaveList = async (id) => {
    try {
      const response = await fetch(apiServer + "/saved_list/id/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify({ content: props.data, search_type: props.type }),
      });
      if (response.status === 200) {
        props.indexbool(true);
        setPopUp(false);
        return "success";
      }
      if (response.status === 401) {
        alert("please logout and login again");
      }
      if (response.status === 404) {
        alert("Name does not exist");
      }
      if (response.status === 500) {
        alert("Error while adding to Saving data.Please try again.");
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch(apiServer + "/saved_list/add_name/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify({ list_name: name, list_description: "" }),
      });
      if (response.status === 200) {
        let result = await response.json();
        if (result) {
          console.log(result);
          let add = await handleSaveList(result.id);
          console.log(add);
          if (add) {
            setPopUp(false);
            alert(`inserted into ${name}`);
          }
        }
      }
      if (response.status === 401) {
        alert("please logout and login again.");
      }
      if (response.status === 500) {
        alert("Internal Server Error Try again.");
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <>
      {" "}
      {popup ? (
        <div style={{ width: "450px" }}>
          {" "}
          <Modal.Dialog>
            <Modal.Header>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6 ">
                    <Modal.Title> Saved leads </Modal.Title>{" "}
                  </div>{" "}
                  <div className="col-6 col-xs-3">
                    {" "}
                    {searchicon ? (
                      <div
                        className="float-right"
                        onClick={() => setSearchIcon(false)}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>{" "}
                      </div>
                    ) : (
                      <input
                        id="popup-form-search-input"
                        className="form-control"
                        type="text"
                        placeholder="search..."
                        onChange={(event) => {
                          setSearch(event.target.value);
                        }}
                        onInput={(event) => {
                          setSearch(event.target.value);
                        }}
                      />
                    )}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </Modal.Header>{" "}
            <Modal.Body
              className="modal-dialog-scrollable"
              style={{ height: "150px", overflow: "auto" }}
            >
              {" "}
              {formname ? (
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>
                      List Name{" "}
                      <input
                        id="popup-form-list-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onInput={(e) => setName(e.target.value)}
                      />{" "}
                    </label>{" "}
                    <input className="col-xs-3" type="submit" value="Save" />
                  </form>{" "}
                </div>
              ) : (
                <div>
                  {" "}
                  {props.name
                    ?.filter((data) => {
                      if (search === "") {
                        return data;
                      } else if (
                        data.list_name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return data;
                      }
                    })
                    ?.map((data, index) => (
                      <div
                        key={index}
                        style={{
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          marginBottom: "10px",
                          backgroundColor: "rgb(254,242,242)",
                        }}
                      >
                        <span style={{ marginLeft: "10px" }}>
                          {" "}
                          {data.list_name}{" "}
                          <input
                            style={{ marginRight: "20px" }}
                            type="radio"
                            value="Male"
                            name="gender"
                            className="float-right"
                            onClick={() => handleSaveList(data.id)}
                          />{" "}
                        </span>{" "}
                      </div>
                    ))}{" "}
                </div>
              )}{" "}
            </Modal.Body>{" "}
            <Modal.Footer className="justify-content-center">
              {" "}
              {!formname ? (
                <Button
                  className="btn btn-primary "
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "0",
                    borderColor: "whitesmoke",
                  }}
                  onClick={() => setFormName(true)}
                >
                  Add new list{" "}
                  <span style={{ marginLeft: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>{" "}
                  </span>{" "}
                </Button>
              ) : (
                ""
              )}{" "}
            </Modal.Footer>{" "}
          </Modal.Dialog>{" "}
        </div>
      ) : (
        <img src="assets/images/Frame 543.png" alt="" />
      )}{" "}
    </>
  );
};

export default PopUp;

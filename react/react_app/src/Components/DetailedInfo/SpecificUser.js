import React, {useEffect, useState} from "react";
import "./Style/style.css";
import Cookies from "js-cookie";

const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;


const SpecificUser = (props) => {
    const [listPhones, setListPhones] = useState({})
    console.log("props...",props.proxyData)
    console.log("props_details,,,",props.details)
    let tempList = []
    function handleError(response = null) {
        console.error(`Error, Status Code: ${response?.status}`);
      }
      function handleUnAuthorized(response = null) {
          console.log("User is UnAuthorized");
          alert("Please Logout and LogIn Again");
        }
    const phoneNumberVerification = async (phone) => {
        try {
            const response = await fetch(`${apiServer}/phone/phone_verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${Cookies.get("user_token")}`,
                },
                body: JSON.stringify({"phones": phone}),
            })
            async function handleSuccess(response) {
                const json = await response.json();
                if (!json) {
                return handleError();
                }
                return json
            }
            switch (response.status) {
          case 200:
            return await handleSuccess(response);
          case 401:
            return handleUnAuthorized(response);
          default:
            return handleError(response);
        }
        }catch (e){
            console.error("Error: ", e);
        handleError();
        }
    }

    useEffect(async () => {
        if (props.details.phones) {
            console.log("props specific>>>>>", props.details.phones);
            props.details.phones.map((number) => (
                tempList.push(number.number)
            ))
            console.log("tempList", tempList)
            const response = await phoneNumberVerification(tempList)
            if (response){
                setListPhones(response)
            }
            
        }
    }, []);

    return (
        <div>
            {" "}
            {props.details === "Record Not Found" ||
            props.details === "Item not found" ||
            !props.details ||
            !props.details.phones ? (
                <div>
                    {" "}
                    <section className="item-section" style={{textAlign: "center"}}>
                        Record Not found
                    </section>
                </div>
            ) : (
                <div>
                    <section className="item-section">
                        <div className="phone-child-div">
                            <div className="">
                                {listPhones.length > 0 ? (
                                    <h6>Associated Phone Numbers</h6>
                                ) : null}
                                {listPhones.length > 0 ?
                                    listPhones.map((item, index) => (
                                        <div className="ms-2 d-flex align-items-center mb-3">
                                            <div className="d-flex align-items-center">
                                                <img src="assets/images/Group 1338.png" alt=""/>
                                                <small className="ms-2" key={index}>{item.phone}</small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <a className="me-2 ms-2" href="#"
                                                   onClick={(e) => {
                                                        e.preventDefault();
                                                        navigator.clipboard.writeText(item.number);
                                                        alert("Phone Number Copied!");
                                                    }}
                                                >
                                                    <img
                                                        style={{height: "10px"}}
                                                        src="assets/images/Union.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            {item.status==="Success"?
                                                <div className="d-flex align-items-center">
                                                <img
                                                    className="ms-2"
                                                    src="assets/images/Vector.png"
                                                    alt=""
                                                />
                                            </div>
                                                :null}
                                        </div>
                                    )) : null}
                            </div>
                            <div>
                                {props.details.emails !== undefined &&
                                props.details.emails.length !== 0 ? (
                                    <h6>Associated Email Addresses</h6>
                                ) : null}
                                {props.details.emails
                                    ? props.details.emails.map((email) => (
                                        <div
                                            className="ms-2 d-flex align-items-center mb-3"
                                            align="left"
                                        >
                                            <div className="d-flex align-items-center">
                                                <small className="ms-2">{email.address}</small>
                                                <img
                                                    className="ms-2"
                                                    style={{height: "10px"}}
                                                    src="assets/images/Union.png"
                                                    alt=""
                                                />
                                            </div>
                                            {email.valid === 'valid'?
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="ms-2"
                                                    src="assets/images/Vector.png"
                                                    alt=""
                                                />
                                            </div>:null}
                                        </div>
                                    ))
                                    : null}

                                {props.details.usernames !== undefined &&
                                props.details.usernames.length !== 0 ? (
                                    <h6>Associated Usernames</h6>
                                ) : null}
                                {props.details.usernames
                                    ? props.details.usernames.map((data) => (
                                        <div
                                            className="ms-2 d-flex align-items-center mb-3"
                                            align="left"
                                        >
                                            <div className="d-flex align-items-center">
                                                <small className="ms-2">{data.content}</small>
                                                <small className="me-2 ms-2">
                                                    {data.valid_since ? (
                                                        <span>Since {data.valid_since}</span>
                                                    ) : null}
                                                </small>
                                            </div>
                                        </div>
                                    ))
                                    : null}

                                {props.details.urls !== undefined &&
                                props.details.urls.length !== 0 ? (
                                    <h6>Probable URLs Associated</h6>
                                ) : null}
                                {props.details.urls
                                    ? props.details.urls.map((url) => (
                                        <div className="ms-2 d-flex align-items-center mb-3">
                                            <div className="d-flex align-items-center">
                                                <small className="ms-2">{url.url}</small>
                                                <a href={url.url} target="_blank">
                                                    <img
                                                        className="ms-2"
                                                        style={{height: "10px"}}
                                                        src="assets/images/Union (1).png"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                    : null}
                            </div>
                            <div>
                                {props.details.gender ? <h6>Gender</h6> : null}
                                <div className="ms-2 d-flex align-items-center mb-3">
                                    <small>
                                        {props.details.gender ? props.details.gender.content : null}
                                    </small>
                                </div>
                                {props.details.dob ? <h6>Age</h6> : null}
                                <div className="ms-2 d-flex align-items-center mb-3">
                                    <small>
                                        {props.details.dob ? (
                                            <span>{props.details.dob.display}</span>
                                        ) : null}
                                    </small>
                                </div>
                                {props.details.languages !== undefined &&
                                props.details.languages.length !== 0 ? (
                                    <h6>Languages Known</h6>
                                ) : null}
                                {props.details.languages
                                    ? props.details.languages.map((language) => (
                                        <div className="ms-2 d-flex align-items-center mb-3">
                                            <small>{language._display}</small>
                                        </div>
                                    ))
                                    : null}

                                <h6>Location</h6>
                                <div className="ms-2 mb-3">
                                    <div className="d-flex">
                                        <div className="col">
                                            <div className="d-flex">
                                                <div className="me-2">

                                <div className="ms-2 d-flex align-items-center mb-3">
                                    <small>
                                        {props.proxyData&&props.proxyData.city?props.proxyData.city+",":null} {props.proxyData&&props.proxyData.state?props.proxyData.state+",":null} {props.proxyData&&props.proxyData.country_full_name?props.proxyData.country_full_name:null}
                                    </small>
                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="item-section">
                        <div style={{width: "900px"}}>
                            <h4>Associated Jobs and Companies</h4>
                            {props.proxyData && props.proxyData.experiences
                                ? props.proxyData.experiences.map((comp) => (
                                    <div className="table-alignment container-fluid">
                                        <td>{comp.company}</td>
                                        <td>{}</td>
                                        <td>
                                            {comp.starts_at ? `${comp.starts_at.day}-${comp.starts_at.month}-${comp.starts_at.year}` : null}{comp.ends_at ? ` to ${comp.ends_at.day}-${comp.ends_at.month}-${comp.ends_at.year}` : null}
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-between">
                                                {/*<p>{comp.url}</p>*/}
                                                {/*<a href={comp.url}>*/}
                                                {/*  <img*/}
                                                {/*    className="ms-2"*/}
                                                {/*    style={{ height: "10px" }}*/}
                                                {/*    src="assets/images/Union (1).png"*/}
                                                {/*    alt=""*/}
                                                {/*  />*/}
                                                {/*</a>*/}
                                            </div>
                                        </td>
                                    </div>
                                ))
                                : "Companies not found"}
                        </div>
                    </section>
                    <section className="item-section">
                        <div style={{width: "900px"}}>
                            <h4>Probable Education Associated</h4>
                            {props.proxyData && props.proxyData.education
                                ? props.proxyData.education.map((edu) => (
                                    <div className="table-alignment container-fluid">
                                        <td>{edu.degree_name||"--"}</td>
                                        <td>{edu.school}</td>
                                    </div>
                                ))
                                : null}
                        </div>
                    </section>
                    <section className="item-section">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Associated Locations</h4>
                                {/*<div>*/}
                                {/*  <Map*/}
                                {/*    google={props.google}*/}
                                {/*    zoom={15}*/}
                                {/*    style={{ width: "80%", height: "80%" }}*/}
                                {/*    initialCenter={{ lat: 9.761927, lng: 79.95244 }}*/}
                                {/*  />*/}
                                {/*</div>*/}
                            </div>
                            <div className="col-md-6">
                                <h4>List of Locations</h4>
                                {props.details.addresses
                                    ? props.details.addresses.map((location) => (
                                        <div>
                                            <p>{location._display}</p>
                                        </div>
                                    ))
                                    : null}
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="user-widget-box text-center p-4 my-3">
                            <div className="user-promote-logo">
                                <img src="assets/images/user-company-brand.png" alt="title"/>
                            </div>
                            <h4 className="text-center">Probable People Associated</h4>
                            <div className="user-promote-slider">
                                {props.proxyData&&props.proxyData.people_also_viewed
                                    ? props.proxyData.people_also_viewed.map((profile) => (
                                        <div>
                                            <div
                                                style={{
                                                  width: "100%",
                                                  height: "100%",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                }}
                                            >
                                                <a href={profile.link}>
                                                    <img
                                                        className=""
                                                        src="assets/images/user-athor-pic.png"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <p className="d-block mt-3">{profile.name}</p>
                                            <p className="d-block mt-3">{profile.summary} at {profile.location}</p>
                                        </div>
                                    ))
                                    : null}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};
export default SpecificUser;
// export default GoogleApiWrapper({
//   apiKey: "API_KEY",
// })(SpecificUser);

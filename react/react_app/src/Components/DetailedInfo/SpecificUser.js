import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { GoogleApiWrapper, Map } from "google-maps-react";

const SpecificUser = (props) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "assets/js/app.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);
    useEffect(async () => {
        console.log("props>>>>>", props)
    })
    return (
        <div>

            <section className="item-section">
                <div className="phone-child-div">
                    <div className=''>
                        <h6>Probable Phone Number Associated</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <img src="assets/images/Group 1338.png" alt="" />
                                <small className='ms-2'>404-786-5546</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <small className='me-2 ms-2'>mobile</small>
                                <img style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                        </div>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <img src="assets/images/Group 1338.png" alt="" />
                                <small className='ms-2'>404-786-5546</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <small className='me-2 ms-2'>mobile</small>
                                <img style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                        </div>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <img src="assets/images/Group 1338.png" alt="" />
                                <small className='ms-2'>404-786-5546</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <small className='me-2 ms-2'>mobile</small>
                                <img style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                        </div>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <img src="assets/images/Group 1338.png" alt="" />
                                <small className='ms-2'>404-786-5546</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <small className='me-2 ms-2'>mobile</small>
                                <img style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                        </div>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <img src="assets/images/Group 1338.png" alt="" />
                                <small className='ms-2'>404-786-5546</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <small className='me-2 ms-2'>mobile</small>
                                <img style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                        </div>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <img src="assets/images/Group 1338.png" alt="" />
                                <small className='ms-2'>404-786-5546</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <small className='me-2 ms-2'>mobile</small>
                                <img style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6>Probable Email Associated</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>Chris07@XXXX.com</small>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                            <div className="d-flex align-items-center">
                                <img className='ms-2' src="assets/images/Vector.png" alt="" />
                            </div>
                        </div>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>Chris07@XXXX.com</small>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                            <div className="d-flex align-items-center">
                                <img className='ms-2' src="assets/images/Vector.png" alt="" />
                            </div>
                        </div>
                        <h6>Probable Username Associated</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>christophe.heyman</small>
                                <small className='me-2 ms-2'>Since 2010-12-23</small>
                            </div>
                        </div>
                        <h6>Probable URLs Associated</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>Prizmgoogle.net</small>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </div>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>Prizmgoogle.net</small>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </div>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>Prizmgoogle.net</small>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6>Gender</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <small>Male</small>
                        </div>
                        <h6>Age Approx</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <small>35 Years  xx month  xx days</small>
                        </div>
                        <h6>Language</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div>
                                <small>English</small>
                                <small>French</small>
                            </div>
                        </div>
                        <h6>Probable Social platforms Associated</h6>
                        <div className='ms-2 mb-3'>
                            <div className="d-flex">
                                <div className='col'>
                                    <div className="d-flex">
                                        <div className="me-2">
                                            <img style={{ height: "32px", width: "32px" }} src="assets/images/social-facebook.png" alt="" />
                                        </div>
                                        <div className="me-2">
                                            <img style={{ height: "32px", width: "32px" }} src="assets/images/social-twitter.png" alt="" />
                                        </div>
                                        <div className="">
                                            <img style={{ height: "32px", width: "32px" }} src="assets/images/social-instagram.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="me-2">
                                            <img style={{ height: "32px", width: "32px" }} src="assets/images/social-linkedin.png" alt="" />
                                        </div>
                                        <div className="me-2">
                                            <img style={{ height: "32px", width: "32px" }} src="assets/images/social-printarest.png" alt="" />
                                        </div>
                                        <div className="">
                                            <img style={{ height: "32px", width: "32px" }} src="assets/images/social-mideum.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col d-flex justify-content-end align-items-end mt-5">
                                    <div className='jarv-head'>
                                        <img src="assets/images/user-robot-icon.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='item-section'>
                <div style={{}}>
                    <h4>Probable Jobs and Companies  Associated</h4>
                    <div className='table-alignment container-fluid'>
                        <td>Hexagon AB</td>
                        <td>Software Engineer</td>
                        <td>Since 201X-XX-XX</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div>
                    <div className='table-alignment container-fluid'>
                        <td>Catavolt, Part of Hexagon</td>
                        <td>Software Engineer</td>
                        <td>Since 201X-XX-XX</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div>
                    <div className='table-alignment container-fluid'>
                        <td>Infor- Atlanta, GA, USA</td>
                        <td>Software Engineer</td>
                        <td>Since 201X-XX-XX</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div>
                    <div className='table-alignment container-fluid'>
                        <td>MAPICS, Inc.- Atlanta, GA, USA</td>
                        <td>Software Engineer</td>
                        <td>Since 2019-07-02</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div>
                    <div className='table-alignment container-fluid'>
                        <td>MAPICS, Inc.- Eindhoven, NL</td>
                        <td>Software Engineer</td>
                        <td>Since 2019-07-02</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div>
                    <div className='table-alignment container-fluid'>
                        <td>MMarcam Benelux BV- Best, NL</td>
                        <td>Software Engineer</td>
                        <td>Since 2014-01-26</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div><div className='table-alignment container-fluid'>
                        <td>IBM- Brussels, Belgium</td>
                        <td>Software Engineer</td>
                        <td>Since 2010-12-23</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div>
                    <div className='table-alignment container-fluid'>
                        <td>SFP Solutions, INC.</td>
                        <td>Software Engineer</td>
                        <td>None</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div><div className='table-alignment container-fluid'>
                        <td>System Group INC</td>
                        <td>Software Engineer</td>
                        <td>None</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div>
                </div>
            </section>
            <section className='item-section'>
                <div style={{}}>
                    <h4>Probable Education Associated</h4>
                    <div className='table-alignment container-fluid'>
                        <td>APICS- Association for Operation Management</td>
                        <td>2013 - 2011</td>
                        <td>Texas, USA</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div><div className='table-alignment container-fluid'>
                        <td>Ghent University</td>
                        <td>2011 - 2009</td>
                        <td>New York, USA</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>Ghentuniversity.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div><div className='table-alignment container-fluid'>
                        <td>St.Jozef Institute</td>
                        <td>2009 - 2005</td>
                        <td>Texas, USA</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>apicsassociation.com</p>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" />
                            </div>
                        </td>
                    </div>
                </div>
            </section>
            <section className='item-section'>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Probable Location Associated</h4>
                        <div>
                            <img style={{ height: "264px", width: "391" }} src="assets/images/map.png" alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>List of Location Associated</h4>
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
            <section>
                <div class="user-widget-box text-center p-4 my-3">
                    <div class="user-promote-logo"><img src="assets/images/Group 2117 (1).png" alt="title" /></div>
                    <div class="user-promote-slider">
                        <div>
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                                <img className='' src="assets/images/user-athor-pic.png" alt="" />
                            </div>
                            <p className='d-block mt-3'>Robert Brown</p>
                        </div>
                        <div>
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                                <img className='' src="assets/images/user-athor-pic.png" alt="" />
                            </div>
                            <p className='d-block mt-3'>Dan Schmitt</p>
                        </div>
                        <div>
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                                <img className='' src="assets/images/user-athor-pic.png" alt="" />
                            </div>
                            <p className='d-block mt-3'>Lan Bey</p>
                        </div>
                        <div>
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                                <img className='' src="assets/images/user-athor-pic.png" alt="" />
                            </div>
                            <p className='d-block mt-3'>Jogn Smith</p>
                        </div>
                        <div>
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                                <img className='' src="assets/images/user-athor-pic.png" alt="" />
                            </div>
                            <p className='d-block mt-3'>Stan Joseph</p>
                        </div>
                        <div>
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                                <img className='' src="assets/images/user-athor-pic.png" alt="" />
                            </div>
                            <p className='d-block mt-3'>Lanre Bey</p>
                        </div>
                    </div>

                </div>
            </section>
            <div className='item-section'>
                <p className='fw-bold'>Lead Rating</p>
                <img src="assets/images/Group 1908.png" alt="" />
                <p>3.5 Rating</p>
            </div>
        </div>
        // <div>
        //   {" "}
        //   {props.details === "Record Not Found" || props.details === null ? (
        //     <div>
        //       {" "}
        //       <section className="item-section" style={{ textAlign: "center" }}>
        //         Record Not found
        //       </section>
        //     </div>
        //   ) : (
        //     <div>
        //       <section className="item-section">
        //         <div className="phone-child-div">
        //           <div className="">
        //             {props.details.phones.length !== 0 ? (
        //               <h6>Associated Phone Numbers</h6>
        //             ) : null}
        //             {props.details.phones
        //               ? props.details.phones.map((number) => (
        //                   <div className="ms-2 d-flex align-items-center mb-3">
        //                     <div className="d-flex align-items-center">
        //                       <img src="assets/images/Group 1338.png" alt="" />
        //                       <small className="ms-2">{number.number}</small>
        //                     </div>
        //                     <div className="d-flex align-items-center">
        //                       <small className="me-2 ms-2">{number.type}</small>
        //                       <a
        //                         href="#"
        //                         onClick={(e) => {
        //                           e.preventDefault();
        //                           navigator.clipboard.writeText(number.number);
        //                           alert("Phone Number Copied!");
        //                         }}
        //                       >
        //                         <img
        //                           style={{ height: "10px" }}
        //                           src="assets/images/Union.png"
        //                           alt=""
        //                         />
        //                       </a>
        //                     </div>
        //                   </div>
        //                 ))
        //               : null}
        //           </div>
        //           <div>
        //             {props.details.emails.length !== 0 ? (
        //               <h6>Associated Email Addresses</h6>
        //             ) : null}
        //             {props.details.emails
        //               ? props.details.emails.map((email) => (
        //                   <div
        //                     className="ms-2 d-flex align-items-center mb-3"
        //                     align="left"
        //                   >
        //                     <div className="d-flex align-items-center">
        //                       <small className="ms-2">{email.address}</small>
        //                       <img
        //                         className="ms-2"
        //                         style={{ height: "10px" }}
        //                         src="assets/images/Union.png"
        //                         alt=""
        //                       />
        //                     </div>
        //                     <div className="d-flex align-items-center">
        //                       <img
        //                         className="ms-2"
        //                         src="assets/images/Vector.png"
        //                         alt=""
        //                       />
        //                     </div>
        //                   </div>
        //                 ))
        //               : null}

        //             {props.details.usernames.length !== 0 ? (
        //               <h6>Associated Usernames</h6>
        //             ) : null}
        //             {props.details.usernames
        //               ? props.details.usernames.map((data) => (
        //                   <div
        //                     className="ms-2 d-flex align-items-center mb-3"
        //                     align="left"
        //                   >
        //                     <div className="d-flex align-items-center">
        //                       <small className="ms-2">{data.content}</small>
        //                       <small className="me-2 ms-2">
        //                         {data.valid_since ? (
        //                           <span>Since {data.valid_since}</span>
        //                         ) : null}
        //                       </small>
        //                     </div>
        //                   </div>
        //                 ))
        //               : null}

        //             {props.details.urls.length !== 0 ? (
        //               <h6>Probable URLs Associated</h6>
        //             ) : null}
        //             {props.details.urls.map((url) => (
        //               <div className="ms-2 d-flex align-items-center mb-3">
        //                 <div className="d-flex align-items-center">
        //                   <small className="ms-2">{url.url}</small>
        //                   <a href={url.url} target="_blank">
        //                     <img
        //                       className="ms-2"
        //                       style={{ height: "10px" }}
        //                       src="assets/images/Union (1).png"
        //                       alt=""
        //                     />
        //                   </a>
        //                 </div>
        //               </div>
        //             ))}
        //           </div>
        //           <div>
        //             {props.details.gender ? <h6>Gender</h6> : null}
        //             <div className="ms-2 d-flex align-items-center mb-3">
        //               <small>
        //                 {props.details.gender
        //                   ? props.details.gender._content
        //                   : null}
        //               </small>
        //             </div>
        //             {props.details.dob ? <h6>Age</h6> : null}
        //             <div className="ms-2 d-flex align-items-center mb-3">
        //               <small>
        //                 {props.details.dob ? (
        //                   <span>props.details.dob._display Years</span>
        //                 ) : null}
        //               </small>
        //             </div>
        //             {props.details.languages.length !== 0 ? (
        //               <h6>Languages Known</h6>
        //             ) : null}
        //             {props.details.languages
        //               ? props.details.languages.map((language) => (
        //                   <div className="ms-2 d-flex align-items-center mb-3">
        //                     <small>{language._display}</small>
        //                   </div>
        //                 ))
        //               : null}

        //             <h6>Probable Social platforms Associated</h6>
        //             <div className="ms-2 mb-3">
        //               <div className="d-flex">
        //                 <div className="col">
        //                   <div className="d-flex">
        //                     <div className="me-2">
        //                       <img
        //                         style={{ height: "32px", width: "32px" }}
        //                         src="assets/images/social-facebook.png"
        //                         alt=""
        //                       />
        //                     </div>
        //                     <div className="me-2">
        //                       <img
        //                         style={{ height: "32px", width: "32px" }}
        //                         src="assets/images/social-twitter.png"
        //                         alt=""
        //                       />
        //                     </div>
        //                     <div className="">
        //                       <img
        //                         style={{ height: "32px", width: "32px" }}
        //                         src="assets/images/social-instagram.png"
        //                         alt=""
        //                       />
        //                     </div>
        //                   </div>
        //                   <div className="d-flex mt-3">
        //                     <div className="me-2">
        //                       <img
        //                         style={{ height: "32px", width: "32px" }}
        //                         src="assets/images/social-linkedin.png"
        //                         alt=""
        //                       />
        //                     </div>
        //                     <div className="me-2">
        //                       <img
        //                         style={{ height: "32px", width: "32px" }}
        //                         src="assets/images/social-printarest.png"
        //                         alt=""
        //                       />
        //                     </div>
        //                     <div className="">
        //                       <img
        //                         style={{ height: "32px", width: "32px" }}
        //                         src="assets/images/social-mideum.png"
        //                         alt=""
        //                       />
        //                     </div>
        //                   </div>
        //                 </div>
        //                 <div className="col d-flex justify-content-end align-items-end mt-5">
        //                   <div className="jarv-head">
        //                     <img src="assets/images/user-robot-icon.png" alt="" />
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </section>
        //       <section className="item-section">
        //         <div style={{ width: "900px" }}>
        //           <h4>Associated Jobs and Companies</h4>
        //           {props.details.jobs
        //             ? props.details.jobs.map((comp) => (
        //                 <div className="table-alignment container-fluid">
        //                   <td>{comp.organization}</td>
        //                   <td>{comp._display}</td>
        //                   <td>
        //                     Since {comp.date_range ? comp.date_range.start : null}
        //                   </td>
        //                   <td>
        //                     <div className="d-flex justify-content-between">
        //                       {/*<p>{comp.url}</p>*/}
        //                       {/*<a href={comp.url}>*/}
        //                       {/*  <img*/}
        //                       {/*    className="ms-2"*/}
        //                       {/*    style={{ height: "10px" }}*/}
        //                       {/*    src="assets/images/Union (1).png"*/}
        //                       {/*    alt=""*/}
        //                       {/*  />*/}
        //                       {/*</a>*/}
        //                     </div>
        //                   </td>
        //                 </div>
        //               ))
        //             : "Companies not found"}
        //         </div>
        //       </section>
        //       <section className="item-section">
        //         <div style={{ width: "900px" }}>
        //           <h4>Probable Education Associated</h4>
        //           {props.details.educations.map((edu) => (
        //             <div className="table-alignment container-fluid">
        //               <td>{edu.degree}</td>
        //               {/*<td>{edu.date_range.start}</td>*/}
        //               <td>{edu.school}</td>
        //               <td>
        //                 {/*<div className="d-flex justify-content-between">*/}
        //                 {/*  <p>{edu.url}</p>*/}
        //                 {/*  <a href={edu.url}>*/}
        //                 {/*    <img*/}
        //                 {/*      className="ms-2"*/}
        //                 {/*      style={{ height: "10px" }}*/}
        //                 {/*      src="assets/images/Union (1).png"*/}
        //                 {/*      alt=""*/}
        //                 {/*    />*/}
        //                 {/*  </a>*/}
        //                 {/*</div>*/}
        //               </td>
        //             </div>
        //           ))}
        //         </div>
        //       </section>
        //       <section className="item-section">
        //         <div className="row">
        //           <div className="col-md-6">
        //             <h4>Associated Locations</h4>
        //             {/*<div>*/}
        //             {/*  <Map*/}
        //             {/*    google={props.google}*/}
        //             {/*    zoom={15}*/}
        //             {/*    style={{ width: "80%", height: "80%" }}*/}
        //             {/*    initialCenter={{ lat: 9.761927, lng: 79.95244 }}*/}
        //             {/*  />*/}
        //             {/*</div>*/}
        //           </div>
        //           <div className="col-md-6">
        //             <h4>List of Locations</h4>
        //             {props.details.addresses.map((location) => (
        //               <div>
        //                 <p>{location._display}</p>
        //               </div>
        //             ))}
        //           </div>
        //         </div>
        //       </section>
        //       <section>
        //         <div class="user-widget-box text-center p-4 my-3">
        //           <div class="user-promote-logo">
        //             <img src="assets/images/user-company-brand.png" alt="title" />
        //           </div>
        //           <h4 className="text-center">Probable People Associated</h4>
        //           <div class="user-promote-slider">
        //             {props.details.relationships.map((profile) => (
        //               <div>
        //                 <div
        //                 // style={{
        //                 //   width: "100%",
        //                 //   height: "100%",
        //                 //   display: "flex",
        //                 //   justifyContent: "center",
        //                 // }}
        //                 >
        //                   <a href={profile.url}>
        //                     <img
        //                       className=""
        //                       src="assets/images/user-athor-pic.png"
        //                       alt=""
        //                     />
        //                   </a>
        //                 </div>
        //                 <p className="d-block mt-3">{profile.name}</p>
        //               </div>
        //             ))}
        //           </div>
        //         </div>
        //       </section>
        //       <div className="item-section" align="center">
        //         <p className="fw-bold">Lead Rating</p>
        //         <img src="assets/images/Group 1908.png" alt="" />
        //         <p>{props.details.rating} Rating</p>
        //       </div>
        //       )
        //     </div>
        //   )}
        // </div>
    );
};
export default SpecificUser;
// export default GoogleApiWrapper({
//   apiKey: "API_KEY",
// })(SpecificUser);

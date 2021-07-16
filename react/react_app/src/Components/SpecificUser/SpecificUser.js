import React, { useEffect } from 'react';
import './SpecificUser.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';
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
    return (
        <div>
            <section className="item-section">
                <div className="phone-child-div">
                    <div className=''>
                        <h6>Associated Phone Numbers</h6>
                        {props.details.phone_num.map(number => (
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <img src="assets/images/Group 1338.png" alt="" />
                                <small className='ms-2'>{number.number}</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <small className='me-2 ms-2'>{number.type}</small>
                                <a href="#" onClick={(e) => {e.preventDefault();navigator.clipboard.writeText(number.number);alert('Phone Number Copied!');}}><img style={{ height: "10px" }} src="assets/images/Union.png" alt="" /></a>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div>
                        <h6>Associated Email Addresses</h6>
                        {props.details.email.map(data => (
                        <div className='ms-2 d-flex align-items-center mb-3' align="left">
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>{data}</small>
                                <img className='ms-2' style={{ height: "10px" }} src="assets/images/Union.png" alt="" />
                            </div>
                            <div className="d-flex align-items-center">
                                <img className='ms-2' src="assets/images/Vector.png" alt="" />
                            </div>
                        </div>
                            ))}
                        <h6>Associated Usernames</h6>
                        {props.details.username.map(data => (
                        <div className='ms-2 d-flex align-items-center mb-3' align="left">
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>{data.name}</small>
                                <small className='me-2 ms-2'>Since {data.since}</small>
                            </div>
                        </div>
                        ))}
                        <h6>Probable URLs Associated</h6>
                        {props.details.urls.map(url => (
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <div className="d-flex align-items-center">
                                <small className='ms-2'>{url}</small>
                                <a href={url} target="_blank"><img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" /></a>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div>
                        <h6>Gender</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <small>{props.details.gender}</small>
                        </div>
                        <h6>Age</h6>
                        <div className='ms-2 d-flex align-items-center mb-3'>
                            <small>{props.details.age} Years</small>
                        </div>
                        <h6>Languages Known</h6>
                        {props.details.languages.map(language => (
                        <div className='ms-2 d-flex align-items-center mb-3'>
                                <small>{language}</small>
                        </div>
                        ))}
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
                <div style={{ width: "900px" }}>
                    <h4>Associated Jobs and Companies</h4>
                    {props.details.companies.map(comp => (
                    <div className='table-alignment container-fluid'>
                        <td>{comp.name}</td>
                        <td>{comp.role}</td>
                        <td>Since {comp.since}</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>{comp.url}</p>
                                <a href={comp.url}><img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" /></a>
                            </div>
                        </td>
                    </div>
                    ))}
                </div>
            </section>
            <section className='item-section'>
                <div style={{ width: "900px" }}>
                    <h4>Probable Education Associated</h4>
                    {props.details.education.map(edu => (
                    <div className='table-alignment container-fluid'>
                        <td>{edu.name}</td>
                        <td>{edu.since}</td>
                        <td>{edu.location}</td>
                        <td>
                            <div className='d-flex justify-content-between'>
                                <p>{edu.url}</p>
                                <a href={edu.url}><img className='ms-2' style={{ height: "10px" }} src="assets/images/Union (1).png" alt="" /></a>
                            </div>
                        </td>
                    </div>
                    ))}
                </div>
            </section>
            <section className='item-section'>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Associated Locations</h4>
                        <div>
                            <Map google={props.google} zoom={15} style={{width:'80%',height:'80%'}} initialCenter={{ lat: 9.761927, lng: 79.95244 }} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>List of Locations</h4>
                        {props.details.locations.map(location => (
                        <div>
                            <p>{location}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
            <section>
                <div class="user-widget-box text-center p-4 my-3">
                    <div class="user-promote-logo"><img src="assets/images/user-company-brand.png" alt="title" /></div>
                    <div class="user-promote-slider">
                        {props.details.related_profiles.map(profile => (
                        <div>
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
                                <a href={profile.url}><img className='' src="assets/images/user-athor-pic.png" alt="" /></a>
                            </div>
                            <p className='d-block mt-3'>{profile.name}</p>
                        </div>
                        ))}
                    </div>

                </div>
            </section>
            <div className='item-section' align="center">
                <p className='fw-bold'>Lead Rating</p>
                <img src="assets/images/Group 1908.png" alt="" />
                <p>{props.details.rating} Rating</p>
            </div>
        </div>
    );
};
//export default SpecificUser;
export default GoogleApiWrapper({
    apiKey: "API_KEY",
  })(SpecificUser);
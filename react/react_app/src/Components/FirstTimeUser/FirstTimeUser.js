import React, { useEffect, useState } from 'react';
import home from '../../images/menu-home.png';
import brand from '../../images/header-brand-black.png';
import saveList from '../../images/menu-saved-list.png';
import history from '../../images/menu-history.png';
import author from '../../images/author-image.png';
import codeSendBox from '../../images/header-brand-black.png';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import validator from "validator";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import axios from 'axios';

const FirstTimeUser = () => {

    const [searchText, setSearchText] = useState({text : null});
    const [customSearch, setCustomSearch] = useState({location:null, industry:null, job_title:null, education:null, company_name:null, keywords:null,csv_file:null});
    const [socialMediaSearch, setSocialMediaSearch] = useState({text:null});
    const [socialMediaType, setSocialMediaType] = useState({url:null, type:null});
    const handleHeadSearch = (e) => {
        setSearchText({...searchText, text : e.target.value});
    }
    const handleHeadSubmit = (e) => {
        e.preventDefault();
        console.log(searchText);
    }
    const handleLocation = (e) => {
        setCustomSearch({...customSearch, location:e.target.value});
    }
    const handleIndustry = (e) => {
        setCustomSearch({...customSearch, industry:e.target.value});
    }
    const handleJob = (e) => {
        setCustomSearch({...customSearch, job_title:e.target.value});
    }
    const handleEducation = (e) => {
        setCustomSearch({...customSearch, education:e.target.value});
    }
    const handleCompany = (e) => {
        setCustomSearch({...customSearch, company_name:e.target.value});
    }
    const handleKeywords = (e) => {
        setCustomSearch({...customSearch, keywords:e.target.value});
    }
    const handleCustomSubmit = (e) => {
        console.log(customSearch);
    }
    const handleCSVFile = (e) => {
        setCustomSearch({...customSearch, csv_file:e.target.files[0]});
    }
    const handleSocial = (e) => {
        setSocialMediaSearch({...socialMediaSearch, text:e.target.value})
    }
    const handleSocialSubmit = (e) => {
        console.log(socialMediaSearch);
    }
    const handleType = (e) => {
        setSocialMediaType({...socialMediaType, type:e.target.value});
    }
    const handleURL = (e) => {
        setSocialMediaType({...socialMediaType, url:e.target.value});
    }
    const handleTypeSubmit = (e) => {
        e.preventDefault();
        console.log(searchText);
        console.log(customSearch);
        console.log(socialMediaType);
    }
    const user = { name:'John Smith', 
    email:'Johnsmith087@hexagon.in',
    subscription:{ product:'Free Analystt',
                   price:'100 INR',
                   period:'Yearly',
                   status:'Active',
                   last_renewal:'01/02/2020',
                   expiry_date:'02/08/2021',
                   profile_credits:500, 
                   mail_credits:1000 }
 };

 useEffect(async() => {
    const script = document.createElement('script');
    script.src = "assets/js/app.js";
    script.async = true;
    const apiServer = '';
    const apiUrl = '';
    try{
    const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: '',
        },
      });
      if (response.ok) {
        const result = await response.json();
      }
    } catch (error) {
      console.error("Error while fetching data", error);
    }
    
    document.body.appendChild(script);
    return () => {
        document.body.removeChild(script);
    }
    }, []);

    return (
        <div>
            <header className="header-area">
                <nav className="header-navbar navbar navbar-expand-xl bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/repeatedUser"><img src="assets/images/header-brand-black.png" alt="title" /></a>

                        <ul className="navbar-nav-profile navbar-nav align-items-center ms-auto">
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="/"><img src="assets/images/menu-home.png" alt="home here" /><span className="text-danger">Home</span></a>
                            </li>
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="/savedList"><img src="assets/images/menu-saved-list.png" alt="saved here" />Saved Lists</a>
                            </li>
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="/history"><img src="assets/images/menu-history.png" alt="history here" />History</a>
                            </li>
                            <li className="nav-item me-md-4 me-3">
                                <li className="nav-item dropdown">
                                    <a className="credit-btn btn btn-outline-danger nav-link" href="#">4 Credits Left</a>
                                    <ul className="dropdown-menu">
                                        <li><p className="dropdown-item"><img src="assets/images/pro-codesandbox.png" alt="title" /> My Credits</p></li>
                                        <li>
                                            <div className="dropdown-progress">
                                                <p className="small">Profile credits used: {user.subscription.profile_credits} / 1000</p>
                                                <div className="progress mb-2">
                                                    <div className="progress-bar" style={{ width: "45%" }} role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="dropdown-progress">
                                                <p className="small"> Mail credits used: {user.subscription.mail_credits} / 2000</p>
                                                <div className="progress mb-2">
                                                    <div className="progress-bar" role="progressbar" style={{ width: "65%" }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                                <span className="small">Limit resets in 5 days</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li className="nav-item">
                                <li className="nav-item dropdown">
                                    <a className="profile-avata nav-link" data-bs-toggle="dropdown" href="#"><img src="assets/images/author-image.png" alt="search here" /></a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <div className="dropdown-credit">
                                                <span className="fw-bold">{user.subscription.profile_credits + user.subscription.mail_credits} credits <br /> pending</span>
                                                <img src="assets/images/credit-icon.png" alt="title" />
                                            </div>
                                        </li>
                                        <li><a className="dropdown-item active" href="#">Upgrade to Premium</a></li>
                                        <li><a className="dropdown-item" href="/pricing">Buy Credits</a></li>
                                        <li><a className="dropdown-item" href="/profile">Profile Settings</a></li>
                                        <li><a className="dropdown-item" href="/history">Export History</a></li>
                                        <li><a className="dropdown-item" href="/logIn"><span className="text-muted me-3">Logout</span> <img src="assets/images/logout-icon.png" alt="image" /></a></li>
                                    </ul>
                                </li>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div className="modal" id="bulkmodal">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div className="modal-dialog">
                    <div classNameName='modal-message'>
                        <p><i classNameName='text-danger'>Format to follow:</i> Ensure that the first column has the unique values you’re searching for. Download the sample below for better understanding. </p>
                        <Link><i classNameName='text-danger text-decoration-underline'>Click here to download csv format</i></Link>
                    </div>
                    <div className="modal-content">
                        <form action="/upload" id="mydrop" className="dropzone">
                            <div className="dz-message needsclick">
                                <button type="button" className="dz-button">Drag and Drop File</button><br />
                                <button type="button" className="dz-button">OR </button><br />
                                <span className="note needsclick"><input type="file" accept=".csv" onChange={handleCSVFile}/></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="main-content-area pb-6 pt-2">
                <div className="main-wrapper container-fluid">

                    <div className="row">
                        <div className="col-md-4 col-lg-3">
                            <div className="sidebar-search-for sidebar-widget p-4 my-3">
                                <h6 className="text-danger mb-3">Customize Your Search </h6>
                                <div className="sidebar-accordion accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#one">
                                                <img src="assets/images/accord-map-pin.png" alt="title" /> Location
                                            </button>
                                        </h2>
                                        <div id="one" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <input classNameName='customize-search' type="text" placeholder='Search Location' onBlur={handleLocation} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#two">
                                                <img src="assets/images/accord-coffee.png" alt="title" /> Industry
                                            </button>
                                        </h2>
                                        <div id="two" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <input classNameName='customize-search' type="text" placeholder='Search Industry' onBlur={handleIndustry}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tree">
                                                <img src="assets/images/accord-award.png" alt="title" /> Job Title
                                            </button>
                                        </h2>
                                        <div id="tree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <input classNameName='customize-search' type="text" placeholder='Search Job title' onBlur={handleJob}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#four">
                                                <img src="assets/images/accord-book.png" alt="title" /> Education
                                            </button>
                                        </h2>
                                        <div id="four" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <input classNameName='customize-search' type="text" placeholder='Search Education' onBlur={handleEducation} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#five">
                                                <img src="assets/images/accord-briefcase.png" alt="title" /> Company Name
                                            </button>
                                        </h2>
                                        <div id="five" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <input classNameName='customize-search' type="text" placeholder='Search Company Name' onBlur={handleCompany} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#six">
                                                <img src="assets/images/accord-key.png" alt="title" /> Keywords
                                            </button>
                                        </h2>
                                        <div id="six" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <input classNameName='customize-search' type="text" placeholder='Search Keywords' onBlur={handleKeywords}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button style={{ background: "#FB3E3E" }} onClick={handleCustomSubmit} className="btn text-white" type="submit"><span classNameName='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                <p>Bulk Search by uploding <a href="#" className="text-danger" onChange={handleCSVFile} data-bs-toggle="modal" data-bs-target="#bulkmodal">csv</a></p>
                            </div>
                            <div className="sidebar-search-for sidebar-widget p-4 my-3">
                                <h6 className="text-danger mb-3">  Now Extract Contacts </h6>
                                <p> of Followers, Likers, Commentors & Group Members & Job Seekers From Social Media</p>
                                <ul className="sidebar-social mt-3 mb-4 list-inline">
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-facebook.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-instagram.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-twitter.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-linkedin.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-youtube.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-naukri-com.png" alt="title" /></a></li>
                                </ul>
                                <form>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Enter Social media URL" onBlur={handleURL} />
                                    </div>
                                    <div className="dropdown mb-3">
                                        <input className="form-control dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" placeholder='Search your job' />
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-wraper">
                                                <div className='radio-bg'>
                                                    <span>All</span>
                                                    <input type="checkbox" id='All' value="All" onChange={handleType} checked={socialMediaType.type.includes("All")}/>
                                                </div>
                                                <div className='radio-bg'>
                                                    <span>Follower</span>
                                                    <input type="checkbox" id='Follower' value="Follower" onChange={handleType} checked={socialMediaType.type.includes("Follower")} />
                                                </div>
                                                <div className='radio-bg'>
                                                    <span >Likers</span>
                                                    <input type="checkbox" id='Likers' value="Likers" onChange={handleType} checked={socialMediaType.type.includes("Likers")} />
                                                </div>
                                                <div className='radio-bg'>
                                                    <span>Commentors</span>
                                                    <input type="checkbox" id='Comentetors' value="Commentors" onChange={handleType} checked={socialMediaType.type.includes("Commentors")}/>
                                                </div>
                                                <div className='radio-bg'>
                                                    <span>Job Seeker</span>
                                                    <input type="checkbox" id='Job Seeker' value="Job Seeker"  onChange={handleType} checked={socialMediaType.type.includes("Job Seeker")}/>
                                                </div>
                                                <div className='radio-bg'>
                                                    <span>Group Members</span>
                                                    <input type="checkbox" id='Group Members' value="Group Members" onChange={handleType} checked={socialMediaType.type.includes("Group Members")}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button style={{ background: "#FB3E3E" }} onClick={handleTypeSubmit} className="btn text-white" type="submit"><span classNameName='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                    <p className="m-0"><a href="/userGuide" className="learn-link">Learn More</a></p>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="user-widget-box p-4 my-3">
                                <div className="user-search-wrapper">
                                    <img className="search-promote-image" src="assets/images/user-success-image.png" alt="title" />
                                    <div className="search-promote-content">
                                        <form action="#" className="search-form4 d-flex mb-3">
                                            <div className="input-group">
                                                <div className="input-placeholder">
                                                    <input className="ps-3" type="text" onBlur={handleHeadSearch}required />
                                                    <div className="placeholder">
                                                        Eg: I want the <span>email IDs</span> of people following the <span>Flipkart Facebook Page</span>
                                                    </div>
                                                </div>
                                                <button className="btn text-white" onClick={handleHeadSubmit} type="submit"><span classNameName='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                                {searchText.text ? <Redirect to="/searchResult"/> : null}
                                            </div>
                                        </form>
                                        <p className="fst-italic">Hey, Get started by putting a <span className="text-danger">name, social media URL</span> or <br /> state your requirement above</p>
                                        <a href="/userGuide" className="text-danger">Learn more</a>
                                    </div>

                                </div>
                            </div>

                            <div className="user-widget-box text-center p-4 my-3">
                                <div className="user-promote-logo"><img src="assets/images/user-company-brand.png" alt="title" /></div>
                                <div className="user-promote-slider">
                                    <div className="item">
                                        <div className="user-promote-item">
                                            <p className="">Want to extract contacts of group members in a LinkedIn group?</p>
                                            <div classNameName="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" className="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="user-promote-item">
                                            <p className="">Need a list of companies in semi-conductor space with 1000+ employees in US?</p>
                                            <div classNameName="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" className="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="user-promote-item">
                                            <p className="">Need a detailed list of all the people working for Flipkart?</p>
                                            <div classNameName="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" className="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="user-promote-item">
                                            <p className="">Want to extract contacts of group members in a LinkedIn group?</p>
                                            <div classNameName="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" className="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="user-promote-item">
                                            <p className="">Need a detailed list of all the people working for Flipkart?</p>

                                            <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" className="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="user-promote-item">
                                            <p className="">Want to extract contacts of group members in a LinkedIn group?</p>
                                            <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" className="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-widget-box p-4 my-3 text-center">
                                <h5 className="text-danger">Now Extract contacts
                                </h5>
                                <p className="text-dark mb-3">of Followers, Likers, Commentors & Group Members & Job Seekers From Social Media</p>
                                <ul className="user-widget-social mt-3 mb-4 list-inline">
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-facebook.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-instagram.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-twitter.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-linkedin.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-youtube.png" alt="title" /></a></li>
                                    <li className="list-inline-item"><a href="#"><img src="assets/images/social-naukri-com.png" alt="title" /></a></li>
                                </ul>
                                <form action="#" className="search-form-lg m-auto">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onBlur={handleSocial} placeholder="Paste Social Media URL" />
                                        <button className="btn btn-danger" type="submit"><img src="assets/images/social-search-past.png" alt="title" /></button>
                                    </div>
                                </form>

                                <div className="radio-form-check d-block my-3">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio1" />
                                        <label className="form-check-label" for="inlineRadio1">All</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio2" checked />
                                        <label className="form-check-label" for="inlineRadio2">Followers</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio3" checked />
                                        <label className="form-check-label" for="inlineRadio3">Likers</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio4" />
                                        <label className="form-check-label" for="inlineRadio4">Commentors</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio5" />
                                        <label className="form-check-label" for="inlineRadio5">Job Seekers</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio6" />
                                        <label className="form-check-label" for="inlineRadio6">Group Members</label>
                                    </div>
                                </div>


                                <button style={{ background: "#FB3E3E" }} onClick={handleSocialSubmit} className="btn text-white" type="submit"><span classNameName='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                <p className="m-0 mt-2"><a href="/userGuide" className="text-danger">Learn More  </a></p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FirstTimeUser;
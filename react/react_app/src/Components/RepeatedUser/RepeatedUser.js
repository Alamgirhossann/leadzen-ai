import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SavedList from '../SavedList/SavedList';
import History from '../History/History'

const RepeatedUser = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "assets/js/app.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);
    const [searchText, setSearchText] = useState({text : null});
    const [customSearch, setCustomSearch] = useState({location:null, industry:null, job_title:null, education:null, company_name:null, keywords:null,csv_file:null});
    const [socialMediaSearch, setSocialMediaSearch] = useState({text:null});
    const [socialMediaType, setSocialMediaType] = useState({url:null, type:null});
   
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
    const recommendations = [{name:'Robert Brown',role:'Product Manager',comp:'Flipkart'},
                             {name:'Lan Bey',role:'CEO',comp:'Amazon UK'},
                             {name:'John Smith',role:'Designer',comp:'Flipkart'},
                             {name:'Chirs Apple',role:'CFO',comp:'Apple INC'},
                             {name:'Stan Joseph',role:'Developer',comp:'Amazon IN'},
                             {name:'Stan Joseph',role:'Developer',comp:'Amazon IN'},];

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
const myLeads = [{name:'John Smith',desc:'English Speaker',comp:'Hexagon AB',search_date:'12/05/2021',mail_used:7,profile_used:5},
{name:'Joe Mama',desc:'English Speaker',comp:'Apple INC',search_date:'05/05/2021',mail_used:12,profile_used:9}];
const myTags = [{tags:['Tech','MBA','USA'],search_date:'05/05/2021',mail_used:15,profile_used:22}];
    return (
        <div>
            <header class="header-area">
                <nav class="header-navbar navbar navbar-expand-xl bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png" alt="title" /></a>

                        <ul class="navbar-nav-profile navbar-nav align-items-center ms-auto">
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="/"><img src="assets/images/menu-home.png" alt="home here" /><span class="text-danger">Home</span></a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-saved-list.png" alt="saved here" />Saved lists</a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-history.png" alt="history here" />History</a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <li class="nav-item dropdown">
                                    <a class="credit-btn btn btn-outline-danger nav-link" href="#">4 Credits Left</a>
                                    <ul class="dropdown-menu">
                                        <li><p class="dropdown-item"><img src="assets/images/pro-codesandbox.png" alt="title" /> My Credits</p></li>
                                        <li>
                                            <div class="dropdown-progress">
                                                <p class="small">Profile credits used: {user.subscription.profile_credits} / 1000</p>
                                                <div class="progress mb-2">
                                                    <div class="progress-bar" style={{ width: "45%" }} role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="dropdown-progress">
                                                <p class="small"> Mail credits used: {user.subscription.mail_credits} / 2000</p>
                                                <div class="progress mb-2">
                                                    <div class="progress-bar" role="progressbar" style={{ width: "65%" }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                                <span class="small">Limit resets in 5 days</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="nav-item">
                                <li class="nav-item dropdown">
                                    <a class="profile-avata nav-link" data-bs-toggle="dropdown" href="#"><img src="assets/images/author-image.png" alt="search here" /></a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <div class="dropdown-credit">
                                                <span class="fw-bold">{user.subscription.profile_credits + user.subscription.mail_credits} credits <br /> pending</span>
                                                <img src="assets/images/credit-icon.png" alt="title" />
                                            </div>
                                        </li>
                                        <li><a class="dropdown-item active" href="#">Upgrade to premium</a></li>
                                        <li><a class="dropdown-item" href="/pricing">Buy Credits</a></li>
                                        <li><a class="dropdown-item" href="/profile">Profile Settings</a></li>
                                        <li><a class="dropdown-item" href="history">Export History</a></li>
                                        <li><a class="dropdown-item" href="/logIn"><span class="text-muted me-3">Logout</span> <img src="assets/images/logout-icon.png" alt="image" /></a></li>
                                    </ul>
                                </li>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div class="modal" id="bulkmodal">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-dialog">
                    <div className='modal-message'>
                        <p><i className='text-danger'>Format to follow:</i> Ensure that the first column has the unique values you’re searching for. Download the sample below for better understanding. </p>
                        <Link><i className='text-danger text-decoration-underline'>Click here to download csv format</i></Link>
                    </div>
                    <div class="modal-content">
                        <form action="/upload" id="mydrop" class="dropzone">
                            <div class="dz-message needsclick">
                                <button type="button" class="dz-button">Drag and Drop File</button><br />
                                <button type="button" class="dz-button">OR </button><br />
                                <span class="note needsclick"><input type="file" accept=".csv" onChange={handleCSVFile}/></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="main-content-area pb-6 pt-2">
                <div class="main-wrapper container-fluid">

                    <div class="row">
                        <div class="col-md-4 col-lg-3">
                            <div class="sidebar-search-for sidebar-widget p-4 my-3">
                                <h6 class="text-danger mb-3">Customize your search </h6>
                                <div class="sidebar-accordion accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#one">
                                                <img src="assets/images/accord-map-pin.png" alt="title" /> Location
                                            </button>
                                        </h2>
                                        <div id="one" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <input className='customize-search' onBlur={handleLocation} type="text" placeholder='Search Location' />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#two">
                                                <img src="assets/images/accord-coffee.png" alt="title" /> Industry
                                            </button>
                                        </h2>
                                        <div id="two" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <input className='customize-search' onBlur={handleIndustry} type="text" placeholder='Search Industry' />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tree">
                                                <img src="assets/images/accord-award.png" alt="title" /> Job title
                                            </button>
                                        </h2>
                                        <div id="tree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <input className='customize-search' onBlur={handleJob} type="text" placeholder='Search Job title' />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#four">
                                                <img src="assets/images/accord-book.png" alt="title" /> Education
                                            </button>
                                        </h2>
                                        <div id="four" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <input className='customize-search' onBlur={handleEducation} type="text" placeholder='Search Education' />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#five">
                                                <img src="assets/images/accord-briefcase.png" alt="title" /> Company Name
                                            </button>
                                        </h2>
                                        <div id="five" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <input className='customize-search' onBlur={handleCompany} type="text" placeholder='Search Company Name' />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#six">
                                                <img src="assets/images/accord-key.png" alt="title" /> Keywords
                                            </button>
                                        </h2>
                                        <div id="six" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <input className='customize-search' onBlur={handleKeywords} type="text" placeholder='Search Keywords' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button style={{ background: "#FB3E3E" }} class="btn text-white" onClick={handleCustomSubmit} type="submit"><span className='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                <p>Bulk Search by uploding <a href="#" class="text-danger" onChange={handleCSVFile} data-bs-toggle="modal" data-bs-target="#bulkmodal">csv</a></p>
                            </div>
                            <div class="sidebar-search-for sidebar-widget p-4 my-3">
                                <h6 class="text-danger mb-3">  Now Extract contacts </h6>
                                <p> of Followers, Likers, Commentors & Group Members & Job Seekers From Social Media</p>
                                <ul class="sidebar-social mt-3 mb-4 list-inline">
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-facebook.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-instagram.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-twitter.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-linkedin.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-youtube.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-naukri-com.png" alt="title" /></a></li>
                                </ul>
                                <form>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" onBlur={handleURL} placeholder="Enter Social media URL" />
                                    </div>
                                    <div class="dropdown mb-3">
                                        <input class="form-control dropdown-toggle" onChange={handleType} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" placeholder='Search your job' />
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-wraper">
                                                <div className='radio-bg'>
                                                    <span>All</span>
                                                    <input type="radio" id='All' />
                                                </div>
                                                <div className='radio-bg'>
                                                    <span>Follower</span>
                                                    <input type="radio" id='Follower' />
                                                </div>
                                                <div className='radio-bg'>
                                                    <span >Likers</span>
                                                    <input type="radio" id='Likers' />
                                                </div>
                                                <div className='radio-bg'>
                                                    <span>Comentetors</span>
                                                    <input type="radio" id='Comentetors' />
                                                </div>
                                                <div className='radio-bg'>
                                                    <span>Job Seaker</span>
                                                    <input type="radio" id='Job Seaker' />
                                                </div>
                                                <div className='radio-bg'>
                                                    <span>Group Members</span>
                                                    <input type="radio" id='Group Members' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button style={{ background: "#FB3E3E" }} onClick={handleTypeSubmit} class="btn text-white" type="submit"><span className='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                    <p class="m-0"><a href="/userGuide" class="learn-link">Learn More</a></p>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-9">
                            <div class="user-widget-box p-4 my-3">
                                <div class="user-search-wrapper">
                                    <img class="search-promote-image" src="assets/images/user-success-image.png" alt="title" />
                                    <div class="search-promote-content">
                                        <form action="#" class="search-form4 d-flex mb-3">
                                            <div class="input-group">
                                                <div class="input-placeholder">
                                                    <input class="ps-3" type="text" onBlur={handleHeadSearch} required />
                                                    <div class="placeholder">
                                                        Eg: I want to <span>email IDs</span> of people following <span>Flipkart Facebook Page</span>
                                                    </div>
                                                </div>
                                                <button onClick={handleHeadSubmit} class="btn text-white" type="submit"><span className='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                            </div>
                                        </form>
                                        <p class="fst-italic">Hey, Get started by putting a <span class="text-danger">name, social media URL</span> or <br /> state your requirement above</p>
                                        <a href="/userGuide" class="text-danger">Learn more</a>
                                    </div>

                                </div>
                            </div>

                            <div style={{ background: "white", borderRadius: "20px" }}>
                                <History />
                            </div>

                            <div class="user-widget-box text-center p-4 my-3">
                                <h6 class="user-magic-title"> <img src="assets/images/start-user-magic.png" alt="title" /> Magic
                                    Recommendations</h6>
                                <p class="text-muted mb-3"> Hey, Based on your latest search intrest, these are best magic recommendation
                                    for you !! <span class="text-danger">~Jarvis</span></p>
                                <div class="px-5 pxlg-7 mb-3 row">
                                    {recommendations.map(data => (
                                    <div class="col-6 col-sm-4 col-lg-3 col-xl-2">
                                        <div class="user-author-item my-2">
                                            <img src="assets/images/user-athor-pic.png" alt="title" />
                                            <h6 class="small m-0">{data.name}</h6>
                                            <small>{data.role}</small><br></br>
                                            <small>{data.comp}</small>
                                        </div>
                                    </div>
                                    ))}
                                    </div>
                                <img src="assets/images/user-robot-icon.png" alt="#" class="user-author-shape" />
                                <a href="/history" class="text-danger">View List</a>
                            </div>

                            <div class="user-widget-box text-center p-4 my-3">
                                <div class="user-promote-logo"><img src="assets/images/user-company-brand.png" alt="title" /></div>
                                <div class="user-promote-slider">
                                    <div class="item">
                                        <div class="user-promote-item">
                                            <p class="">Want to extract contacts of group members in a LinkedIn group?</p>
                                            <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" class="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="user-promote-item">
                                            <p class="">Need a list of companies in semi-conductor space with 1000+ employees in US?</p>
                                            <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" class="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="user-promote-item">
                                            <p class="">Need a detailed list of all the people working for Flipkart?</p>
                                            <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" class="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="user-promote-item">
                                            <p class="">Want to extract contacts of group members in a LinkedIn group?</p>
                                            <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" class="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="user-promote-item">
                                            <p class="">Need a detailed list of all the people working for Flipkart?</p>

                                            <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" class="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="user-promote-item">
                                            <p class="">Want to extract contacts of group members in a LinkedIn group?</p>
                                            <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                <a href="/searchResult" class="small m-0">Try This</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="user-widget-box p-4 my-3 text-center">
                                <h5 class="text-danger">Now Extract contacts
                                </h5>
                                <p class="text-dark mb-3">of Followers, Likers, Commentors & Group Members & Job Seekers From Social Media</p>
                                <ul class="user-widget-social mt-3 mb-4 list-inline">
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-facebook.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-instagram.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-twitter.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-linkedin.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-youtube.png" alt="title" /></a></li>
                                    <li class="list-inline-item"><a href="#"><img src="assets/images/social-naukri-com.png" alt="title" /></a></li>
                                </ul>
                                <form action="#" class="search-form-lg m-auto">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Paste Social Media URL" />
                                        <button class="btn btn-danger" type="submit"><img src="assets/images/social-search-past.png" alt="title" /></button>
                                    </div>
                                </form>

                                <div class="radio-form-check d-block my-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio1" />
                                        <label class="form-check-label" for="inlineRadio1">All</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio2" checked />
                                        <label class="form-check-label" for="inlineRadio2">Followers</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio3" checked />
                                        <label class="form-check-label" for="inlineRadio3">Likers</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio4" />
                                        <label class="form-check-label" for="inlineRadio4">Commentors</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio5" />
                                        <label class="form-check-label" for="inlineRadio5">Job Seekers</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio6" />
                                        <label class="form-check-label" for="inlineRadio6">Group Members</label>
                                    </div>
                                </div>


                                <button style={{ background: "#FB3E3E" }} class="btn text-white" type="submit"><span className='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                <p class="m-0 mt-2"><a href="#" class="text-danger">Learn More  </a></p>
                            </div>
                            <div style={{ background: "white", borderRadius: "20px" }}>
                                <SavedList />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RepeatedUser;
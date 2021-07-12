import React, { useEffect } from 'react';
import './SearchResult.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchResult = () => {
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
            <header class="header-area">
                <nav class="header-navbar navbar navbar-expand-xl bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png" alt="title" /></a>

                        <ul class="navbar-nav-profile navbar-nav align-items-center ms-auto">
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-home.png" alt="home here" /><span class="text-danger">Home</span></a>
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
                                                <p class="small">Profile credits used: 300 / 1000</p>
                                                <div class="progress mb-2">
                                                    <div class="progress-bar" style={{ width: "45%" }} role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="dropdown-progress">
                                                <p class="small"> Mail credits used: 1200 / 2000</p>
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
                                                <span class="fw-bold">2500 credits <br /> pending</span>
                                                <img src="assets/images/credit-icon.png" alt="title" />
                                            </div>
                                        </li>
                                        <li><a class="dropdown-item active" href="#">Upgrade to premium</a></li>
                                        <li><a class="dropdown-item" href="#">Buy Credits</a></li>
                                        <li><a class="dropdown-item" href="#">Profile Settings</a></li>
                                        <li><a class="dropdown-item" href="#">Export History</a></li>
                                        <li><a class="dropdown-item" href="#"><span class="text-muted me-3">Logout</span> <img src="assets/images/logout-icon.png" alt="image" /></a></li>
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
                                <span class="note needsclick">Browse</span>
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
                                                <input className='customize-search' type="text" placeholder='Search Location' />
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
                                                <input className='customize-search' type="text" placeholder='Search Industry' />
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
                                                <input className='customize-search' type="text" placeholder='Search Job title' />
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
                                                <input className='customize-search' type="text" placeholder='Search Education' />
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
                                                <input className='customize-search' type="text" placeholder='Search Company Name' />
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
                                                <input className='customize-search' type="text" placeholder='Search Keywords' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button style={{ background: "#FB3E3E" }} class="btn text-white" type="submit"><span className='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                <p>Bulk Search by uploding <a href="#" class="text-danger" data-bs-toggle="modal" data-bs-target="#bulkmodal">csv</a></p>
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
                                        <input type="text" class="form-control" placeholder="Enter Social media URL" />
                                    </div>
                                    <div class="mb-3">
                                        <select name="states" id="jobs-select" class="form-control">
                                            <option value="O1">All</option>
                                            <option value="O2">Followers</option>
                                            <option value="O3">Likers</option>
                                            <option value="O4">Commentors </option>
                                            <option value="O5">Job seekers</option>
                                            <option value="O6">Group Members</option>
                                        </select>
                                    </div>
                                    <button style={{ background: "#FB3E3E" }} class="btn text-white" type="submit"><span className='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                    <p class="m-0"><a href="#" class="learn-link">Learn More</a></p>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-9">
                            <div class="user-search-wrapper">
                                <div className="detailed-search">
                                    <div class="search-promote-content">
                                        <form class="form-inline d-flex my-2 my-lg-0">
                                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button class="btn text-white d-flex ms-3" style={{ background: "#FB3E3E" }} type="submit"><span className='pe-1'><FontAwesomeIcon icon={faSearch} /></span> Search</button>
                                        </form>
                                    </div>
                                    <div>
                                        <small>Last Updated: 21 May 2021</small>
                                    </div>
                                </div>
                            </div>
                            <div class="user-widget-box  my-3">
                                <div className="d-flex align-items-center justify-content-between py-3">
                                    <div className='d-flex align-items-center '>
                                        {/* <label htmlFor="checkbox"></label> */}
                                        <input className='ms-3 me-3' type="checkbox" id='checkbox' />
                                        <small className=''><b>6</b> of <b>218</b> Searched profiles</small>
                                    </div>
                                    <div className='d-flex'>
                                        <small className='unlock-btn'>Unlock Profile <img className='ps-3' src="assets/images/Group 1617.png" alt="" /></small>
                                        <small className='unlock-btn'>Unlock Mails <img className='ps-3' src="assets/images/Group 1617.png" alt="" /></small>
                                        <small className='export-btn'>Export <img className='ps-3' src="assets/images/export.png" alt="" /></small>
                                    </div>
                                </div>
                            </div>

                            <div class="user-widget-box  my-3">
                                <div className='search-container mb-2'>
                                    <div className="user-container py-2">
                                        <input className='box ms-3 me-3' type="checkbox" id='checkbox' />
                                        <p className='search-author text-danger'><img src="assets/images/author-image.png" alt="" /></p>
                                        <div className='search-user'>
                                            <p>John Smith</p>
                                            <small className='d-block'>Works at Hexagon AB</small>
                                            <small className='d-block'>6720 Ulster Court, Alpharetta, Georgia</small>
                                        </div>
                                        <div className='search-email text-center'>
                                            <small className='d-block'>alamgirhossann</small>
                                            <small className='d-block text-danger'>Unlock</small>
                                        </div>
                                        <p className='search-view-btn '><a href="" className='button'>View Profile</a></p>
                                        <p className='search-close-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                                    </div>
                                </div>
                                <div className='search-container mb-2'>
                                    <div className="user-container py-2">
                                        <input className='box ms-3 me-3' type="checkbox" id='checkbox' />
                                        <p className='search-author text-danger'><img src="assets/images/Group 1862.png" alt="" /></p>
                                        <div className='search-user'>
                                            <p>John Smith</p>
                                            <small className='d-block'>Works at Hexagon AB</small>
                                            <small className='d-block'>6720 Ulster Court, Alpharetta, Georgia</small>
                                        </div>
                                        <div className='search-email text-center'>
                                            <small className='d-block'>alamgirhossann</small>
                                            <small className='d-block text-danger'>Unlock</small>
                                        </div>
                                        <p className='search-view-btn '><a href="" className='button'>View Profile</a></p>
                                        <p className='search-close-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                                    </div>
                                </div>
                                <div className='search-container mb-2'>
                                    <div className="user-container py-2">
                                        <input className='box ms-3 me-3' type="checkbox" id='checkbox' />
                                        <p className='search-author text-danger'><img src="assets/images/Group 1852.png" alt="" /></p>
                                        <div className='search-user'>
                                            <p>John Smith</p>
                                            <small className='d-block'>Works at Hexagon AB</small>
                                            <small className='d-block'>6720 Ulster Court, Alpharetta, Georgia</small>
                                        </div>
                                        <div className='search-email text-center'>
                                            <small className='d-block'>alamgirhossann</small>
                                            <small className='d-block text-danger'>Unlock</small>
                                        </div>
                                        <p className='search-view-btn '><a href="" className='button'>View Profile</a></p>
                                        <p className='search-close-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                                    </div>
                                </div>
                                <div className='search-container mb-2'>
                                    <div className="user-container py-2">
                                        <input className='box ms-3 me-3' type="checkbox" id='checkbox' />
                                        <p className='search-author text-danger'><img src="assets/images/Group 1852.png" alt="" /></p>
                                        <div className='search-user'>
                                            <p>John Smith</p>
                                            <small className='d-block'>Works at Hexagon AB</small>
                                            <small className='d-block'>6720 Ulster Court, Alpharetta, Georgia</small>
                                        </div>
                                        <div className='search-email text-center'>
                                            <small className='d-block'>alamgirhossann</small>
                                            <small className='d-block text-danger'>Unlock</small>
                                        </div>
                                        <p className='search-view-btn '><a href="" className='button'>View Profile</a></p>
                                        <p className='search-close-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                                    </div>
                                </div>
                                <div className='search-container mb-2'>
                                    <div className="user-container py-2">
                                        <input className='box ms-3 me-3' type="checkbox" id='checkbox' />
                                        <p className='search-author text-danger'><img src="assets/images/Group 1862.png" alt="" /></p>
                                        <div className='search-user'>
                                            <p>John Smith</p>
                                            <small className='d-block'>Works at Hexagon AB</small>
                                            <small className='d-block'>6720 Ulster Court, Alpharetta, Georgia</small>
                                        </div>
                                        <div className='search-email text-center'>
                                            <small className='d-block'>alamgirhossann</small>
                                            <small className='d-block text-danger'>Unlock</small>
                                        </div>
                                        <p className='search-view-btn '><a href="" className='button'>View Profile</a></p>
                                        <p className='search-close-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                                    </div>
                                </div>
                                <div className='search-container mb-2'>
                                    <div className="user-container py-2">
                                        <input className='box ms-3 me-3' type="checkbox" id='checkbox' />
                                        <p className='search-author text-danger'><img src="assets/images/author-image.png" alt="" /></p>
                                        <div className='search-user'>
                                            <p>John Smith</p>
                                            <small className='d-block'>Works at Hexagon AB</small>
                                            <small className='d-block'>6720 Ulster Court, Alpharetta, Georgia</small>
                                        </div>
                                        <div className='search-email text-center'>
                                            <small className='d-block'>alamgirhossann</small>
                                            <small className='d-block text-danger'>Unlock</small>
                                        </div>
                                        <p className='search-view-btn '><a href="" className='button'>View Profile</a></p>
                                        <p className='search-close-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div style={{ borderRadius: "50%", background: "#FB3E3E", height: "30px", width: "30px" }}><p className=' d-flex text-white justify-content-center align-items-center'>1</p></div>
                                <p className='pe-4'>2</p>
                                <p className='pe-4'>3</p>
                                <p className='pe-4'>4</p>
                                <p className='pe-4'>5</p>
                                <p className='pe-4'>Next</p>
                            </div>

                            <div class="user-widget-box p-4 my-3">
                                <div class="d-flex justify-content-center"><img src="assets/images/user-company-brand.png" alt="title" /></div>
                                <div className='ask-jarv'>
                                    <div class="related-slider">
                                        <div class="item">
                                            <div class="user-promote-item">
                                                <p class="">Want to extract contacts of group members in a LinkedIn group?</p>
                                                <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                    <a href="#" class="small m-0">Try This</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="user-promote-item">
                                                <p class="">Need a list of companies in semi-conductor space with 1000+ employees in US?</p>
                                                <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                    <a href="#" class="small m-0">Try This</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="user-promote-item">
                                                <p class="">Need a detailed list of all the people working for Flipkart?</p>
                                                <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                    <a href="#" class="small m-0">Try This</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="user-promote-item">
                                                <p class="">Want to extract contacts of group members in a LinkedIn group?</p>
                                                <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                    <a href="#" class="small m-0">Try This</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="user-promote-item">
                                                <p class="">Need a detailed list of all the people working for Flipkart?</p>

                                                <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                    <a href="#" class="small m-0">Try This</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="user-promote-item">
                                                <p class="">Want to extract contacts of group members in a LinkedIn group?</p>
                                                <div className="px-3 pb-4" style={{ position: "absolute", bottom: "5px", content: "", }} >
                                                    <a href="#" class="small m-0">Try This</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='jarv'>
                                        <img src="assets/images/sign-up-robman.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchResult;
import React from 'react';

const Pricing = () => {
    return (
        <div>
            <header class="header-area">
                <nav class="header-navbar navbar navbar-expand-xl bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png"
                            alt="title" /></a>
                        <ul class="navbar-nav-profile navbar-nav align-items-center ms-auto">
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-home.png"
                                    alt="home here" /><span class="text-danger">Home</span></a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-saved-list.png"
                                    alt="saved here" />Saved lists</a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-history.png"
                                    alt="history here" />History</a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <li class="nav-item dropdown">
                                    <a class="credit-btn btn btn-outline-danger nav-link" href="#">5 Credits Left</a>
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
                                    <a class="profile-avata nav-link" data-bs-toggle="dropdown" href="#"><img
                                        src="assets/images/author-image.png" alt="search here" /></a>
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
                                        <li><a class="dropdown-item" href="#"><span class="text-muted me-3">Logout</span> <img
                                            src="assets/images/logout-icon.png" alt="image" /></a></li>
                                    </ul>
                                </li>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div class="text-center px-4 py-3 my-0 container" >
                <div class="user-lead-top mb-3 user-widget-box">
                    <h5 class="m-3"><img src="assets/images/back-union.png" alt="" /> Subscription</h5>
                </div>
                <div class="accordion-header user-widget-box">
                    <div className="pt-2 pb-1 px-4 text-center">
                        <p>Make your next client the best customer you've ever had. <br />
                            <span className='text-danger fw-bold'>Get started with your most intelligent analystt</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-3 mt-1">
                        <div class="card card-height">
                            <div class='card-body'>
                                <h5 class="text-danger">Free Analyst</h5>
                                <p className='fw-bold'>INR 0</p>
                                <p class="text-center text-bg">55 leads</p>
                                <p>5 Full Profile</p>
                                <p>50 Email IDs</p>
                            </div>
                            <div className="px-3 pb-3" >
                                <button type="submit" class="btn text-white buy-btn w-100">Buy Plan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-1">
                        <div class="card card-height">
                            <div class="card-body">
                                <h5 class="card-title text-danger">Free Analyst</h5>
                                <p className='fw-bold'>INR 4,999/mo</p>
                                <p class="text-center text-bg">540 leads/month</p>
                                <p>140 Full Profile</p>
                                <p>400 Email IDs</p>
                            </div>
                            <div className="px-3 pb-3" >
                                <button type="submit" class="btn text-white buy-btn w-100">Buy Plan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-1">
                        <div class="card card-height">
                            <div class="card-body">
                                <h5 class="card-title text-danger">Free Analyst</h5>
                                <p className='fw-bold'>INR 9,999/mo</p>
                                <p class="text-center text-bg">1000 leads/month</p>
                                <p>300 Full Profile</p>
                                <p>1000 Email IDs</p>
                                <p>Access to training bot</p>
                                <p>Deep analytics</p>
                            </div>
                            <div className="px-3 pb-3" >
                                <button type="submit" class="btn text-white buy-btn w-100">Buy Plan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-1">
                        <div class="card card-height">
                            <div class="card-body">
                                <h5 class="card-title text-danger">Free Analyst</h5>
                                <p className='fw-bold'>INR 14,999/mo</p>
                                <p class="text-center text-bg">1000 leads/month</p>
                                <p>450 Full Profile</p>
                                <p>2000 Email IDs</p>
                                <p>Access to training bot</p>
                                <p>Deep analytics</p>
                            </div>
                            <div className="px-3 pb-3" >
                                <button type="submit" class="btn text-white buy-btn w-100">Buy Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end ">
                <img className='jarv-robot' src="assets/images/user-robot-icon.png" alt="" />
            </div>
        </div>
    );
};

export default Pricing;
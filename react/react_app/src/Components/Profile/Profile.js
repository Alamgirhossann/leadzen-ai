import React from 'react';

const Profile = () => {
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
                                        <li><a href="#" class="dropdown-item"><img src="assets/images/pro-profile.png" alt="title" /> Profile</a></li>
                                        <li><a href="#" class="dropdown-item"><img src="assets/images/pro-ookmark.png" alt="title" /> My Leads</a></li>
                                        <li><a href="#" class="dropdown-item"><img src="assets/images/pro-shield-done.png" alt="title" /> Subscription</a></li>
                                        <li><a href="#" class="dropdown-item"><img src="assets/images/pro-send.png" alt="title" /> Search History</a></li>
                                        <li><a href="#" class="dropdown-item"><img src="assets/images/pro-logut.png" alt="title" /> Log Out</a></li>
                                    </ul>
                                </li>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div class="main-content-area pt-4">
                <div class="main-wrapper">
                    <div class="container-fluid">
                        <div class="bg-light rounded-3 py-3 px-4 mb-4">
                            <h3 class="m-0"><a href="#" class="text-primary"><span class="me-1"><img src="assets/images/back-union.png" alt="title" /></span> Profile</a></h3>
                        </div>
                        <div class="bg-light rounded-3 p-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div class="main-profile mb-4">
                                        <img src="assets/images/author-image5.png" alt="title" />
                                        <div class="ms-4 ms-md-5">
                                            <h6>John Smith</h6>
                                            <span class="word-wrap">Johnsmith087@hexagon.in</span>
                                            <button type="submit" class="btn btn-sign-out mt-3 d-block py-1 px-3">Sign Out</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div class="mb-1 d-block d-md-flex justify-content-end mt-3">
                                        <button type="submit" class="btn btn-renew py-1 px-3">Renew Plan</button>
                                    </div>
                                </div>
                            </div>


                            <div class="table-responsive pb-4">
                                <div className='container-bg p-2'>
                                    <table class="table table-product">
                                        <thead>
                                            <tr>
                                                <th class="fw-bold fs-5">Subscription</th>
                                                <th class="text-white">this is not showing</th>
                                                <th class="text-end"><span class="text-muted">Date of last renewal: </span>01/02/2020</th>
                                                <th class="text-center"> <span class="text-muted">Plan till date:</span>29/01/2021</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center"><p>Product</p> <span class="text-color">Free Analystt</span></td>
                                                <td class="text-center"><p>Price</p> <span class="text-color">INR 0.00</span></td>
                                                <td class="text-center"><p>Period</p> <span class="text-color">Monthly</span></td>
                                                <td class="text-center"><p>Status</p> <span class="text-active">Active</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end ">
                    <img className='jarv-robot' src="assets/images/user-robot-icon.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
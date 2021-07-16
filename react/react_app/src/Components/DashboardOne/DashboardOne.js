import React from 'react';
import './DashboardOne.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DashboardOne = () => {
    return (
        <div>
            <header class="header-area">
                <nav class="header-navbar navbar navbar-expand-xl bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png"
                            alt="title" /></a>
                        <ul class="navbar-nav-profile navbar-nav align-items-center ms-auto">
                            <li class="nav-item me-md-4 me-3">
                                <a class="profile-avata nav-link" href="#"><img
                                    src="assets/images/author-image.png" alt="search here" /></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="main-content-area overflow-hidden">
                <div className="main-wrapper">
                    <div className="container-fluid">
                        <div className="admin-head">
                            <h4 className='m-0'>Admin Dashboard</h4>
                        </div>
                        <div className="row">
                            <div className='col-md-3'>
                                <div className="user-all">
                                    <button class="btn bg-danger text-white">User</button>
                                    <button class="btn">All</button>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <form class="my-2 my-lg-0 user-all">
                                    <input class="input-control mr-sm-2" type="search" placeholder="Enter Email Id" aria-label="Search" />
                                    <button class="btn bg-danger text-white" type="submit"><span className='pe-1'></span> Search User</button>
                                </form>
                            </div>
                        </div>
                        <div className="admin-user-wraper">
                            <div className='admin-container mb-2'>
                                <div className="admin-user-container py-2">
                                    <p className='admin-author text-danger'><img src="assets/images/author-image.png" alt="" /></p>
                                    <div className='admin-user text-center'>
                                        <small>John Smith</small>
                                        <small className='d-block text-decoration-underline'>Change Name</small>
                                    </div>
                                    <div className='admin-email text-center'>
                                        <small className='d-block'>alamgirhossann</small>
                                        <small className='d-block text-decoration-underline'>Change Email</small>
                                    </div>
                                    <div className='admin-pass text-center'>
                                        <small className='d-block'>JohnJohn123</small>
                                        <small className='d-block text-decoration-underline'>Change Password</small>
                                    </div>
                                    <p className='admin-delete-btn'><a href="">Delete Account</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-7">
                                <div className="common-div-wraper">
                                    <h6>Number of Results (Result Not Found)</h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <p className='text-center m-0 pt-2'>See all</p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="common-div-wraper">
                                    <h6>Queries for which result not found</h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <p className='text-center m-0 pt-2'>See all</p>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="common-div-wraper">
                                    <h6>Search History</h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <p className='text-center m-0 pt-2'>See all</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="common-div-wraper">
                                    <h6>Saved Leads</h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <p className='text-center m-0 pt-2'>See all</p>
                                </div>
                            </div>
                        </div>
                        <div className="user-stats">
                            <p className='text-danger text-center m-0 fw-bold'>User Stats</p>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="common-div-wraper">
                                    <h6>Queries Searched</h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <p className='text-center m-0 pt-2'>See all</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="common-div-wraper">
                                            <h6>Time Spent on each page</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="common-div-wraper">
                                            <h6>Frequency of User Visit</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="common-div-wraper">
                                    <h6>Total Profile Unlocked: <span className='text-danger'>100 Profiles</span></h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 1</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 2</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 3</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 4</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 5</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="common-div-wraper">
                                    <h6>Total Emails Unlocked: <span className='text-danger'>500 Emails</span></h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 1</p>
                                            <p className='m-0'><span className='text-danger'>XXX</span> Emails</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 2</p>
                                            <p className='m-0'><span className='text-danger'>XXX</span> Emails</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 3</p>
                                            <p className='m-0'><span className='text-danger'>XXX</span> Emails</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 4</p>
                                            <p className='m-0'><span className='text-danger'>XXX</span> Emails</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>User 5</p>
                                            <p className='m-0'><span className='text-danger'>XXX</span> Emails</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-5">
                                <div className="common-div-wraper">
                                    <h6>Number of Results (Result Not Found)</h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                        </div>
                                    </div>
                                    <p className='text-center m-0 pt-2'>See all</p>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="common-div-wraper">
                                    <h6>Queries for which result not found</h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <p className='text-center m-0 pt-2'>See all</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <div className="common-div-wraper">
                                    <h6>Recommendation Clicked</h6>
                                    <div className="d-flex justify-content-center">
                                        <div className='recomandation'>
                                            <div>
                                                <p className='text-danger fs-1'>490</p>
                                                <p>Recommendation <br /> Clicked</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="common-div-wraper">
                                    <h6>Queries for which result not found</h6>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <div className='common-div'>
                                        <div className="d-flex justify-content-between px-3 py-1">
                                            <p className='m-0'>Lorem</p>
                                            <p className='m-0'><img src="assets/images/Union (1).png" alt="" /></p>
                                        </div>
                                    </div>
                                    <p className='text-center m-0 pt-2'>See all</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="common-div-wraper">
                                    <h6>Time Spent on each page</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    );
};

export default DashboardOne;
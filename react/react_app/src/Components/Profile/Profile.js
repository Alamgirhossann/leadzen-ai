import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from "js-cookie";

const Profile = () => {
    const fetchData = async() => {
        // TODO:Create api calls to get user profile data from the backend
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
    return (
        <div>
            <header className="header-area">
                <nav className="header-navbar navbar navbar-expand-xl bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png" alt="title" /></a>

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
                                        <li><a href="/profile" className="dropdown-item"><img src="assets/images/pro-profile.png" alt="title" /> Profile</a></li>
                                        <li><a href="/savedList" className="dropdown-item"><img src="assets/images/pro-ookmark.png" alt="title" /> My Leads</a></li>
                                        <li><a href="/pricing" className="dropdown-item"><img src="assets/images/pro-shield-done.png" alt="title" /> Subscription</a></li>
                                        <li><a href="/history" className="dropdown-item"><img src="assets/images/pro-send.png" alt="title" /> Search History</a></li>
                                        <li><a href="/logIn" className="dropdown-item"><img src="assets/images/pro-logut.png" alt="title" /> Log Out</a></li>
                                    </ul>
                                </li>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div className="main-content-area pt-4">
                <div className="main-wrapper">
                    <div className="container-fluid">
                        <div className="bg-light rounded-3 py-3 px-4 mb-4">
                            <h3 className="m-0"><a href="#" className="text-primary"><span className="me-1"><img src="assets/images/back-union.png" alt="title" /></span> Profile</a></h3>
                        </div>
                        <div className="bg-light rounded-3 p-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="main-profile mb-4">
                                        <img src="assets/images/author-image5.png" alt="title" />
                                        <div className="ms-4 ms-md-5">
                                            <h6>{user.name}</h6>
                                            <span className="word-wrap">{user.email}</span>
                                            <a href="/logIn"><button type="submit" className="btn btn-sign-out mt-3 d-block py-1 px-3">Sign Out</button></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-1 d-block d-md-flex justify-content-end mt-3">
                                        <a href="/pricing"><button type="submit" className="btn btn-renew py-1 px-3">Renew Plan</button></a>
                                    </div>
                                </div>
                            </div>


                            <div className="table-responsive pb-4">
                                <div className='container-bg p-2'>
                                    <table className="table table-product">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold fs-5">Subscription Details</th>
                                                <th className="text-white">this is not showing</th>
                                                <th className="text-end"><span className="text-muted">Date of Last Renewal: </span>&nbsp;{user.subscription.last_renewal}</th>
                                                <th className="text-center"> <span className="text-muted">Plan Expiry Date:</span>&nbsp;{user.subscription.expiry_date}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center"><p>Product</p> <span className="text-color">{user.subscription.product}</span></td>
                                                <td className="text-center"><p>Price</p> <span className="text-color">{user.subscription.price}</span></td>
                                                <td className="text-center"><p>Period</p> <span className="text-color">{user.subscription.period}</span></td>
                                                <td className="text-center"><p>Status</p> <span className="text-active">{user.subscription.status}</span></td>
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
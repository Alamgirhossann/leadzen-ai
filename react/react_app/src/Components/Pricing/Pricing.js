import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from "js-cookie";

const Pricing = () => {

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
    const [plan, setPlan] = useState();
    const freeSelect = (e) => {
        setPlan('freeAnalystt');
    }
    const soloSelect = (e) => {
        setPlan('soloJarvis');
    }
    const teamSelect = (e) => {
        setPlan('teamJarvis');
    }
    const starkSelect = (e) => {
        setPlan('tonyStark');
    }
    return (
        <div>
            <header className="header-area">
                <nav className="header-navbar navbar navbar-expand-xl bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/repeatedUser"><img src="assets/images/header-brand-black.png"
                            alt="title" /></a>
                        <ul className="navbar-nav-profile navbar-nav align-items-center ms-auto">
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="/"><img src="assets/images/menu-home.png"
                                    alt="home here" /><span className="text-danger">Home</span></a>
                            </li>
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="/savedList"><img src="assets/images/menu-saved-list.png"
                                    alt="saved here" />Saved lists</a>
                            </li>
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="/histtory"><img src="assets/images/menu-history.png"
                                    alt="history here" />History</a>
                            </li>
                            <li className="nav-item me-md-4 me-3">
                                <li className="nav-item dropdown">
                                    <a className="credit-btn btn btn-outline-danger nav-link" href="#">5 Credits Left</a>
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
                                    <a className="profile-avata nav-link" data-bs-toggle="dropdown" href="#"><img
                                        src="assets/images/author-image.png" alt="search here" /></a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <div className="dropdown-credit">
                                                <span className="fw-bold">{user.subscription.mail_credits + user.subscription.profile_credits} credits <br /> pending</span>
                                                <img src="assets/images/credit-icon.png" alt="title" />
                                            </div>
                                        </li>
                                        <li><a className="dropdown-item active" href="#">Upgrade to premium</a></li>
                                        <li><a className="dropdown-item" href="/pricing">Buy Credits</a></li>
                                        <li><a className="dropdown-item" href="/profile">Profile Settings</a></li>
                                        <li><a className="dropdown-item" href="/histtory">Export History</a></li>
                                        <li><a className="dropdown-item" href="logIn"><span className="text-muted me-3">Logout</span> <img
                                            src="assets/images/logout-icon.png" alt="image" /></a></li>
                                    </ul>
                                </li>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div className="text-center px-4 py-3 my-0 container" >
                <div className="user-lead-top mb-3 user-widget-box">
                    <h5 className="m-3"><img src="assets/images/back-union.png" alt="" /> Subscription</h5>
                </div>
                <div className="accordion-header user-widget-box">
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
                        <div className="card card-height">
                            <div className='card-body'>
                                <h5 className="text-danger">Free Analystt</h5>
                                <p className='fw-bold'>INR 0</p>
                                <p className="text-center text-bg">55 leads</p>
                                <p>5 Full Profile</p>
                                <p>50 Email IDs</p>
                            </div>
                            <div className="px-3 pb-3" >
                                <button type="submit" onClick={freeSelect} className="btn text-white buy-btn w-100">Buy Plan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-1">
                        <div className="card card-height">
                            <div className="card-body">
                                <h5 className="card-title text-danger">Solo Jarvis</h5>
                                <p className='fw-bold'>INR 4,999/mo</p>
                                <p className="text-center text-bg">540 leads/month</p>
                                <p>140 Full Profile</p>
                                <p>400 Email IDs</p>
                            </div>
                            <div className="px-3 pb-3" >
                                <button type="submit" onClick={soloSelect} className="btn text-white buy-btn w-100">Buy Plan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-1">
                        <div className="card card-height">
                            <div className="card-body">
                                <h5 className="card-title text-danger">Team of Jarvis</h5>
                                <p className='fw-bold'>INR 9,999/mo</p>
                                <p className="text-center text-bg">1000 leads/month</p>
                                <p>300 Full Profile</p>
                                <p>1000 Email IDs</p>
                                <p>Access to training bot</p>
                                <p>Deep analytics</p>
                            </div>
                            <div className="px-3 pb-3" >
                                <button type="submit" onClick={teamSelect} className="btn text-white buy-btn w-100">Buy Plan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mt-1">
                        <div className="card card-height">
                            <div className="card-body">
                                <h5 className="card-title text-danger">Tony Stark Mode</h5>
                                <p className='fw-bold'>INR 14,999/mo</p>
                                <p className="text-center text-bg">1000 leads/month</p>
                                <p>450 Full Profile</p>
                                <p>2000 Email IDs</p>
                                <p>Access to training bot</p>
                                <p>Deep analytics</p>
                            </div>
                            <div className="px-3 pb-3" >
                                <button type="submit" onClick={starkSelect} className="btn text-white buy-btn w-100">Buy Plan</button>
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
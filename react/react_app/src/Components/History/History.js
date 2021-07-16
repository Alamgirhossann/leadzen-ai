import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from "js-cookie";

const History = () => {

    const [searchText, setSearchText] = useState();
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
    var myLeads = [{name:'John Smith',desc:'English Speaker',comp:'Hexagon AB',search_date:'12/05/2021',mail_used:7,profile_used:5},
                   {name:'Joe Mama',desc:'English Speaker',comp:'Apple INC',search_date:'05/05/2021',mail_used:12,profile_used:9}];
    var myTags = [{tags:['Tech','MBA','USA'],search_date:'05/05/2021',mail_used:15,profile_used:22}];
    const handleDelete = (name) => {
    // TODO: Remove element from database if delete is pressed
    let index = myLeads.splice(myLeads.findIndex(myLeads=> myLeads.name === name),1);
    console.log(index + ' ' + name);
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchText);
    }
    return (
        <div>
            <header className="header-area">
                <nav className="header-navbar navbar navbar-expand-xl bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png"
                            alt="title" /></a>
                        <ul className="navbar-nav-profile navbar-nav align-items-center ms-auto">
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-home.png"
                                    alt="home here" /><span className="text-danger">Home</span></a>
                            </li>
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="/savedList"><img src="assets/images/menu-saved-list.png"
                                    alt="saved here" />Saved lists</a>
                            </li>
                            <li className="nav-item me-md-4 me-3">
                                <a className="nav-icon-menu nav-link" href="/history"><img src="assets/images/menu-history.png"
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
                                        <li><a className="dropdown-item" href="/history">Export History</a></li>
                                        <li><a className="dropdown-item" href="/logIn"><span className="text-muted me-3">Logout</span> <img
                                            src="assets/images/logout-icon.png" alt="image" /></a></li>
                                    </ul>
                                </li>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div className="text-center p-4 my-3 container">
                <div className="user-lead-top mb-2 head-btn-style">
                    <div className="d-flex align-items-center">
                        <h5 className="m-0"><img src="assets/images/back-union.png" alt="" /> History</h5>
                    </div>
                    <form action="#" className="search-form-sm">
                        <div className="input-group">
                            <input type="text" className="form-control" onBlur={handleSearch} placeholder="Search" />
                            <button className="btn btn-danger" onClick={handleSubmit} type="submit"><img src="assets/images/small-search-icon.png" alt="title" /></button>
                        </div>
                    </form>
                </div>
                
                <div className="accordion-body">
                    {myLeads.map( data => (
                    <div className='container-style mt-3'>
                        <div className="history-container">
                            <p className='Profile text-danger'>Profile:</p>
                            <p className='name'>{data.name}</p>
                            <div className='date'>
                               <div>
                                    <small className='d-block'>Search Date</small>
                                    <small className='d-block'>{data.search_date}</small>
                               </div>
                            </div>
                            <div className='credit'>
                                <div className='d-flex justify-content-end'>
                                    <p className='d-flex align-items-center me-2 text-danger'>Credits used:</p>
                                    <div align="right">
                                        <small className='d-block'>Profile: {data.profile_used}</small>
                                        <small className='d-block'>Mail: {data.mail_used}</small>
                                    </div>
                                </div>
                            </div>
                            <p className='view-btn' align="right"><a href="/detailedInfo" className='button'>View Profile</a></p>
                            <a href="/history" onClick={name => handleDelete(data.name)} ><p className='close-btn'><img src="assets/images/close-user.png" alt="" /></p></a>
                        </div>
                    </div>
                    ))}
                    {myTags.map(data => (
                    <div className='container-style mt-3'>
                        <div className="history-container">
                            <p className='Profile text-danger'>Tags:</p>
                            {data.tags.map(tag => (
                                <p>
                            <div className='name' key={tag}>
                                <p>{tag} &nbsp;</p>
                            </div>
                            </p>
                            ))}
                            <div className='date'>
                                <div>
                                    <small className='d-block'>Search Date</small>
                                    <small className='d-block'>{data.search_date}</small>
                                </div>
                            </div>
                            <div className='credit'>
                                <div className='d-flex justify-content-end'>
                                    <p className='d-flex align-items-center me-1 text-danger'>Credits used:</p>
                                    <div align="right">
                                        <small className='d-block'>Profile: {data.profile_used}</small>
                                        <small className='d-block'>Mail: {data.mail_used}</small>
                                    </div>
                                </div>
                            </div>
                            <p className='view-btn' align="right"><a href="/detailedInfo" className='button'>View Profile</a></p>
                            <p className='close-btn'><img src="assets/images/close-user.png" alt="" /></p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default History;
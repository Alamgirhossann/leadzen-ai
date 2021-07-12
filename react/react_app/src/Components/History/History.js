import React from 'react';

const History = () => {
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

            <div class="text-center p-4 my-3 container">
                <div class="user-lead-top mb-2 head-btn-style">
                    <div className="d-flex align-items-center">
                        <h5 class="m-0"><img src="assets/images/back-union.png" alt="" /> History</h5>
                    </div>
                    <form action="#" class="search-form-sm">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search" />
                            <button class="btn btn-danger" type="submit"><img src="assets/images/small-search-icon.png" alt="title" /></button>
                        </div>
                    </form>
                </div>
                <div class="accordion-body">
                    <div className='container-style'>
                        <div className="history-container">
                            <p className='Profile text-danger'>Profile:</p>
                            <p className='name'>John Smith</p>
                            <div className='date'>
                               <div>
                                    <small className='d-block'>Search Date</small>
                                    <small className='d-block'>12-05-2021</small>
                               </div>
                            </div>
                            <div className='credit'>
                                <div className='d-flex justify-content-end'>
                                    <p className='d-flex align-items-center me-2 text-danger'>Credits used:</p>
                                    <div>
                                        <small className='d-block'>Profile: 5</small>
                                        <small className='d-block m-0'>Mail: 7</small>
                                    </div>
                                </div>
                            </div>
                            <p className='view-btn'><a href="" className='button'>View Profile</a></p>
                            <p className='close-btn'><img src="assets/images/close-user.png" alt="" /></p>
                        </div>
                    </div>
                    <div className='container-style mt-3'>
                        <div className="history-container">
                            <p className='Profile text-danger'>Tags:</p>
                            <div className='name'>
                                <p >xxxxxx</p>
                                <p>xxxxxx</p>
                                <p>USA</p>
                                <p>Europe</p>
                            </div>
                            <div className='date'>
                                <div>
                                    <small className='d-block'>Search Date</small>
                                    <small className='d-block'>12-05-2021</small>
                                </div>
                            </div>
                            <div className='credit'>
                                <div className='d-flex justify-content-end'>
                                    <p className='d-flex align-items-center me-1 text-danger'>Credits used:</p>
                                    <div>
                                        <small className='d-block'>Profile: 5</small>
                                        <small className='d-block'>Mail: 7</small>
                                    </div>
                                </div>
                            </div>
                            <p className='view-btn'><a href="" className='button'>View Profile</a></p>
                            <p className='close-btn'><img src="assets/images/close-user.png" alt="" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default History;
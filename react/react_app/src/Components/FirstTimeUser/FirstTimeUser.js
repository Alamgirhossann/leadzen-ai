import React from 'react';
import home from '../../images/menu-home.png';
import brand from '../../images/header-brand-black.png';
import saveList from '../../images/menu-saved-list.png';
import history from '../../images/menu-history.png';
import author from '../../images/author-image.png';
import codeSendBox from '../../images/header-brand-black.png';

const FirstTimeUser = () => {
    return (
        <div>
            <header class="header-area">
                <nav class="header-navbar navbar navbar-expand-xl bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="index.html"><img src={brand} alt="title" /></a>
                        {/* <button class="control-toggler me-4" type="button">
	          <span></span>
	          <span></span>
	          <span></span>
	        </button> */}
                        <ul class="navbar-nav-profile navbar-nav align-items-center ms-auto">
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src={home} alt="home here" /><span class="text-danger">Home</span></a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src={saveList} alt="saved here" />Saved lists</a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <a class="nav-icon-menu nav-link" href="#"><img src={history} alt="history here" />History</a>
                            </li>
                            <li class="nav-item me-md-4 me-3">
                                <a class="credit-btn btn btn-outline-danger nav-link" href="#">4 Credits Left</a>
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
                                                    <div class="progress-bar" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="dropdown-progress">
                                                <p class="small"> Mail credits used: 1200 / 2000</p>
                                                <div class="progress mb-2">
                                                    <div class="progress-bar" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
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
        </div>
    );
};

export default FirstTimeUser;
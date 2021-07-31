import React, { useEffect,useState } from 'react';
const NavBar = (props) => {
    const [user, setUser] = useState(props.user);
    return (
    <div style={{ paddingRight: '0px' }} >
        <nav className="header-navbar navbar navbar-expand-xl bg-light"
            style={{ paddingRight: '0px' }}
            >
            <div className="container-fluid">
                <ul className="navbar-nav-profile navbar-nav align-items-center ms-auto">

                    <li className="nav-item me-md-4 me-3">
                        <a className="nav-icon-menu nav-link" href="#">
                            <img src="assets/images/menu-home.png"
                                alt="home here"
                            />
                        <span className="text-danger">Home</span></a>
                    </li>

                    <li className="nav-item me-md-4 me-3">
                        <a className="nav-icon-menu nav-link" href="/savedList">
                            <img src="assets/images/menu-saved-list.png"
                                alt="saved here"
                            />
                            Saved lists
                        </a>
                    </li>

                    <li className="nav-item me-md-4 me-3">
                        <a className="nav-icon-menu nav-link" href="/history">
                            <img src="assets/images/menu-history.png"
                                alt="history here"
                            />
                            History
                        </a>
                    </li>

                    <li className="nav-item me-md-4 me-3">
                        <li className="nav-item dropdown">
                            <a className="credit-btn btn btn-outline-danger nav-link" href="#">
                                4 Credits Left
                            </a>

                            <ul className="dropdown-menu">
                                <li>
                                    <p className="dropdown-item">
                                        <img src="assets/images/pro-codesandbox.png"
                                            alt="title"
                                            />
                                        My Credits
                                    </p>
                                </li>

                                <li>
                                    <div className="dropdown-progress">
                                        <p className="small">
                                            Profile credits used:
                                            {user.subscription.profile_credits} / 1000
                                        </p>
                                        <div className="progress mb-2">
                                            <div className="progress-bar" style={{ width: "45%" }}
                                                role="progressbar" aria-valuenow="45"
                                                aria-valuemin="0" aria-valuemax="100"
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="dropdown-progress">
                                        <p className="small">
                                            Mail credits used:
                                            {user.subscription.mail_credits} / 2000
                                        </p>
                                        <div className="progress mb-2">
                                            <div className="progress-bar" role="progressbar"
                                                style={{ width: "65%" }} aria-valuenow="65"
                                                aria-valuemin="0" aria-valuemax="100"
                                            >
                                            </div>
                                        </div>

                                        <span className="small">
                                            Limit resets in 5 days
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </li>

                    <li className="nav-item">
                        <li className="nav-item dropdown">
                            <a className="profile-avata nav-link" data-bs-toggle="dropdown" href="#">
                                <img src="assets/images/author-image.png"
                                    alt="search here"
                                />
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <div className="dropdown-credit">
                                        <span className="fw-bold">
                                            {
                                                user.subscription.profile_credits +
                                                user.subscription.mail_credits
                                            }
                                            credits
                                            <br /> pending
                                        </span>
                                        <img src="assets/images/credit-icon.png" alt="title" />
                                    </div>
                                </li>
                                <li>
                                    <a className="dropdown-item active" href="#">
                                        Upgrade to premium
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/pricing">
                                        Buy Credits
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/profile">
                                        Profile Settings
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/history">
                                        Export History
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/logIn">
                                        <span className="text-muted me-3">
                                            Logout
                                        </span>
                                        <img src="assets/images/logout-icon.png" alt="image" />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    );
};
export default NavBar;
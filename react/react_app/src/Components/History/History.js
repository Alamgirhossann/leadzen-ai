import React from 'react';

const History = () => {
    return (
        <div>
             <header class="header-area">
        <nav class="header-navbar navbar navbar-expand-xl bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png" alt="title"></a>


                <ul class="navbar-nav-profile navbar-nav align-items-center ms-auto">
                    <li class="nav-item me-md-4 me-3">
                        <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-home.png"
                                alt="home here"/><span class="text-danger">Home</span></a>
                    </li>
                    <li class="nav-item me-md-4 me-3">
                        <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-saved-list.png"
                                alt="saved here"/>Saved lists</a>
                    </li>
                    <li class="nav-item me-md-4 me-3">
                        <a class="nav-icon-menu nav-link" href="#"><img src="assets/images/menu-history.png"
                                alt="history here"/>History</a>
                    </li>
                    <li class="nav-item me-md-4 me-3">
                        <a class="credit-btn btn btn-outline-danger nav-link" href="#">4 Credits Left</a>
                    </li>
                    <li class="nav-item">
                    <li class="nav-item dropdown">
                        <a class="profile-avata nav-link" data-bs-toggle="dropdown" href="#"><img
                                src="assets/images/author-image.png" alt="search here"/></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="dropdown-credit">
                                    <span class="fw-bold">2500 credits <br/> pending</span>
                                    <img src="assets/images/credit-icon.png" alt="title"/>
                                </div>
                            </li>
                            <li><a class="dropdown-item active" href="#">Upgrade to premium</a></li>
                            <li><a class="dropdown-item" href="#">Buy Credits</a></li>
                            <li><a class="dropdown-item" href="#">Profile Settings</a></li>
                            <li><a class="dropdown-item" href="#">Export History</a></li>
                            <li><a class="dropdown-item" href="#"><span class="text-muted me-3">Logout</span> <img
                                        src="assets/images/logout-icon.png" alt="image"/></a></li>
                        </ul>
                    </li>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <div class="text-center p-4 my-3 container">
        <div class="user-lead-top mb-2 user-widget-box">
            <h5 class="m-3"><img src="assets/images/left arrow.png" alt="" style="max-width: 20;"/> HISTORY</h5>
            <form action="#" class="search-form-sm" style="
            margin-top: 10;
            margin-right: 10;
        ">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search "/>
                    <button class="btn btn-danger" type="submit"><img src="assets/images/small-search-icon.png"
                            alt="title"/></button>
                </div>
            </form>
        </div>
        <div class="accordion-body">

            <div class="table-responsive">
                <table class="border-table table m-0 ">
                    <tbody>
                        <tr class="user-widget-box">
                            <td>
                            <td style="margin-top: 20; vertical-align: middle;"><span class="text-danger"
                                    style="margin-left:30;">Profile :</span> <span class="text-secondary">John
                                    Smith</span></td>

                            </td>
                            <td></td>
                            <td style="vertical-align: middle;">
                                <p class="text-muted">Search date</p>
                                <p class="text-dark m-0">12-05-2021</p>
                            </td>
                            <td style="vertical-align: middle;"><span class="text-danger m-0"
                                    style="margin: top 15px; ">Credits used :</span> </td>

                            <td>
                                <span class="text-muted span2" style="display: inline-block;">Profile:</span>
                                <h6 class="text-secondary" style="display: inline-block;">5</h6>
                                <br/><span class="text-muted span2" style="display: inline-block;">Mail:</span>
                                <span class="text-secondary " style="display: inline-block;">7</span>
                            </td>


                            <td style="vertical-align: middle;"><a href="#" class="btn btn-outline-danger mt-2">View
                                    Profile</a></td>
                            <td style="vertical-align: middle;"><a href="#" class="close-btn"><img
                                        src="assets/images/close-user.png" alt="title"/></a>
                            </td>
                        </tr>

                        <tr class="user-widget-box">
                            <td>
                            <td style="margin-top: 20; vertical-align: middle;"><span class="text-danger"
                                    style="margin-left:30;">Tags :</span>

                            <td style="align-content: flex-start; vertical-align: middle;">
                                <ul class="table-tag-list m-0 ">
                                    <li><a href="#">xxxxxxx</a></li>
                                    <li><a href="#">xxxxxxx</a></li>
                                    <li><a href="#">USA</a></li>
                                    <li><a href="#">Europe</a></li>
                                </ul>
                            </td>

                            </td>
                            <td style="vertical-align: middle;">
                                <p class="text-muted">Search date</p>
                                <p class="text-dark m-0">01-01-2021</p>
                            </td>
                            <td style="vertical-align: middle;"><span class="text-danger m-0"
                                    style="margin: top 15px; ">Credits used :</span> </td>

                            <td>
                                <span class="text-muted span2" style="display: inline-block;">Profile:</span>
                                <h6 class="text-secondary" style="display: inline-block;">5</h6>
                                <br/><span class="text-muted span2" style="display: inline-block;">Mail:</span>
                                <span class="text-secondary " style="display: inline-block;">7</span>
                            </td>



                            <td style="vertical-align: middle;"><a href="#" class="btn btn-outline-danger mt-2">View
                                    Profile</a></td>
                            <td style="vertical-align: middle;"><a href="#" class="close-btn"><img
                                        src="assets/images/close-user.png" alt="title"/></a>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
    </div>
    <div><img src="assets/images/user-robot-icon.png" alt="" style="left: 93.19%;
        right: 2.83%;
        top: 98.07%;
        bottom: -7.86%;
        
        transform: matrix(1, 0, 0, 1, 0, 0); position: sticky;"/></div>
        // </div>
    );
};

export default History;
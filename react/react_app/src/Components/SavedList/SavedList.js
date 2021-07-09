import React from 'react';

const SavedList = () => {
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
                                <a class="credit-btn btn btn-outline-danger nav-link" href="#">4 Credits Left</a>
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
                <div class="user-lead-top mb-2 user-widget-box">
                    <h5 class="m-3"><img src="assets/images/arrow-left.png" alt="" /> Saved Leads</h5>
                    <form action="#" class="search-form-sm">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search Within List" />
                            <button class="btn btn-danger" type="submit"><img src="assets/images/small-search-icon.png"
                                alt="title" /></button>
                        </div>
                    </form>
                </div>
                <div class="lead-accordion accordion" id="accordionExample2">
                    <div class="accordion-item">
                        <div class="accordion-header user-widget-box">
                            <button class="accordion-button collapsed alignment" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree">
                                <div class=" first-grid head-align">
                                    <span class="me-1 fw-bold">My Leads</span>
                                    <span>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 2.00012H2C1.73478 2.00012 1.48043 2.10548 1.29289 2.29302C1.10536 2.48055 1 2.73491 1 3.00012V10.0001C1 10.2653 1.10536 10.5197 1.29289 10.7072C1.48043 10.8948 1.73478 11.0001 2 11.0001H9C9.26522 11.0001 9.51957 10.8948 9.70711 10.7072C9.89464 10.5197 10 10.2653 10 10.0001V6.50012" stroke="#A3A3A3" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.25 1.24987C9.44891 1.05096 9.7187 0.939209 10 0.939209C10.2813 0.939209 10.5511 1.05096 10.75 1.24987C10.9489 1.44878 11.0607 1.71856 11.0607 1.99987C11.0607 2.28117 10.9489 2.55096 10.75 2.74987L6 7.49987L4 7.99987L4.5 5.99987L9.25 1.24987Z" stroke="#A3A3A3" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="second-grid">
                                    <small class="description">Add description...</small>
                                </div>
                                <div class="third-grid">
                                    <span class="d-flex justify-content-end">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3077 4.08669C10.5486 4.10653 10.7283 4.31711 10.709 4.55803C10.7055 4.59769 10.3894 8.51244 10.2074 10.1545C10.0942 11.1736 9.42102 11.7937 8.40485 11.8124C7.62727 11.8258 6.8771 11.8334 6.14385 11.8334C5.35343 11.8334 4.58285 11.8246 3.82043 11.8089C2.8451 11.7896 2.17018 11.1573 2.05993 10.1586C1.87618 8.50194 1.56177 4.59711 1.55885 4.55803C1.53902 4.31711 1.71868 4.10594 1.9596 4.08669C2.19702 4.08028 2.41168 4.24711 2.43093 4.48744C2.4328 4.51276 2.56133 6.10738 2.7014 7.68511L2.72954 7.99996C2.80009 8.78417 2.8716 9.53773 2.92968 10.0624C2.9921 10.6299 3.29835 10.9228 3.83852 10.9339C5.29685 10.9648 6.78493 10.9665 8.3891 10.9374C8.9631 10.9263 9.27343 10.6393 9.3376 10.0583C9.51843 8.42844 9.83343 4.52711 9.83693 4.48744C9.85618 4.24711 10.0691 4.07911 10.3077 4.08669ZM7.36815 0.16687C7.90365 0.16687 8.3744 0.527953 8.51265 1.04537L8.66082 1.78095C8.7087 2.02209 8.92031 2.19819 9.16533 2.20205L11.0797 2.20212C11.3212 2.20212 11.5172 2.39812 11.5172 2.63962C11.5172 2.88112 11.3212 3.07712 11.0797 3.07712L9.18242 3.07703C9.17948 3.07709 9.17653 3.07712 9.17357 3.07712L9.15933 3.07654L3.10761 3.07705C3.10291 3.0771 3.0982 3.07712 3.09348 3.07712L3.0845 3.07654L1.1875 3.07712C0.946 3.07712 0.75 2.88112 0.75 2.63962C0.75 2.39812 0.946 2.20212 1.1875 2.20212L3.10142 2.20154L3.16035 2.19781C3.37985 2.16933 3.56227 2.00262 3.60682 1.78095L3.74857 1.07162C3.89265 0.527953 4.3634 0.16687 4.8989 0.16687H7.36815ZM7.36815 1.04187H4.8989C4.7589 1.04187 4.63582 1.13579 4.60023 1.27054L4.46432 1.95304C4.44704 2.03948 4.42189 2.12279 4.3897 2.20228H7.87753C7.8453 2.12279 7.82009 2.03948 7.80273 1.95304L7.66098 1.2437C7.63123 1.13579 7.50815 1.04187 7.36815 1.04187Z" fill="black" />
                                        </svg>
                                    </span>
                                </div>
                            </button>
                        </div>

                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
                            <div class="accordion-body">
                                <div class="table-responsive">
                                    <table class="border-table table m-0">
                                        <tbody>
                                            <tr class="user-widget-box">
                                                <td>
                                                    <div class="user-lead-name">
                                                        <img src="assets/images/author-image.png" alt="" />
                                                        <h6 class="m-0">John Smith</h6>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>English Speaker</p>
                                                    <p class="mb-0">Works at Hexagon AB</p>
                                                </td>
                                                <td className='d-flex'>
                                                    <p><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C7.75697 0 10 2.23053 10 4.97248C10 8.34309 6.08727 11.6641 5 11.6641C3.91273 11.6641 0 8.34309 0 4.97248C0 2.23053 2.24303 0 5 0ZM5 0.897236C2.74424 0.897236 0.909091 2.7258 0.909091 4.97248C0.909091 7.83107 4.31758 10.6161 5 10.7644C5.68242 10.6155 9.09091 7.83047 9.09091 4.97248C9.09091 2.7258 7.25576 0.897236 5 0.897236ZM5.00061 2.99079C6.08667 2.99079 6.9703 3.8629 6.9703 4.93539C6.9703 6.00729 6.08667 6.87881 5.00061 6.87881C3.91455 6.87881 3.03091 6.00729 3.03091 4.93539C3.03091 3.8629 3.91455 2.99079 5.00061 2.99079ZM5.00061 3.88802C4.41576 3.88802 3.94 4.35757 3.94 4.93539C3.94 5.51262 4.41576 5.98157 5.00061 5.98157C5.58545 5.98157 6.06121 5.51262 6.06121 4.93539C6.06121 4.35757 5.58545 3.88802 5.00061 3.88802Z" fill="black" />
                                                    </svg></p>
                                                    <p>6720 Ulster Court, Alpharetta,Georgia</p>
                                                </td>
                                                <td>
                                                    <p class="text-muted">Search date</p>
                                                    <p class="text-dark m-0">12-05-2021</p>
                                                </td>
                                                <td><a href="#" class="btn btn-outline-danger mt-2">View Profile</a></td>
                                                <td><a href="#" class="close-btn"><img src="assets/images/close-user.png"
                                                    alt="title" /></a>
                                                </td>
                                            </tr>
                                            <tr class="user-widget-box">
                                                <td>
                                                    <div class="user-lead-name"><img src="assets/images/author-image.png"
                                                        alt="" />
                                                        <h6 class="m-0">John Smith</h6>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>English Speaker</p>
                                                    <p class="mb-0">Works at Hexagon AB</p>
                                                </td>
                                                <td className='d-flex'>
                                                    <p><svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C7.75697 0 10 2.23053 10 4.97248C10 8.34309 6.08727 11.6641 5 11.6641C3.91273 11.6641 0 8.34309 0 4.97248C0 2.23053 2.24303 0 5 0ZM5 0.897236C2.74424 0.897236 0.909091 2.7258 0.909091 4.97248C0.909091 7.83107 4.31758 10.6161 5 10.7644C5.68242 10.6155 9.09091 7.83047 9.09091 4.97248C9.09091 2.7258 7.25576 0.897236 5 0.897236ZM5.00061 2.99079C6.08667 2.99079 6.9703 3.8629 6.9703 4.93539C6.9703 6.00729 6.08667 6.87881 5.00061 6.87881C3.91455 6.87881 3.03091 6.00729 3.03091 4.93539C3.03091 3.8629 3.91455 2.99079 5.00061 2.99079ZM5.00061 3.88802C4.41576 3.88802 3.94 4.35757 3.94 4.93539C3.94 5.51262 4.41576 5.98157 5.00061 5.98157C5.58545 5.98157 6.06121 5.51262 6.06121 4.93539C6.06121 4.35757 5.58545 3.88802 5.00061 3.88802Z" fill="black" />
                                                    </svg></p>
                                                    <p>7720 Texas, USA</p>
                                                </td>
                                                <td>
                                                    <p class="text-muted">Search date</p>
                                                    <p class="text-dark m-0">12-05-2021</p>
                                                </td>
                                                <td><a href="#" class="btn btn-outline-danger mt-2">View Profile</a></td>
                                                <td><a href="#" class="close-btn"><img src="assets/images/close-user.png"
                                                    alt="title" /></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header user-widget-box">
                            <button class="accordion-button collapsed alignment" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree">
                                <div class=" first-grid head-align">
                                    <span class="me-1 fw-bold">Product Designer Leads</span>
                                    <span>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 2.00012H2C1.73478 2.00012 1.48043 2.10548 1.29289 2.29302C1.10536 2.48055 1 2.73491 1 3.00012V10.0001C1 10.2653 1.10536 10.5197 1.29289 10.7072C1.48043 10.8948 1.73478 11.0001 2 11.0001H9C9.26522 11.0001 9.51957 10.8948 9.70711 10.7072C9.89464 10.5197 10 10.2653 10 10.0001V6.50012" stroke="#A3A3A3" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.25 1.24987C9.44891 1.05096 9.7187 0.939209 10 0.939209C10.2813 0.939209 10.5511 1.05096 10.75 1.24987C10.9489 1.44878 11.0607 1.71856 11.0607 1.99987C11.0607 2.28117 10.9489 2.55096 10.75 2.74987L6 7.49987L4 7.99987L4.5 5.99987L9.25 1.24987Z" stroke="#A3A3A3" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="second-grid">
                                    <small class="description">Add description...</small>
                                </div>
                                <div class="third-grid">
                                    <span class="d-flex justify-content-end">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3077 4.08669C10.5486 4.10653 10.7283 4.31711 10.709 4.55803C10.7055 4.59769 10.3894 8.51244 10.2074 10.1545C10.0942 11.1736 9.42102 11.7937 8.40485 11.8124C7.62727 11.8258 6.8771 11.8334 6.14385 11.8334C5.35343 11.8334 4.58285 11.8246 3.82043 11.8089C2.8451 11.7896 2.17018 11.1573 2.05993 10.1586C1.87618 8.50194 1.56177 4.59711 1.55885 4.55803C1.53902 4.31711 1.71868 4.10594 1.9596 4.08669C2.19702 4.08028 2.41168 4.24711 2.43093 4.48744C2.4328 4.51276 2.56133 6.10738 2.7014 7.68511L2.72954 7.99996C2.80009 8.78417 2.8716 9.53773 2.92968 10.0624C2.9921 10.6299 3.29835 10.9228 3.83852 10.9339C5.29685 10.9648 6.78493 10.9665 8.3891 10.9374C8.9631 10.9263 9.27343 10.6393 9.3376 10.0583C9.51843 8.42844 9.83343 4.52711 9.83693 4.48744C9.85618 4.24711 10.0691 4.07911 10.3077 4.08669ZM7.36815 0.16687C7.90365 0.16687 8.3744 0.527953 8.51265 1.04537L8.66082 1.78095C8.7087 2.02209 8.92031 2.19819 9.16533 2.20205L11.0797 2.20212C11.3212 2.20212 11.5172 2.39812 11.5172 2.63962C11.5172 2.88112 11.3212 3.07712 11.0797 3.07712L9.18242 3.07703C9.17948 3.07709 9.17653 3.07712 9.17357 3.07712L9.15933 3.07654L3.10761 3.07705C3.10291 3.0771 3.0982 3.07712 3.09348 3.07712L3.0845 3.07654L1.1875 3.07712C0.946 3.07712 0.75 2.88112 0.75 2.63962C0.75 2.39812 0.946 2.20212 1.1875 2.20212L3.10142 2.20154L3.16035 2.19781C3.37985 2.16933 3.56227 2.00262 3.60682 1.78095L3.74857 1.07162C3.89265 0.527953 4.3634 0.16687 4.8989 0.16687H7.36815ZM7.36815 1.04187H4.8989C4.7589 1.04187 4.63582 1.13579 4.60023 1.27054L4.46432 1.95304C4.44704 2.03948 4.42189 2.12279 4.3897 2.20228H7.87753C7.8453 2.12279 7.82009 2.03948 7.80273 1.95304L7.66098 1.2437C7.63123 1.13579 7.50815 1.04187 7.36815 1.04187Z" fill="black" />
                                        </svg>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header user-widget-box">
                            <button class="accordion-button collapsed alignment" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree">
                                <div class=" first-grid head-align">
                                    <span class="me-1 fw-bold">Product Manager Leads</span>
                                    <span>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 2.00012H2C1.73478 2.00012 1.48043 2.10548 1.29289 2.29302C1.10536 2.48055 1 2.73491 1 3.00012V10.0001C1 10.2653 1.10536 10.5197 1.29289 10.7072C1.48043 10.8948 1.73478 11.0001 2 11.0001H9C9.26522 11.0001 9.51957 10.8948 9.70711 10.7072C9.89464 10.5197 10 10.2653 10 10.0001V6.50012" stroke="#A3A3A3" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.25 1.24987C9.44891 1.05096 9.7187 0.939209 10 0.939209C10.2813 0.939209 10.5511 1.05096 10.75 1.24987C10.9489 1.44878 11.0607 1.71856 11.0607 1.99987C11.0607 2.28117 10.9489 2.55096 10.75 2.74987L6 7.49987L4 7.99987L4.5 5.99987L9.25 1.24987Z" stroke="#A3A3A3" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="second-grid">
                                    <small class="description">Add description...</small>
                                </div>
                                <div class="third-grid">
                                    <span class="d-flex justify-content-end">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3077 4.08669C10.5486 4.10653 10.7283 4.31711 10.709 4.55803C10.7055 4.59769 10.3894 8.51244 10.2074 10.1545C10.0942 11.1736 9.42102 11.7937 8.40485 11.8124C7.62727 11.8258 6.8771 11.8334 6.14385 11.8334C5.35343 11.8334 4.58285 11.8246 3.82043 11.8089C2.8451 11.7896 2.17018 11.1573 2.05993 10.1586C1.87618 8.50194 1.56177 4.59711 1.55885 4.55803C1.53902 4.31711 1.71868 4.10594 1.9596 4.08669C2.19702 4.08028 2.41168 4.24711 2.43093 4.48744C2.4328 4.51276 2.56133 6.10738 2.7014 7.68511L2.72954 7.99996C2.80009 8.78417 2.8716 9.53773 2.92968 10.0624C2.9921 10.6299 3.29835 10.9228 3.83852 10.9339C5.29685 10.9648 6.78493 10.9665 8.3891 10.9374C8.9631 10.9263 9.27343 10.6393 9.3376 10.0583C9.51843 8.42844 9.83343 4.52711 9.83693 4.48744C9.85618 4.24711 10.0691 4.07911 10.3077 4.08669ZM7.36815 0.16687C7.90365 0.16687 8.3744 0.527953 8.51265 1.04537L8.66082 1.78095C8.7087 2.02209 8.92031 2.19819 9.16533 2.20205L11.0797 2.20212C11.3212 2.20212 11.5172 2.39812 11.5172 2.63962C11.5172 2.88112 11.3212 3.07712 11.0797 3.07712L9.18242 3.07703C9.17948 3.07709 9.17653 3.07712 9.17357 3.07712L9.15933 3.07654L3.10761 3.07705C3.10291 3.0771 3.0982 3.07712 3.09348 3.07712L3.0845 3.07654L1.1875 3.07712C0.946 3.07712 0.75 2.88112 0.75 2.63962C0.75 2.39812 0.946 2.20212 1.1875 2.20212L3.10142 2.20154L3.16035 2.19781C3.37985 2.16933 3.56227 2.00262 3.60682 1.78095L3.74857 1.07162C3.89265 0.527953 4.3634 0.16687 4.8989 0.16687H7.36815ZM7.36815 1.04187H4.8989C4.7589 1.04187 4.63582 1.13579 4.60023 1.27054L4.46432 1.95304C4.44704 2.03948 4.42189 2.12279 4.3897 2.20228H7.87753C7.8453 2.12279 7.82009 2.03948 7.80273 1.95304L7.66098 1.2437C7.63123 1.13579 7.50815 1.04187 7.36815 1.04187Z" fill="black" />
                                        </svg>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedList;
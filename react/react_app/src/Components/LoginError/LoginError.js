import React from 'react';
import { Link } from 'react-router-dom';

const LoginError = () => {
    return (
        <div>
            <header className='header-area'>
                <nav class="header-navbar navbar navbar-expand-xl bg-light">
                    <div className="container-fluid">
                        <a class="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png" alt="title" /></a>
                    </div>
                </nav>
            </header>
            <div class="main-content-area overflow-hidden">
                <div class="main-wrapper">
                    <div class="container-fluid">
                        <div class="form-container" >
                            <div class="signup-wrapper py-2 px-md-6">
                                <div class="row align-items-center">
                                    <div class="col-md-6 order-md-1">
                                        <div class="sign-up-robot text-center pt-md-1 pl-md-5 pb-6 mb-4">
                                            <img style={{width:"20px"}} src="assets/images/Group 2221.png" alt="" />    
                                            <p class="fw-bold">Hey Chris, time to take <br /> the ‘lead’. User not found. <br /> <span className='text-danger'>Sign up</span>  to begin. </p>
                                        </div>
                                    </div>
                                    <div class="col-md-6 order-md-12">
                                        <div class="sign-up-form">
                                            <div class="text-center">
                                                <h3 className='fw-bolder'>Welcome to Analystt.ai</h3>
                                                <h5 class="text-danger mb-4">Most Intelligent Lead Generation Platform</h5>
                                            </div>
                                            <form class="sign-up-form">
                                                <div class="mb-3">
                                                    <input type="email" class="form-control" placeholder="Enter your email" id="email" />
                                                </div>
                                                <div class="mb-3 password-input">
                                                    <input type="password" name='password' class="form-control" placeholder="Enter your password" id="password" />
                                                </div>
                                                <div class="mb-1 d-block d-md-flex justify-content-end">
                                                    <p><a href="#" class="small text-secondary">Forgot your password?</a></p>
                                                </div>
                                                <button type="submit" class="btn text-white w-100">Sign In</button>
                                                <div class="text-center mt-2"><span>Sign In using: </span></div>
                                                <div class="signup-login-with mt-3">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <a href="#" class="btn btn-light d-flex justify-content-center align-items-center p-2 mb-3"><img src="assets/images/Google.png" alt="title" /> Google</a>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <a href="#" class="btn btn-light p-2 d-flex justify-content-center align-items-center mb-3"><img src="assets/images/LinkedIn.png" alt="title" /> LinkedIn</a>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="text-center"><p class="text-secondary m-0">Don't have an account? <Link to='/signUp' class="text-danger">Sign Up</Link></p></div>
                                            </form>
                                        </div>
                                    </div>

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

export default LoginError;
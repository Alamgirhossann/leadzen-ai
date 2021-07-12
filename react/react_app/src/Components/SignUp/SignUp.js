import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const email = 'alamgirhossann@gmail.com';

    const [input, setInput] = useState({});
    console.log(input);

    const handleBlur = (e) => {
        const newInput = { ...input }
        newInput[e.target.name] = e.target.value;
        setInput(newInput)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === input.email) {
            alert('You already have an account with this ID')
        }

    }
    return (
        <div className='container-body'>
            <header class="header-area">
                <nav class="header-navbar navbar navbar-expand-xl bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png" alt="" /></a>
                    </div>
                </nav>
            </header>

            <div class="main-content-area overflow-hidden">
                <div class="main-wrapper">
                    <div class="container-fluid">
                        <div class="form-container">
                            <div class="signup-wrapper py-3 px-md-6">
                                <div class="row align-items-center">
                                    {
                                        email !== input.email ?
                                            <div class="col-md-6 robot-container order-md-12">
                                                <div class="sign-up-page-robot">
                                                    <h3>Hi</h3>
                                                    <p class="fw-bold">I am
                                                        <span class="text-danger"> Jarv</span>
                                                        <br /> & I will give you a sneak peek into the most intelligent AI Powered lead generation platform with
                                                        <span class="text-danger"> 5 free credits</span>
                                                    </p>
                                                    <div class="text-center">
                                                        <Link to='/howToUse'><span class="small text-danger text-decoration-underline">Learn how to use credits</span></Link>
                                                    </div>
                                                </div>
                                            </div>
                                            : <div class="col-md-6 order-md-12">
                                                <div class="sign-up-page-robot">
                                                    <p class="fw-bold">
                                                        <img style={{width:"20px"}} src="assets/images/Group 2221.png" alt="" />
                                                        Hey [User], <br />
                                                        looks like you’ve been taking the ‘lead’ already. The username already exists. Try <Link to='/login' className='text-danger'>logging in</Link> in instead
                                                    </p>
                                                </div>
                                            </div>
                                    }


                                    <div class="col-md-6 order-md-1">
                                        <div class="sign-up-form">
                                            <div class="text-center pt-1">
                                                <h2>Create a free account</h2>
                                                <h5 class="text-danger mb-3">Get 5 Free Credits for Leads Now !</h5>
                                            </div>
                                            <form class="sign-up-form" class="#">
                                                <div class="mb-3">
                                                    <input type="text" class="w-100" placeholder="Enter your name" id="username" />
                                                </div>
                                                <div class="mb-3">
                                                    <input type="email" name='email' onBlur={handleBlur} class="w-100" placeholder="Enter your email" id="email" />
                                                </div>
                                                <div class="mb-3 password-input">
                                                    <input type="password" class="w-100" placeholder="Enter your password" id="password" />
                                                </div>
                                                <button onClick={handleSubmit} type="submit" class="btn text-white w-100 px-1">Grab Your 5 Free Credits Now</button>
                                                <div class="text-center mt-2"><span>Sign Up using: </span></div>
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
                                                <div class="text-center"><p class="text-secondary m-0">Already have an account? <Link to='/login' class="text-danger text-decoration-none">Sign In</Link></p></div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               <div className="cookie px-4 mt-2">
                    <div className="cookie-message">
                        <p className='text-center mt-3'>We use cookies to improve your browsing experience. By accepting this, you agree to our privacy policy <button className='cookie-btn'>Cookies</button></p>
                    </div>
                    <div className="jarv-position">
                        <img className='jarv-robot' src="assets/images/user-robot-icon.png" alt="" />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default SignUp;
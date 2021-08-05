import React, { useState } from 'react';
import './Style/style.css';
import { Link, Redirect } from 'react-router-dom';
import Cookies from "js-cookie";
import validator from "validator";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

const SignUp = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        error: ""
      });

    const [isValid, setValid] = useState(false);
    const [response, setResponse] = useState({'ok' : null, 'message' : null});
    const [showPass, setShowPass] = useState(false);

    const handleBlur = (e) => {
        setForm({...form, email:e.target.value});
    }
    const handleBlurPass = (e) => {
        setForm({...form, password:e.target.value})
    }
    const handleBlurName = (e) => {
        setForm({...form, name:e.target.value});
    }

    const handlePassClick = (e) =>{
        e.preventDefault();
        if(showPass === true)
            setShowPass(false);
        else
            setShowPass(true);
    }

    const Robot = () => {
        if(response.message === "user already exists"){
            return(
                <div className="col-md-6 order-md-12">
                <div className="sign-up-page-robot">
                    <p className="fw-bold">
                        <img style={{width:"20px"}} src="assets/images/Group 2221.png" alt="" />
                        Hey {form.email}, <br />
                        looks like you’ve been taking the ‘lead’ already. The username already exists. Try <Link to='/login' className='text-danger'>logging in</Link> in instead
                    </p>
                </div>
            </div>
            );
        }
        return(
            <div className="col-md-6 robot-container order-md-12">
                <div className="sign-up-page-robot">
                    <h3>Hi</h3>
                    <p className="fw-bold">I am
                        <span className="text-danger"> Jarv</span>
                        <br /> & I will give you a sneak peek into the most intelligent AI Powered lead generation platform with
                        <span className="text-danger"> 5 Free Credits</span>
                    </p>
                    <div className="text-center">
                        <Link to='/howToUse'><span className="small text-danger text-decoration-underline">Learn how to use credits</span></Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = '';
        if(!form.email && !form.password && !form.name){
            setForm({...form, error : "Name, Email and Password cannot be blank!"});
            alert("Name, Email and Password cannot be blank!");
        }
        else {
            setValid(true);
            setForm({...form, error:""});
        }
        if(!form.name){
            error += 'Name, ';
            setValid(false);
        }
        if(!form.email || !validator.isEmail(form.email)){
            error += 'Email, ';
            setValid(false);
        }
        if(!form.password || !validator.isStrongPassword(form.password, {
            minLength: 8,
            minLowercase: 1,
            maxlength: 50,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          })){
            error += 'Password ';
            setValid(false);
          }
        setForm({...form, error:error});
        if(error)
          alert(error + 'Invalid');
        console.log(form);

        // TODO: Complete async function to connect with signup api backend
        const fetchData = async() =>{
            // TODO: Add code to use the form to check login credentials using api
            setResponse({...response, ok: true});
            if(response.ok === true){
                console.log('User Created!');
                Cookies.set('user_email', form.email)
            }
        }
        if(isValid){
            fetchData();
        }

    }
    return (
        <div className='container-body'>
            <header className="header-area">
                <nav className="header-navbar navbar navbar-expand-xl bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/repeatedUser"><img src="assets/images/header-brand-black.png" alt="" /></a>
                    </div>
                </nav>
            </header>

            <div className="main-content-area overflow-hidden">
                <div className="main-wrapper">
                    <div className="container-fluid">
                        <div className="form-container">
                            <div className="signup-wrapper py-3 px-md-6">
                                <div className="row align-items-center">
                                    <Robot />
                                    {response.ok ? <Redirect to="/firstTimeUser"/> : null}
                                    <div className="col-md-6 order-md-1">
                                        <div className="sign-up-form">
                                            <div className="text-center pt-1">
                                                <h2>Create a Free Account</h2>
                                                <h5 className="text-danger mb-3">Get 5 Free Credits for Leads Now !</h5>
                                            </div>
                                            <form className="sign-up-form" className="#">
                                                <div className="mb-3">
                                                    <input type="text" className="w-100" placeholder="Enter your name" id="username" onBlur={handleBlurName} />
                                                </div>
                                                <div className="mb-3">
                                                    <input type="email" name='email' onBlur={handleBlur} className="w-100" placeholder="Enter your email" id="email" />
                                                </div>
                                                <div className="mb-3 password-input">
                                                <input type={showPass ? "text" : "password"} name='password' className="w-100" placeholder="Enter your password" id="password" onBlur={handleBlurPass} />
                                                <a href ="" onClick={handlePassClick}><img src='assets/images/combined-eye.png' style={{position: 'absolute', top: '13px', right: '10px'}}/></a>
                                                </div>
                                                <button onClick={handleSubmit} type="submit" className="btn text-white w-100 px-1">Grab Your 5 Free Credits Now</button>
                                                <div className="text-center mt-2"><span>Sign Up using: </span></div>
                                                <div className="signup-login-with mt-3">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <a href="#" className="btn btn-light d-flex justify-content-center align-items-center p-2 mb-3"><img src="assets/images/Google.png" alt="title" /> Google</a>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <a href="#" className="btn btn-light p-2 d-flex justify-content-center align-items-center mb-3"><img src="assets/images/LinkedIn.png" alt="title" /> LinkedIn</a>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="text-center"><p className="text-secondary m-0">Already have an account? <Link to='/login' className="text-danger text-decoration-none">Sign In</Link></p></div>
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
                    <CookieConsent>This site uses cookies</CookieConsent>
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
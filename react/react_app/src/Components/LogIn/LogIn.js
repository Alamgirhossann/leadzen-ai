import React, { useState } from 'react';
import './LogIn.css';
import { Link, Redirect } from 'react-router-dom';
import Cookies from "js-cookie";
import validator from "validator";

const LogIn = () => {

    const [form, setForm] = useState({
        email: "",
        password: "",
        error: ""
      });
    
    const [isValid, setValid] = useState(false);
    const [response, setResponse] = useState({'ok' : null, 'message' : null});
    
    const handleBlur = (e) => {
        setForm({...form, email : e.target.value });
    }

    const handleBlurPass = (e) =>{
        setForm({...form, password : e.target.value});
    }

    const Robot = () => {
        if(response.message === "user not found"){
            return(<div className="col-md-6 robot-container order-md-12">
            <div className="sign-up-robot text-center ps-4 pe-7 pt-2 pb-7 mb-4">
                <img style={{width:"20px"}} src="assets/images/Group 2221.png" alt="" />
                <p className="fw-bold">Hey Buddy, time to take <br /> the ‘lead’. User not found. <br /> <Link to='/signUp' className='text-danger text-decoration-none'>Sign up</Link>  to begin. </p>
            </div>
        </div>);
        }
        
        return (
            <div className="col-md-6 robot-container order-md-12">
                <div className="sign-up-robot ps-4 pe-7 pt-2 pb-7 mb-4">
                <h3>Hi</h3>
                <p className="fw-bold">I am <span className="text-danger">Jarv!</span> <br />
                    Are you ready to unlock opportunities with the <span className="text-danger">most intelligent AI based platform? </span></p>
            </div>
        </div>
            );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.email || !form.password){
            setForm({...form, error : "Email and Password cannot be blank!"})
            alert("Email and Password cannot be blank!");
        }
        else {
            setValid(true);
            setForm({...form, error:""});
        }
        if(!validator.isEmail(form.email)){
            setForm({...form, error:"Invalid Email"});
            setValid(false);
            alert("Invalid Email");
        }
        if(!validator.isStrongPassword(form.password, {
            minLength: 8,
            minLowercase: 1,
            maxlength: 50,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          })){
              setForm({...form, error:"Invalid Password"});
              setValid(false);
              alert('Invalid Password!');

          }
        const fetchData = async() => {
            // const apiHost = ;
            // TODO: Complete async function to use the form to check login credentials using api
            setResponse({...response, ok: true});
            if(response.ok === true){
                Cookies.set('user_email', form.email);
            }
        }
        if(isValid){
            fetchData();
        }
    };

    return (
        <div>
            <header className='header-area'>
                <nav className="header-navbar navbar navbar-expand-xl bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="index.html"><img src="assets/images/header-brand-black.png" alt="title" /></a>
                    </div>
                </nav>
            </header>
            <div className="main-content-area overflow-hidden">
                <div className="main-wrapper">
                    <div className="container-fluid">
                        <div className="form-container" >
                            <div className="signup-wrapper py-4 px-md-6">
                                <div className="row align-items-center">  
                                    {response.ok ? <Redirect to="/repeatedUser"/> : null}
                                    <div className="col-md-6 order-md-1">
                                        <div className="sign-up-form">
                                            <div className="text-center">
                                                <h3 className='fw-bolder'>Welcome to Analystt.ai</h3>
                                                <h5 className="text-danger mb-4">Most Intelligent Lead Generation Platform</h5>
                                            </div>
                                            <form className="sign-up-form">
                                                <div className="mb-3">
                                                    <input type="email" name='email'  className="w-100" placeholder="Enter your email" id="email" onBlur={handleBlur} />
                                                </div>
                                                <div className="mb-3 password-input">
                                                    <input type="password" name='password' className="w-100" placeholder="Enter your password" id="password" onBlur={handleBlurPass} />
                                                </div>
                                                <div className="mb-1 d-block d-md-flex justify-content-end">
                                                    <p><Link to='/resetPassword' className="small text-secondary">Forgot your password?</Link></p>
                                                </div>
                                                <button type="submit" onClick={handleSubmit} className="btn text-white w-100">Sign In</button>
                                                <div className="text-center mt-2"><span>Sign In using: </span></div>
                                                <div className="signup-login-with mt-3">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <a href="#" className="btn btn-light p-2 d-flex justify-content-center align-items-center mb-3"><img src="assets/images/Google.png" alt="title" /> Google</a>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <a href="#" className="btn btn-light p-2 d-flex justify-content-center align-items-center mb-3"><img src="assets/images/LinkedIn.png" alt="title" /> LinkedIn</a>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="text-center"><p className="text-secondary m-0">Don't have an account? <Link to='/signUp' className="text-danger">Sign Up</Link></p></div>
                                            </form>
                                        </div>
                                    </div>
                                    <Robot />   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cookie px-5 mt-2">
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

export default LogIn;
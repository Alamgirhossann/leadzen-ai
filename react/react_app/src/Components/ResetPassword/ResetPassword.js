import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import validator from "validator";

const ResetPassword = () => {

    const [showPass, setShowPass] = useState(false);
    const [newPass, setNewPass] = useState();
    const [isValid, setValid] = useState(false);
    const [newPassRepeat, setNewPassRepeat] = useState();
    const handleBlurPass = (e) => {
        setNewPass(e.target.value);
    }
    const handleNewPass = (e) => {
        setNewPassRepeat(e.target.value);
    }
    const handlePassClick = (e) =>{
        e.preventDefault();
        if(showPass === true)
            setShowPass(false);
        else
            setShowPass(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!newPass || !validator.isStrongPassword(newPass, {
            minLength: 8,
            minLowercase: 1,
            maxlength: 50,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          })){
            setValid(false);
            alert('Invalid Password');
          }
          if(newPass === newPassRepeat){
              setValid(true);
          }
          else{
              setValid(false);
              alert('Passwords do not match!');
          }
          setValid(true);
          if(isValid){
            // TODO: Add api calls to send email and reset password in the backend
            console.log('Password was reset!');
            console.log('Send email to : ' + Cookies.get('forgot_email'));
          }
    }


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
                    <div className='reset-main-div'>
                        <div className='reset-child-div'>
                            <h5 className='text-center pt-4'>Reset Password</h5>
                            <form className="sign-up-form p-5">
                                <div className="mb-3 password-input">
                                    <label htmlFor="enterPassword">Password</label>
                                    <input type={showPass ? "text" : "password"} name='password' className="w-100" placeholder="Enter new password" id="password" onBlur={handleBlurPass} />
                                    <a href ="" onClick={handlePassClick}><img src='assets/images/combined-eye.png' style={{position: 'absolute', top: '43px', right: '10px'}}/></a>
                                </div>
                                <div className="mb-3 password-input">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input type={showPass ? "text" : "password"} name='password' className="w-100" placeholder="Confirm new password" id="password" onBlur={handleBlurPass} />
                                    <a href ="" onClick={handlePassClick}><img src='assets/images/combined-eye.png' style={{position: 'absolute', top: '43px', right: '10px'}}/></a>
                                </div>
                                <button type="submit" onClick ={handleSubmit} className="btn text-white w-100">Reset Password</button>
                            </form>
                            {isValid ? <Redirect to="/resetLink"/> : null}
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

export default ResetPassword;
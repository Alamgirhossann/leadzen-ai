import React from 'react';
import './ChromeSignIn.css';
import { Link } from 'react-router-dom';

const ChromeSignIn = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className="col-md-6 order-md-1">
                <div className="sign-up-form">
                    <div className="text-center">
                        <h3 className='fw-bolder pb-4'>analystt</h3>
                     </div>
                    <form className="sign-up-form">
                        <div className="mb-3">
                            <input type="email" name='email' className="w-100" placeholder="Enter your email" id="email" />
                        </div>
                        <div className="mb-3 password-input">
                            <input type="password" name='password' className="w-100" placeholder="Enter your password" id="password" />
                        </div>
                        <div className="mb-1 d-block d-md-flex justify-content-end">
                            <p><Link to='/resetPassword' className="small text-secondary">Forgot your password?</Link></p>
                        </div>
                        <button type="submit" className="btn text-white w-100">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChromeSignIn;
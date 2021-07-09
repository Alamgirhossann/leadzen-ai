import React from 'react';

const ResetPassword = () => {
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
                <div className="main-wrapper">
                    <div className='reset-main-div'>
                        <div className='reset-child-div'>
                            <h5 className='text-center pt-4'>Reset Password</h5>
                            <form class="sign-up-form p-5">
                                <div class="mb-3">
                                    <label htmlFor="enterPassword">Password</label>
                                    <input type="password" class="form-control" placeholder="Enter password" id="enterPassword" />
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input type="password" name='password' class="form-control" placeholder="Re-Enter password" id="confirmPassword" />
                                </div>
                                <button type="submit" class="btn text-white w-100">Reset Password</button>
                            </form>
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
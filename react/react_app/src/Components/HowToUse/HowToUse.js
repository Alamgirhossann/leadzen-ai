import React from 'react';

const HowToUse = () => {
    return (
        <div>
            <header className='header-area'>
                <nav className="header-navbar navbar navbar-expand-xl bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/repeatedUser"><img src="assets/images/header-brand-black.png" alt="title" /></a>
                    </div>
                </nav>
            </header>
            <div className="main-content-area overflow-hidden">
                <div className="main-wrapper">
                    <div className='w-100 pt-5 h-100 d-flex justify-content-center '>
                        <div className='learn-container-align'>
                            <div className='text-center'>
                                <h5 className='text-danger pt-3 pb-3'>Learn How to Use Credits</h5>
                                <img style={{height:"100px"}} src="assets/images/undraw_online_test_gba7 1.png" alt="" />
                                <p className="pt-4"><span className='fw-bold'>1 mail credit</span> = Unlocking 1 email ID</p>
                                <p className="pb-2"><span className='fw-bold'>1 profile credit</span> = Unlocking 1 profile information</p>
                                <p className='para'> The credit will be deducted ONLY in case phone number is fetched. The other information regarding the lead will still be displayed</p>
                                <p className='para'>On sign up you get free access to 5 free mail and profile credits each so you can explore the most intelligent lead generation platform before you make it your go to platform</p>
                                <p className="pt-5"><a href="#" className='text-danger'>Back</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;
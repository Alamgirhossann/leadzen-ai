import React from 'react';

const PaymentFailed = () => {
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
                    <div className='w-100 pt-6 h-100 d-flex justify-content-center '>
                        <div className='payment-container-align'>
                            <div className='text-center'>
                                <img className='pt-3' src="assets/images/Group 2237.png" alt="" />
                                <p className="text-danger pt-2">Opps</p>
                                <p>Looks like there's a problem here. <br /> We were unable to process your payment. </p>
                                <p className="pt-5"><a href="#" className='text-danger'>Try Again</a></p>
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

export default PaymentFailed;
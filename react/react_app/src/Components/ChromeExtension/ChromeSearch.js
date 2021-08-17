import React from 'react';
import './Style/style.css';
import { Link } from 'react-router-dom';

const ChromeSearch = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className="col-md-6 order-md-1">
                <div className="">
                    <div className="text-center">
                        <h3 className='fw-bolder pb-4'>analystt</h3>
                        <p className='search-chrome'>Search Results</p>
                    </div>
                    <div className='search-chrome-container'>
                        <div className="search-chrome-user-container">
                            <p className='chrome-author text-danger'><img src="assets/images/Group 1862.png" alt="" /></p>
                            <div className='chrome-user'>
                                <p className='fw-bold'>John Smith</p>
                            </div>
                            <div className='chrome-location'>
                                <small className='d-block'>Works at Hexagon AB</small>
                                <small className='d-block'>6720 Ulster Court, Alpharetta, Georgia</small>
                            </div>
                           <p className='chrome-plus-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                        </div>
                    </div>
                    <div className='search-chrome-container'>
                        <div className="search-chrome-user-container">
                            <p className='chrome-author text-danger'><img src="assets/images/Group 1852.png" alt="" /></p>
                            <div className='chrome-user'>
                                <p className='fw-bold'>Ava Stephen</p>
                            </div>
                            <div className='chrome-location'>
                                <small className='d-block'>Works at Hexagon AB</small>
                                <small className='d-block'>New York, USA</small>
                            </div>
                           <p className='chrome-plus-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                        </div>
                    </div>
                    <div className='search-chrome-container'>
                        <div className="search-chrome-user-container">
                            <p className='chrome-author text-danger'><img src="assets/images/Group 1862.png" alt="" /></p>
                            <div className='chrome-user'>
                                <p className='fw-bold'>Ben Thomas</p>
                            </div>
                            <div className='chrome-location'>
                                <small className='d-block'>Works at Hexagon AB</small>
                                <small className='d-block'>6720 Ulster Court, Alpharetta, Georgia</small>
                            </div>
                           <p className='chrome-plus-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                        </div>
                    </div>
                    <div className='search-chrome-container'>
                        <div className="search-chrome-user-container">
                            <p className='chrome-author text-danger'><img src="assets/images/Group 1852.png" alt="" /></p>
                            <div className='chrome-user'>
                                <p className='fw-bold'>Isabella G</p>
                            </div>
                            <div className='chrome-location'>
                                <small className='d-block'>Works at Hexagon AB</small>
                                <small className='d-block'>New York, USA</small>
                            </div>
                           <p className='chrome-plus-btn'><img src="assets/images/Group 1863.png" alt="" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChromeSearch;
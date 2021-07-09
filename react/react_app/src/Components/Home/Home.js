import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <div className="row">
                <Link to='/login'>Log in</Link>
                <Link to='/loginError'>Login Error</Link>
                <Link to='/wrongPassword'>Wrong Password</Link>
                <Link to='/signUp'>Sign Up</Link>
                <Link to='/signUpError'>Sign Up Error</Link>
                <Link to='/pricing'>Pricing</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/howToUse'>How to Use</Link>
                <Link to='/paymentFailed'>Payment Failed</Link>
                <Link to='/userGuide'>User Guide</Link>
                <Link to='/saveList'>Save List</Link>
                <Link to='/resetPassword'>Reset Password</Link>
            </div>
        </div>
    );
};

export default Home;
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
                <Link to='/paymentFaild'>Payment Faild</Link>
                <Link to='/userGuide'>User Guide</Link>
                <Link to='/saveList'>Save List</Link>
                <Link to='/resetPassword'>Reset Password</Link>
                <Link to='/firstTimeUser'>First Time User</Link>
                <Link to='/history'>History</Link>
                <Link to='/repeatedUser'>Repeated User</Link>
                <Link to='/detailedInfo'>Detailed Info</Link>
                <Link to='/specificUser'>Specific User</Link>
                <Link to='/searchResult'>Search Result</Link>
                <Link to='/searchResult2'>Search Result 2</Link>
                {/* <Link to='/searchResult3'>Search Result 3</Link> */}
            </div>
        </div>
    );
};

export default Home;
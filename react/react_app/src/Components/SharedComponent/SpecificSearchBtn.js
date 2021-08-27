import React from 'react';
import { useHistory } from 'react-router-dom';
import './Style/style.css';

const SpecificSearchBtn = () => {
   
    return (
        // this opt will toggle the people to company

        <div>
            <div className="btnn btn-1">
            <input type="checkbox" name='' id='switch' />
            <label htmlFor="switch"></label>
            </div>
        </div>

        //this opt will not toglle

        // <div className='btn-container'>
        //     <div className="d-flex justify-content-between">
        //         <button className='people-btn'>People</button>
        //         <button className='company-btn'>Company</button>

        //     </div>
        // </div>
    );
};

export default SpecificSearchBtn;
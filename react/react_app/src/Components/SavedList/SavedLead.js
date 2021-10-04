import React from "react";
import plusIcon from '../../images/accord-plus.png';

const SavedLead = () => {
  return (
    <div className="lead-container">
      <div className="pb-4">
        <div className="container-bg p-2">
          <div className="">
            <div className="row">
              <div className="col d-flex align-items-center">
                <h3 className="fw-bold fs-5 ps-3 m-0">Saved Leads</h3>
              </div>
              <div className="col">
                <div className="accordion-header">
                  <button
                    className="accordion-button "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    style={{
                      background: "white",
                      borderRadius: "50%",
                      paddingRight: "15px",
                      border: "none",
                    }}
                  ></button>
                </div>
              </div>
            </div>

            <div id="collapseOne">
              <div className="" aria-labelledby="">
                <div className="dropdown-wraper">
                  <div className="radio-bg">
                    <span>My leads</span>
                    <input
                      type="checkbox"
                      id="All"
                      value="All"
                    />
                  </div>
                  <div className="radio-bg">
                    <span>Product designer leads</span>
                    <input
                      type="checkbox"
                      id="Follower"
                      value="Follower"
                    />
                  </div>
                  <div className="radio-bg">
                    <span>Product manager leads</span>
                    <input
                      type="checkbox"
                      id="Likers"
                      value="Likers"
                      name="inlineRadioOptions"
                    />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <p className='me-2'>Add new list</p>
                <div>
                <img src={plusIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedLead;

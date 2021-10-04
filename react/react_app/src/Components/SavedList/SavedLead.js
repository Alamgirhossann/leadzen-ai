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
                    <span>All</span>
                    <input
                      type="checkbox"
                      id="All"
                      value="All"
                      // onChange={handleType}
                      // checked={socialMediaType.type.includes("All")}
                    />
                  </div>
                  <div className="radio-bg">
                    <span>Follower</span>
                    <input
                      type="checkbox"
                      id="Follower"
                      value="Follower"
                      // onChange={handleType}
                      // checked={socialMediaType.type.includes("Follower")}
                    />
                  </div>
                  <div className="radio-bg">
                    <span>Likers</span>
                    <input
                      type="checkbox"
                      id="Likers"
                      value="Likers"
                      name="inlineRadioOptions"
                      // onChange={handleTypeChange}
                      // checked={socialMediaData.type.includes("Likers")}
                    />
                  </div>
                  <div className="radio-bg">
                    <span>Commenters</span>
                    <input
                      type="checkbox"
                      id="Commenters"
                      value="Commenters"
                      name="inlineRadioOptions"
                      // onChange={handleTypeChange}
                      // checked={socialMediaData.type.includes("Commenters")}
                    />
                  </div>
                  <div className="radio-bg">
                    <span>Job Seeker</span>
                    <input
                      type="checkbox"
                      id="Job Seeker"
                      value="Job Seeker"
                      // onChange={handleType}
                      // checked={socialMediaType.type.includes("Job Seeker")}
                    />
                  </div>
                  <div className="radio-bg">
                    <span>Group Members</span>
                    <input
                      type="checkbox"
                      id="Group Members"
                      value="Group Members"
                      // onChange={handleType}
                      // checked={socialMediaType.type.includes("Group Members")}
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

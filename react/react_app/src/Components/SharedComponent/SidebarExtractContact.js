import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarExtractContact = () => {
    
    const [socialMediaType, setSocialMediaType] = useState({ url: null, type: [] });
    const [socialMediaSearch, setSocialMediaSearch] = useState({ text: null });

    const handleType = (e) => {
        setSocialMediaType({ ...socialMediaType, type: e.target.value });
    }
    const handleSocialMedia = (e) => {
        setSocialMediaSearch({ ...socialMediaSearch, text: e.target.value })
    }
    const handleTypeSubmit = (e) => {
        e.preventDefault();
        console.log(socialMediaSearch);
    }
   
  
    return (
        <div>
            <div className="sidebar-search-for sidebar-widget p-4 my-3">
                <h6 className="text-danger mb-3">
                    Now Extract contacts
                </h6>
                <p>
                    of Followers, Likers, Commentors & Group Members & Job Seekers
                    From Social Media
                </p>
                <ul className="sidebar-social mt-3 mb-4 list-inline">
                    <li className="list-inline-item">
                        <a href="#">
                            <img src="assets/images/social-facebook.png"
                                alt="title" />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">
                            <img src="assets/images/social-instagram.png"
                                alt="title" />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">
                            <img src="assets/images/social-twitter.png"
                                alt="title" />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">
                            <img src="assets/images/social-linkedin.png"
                                alt="title" />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">
                            <img src="assets/images/social-youtube.png"
                                alt="title" />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#">
                            <img src="assets/images/social-naukri-com.png"
                                alt="title" />
                        </a>
                    </li>
                </ul>

                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control"
                            onBlur={handleSocialMedia}
                            placeholder="Enter Social media URL" />
                    </div>
                    <div className="dropdown mb-3">
                        <input className="form-control dropdown-toggle"
                            id="dropdownMenuButton" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false"
                            placeholder='Search your job' />

                        <div className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton">
                            <div className="dropdown-wraper">
                                <div className='radio-bg'>
                                    <span>All</span>
                                    <input type="checkbox" id='All'
                                        value="All" onChange={handleType}
                                        checked={socialMediaType.type.includes("All")}
                                    />
                                </div>
                                <div className='radio-bg'>
                                    <span>Follower</span>
                                    <input type="checkbox" id='Follower'
                                        value="Follower" onChange={handleType}
                                        checked={socialMediaType.type.includes("Follower")}
                                    />
                                </div>
                                <div className='radio-bg'>
                                    <span >Likers</span>
                                    <input type="checkbox" id='Likers'
                                        value="Likers" onChange={handleType}
                                        checked={socialMediaType.type.includes("Likers")}
                                    />
                                </div>
                                <div className='radio-bg'>
                                    <span>Commentors</span>
                                    <input type="checkbox" id='Comentetors'
                                        value="Commentors" onChange={handleType}
                                        checked={socialMediaType.type.includes("Commentors")}
                                    />
                                </div>
                                <div className='radio-bg'>
                                    <span>Job Seeker</span>
                                    <input type="checkbox" id='Job Seeker'
                                        value="Job Seeker" onChange={handleType}
                                        checked={socialMediaType.type.includes("Job Seeker")}
                                    />
                                </div>
                                <div className='radio-bg'>
                                    <span>Group Members</span>
                                    <input type="checkbox" id='Group Members'
                                        value="Group Members" onChange={handleType}
                                        checked={socialMediaType.type.includes("Group Members")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button style={{ background: "#FB3E3E" }} onClick={handleTypeSubmit}
                        className="btn text-white" type="submit">
                        <span className='pe-1'>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        Search
                    </button>

                    <p className="m-0">
                        <a href="/userGuide" className="learn-link">
                            Learn More
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SidebarExtractContact;
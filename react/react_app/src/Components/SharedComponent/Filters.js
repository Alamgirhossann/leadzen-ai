import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CustomizeButton from './CustomizeButton';

const Filters = () => {
    const [customSearch, setCustomSearch] = useState({
        location: null,
        industry: null,
        job_title: null,
        education: null,
        company_name: null,
        keywords: null,
        csv_file: null
    });

    const handleLocation = (e) => {
        setCustomSearch({ ...customSearch, location: e.target.value });
    }
    const handleIndustry = (e) => {
        setCustomSearch({ ...customSearch, industry: e.target.value });
    }
    const handleJob = (e) => {
        setCustomSearch({ ...customSearch, job_title: e.target.value });
    }
    const handleEducation = (e) => {
        setCustomSearch({ ...customSearch, education: e.target.value });
    }
    const handleCompany = (e) => {
        setCustomSearch({ ...customSearch, company_name: e.target.value });
    }
    const handleKeywords = (e) => {
        setCustomSearch({ ...customSearch, keywords: e.target.value });
    }
    const handleCustomSubmit = (e) => {
        console.log(customSearch);
    }
    const handleCSVFile = (e) => {
        setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
    }


    const [searchText, setSearchText] = useState();
    const [socialMediaType, setSocialMediaType] = useState({ url: null, type: [] });
    const [socialMediaSearch, setSocialMediaSearch] = useState({ text: null });

    const [myLeads, setMyLeads] = useState([{
        name: 'John Smith',
        desc: 'English Speaker',
        comp: 'Hexagon AB',
        search_date: '12/05/2021',
        address: '6720 Ulster Court, Alpharetta, Georgia',
        show: false
    },
    {
        name: 'Joe Mama',
        desc: 'English Speaker',
        comp: 'Apple INC',
        search_date: '05/05/2021',
        address: '6720 Ulster Court, Alpharetta, Georgia',
        show: false
    },]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(searchText);
    }

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
    const handleUnlock = (name) => {
        let index = myLeads.findIndex(myLeads => myLeads.name === name);
        let show_value = myLeads[index].show;
        if (!show_value) {
            myLeads[index] = { ...myLeads[index], show: true };
            console.log(myLeads[index]);
        }
        return false;
    }
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [offset, setOffset] = useState();
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setCurrentPage(selectedPage);
        setOffset(offset);
    }
    return (
        <div>
            <div className="sidebar-search-for sidebar-widget p-4 my-3">

                <div className="sidebar-accordion accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#one"
                            >
                                <img src="assets/images/accord-map-pin.png"
                                    alt="title" />
                                Location
                            </button>
                        </h2>

                        <div id="one" className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <input className='customize-search'
                                    onBlur={handleLocation} type="text"
                                    placeholder='Search Location' />
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#two">
                                <img src="assets/images/accord-coffee.png"
                                    alt="title" />
                                Industry
                            </button>
                        </h2>

                        <div id="two" className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <input className='customize-search'
                                    onBlur={handleIndustry} type="text"
                                    placeholder='Search Industry' />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#tree">
                                <img src="assets/images/accord-award.png"
                                    alt="title" />
                                Job title
                            </button>
                        </h2>
                        <div id="tree" className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <input className='customize-search'
                                    onBlur={handleJob} type="text"
                                    placeholder='Search Job title' />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#four"
                            >
                                <img src="assets/images/accord-book.png"
                                    alt="title" /> Education
                            </button>
                        </h2>
                        <div id="four" className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <input className='customize-search'
                                    onBlur={handleEducation} type="text"
                                    placeholder='Search Education' />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#five"
                            >
                                <img src="assets/images/accord-briefcase.png"
                                    alt="title" />
                                Company Name
                            </button>
                        </h2>

                        <div id="five" className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <input className='customize-search'
                                    onBlur={handleCompany} type="text"
                                    placeholder='Search Company Name' />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#six"
                            >
                                <img src="assets/images/accord-key.png"
                                    alt="title" />
                                Keywords
                            </button>
                        </h2>
                        <div id="six" className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <input className='customize-search'
                                    onBlur={handleKeywords} type="text"
                                    placeholder='Search Keywords' />
                            </div>
                        </div>
                    </div>
                </div>

                <button style={{ background: "#FB3E3E" }}
                    onClick={handleCustomSubmit} className="btn text-white"
                    type="submit"
                >
                    <span className='pe-1'>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    Search
                </button>

                <p>
                    Bulk Search by uploding
                    <a href="#" className="text-danger" onChange={handleCSVFile}
                        data-bs-toggle="modal" data-bs-target="#bulkmodal">
                        csv
                    </a>
                </p>
            </div>
        </div>

    )
}
export default Filters;
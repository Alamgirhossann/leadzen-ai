import React, { useState } from "react";

const SharedHistory = () => {
  const [searchText, setSearchText] = useState();
  const fetchData = async () => {
    // TODO:Create api calls to get user profile data from the backend
  };
  const user = {
    name: "John Smith",
    email: "Johnsmith087@hexagon.in",
    subscription: {
      product: "Free Analystt",
      price: "100 INR",
      period: "Yearly",
      status: "Active",
      last_renewal: "01/02/2020",
      expiry_date: "02/08/2021",
      profile_credits: 500,
      mail_credits: 1000,
    },
  };
  const myLeads = [
    {
      name: "John Smith",
      desc: "English Speaker",
      comp: "Hexagon AB",
      search_date: "12/05/2021",
      mail_used: 7,
      profile_used: 5,
    },
    {
      name: "Joe Mama",
      desc: "English Speaker",
      comp: "Apple INC",
      search_date: "05/05/2021",
      mail_used: 12,
      profile_used: 9,
    },
  ];
  const myTags = [
    {
      tags: ["Tech", "MBA", "USA"],
      search_date: "05/05/2021",
      mail_used: 15,
      profile_used: 22,
    },
  ];
  const handleDelete = (name) => {
    // TODO: Remove element from database if delete is pressed
    let index = myLeads.splice(
      myLeads.findIndex((myLeads) => myLeads.name === name),
      1
    );
    console.log(index + " " + name);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };
  return (
        <div className="text-center p-4 my-3 container-fluid">
          <div className="user-lead-top mb-2 head-btn-style">
            <div className="d-flex align-items-center">
              <h5 className="m-0">
                <img src="assets/images/back-union.png" alt="" /> History
              </h5>
            </div>
            <form action="#" className="search-form-sm">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  onBlur={handleSearch}
                  placeholder="Search"
                />
                <button
                  className="btn btn-danger"
                  onClick={handleSubmit}
                  type="submit"
                >
                  <img src="assets/images/small-search-icon.png" alt="title" />
                </button>
              </div>
            </form>
          </div>

          <div className="accordion-body">
            {myLeads.map((data) => (
              <div className="container-style mt-3">
                <div className="history-container">
                  <p className="Profile text-danger">Profile:</p>
                  <p className="name">{data.name}</p>
                  <div className="date">
                    <div>
                      <small className="d-block">Search Date</small>
                      <small className="d-block">{data.search_date}</small>
                    </div>
                  </div>
                  <div className="credit">
                    <div className="d-flex justify-content-end">
                      <p className="d-flex align-items-center me-2 text-danger">
                        Credits used:
                      </p>
                      <div align="right">
                        <small className="d-block">
                          Profile: {data.profile_used}
                        </small>
                        <small className="d-block">
                          Mail: {data.mail_used}
                        </small>
                      </div>
                    </div>
                  </div>
                  <p className="view-btn" align="right">
                    <a href="/detailedInfo" className="button">
                    Unlock Profile
                    </a>
                  </p>
                  <a
                    href="/history"
                    onClick={(name) => handleDelete(data.name)}
                  >
                    <p className="close-btn">
                      <img src="assets/images/close-user.png" alt="" />
                    </p>
                  </a>
                </div>
              </div>
            ))}
            {myTags.map((data) => (
              <div className="container-style mt-3">
                <div className="history-container">
                  <p className="Profile text-danger">Tags:</p>
                  {data.tags.map((tag) => (
                    <p>
                      <div className="name" key={tag}>
                        <p>{tag} &nbsp;</p>
                      </div>
                    </p>
                  ))}
                  <div className="date">
                    <div>
                      <small className="d-block">Search Date</small>
                      <small className="d-block">{data.search_date}</small>
                    </div>
                  </div>
                  <div className="credit">
                    <div className="d-flex justify-content-end">
                      <p className="d-flex align-items-center me-1 text-danger">
                        Credits used:
                      </p>
                      <div align="right">
                        <small className="d-block">
                          Profile: {data.profile_used}
                        </small>
                        <small className="d-block">
                          Mail: {data.mail_used}
                        </small>
                      </div>
                    </div>
                  </div>
                  <p className="view-btn" align="right">
                    <a href="/detailedInfo" className="button">
                    Unlock Profile
                    </a>
                  </p>
                  <p className="close-btn">
                    <img src="assets/images/close-user.png" alt="" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
     
  );
};

export default SharedHistory;

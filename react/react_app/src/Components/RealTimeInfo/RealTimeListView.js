import React, { useEffect } from "react";
import Header from "../SharedComponent/Header";

const RealTimeListView = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
  return (
    <div>
      <Header user={user} />
      <div className="container">
        <div className="map-section">
          <div className="row">
            <div className="col-md-6">
              <img src="assets/images/realtime (9).png" alt="" />
            </div>
            <div className="col-md-6">
              <div className="tranding-lead">
                <img src="assets/images/realtime (5).png" alt="" />
                <h4>Real Time Trending Leads</h4>
                <p>Get Real Time Verified Leads With Analystt.AI</p>
                <p>Grab your Leads Now !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="user-lead-top mb-2 head-btn-style">
          <div className="">
            <h5 className="m-0">Marketing Trend</h5>
          </div>
          <form className="search-form-sm">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <button className="btn btn-danger" type="submit">
                <img src="assets/images/small-search-icon.png" alt="title" />
              </button>
            </div>
          </form>
          {/* <img src="assets/images/top-arrow.png" alt="" /> */}
        </div>
      </div>
      <div className="container">
        <section className="item-section">
          <table className="w-100">
            <thead className="table-head ">
              <tr className="p-5">
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">People wanted to switch jobs</td>
                <td className="">
                  <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                    2 hours ago{" "}
                  </small>
                </td>
                <td className="d-flex align-items-center">
                  <div
                    style={{
                      fontSize: "16px",
                      background: "#CCE1FF",
                      padding: "0px 20px",
                      borderRadius: "5px",}}
                  >
                    <span>200 Leads</span>
                  </div>
                </td>
                <td className="">
                  Get Leads with just <span className="text-danger">200</span>{" "}
                  Credits
                </td>
                <td className="">
                  <button className="trends-btn">Grab Leads Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div className="container">
        <section className="item-section">
          <table className="w-100">
            <thead className="table-head ">
              <tr className="p-5">
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">People wanted to switch jobs</td>
                <td className="">
                  <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                    2 hours ago{" "}
                  </small>
                </td>
                <td className="d-flex align-items-center">
                  <div
                    style={{
                      fontSize: "16px",
                      background: "#CCE1FF",
                      padding: "0px 20px",
                      borderRadius: "5px",}}
                  >
                    <span>200 Leads</span>
                  </div>
                </td>
                <td className="">
                  Get Leads with just <span className="text-danger">200</span>{" "}
                  Credits
                </td>
                <td className="">
                  <button className="trends-btn">Grab Leads Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div className="container">
        <section className="item-section">
          <table className="w-100">
            <thead className="table-head ">
              <tr className="p-5">
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">People wanted to switch jobs</td>
                <td className="">
                  <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                    2 hours ago{" "}
                  </small>
                </td>
                <td className="d-flex align-items-center">
                  <div
                    style={{
                      fontSize: "16px",
                      background: "#CCE1FF",
                      padding: "0px 20px",
                      borderRadius: "5px",}}
                  >
                    <span>200 Leads</span>
                  </div>
                </td>
                <td className="">
                  Get Leads with just <span className="text-danger">200</span>{" "}
                  Credits
                </td>
                <td className="">
                  <button className="trends-btn">Grab Leads Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div className="container">
        <section className="item-section">
          <table className="w-100">
            <thead className="table-head ">
              <tr className="p-5">
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">People wanted to switch jobs</td>
                <td className="">
                  <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                    2 hours ago{" "}
                  </small>
                </td>
                <td className="d-flex align-items-center">
                  <div
                    style={{
                      fontSize: "16px",
                      background: "#CCE1FF",
                      padding: "0px 20px",
                      borderRadius: "5px",}}
                  >
                    <span>200 Leads</span>
                  </div>
                </td>
                <td className="">
                  Get Leads with just <span className="text-danger">200</span>{" "}
                  Credits
                </td>
                <td className="">
                  <button className="trends-btn">Grab Leads Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div className="container">
        <section className="item-section">
          <table className="w-100">
            <thead className="table-head ">
              <tr className="p-5">
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">People wanted to switch jobs</td>
                <td className="">
                  <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                    2 hours ago{" "}
                  </small>
                </td>
                <td className="d-flex align-items-center">
                  <div
                    style={{
                      fontSize: "16px",
                      background: "#CCE1FF",
                      padding: "0px 20px",
                      borderRadius: "5px",}}
                  >
                    <span>200 Leads</span>
                  </div>
                </td>
                <td className="">
                  Get Leads with just <span className="text-danger">200</span>{" "}
                  Credits
                </td>
                <td className="">
                  <button className="trends-btn">Grab Leads Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div className="container">
        <section className="item-section">
          <table className="w-100">
            <thead className="table-head ">
              <tr className="p-5">
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">People wanted to switch jobs</td>
                <td className="">
                  <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                    2 hours ago{" "}
                  </small>
                </td>
                <td className="d-flex align-items-center">
                  <div
                    style={{
                      fontSize: "16px",
                      background: "#CCE1FF",
                      padding: "0px 20px",
                      borderRadius: "5px",}}
                  >
                    <span>200 Leads</span>
                  </div>
                </td>
                <td className="">
                  Get Leads with just <span className="text-danger">200</span>{" "}
                  Credits
                </td>
                <td className="">
                  <button className="trends-btn">Grab Leads Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div className="container">
        <section className="item-section">
          <table className="w-100">
            <thead className="table-head ">
              <tr className="p-5">
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
                <th className="text-secondary" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">People wanted to switch jobs</td>
                <td className="">
                  <small style={{ fontSize: "14px", color: "#00BA4A" }}>
                    2 hours ago{" "}
                  </small>
                </td>
                <td className="d-flex align-items-center">
                  <div
                    style={{
                      fontSize: "16px",
                      background: "#CCE1FF",
                      padding: "0px 20px",
                      borderRadius: "5px",}}
                  >
                    <span>200 Leads</span>
                  </div>
                </td>
                <td className="">
                  Get Leads with just <span className="text-danger">200</span>{" "}
                  Credits
                </td>
                <td className="">
                  <button className="trends-btn">Grab Leads Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default RealTimeListView;

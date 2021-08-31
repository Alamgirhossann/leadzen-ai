import React from "react";

const CustomizeButton = () => {
  return (
    <div>
      <p className="text-left top-search" style={{ width: "100px" }}>
        <img
          src="assets/images/cil_location-pin.png"
          style={{ width: "10px", marginRight: "5px" }}
          alt=""
        />
        USA
        <img className="ps-4" src="assets/images/cross-icon.png" alt="" />
      </p>
      <p className="text-left top-search" style={{ width: "130px" }}>
        <img
          style={{ width: "8px", marginRight: "5px" }}
          src="assets/images/pro-profile.png"
          alt=""
        />
        Designer
        <img className="ps-4" src="assets/images/cross-icon.png" alt="" />
      </p>
      <div className="d-flex justify-content-between">
        <p>
          <img
            style={{ width: "10px", marginRight: "5px" }}
            src="assets/images/combined-eye.png"
            alt=""
          />
          Hide
        </p>
        <p className="text-danger">Clear All</p>
      </div>
    </div>
  );
};

export default CustomizeButton;

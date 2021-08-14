import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const BulkSearch = () => {
  return (
    <div className="user-widget-box p-4 my-3 text-center">
      <h5 className="text-danger">Try Bulk Search Now</h5>
      <p className="text-dark mb-3">
        <span className='text-danger'>Format to follow :</span> Ensure that the first column has the unique values
        you’re searching for.
      </p>
      <p className='text-danger'>Click here to download csv format</p>
      <div className='browse-file'>
        <p>Drag and Drop File</p>
        <p>or</p>
        <button className='browse-btn'>Browse</button>
      </div>
      <button
        style={{ background: "#FB3E3E" }}
        className="btn text-white"
        type="submit"
      >
        <span className="pe-1">
          <FontAwesomeIcon icon={faSearch} />
        </span>{" "}
        Search
      </button>
    </div>
  );
};

export default BulkSearch;

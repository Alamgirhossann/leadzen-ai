import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const BulkSearch = (data) => {
  const [uploadedCSV, setUploadedCSV] = useState("");
  const [sampleChecked, setSampleChecked] = useState(false);

  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

  const handleCsvUpload = () => {
    document.getElementById("csv-input").click();
    console.log(uploadedCSV);
  };

  const uploadCsv = async () => {
    const element = document.getElementById("csv-input");
    const file = element.files[0];
    if (file) {
      console.log(`file.size:${file.size} Bytes`);

      if (file.size > 2 * 1024 * 1024) {
        console.warn(`file size larger than : ${2 * 1024 * 1024} Bytes`);
        alert("Cannot Accept File Sizes larger than 2MB");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      function handleError(response = null) {
        console.log("response", response);
        // console.error(`Error Uploading File: status: ${response?.status}`);
        alert("Error Uploading File, Please Try Again Later");
      }

      try {
        const response = await fetch(apiServer + "/bulk_upload/csv", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        });

        async function handleSuccess(response) {
          const json = await response.json();
          console.log("json", json);
          if (json.detail) {
            alert(json.detail);
          } else {
            alert(
              "Search results are sent to your email as a CSV file. Please check your spam filter if our email has" +
                " not arrived in a reasonable time. Cheers!"
            );
          }
          // if (!json) {
          //   return handleError();
          // }
          // console.log(json);
        }

        function handleUnAuthorized(response = null) {}

        switch (response.status) {
          case 200:
            return await handleSuccess(response);
          case 401:
            return handleUnAuthorized();
          default:
            return handleError(response);
        }

        // const eventSource = new EventSource(
        //   `${apiServer}/bulk_upload/status/stream?filename=${json.output_filename}`
        // );
        // eventSource.addEventListener("update", (event) => {
        //   console.log(event);
        // });
        // eventSource.addEventListener("end", (event) => {
        //   console.log(event);
        //   const data = JSON.parse(event.data);
        //   console.log(data);
        //   alert(`Fetch Search Results from ${apiServer}${data.url}`);
        //   eventSource.close();
        // });
      } catch (err) {
        console.error("Error: ", err);
        handleError();
      }
    } else {
      alert("Please upload a file");
    }
  };

  useEffect(() => {}, [uploadedCSV]);

  useEffect(() => {}, [sampleChecked]);

  return (
    <div
      className="user-widget-box p-4 my-3 text-center"
      style={{ textAlign: "center", width: "100%" }}
    >
      <h5 className="text-danger">Try Bulk Search Now</h5>
      <p className="text-dark mb-3">
        <span className="text-danger">Format to follow :</span> Ensure that the
        first column has the unique values you’re searching for.
      </p>
      <a
        className="text-danger"
        href="assets/sample.csv"
        onClick={(e) => setSampleChecked(true)}
      >
        {data.data ? "" : "Click here to download csv format"}
      </a>

      <input
        id="csv-input"
        type="file"
        accept=".csv,.xlsx"
        defaultValue={uploadedCSV}
        onChange={async (e) => setUploadedCSV(e.target.files[0])}
        style={{ display: "none" }}
      />

      <div className="browse-file">
        <p>Drag and Drop File</p>
        <p>or</p>
        <button
          className="browse-btn"
          onClick={handleCsvUpload}
          disabled={data.data}
        >
          Browse
        </button>
        <p>{uploadedCSV && uploadedCSV.name}</p>
      </div>

      <button
        style={{ background: "#FB3E3E" }}
        className="btn text-white"
        type="submit"
        onClick={async (e) => uploadCsv()}
        disabled={data.data}
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

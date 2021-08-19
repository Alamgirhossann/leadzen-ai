import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const BulkSearch = () => {
    const [uploadedCSV, setUploadedCSV] = useState("")
    const [sampleChecked, setSampleChecked] = useState(false)

    const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

    const handleCsvUpload = () => {
        document.getElementById('csv-input').click();
        console.log(uploadedCSV);
    }

    const uploadCsv = async () => {
        const formData = new FormData();
        if (typeof (uploadedCSV) === "object") {
            formData.append("csv-input", uploadedCSV);
            try {
                const response = await fetch(apiServer + "/bulksearch/csvupload", {
                    method: "POST",
                    body: formData
                })
                let json_response = await response.json();
                if (json_response) {
                    console.log(json_response);
                    // console.log("success");
                }
            } catch (err) {
                console.error("Error: ", err);
            }
        } else return

    }

    useEffect(() => {
    }, [uploadedCSV]);

    useEffect(() => {
    }, [sampleChecked]);


    return (
        <div className="user-widget-box p-4 my-3 text-center" style={{textAlign: "center", width: "100%"}}>
            <h5 className="text-danger">Try Bulk Search Now</h5>
            <p className="text-dark mb-3">
                <span className='text-danger'>Format to follow :</span> Ensure that the first column has the unique
                values
                you’re searching for.
            </p>
            <a className='text-danger'
               href='assets/sample.csv'
               onClick={(e) => setSampleChecked(true)}
            >
                Click here to download csv format
            </a>

            <input
                id="csv-input"
                type="file"
                accept=".csv"
                defaultValue={uploadedCSV}
                onChange={async (e) => setUploadedCSV(e.target.files[0])}
                style={{display: "none"}}
            />

            <div className='browse-file'>
                <p>Drag and Drop File</p>
                <p>or</p>
                <button className='browse-btn'
                        onClick={handleCsvUpload}
                        disabled={sampleChecked ? "" : "disabled"}
                >
                    Browse
                </button>
                <p>
                    {uploadedCSV && uploadedCSV.name}
                </p>
            </div>

            <button
                style={{background: "#FB3E3E"}}
                className="btn text-white"
                type="submit"
                onClick={uploadCsv}
            >
        <span className="pe-1">
          <FontAwesomeIcon icon={faSearch}/>
        </span>{" "}
                Search
            </button>
        </div>
    );
};

export default BulkSearch;

import React, { useState, useEffect } from 'react';

const CsvBlock = () => {
    const [uploadedCSV, setUploadedCSV] = useState("")
    const [sampleChecked, setSampleChecked] = useState(false)

    useEffect(() => {
    },[sampleChecked]);

    return (
    <div>
        <a
            href='assets/sample.csv'
            onClick={(e)=>setSampleChecked(true)}
        >
            Check Sample
        </a> &nbsp;
        before uploading your csv.
        <br/>

        { sampleChecked &&
            <input
                type="file"
                accept=".csv"
                defaultValue={uploadedCSV}
                onChange={(e)=>setUploadedCSV(e.target.files[0])}
                disabled="disabled"
            />
        }
    </div>
    );
};
export default CsvBlock;
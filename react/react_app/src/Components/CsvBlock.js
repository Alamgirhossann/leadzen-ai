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
        </a>

        { sampleChecked &&
            <input
                type="file"
                accept=".csv"
                defaultValue={uploadedCSV}
                onChange={(e)=>setUploadedCSV(e.target.files[0])}
            />
        }
    </div>
    );
};
export default CsvBlock;
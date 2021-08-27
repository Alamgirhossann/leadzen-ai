import React from 'react'
import FileSaver from "file-saver";
import XLSX from "xlsx";

const ExcelDownload = () => {

  const apiData = [{"Name":"Piyush Jaiswal","FirstName":"Piyush","LastName":"Jaiswal","Job":"Developer"}]
  console.log("apidata",apiData)
  const fileName = "report"
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
  );
};

export default ExcelDownload

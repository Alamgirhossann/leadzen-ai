import React, {useState,useEffect} from "react";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const Verification = () => {
    const [response,setResponse]=useState('')
    const [error,setError]=useState('')
    var url_string = window.location.href;
    var url = new URL(url_string);
    var paramValue = url.searchParams.get("token");
    console.log("param",paramValue)
    const data = {"token":paramValue}

    useEffect(() => {
        fetchData()
    },[])

     const fetchData = async () => {

      try {
        const fetchResponse = await fetch(apiServer + "/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        let json_res = await fetchResponse.json();
        if (json_res.username){
            setResponse(json_res.username)
        }
        else {
            setError(json_res.detail)
        }
        console.log("Data>>>>>>>>>>>", json_res);
      } catch (err) {
        console.error("Error: ", err);
      }

    };
    return (
        <>
            {response?<h2>hi {response} thanks for registration</h2>:<h2>{error}</h2>}
        </>
    )
}
export default Verification;
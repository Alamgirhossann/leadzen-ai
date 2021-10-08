import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { Link } from "react-router-dom";
import Pagination from "../SharedComponent/Pagination";
import Header from "../SharedComponent/Header";
import Filters from "../SharedComponent/Filters";
import SidebarExtractContact from "../SharedComponent/SidebarExtractContact";
import SpecificUser from "../DetailedInfo/SpecificUser";
import BulkSearch from "../SharedComponent/BulkSearch";
import AskJarvis from "../SharedComponent/AskJarvis";
import SpecificSearchBtn from "../SharedComponent/SpecificSearchBtn";
import Cookies from "js-cookie";
import Lottie from "react-lottie";
import personLoader from "../Loader/personLoader"
import SavedListButton from "./SavedListButton";
import axios from "axios";
import { EventEmitter } from "events";

export async function digestMessage(message) {
  console.log("Message....", message);
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

const SearchResult = (props) => {
  const [customSearch, setCustomSearch] = useState({
    location: null,
    industry: null,
    job_title: null,
    education: null,
    company_name: null,
    keywords: null,
    csv_file: null,
  });
  const [specificUserDetails, setSpecificUserDetails] = useState([
    { index: null, details: null, proxyCurl: null },
  ]);
  const [unlockEmailDetails, setUnlockEmailDetails] = useState([
    { index: null, details: null },
  ]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [unlockplus, setUnlockPlus] = useState({});
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLeads, setCurrentLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [wait, setWait] = useState(null);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedLeadHashKey, setSelectedLeadHashKey] = useState([]);
  // const [selectedSaveList, setSelectedSaveList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedList, setSearchedList] = useState([]);
  const newEvent = new EventEmitter();
  const tempCookie = Cookies.get("user_linkedin_cookie");
  const [selectedLeadIndex, setSelectedLeadIndex] = useState([]);
  const [searchId, setSearchId] = useState();
  let today = new Date();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
    const postsPerPage = 10;

  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  const paginate = (pageNumber) => {
    setCurrentLeads([]);
    setCurrentPage(pageNumber);
    setCurrentLeads(
      searchedList && Array.isArray(searchedList)
        ? searchedList.slice(pageNumber * 10 - 10, pageNumber * 10)
        : 0
    );
  };

  today = dd + "/" + mm + "/" + yyyy;

  function handleUnAuthorized(response = null) {
    console.log("User is UnAuthorized");
    handleError();
    alert("Please Logout and LogIn Again");
  }

  function handleCookieError(response) {
    // got cookie error - no need to check again, results will not change
    console.log("Response cookie error", response.statusText);
    handleError();
  }

  function handleNotFound() {
    console.log("Not Found Yet, Waiting...");
  }

  function handleError(status) {
    setLoading(false);
    setMyLeads([]);
    console.error(`Got HTTP Error ${status}`);
    alert("Error Searching For Leads");
  }

  function handleInsufficientBalance(response) {
    console.error("Insufficient credits...", response);
    alert("Insufficient Credits");
  }

  useEffect(async () => {
    console.log(">>>>>>>>>>", props);
    if (
      props.location.pathname.includes("/result_by_name") ||
      props.location.pathname.includes("/advanceSearch")
    ) {
      let requestForTexAu = {};
      if (props.location.state.requestTexAu) {
        console.log(
          "from advance. requestTexAu name.....",
          props.location.state.requestTexAu
        );
        setSearchTerm(props.location.state.requestTexAu.searchTerm);
        console.log("serchterm...after set advance search", searchTerm);
        requestForTexAu = props.location.state.requestTexAu;
        setLoading(true);
      }
      let keyword = null;
      let isKeyword,
        isEducation = false;
      if (props.location.state.customSearch) {
        console.log("serchterm...after set custom search", searchTerm);
        setCustomSearch(props.location.state.customSearch);
        console.log(
          "from advance.customSearch filters .....",
          props.location.state.customSearch
        );
        if (props.location.state.customSearch.search_type)
          if (props.location.state.customSearch.keywords) isKeyword = true;
        if (props.location.state.customSearch.education) isEducation = true;
        if (isKeyword && isEducation)
          keyword =
            props.location.state.customSearch.keywords +
            " " +
            props.location.state.customSearch.education;

        if (!isEducation && isKeyword)
          keyword = props.location.state.customSearch.keywords;
        if (!isKeyword && isEducation)
          keyword = props.location.state.customSearch.education;
        requestForTexAu = {
          firstName: "",
          lastName: "",
          title: props.location.state.customSearch.job_title
            ? props.location.state.customSearch.job_title
            : "",
          keywords: keyword ? keyword : "",
          industry: props.location.state.customSearch.industry
            ? [props.location.state.customSearch.industry]
            : [],
          location: props.location.state.customSearch.location
            ? [props.location.state.customSearch.location]
            : [],
          currentCompany: props.location.state.customSearch.company_name
            ? [props.location.state.customSearch.company_name]
            : [],
          pastCompany: [],
        };
        console.log("request....", requestForTexAu);
        setLoading(true);
      }
      const endpoint = "/texau/linkedin/matching_profiles";
      const inputData = requestForTexAu;
      inputData.cookie = tempCookie;
      await sendForExecution(endpoint, inputData);
    }

    if (props.location.pathname.includes("/social_url_search")) {
      if (!props.location.state) {
        console.warn("no state found");
        return;
      }

      console.log(`state data: ${props.location.state}`);

      const inputData = props.location.state.data;
      const endpoint = props.location.state.endpoint;
      console.log("serchterm...after set social search", searchTerm);
      setLoading(true);

      await sendForExecution(endpoint, inputData);
    }

    if (props.location.pathname.includes("/result_by_history_type1")) {
      try {
        const response = await fetch(
          apiServer + `/history/id/${props.location.state.details.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );
        let json_res = await response.json();
        setSearchId(json_res.id);
        // setTimeout(() => {
        console.log(
          "174 Data>>>>>>>>>>>loading..",
          json_res.id,
          json_res,
          loading
        );
        setLoading(false);
        setMyLeads(json_res.search_results);
        // }, 60000);
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  }, [props.location.state.customSearch]);

  const sendForExecution = async (endpoint, inputData) => {
    console.log(`endpoint: ${endpoint}, inputData: ${inputData}`);
    console.log(inputData);

    try {
      const response = await fetch(apiServer + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify(inputData),
      });

      function handleUnAuthorized(response = null) {
        console.log("User is UnAuthorized");
        // alert("Please Logout and LogIn Again");
        setLoading(false);
        setMyLeads([]);
      }

      async function handleSuccess(response) {
        let json = await response.json();
        if (!json || !json.execution_id) {
          handleError(response);
        }

        console.log(`Got Response ${json}`);
        checkExecutionStatus(json.execution_id);
      }

      switch (response.status) {
        case 200:
          return await handleSuccess(response);
        case 401:
          return handleUnAuthorized(response);
        default:
          return handleError(response);
      }
    } catch (err) {
      console.error(`Exception Getting Data from ${endpoint}`);
      console.error(err);
      handleError(500);
    }
  };

  const checkExecutionStatus = (executionId = null) => {
    if (!executionId) {
      console.log("executionId is Null");
      return;
    }

    let timeoutId;

    const intervalId = setInterval(async () => {
      console.log("In interval.....");
      try {
        const response = await fetch(
          apiServer + `/texau/result/${executionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );

        function handleError() {
          if (timeoutId) clearTimeout(timeoutId);
          clearInterval(intervalId);

          setLoading(false);
          setMyLeads("");
        }

        async function handleSuccess(response) {
          const json = await response.json();
          if (!json || !json.data) {
            console.warn(`Invalid Data`);
            return handleError();
          }

          console.log(json);

          setLoading(false);
          if (timeoutId) clearTimeout(timeoutId);
          clearInterval(intervalId);

          setMyLeads(json.data);
          await saveSearchedRecord(json.data, "texAu");
        }

        switch (response.status) {
          case 200:
            return handleSuccess(response);
          case 401:
            clearInterval(intervalId);
            return handleUnAuthorized(response);
          case 403:
            clearInterval(intervalId);
            return handleCookieError(response);
          case 404:
            return handleNotFound();
          default:
            return handleError();
        }
      } catch (e) {
        console.error("Exception>>", e);
      }
    }, 5 * 1000);

    timeoutId = setTimeout(function () {
      console.error("record not found within 5 Min");
      clearInterval(intervalId);
      setLoading(false);
      setMyLeads("");
    }, 5 * 60 * 1000);
  };

  useEffect(() => {}, [loading]);

  useEffect(() => {
    paginate(1);
  }, [searchedList]);

  useEffect(() => console.log(specificUserDetails), [specificUserDetails]);
  console.log("myLeads>>>>>>>>>>>", myLeads);

  const [show, setShow] = useState(false);
  // const [selected, setSelected] = useState(false);

  const handleUnlockEmail = async (e, index, data, props) => {
    setWait(`${currentPage}${index}`);
    e.preventDefault();
    console.log("in handle unlock>>>>", data);
    // try {
     let linkedin_url=null
    if (props.location.pathname.includes("/social_url_search")) {
      linkedin_url=data.profileLink
    }
    else{
      linkedin_url=data.url
    }

    let isDuplicate = false;

    unlockEmailDetails.map((spec) => {
      console.log("spec email>>>", spec.index);
      if (spec.index === `${currentPage}${index}`) {
        isDuplicate = true;
      }
    });
    console.log("isDuplicate>>>>", isDuplicate);
    if (isDuplicate === false) {
      let urls = "";
      if (props.location.pathname.includes("/social_url_search")){
        urls=data.profileLink
      }else{
      for (let i = 0; i < data.url.length; i++) {
        if (data.url[i] === "?") {
          break;
        } else {
          urls = urls + data.url[i];
        }
      }}
      let url = [urls];
      console.log("url>>>", url);
      let hash_key = await digestMessage(data.url);
      console.log("hash_key>>>>>>>>", hash_key);
      let requestForEmail = {
        url: url,
        hash_key: hash_key,
      };
      try {
        const responseEmail = await fetch(apiServer + "/snov/emails_for_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(requestForEmail),
        });
        if (responseEmail.status === 401) {
          alert("Please Logout and Login again.");
        }
        if (responseEmail.status === 402) {
          alert(
            "You have insufficient profile credit. Buy Credits to get details."
          );
        }
        if (responseEmail.status === 200) {
          const resultEmail = await responseEmail.json();
          setUnlockEmailDetails((prev) => [
            ...prev,
            {
              index: `${currentPage}${index}`,
              details: { email: resultEmail },
            },
          ]);
          if (resultEmail) {
            let requestForSaveEmailCredit = {
              search_id: searchId,
              email_addresses: [resultEmail],
              search_index: parseInt(`${currentPage}${index}`),
            };

            try {
              const response = await fetch(
                apiServer + "/credits/email/bulk_add",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${Cookies.get("user_token")}`,
                  },
                  body: JSON.stringify(requestForSaveEmailCredit),
                }
              );

              const result = response.json();
              newEvent.emit("updateCredit", true);
              console.log(
                "response from saveResult>>>",
                result,
                result.search_id
              );
            } catch (e) {
              console.error("Exception>>", e);
            }
          } else {
            setUnlockEmailDetails((prev) => [
              ...prev,
              {
                index: `${currentPage}${index}`,
                details: { email: `Not Found` },
              },
            ]);
          }
        }
        if (responseEmail.status === 404) {
          setUnlockEmailDetails((prev) => [
            ...prev,
            {
              index: `${currentPage}${index}`,
              details: { email: `Not Found` },
            },
          ]);
        }
        if (responseEmail.status === 500) {
          alert("Error getting data from server.Please try again.");
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    } else {
      unlockEmailDetails?.map((spec) => {
        console.log(
          "Check details>>>>",
          spec.index,
          spec.details === "Record Not Found"
        );
      });
    }
    setWait(null);
  };

  useEffect(() => {
    setShow(new Array(myLeads?.length).fill().map((item) => false));
  }, [currentLeads]);

  useEffect(() => {
    console.log("set>>>", selectedLeadHashKey);
  }, [selectedLeadHashKey]);
  // const clickSelect = (e) => {
  //   e.preventDefault();
  //   // if (!selected) setSelected(true);
  // };
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

  const handleCSVFile = (e) => {
    setCustomSearch({ ...customSearch, csv_file: e.target.files[0] });
  };

  const saveSearchedRecord = async (response, searchType) => {
    console.log("In saveSearchedRecord...searchTerm", searchTerm);
    let search_term = "";
    if (
      props.location.pathname.includes("/result_by_name") ||
      props.location.pathname.includes("/advanceSearch")
    ) {
      if (props.location.state.requestTexAu) {
        search_term = props.location.state.requestTexAu.searchTerm;
      }
      if (props.location.state.customSearch) {
        let values = Object.values(props.location.state.customSearch);
        search_term = values.filter(Boolean).toString();
        console.log("Values Only.....>>>>", search_term);
      }
    }
    if (props.location.pathname.includes("/social_url_search")) {
      search_term = props.location.state.data;
    }
    let requestForSaveSearch = {
      search_type: searchType,
      search_term: search_term,
      search_results: response,
    };
    console.log("In saveSearchedRecord...", requestForSaveSearch);
    try {
      const response = await fetch(apiServer + "/history/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        body: JSON.stringify(requestForSaveSearch),
      });

      const result = await response.json();
      console.log("result >>>>>>>>>>>>>>>>>", result);
      setSearchId(result.search_id);
      // result.then((value) => {
      //   console.log("value >>>>> ", value);
      //   if (value)
      // });
      console.log("response from saveResult>>>", result, result.search_id);
    } catch (e) {
      console.error("Exception>>", e);
    }
  };

  const handleProfile = async (index, data, props) => {
    let linkedin_url=null
    if (props.location.pathname.includes("/social_url_search")) {
      linkedin_url=data.profileLink
    }
    else{
      linkedin_url=data.url
    }

    let hash_key = await digestMessage(linkedin_url);
    console.log("hash_key>>>>>>>>>>", hash_key);
    let reqJsonPipl = {
      email: "",
      name: { first_name: "", last_name: "" },
      url: linkedin_url,
      hash_key: hash_key,
    };
    console.log("in Handle profile...", `${currentPage}${index}`, data);
    function handleError(status) {
      console.error(`Got HTTP Error ${status.statusText}`);
    }
    try {
      let isDuplicate = false;

      specificUserDetails.map((spec) => {
        console.log("spec>>>", spec.index);
        if (spec.index === `${currentPage}${index}`) {
          isDuplicate = true;
        }
      });
      console.log("isDuplicate>>>>", isDuplicate);
      if (isDuplicate === false) {
        console.log("In Fetch......");
        setLoadingProfile(true);
        let proxyCurlJson = null;
        const [response, proxyCurlResponse] = await Promise.all([
          fetch(apiServer + "/pipl/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
            body: JSON.stringify(reqJsonPipl),
          }),
          fetch(apiServer + "/proxycurl/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
            body: JSON.stringify({ url: linkedin_url }),
          }),
        ]);

        setLoadingProfile(false);
        if (proxyCurlResponse.status === 200) {
          proxyCurlJson = await proxyCurlResponse.json();
        }

        if (response.status === 402) {
          alert(
            "You have insufficient profile credit. Buy Credits to get details."
          );
        }
        if (response.status === 500 || proxyCurlResponse.status === 500) {
          handleError(response);
        }
        let json_res = null;
        if (response.status === 200) {
          json_res = await response.json();
        }
        if (response.status === 400 || proxyCurlResponse.status === 400) {
          handleError(response);
        }
        if (response.status === 401 || proxyCurlResponse.status === 401) {
          handleError(response);
        }
        console.log("json_res>>>>>", json_res);
        let phones = [];
        if (json_res) {
          for (let i = 0; i < json_res.length; i++) {
            let obj = json_res[i];
            console.log("in for loop pipl>>>", obj, ">>>>");
            if (obj.phones) {
              for (let j = 0; j < obj.phones.length; j++) {
                phones.push(obj.phones[j].number);
              }
            }
          }
          console.log("Phones>>>>>>", phones);
          if (phones.length >= 1) {
            let requestForSaveProfileCredit = {
              search_id: searchId,
              phone_numbers: phones,
              search_index: `${currentPage}${index}`,
            };
            try {
              const response = await fetch(
                apiServer + "/credits/profile/bulk_add",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${Cookies.get("user_token")}`,
                  },
                  body: JSON.stringify(requestForSaveProfileCredit),
                }
              );

              const result = response.json();
              console.log("Emittingn event", newEvent);
              newEvent.emit("updateCredit", true);
              console.log("response from saveResult>>>", result);
            } catch (e) {
              console.error("Exception>>", e);
            }
            setSpecificUserDetails((prev) => [
              ...prev,
              {
                index: `${currentPage}${index}`,
                details: json_res[0],
                proxyCurl: proxyCurlJson !== null ? proxyCurlJson : null,
              },
            ]);
          }
          // else {
          //   setSpecificUserDetails((prev) => [
          //     ...prev,
          //     {
          //       index: `${currentPage}${index}`,
          //       details: "Record Not Found",
          //     },
          //   ]);
          // }
        } else {
          console.log("In setSpecificUserDetails else");
          setSpecificUserDetails((prev) => [
            ...prev,
            { index: `${currentPage}${index}`, details: "Record Not Found" },
          ]);
          console.log(
            "In setSpecificUserDetails else ress....",
            specificUserDetails
          );
        }
      }

      console.log("specificUser>>>>>>>", specificUserDetails);
      specificUserDetails?.map((spec) => {
        console.log(
          "Check details>>>>",
          spec.index,
          spec.details === "Record Not Found"
        );
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };
    const handleLeadSelectionChange = async (e, index) => {
    console.log(
      "selectedLeads.length === currentLeads.length>>>",
      selectedLeads.length === currentLeads.length,
      selectedLeadIndex.length,
      currentLeads.length
    );
    if (selectedLeads.length === currentLeads.length) {
      setIsCheckAll(!isCheckAll);
    }
    const { id, checked } = e.target;
    let hash_key = null;
    let tempJson = {};
    let index_json = {};
    console.log("id...", id,index);
    setSelectedLeads([...selectedLeads, id]);
    hash_key = await digestMessage(id);

    tempJson[id] = hash_key;
    index_json[hash_key] = `${index}`;
    setSelectedLeadHashKey([...selectedLeadHashKey, tempJson]);
    setSelectedLeadIndex([...selectedLeadIndex, index_json]);
    if (!checked) {
      setSelectedLeads(selectedLeads.filter((item) => item !== id));
      setSelectedLeadHashKey(
        selectedLeadHashKey.filter((item) => item[id] !== hash_key)
      );
      setSelectedLeadIndex(
        selectedLeadIndex.filter((item) => item[hash_key] !== index)
      );
    }
    console.log(
      "seleched hash key>>>>",
      selectedLeadHashKey,
      ">>>>",
      selectedLeadIndex,
      ">>>>>",
      selectedLeads
    );
  };

  const handleLeadSelectAll = async (e) => {
    setIsCheckAll(!isCheckAll);
    console.log("In select All", isCheckAll);
    if (isCheckAll) {
      setSelectedLeads([]);
      setSelectedLeadHashKey([]);
      setSelectedLeadIndex([]);
    } else {
      for (let i = 0; i < currentLeads.length; i++) {
        console.log("in loop.....",currentLeads.length);
        let hash_list_selected = {};
        let index_list_selected = {};
        let hash_key_i = await digestMessage(
          JSON.stringify(currentLeads[i].url)
        );
        console.log("hash_key_i>>>>", hash_key_i);
        hash_list_selected[currentLeads[i].url] = hash_key_i;
        index_list_selected[hash_key_i] = `${currentPage}${i}`;
        setSelectedLeadHashKey((prev) => [...prev, hash_list_selected]);
        setSelectedLeadIndex((prev) => [...prev, index_list_selected]);
      }

      setSelectedLeads(currentLeads.map((li) => li.url || li.profileLink));
    }
  };

  const handleLeadSelectionExportExcel = (e) => {
    e.preventDefault();

    const executeExport = async () => {
      function handleError(response = null) {
        console.error(`Error, Status Code: ${response?.status}`);
        alert("Error Exporting File");
      }

      try {
        let reqJson = {};

        console.log(
          ">>>>>>>>>>>",

          ">>>> 625 ",
          selectedLeadHashKey
        );

        const inputData = {
          profile_urls: selectedLeads,
          hash_key_list: selectedLeadHashKey,
          search_id: searchId,
          search_index: selectedLeadIndex,
          export_type: "texAu",
        };
        console.log("reqJson input data 631 >>>", JSON.stringify(reqJson));
        console.log("input data >>>", JSON.stringify(inputData));

        const response = await fetch(apiServer + "/bulk_upload/export/excel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(inputData),
        });

        async function handleSuccess(response) {
          const data = await response.json();
          if (!data) {
            return handleError();
          }
          console.log(data);
          alert(
            "Exported excel file is sent to your email. Please check your spam filter if our email has" +
              " not arrived in a reasonable time. Cheers!"
          );
        }

        function handleUnAuthorized(response = null) {
          console.log("User is UnAuthorized");
          alert("Please Logout and LogIn Again");
        }

        switch (response.status) {
          case 200:
            return await handleSuccess(response);
          case 401:
            return handleUnAuthorized(response);
          case 402:
            return handleInsufficientBalance(response);
          default:
            return handleError(response);
        }
      } catch (err) {
        console.error("Error: ", err);
        handleError();
      }
    };

    if (!selectedLeads) {
      console.warn("No Selected Leads");
      return;
    }

    executeExport();
  };

  console.log("isCheck....", selectedLeads);

  useEffect(() => {
    if (searchText !== "") {
      setSearchedList(
        myLeads.filter((data) => {
          return (
            data.name.toLowerCase().includes(searchText.toLowerCase()) ||
            data.location.toLowerCase().includes(searchText.toLowerCase()) ||
            data.job.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      );
    } else {
      if (myLeads)
      setSearchedList(myLeads?.filter(data=> !!data.name));
    }
  }, [searchText, myLeads]);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Header user={user} newEvent={newEvent} />

      <div className="modal" id="bulkmodal">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
        <div className="modal-dialog">
          <div className="modal-message">
            <p>
              <i className="text-danger">Format to follow:</i> Ensure that the
              first column has the unique values you’re searching for. Download
              the sample below for better understanding.{" "}
            </p>
            <Link>
              <i className="text-danger text-decoration-underline">
                Click here to download csv format
              </i>
            </Link>
          </div>
          <div className="modal-content">
            <form action="/upload" id="mydrop" className="dropzone">
              <div className="dz-message needsclick">
                <button type="button" className="dz-button">
                  Drag and Drop File
                </button>
                <br />
                <button type="button" className="dz-button">
                  OR{" "}
                </button>
                <br />
                <span className="note needsclick">
                  <input type="file" accept=".csv" onChange={handleCSVFile} />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="main-content-area pb-6 pt-2">
        <div className="main-wrapper container-fluid">
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <SpecificSearchBtn details={true} />
              <div className="sidebar-search-for sidebar-widget pt-4 my-3"  style={loading ?{'opacity':'0.4', 'pointerEvents':'none'}:{}}>
                <h6 className="text-danger mb-3">Customize your search </h6>
                <Filters customSearch={customSearch} />
              </div>
              <BulkSearch />
              <SidebarExtractContact />
            </div>
            <div className="col-md-8 col-lg-9">
              {/*{loading === false ? (*/}
              {/*  <div className="search-form4 d-flex mb-3">*/}
              {/*    <div className="input-group">*/}
              {/*      <div*/}
              {/*        className="input-placeholder"*/}
              {/*        style={{ width: "1000px", height: "50px" }}*/}
              {/*      >*/}
              {/*        <input*/}
              {/*          id="search-result-texau-search-input"*/}
              {/*          className="ps-3"*/}
              {/*          required*/}
              {/*          onChange={(e) => setSearchText(e.target.value)}*/}
              {/*        />*/}
              {/*        <div className="placeholder">Search Here</div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*) : null}*/}
              <div className="user-search-wrapper">
                <div
                  className="detailed-search"
                  style={{ paddingLeft: "40px" }}
                >
                  <div>
                    <small>Last Updated: {today}</small>
                  </div>
                </div>
              </div>
              <div className="user-widget-box  my-3">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <div className="d-flex align-items-center ">
                    <input
                      className="ms-3 me-3"
                      type="checkbox"
                      id="selectAll"
                      name="selectAll"
                      onChange={handleLeadSelectAll}
                      checked={isCheckAll}
                    />
                    <small className="">
                      <b>{currentLeads.length}</b> of{" "}
                      <b>{myLeads ? myLeads.length : 0}</b> Searched profiles
                    </small>
                  </div>
                  <div className="d-flex">
                    <small className="unlock-btn">
                      Unlock Profile{" "}
                      <img
                        className="ps-3"
                        src="assets/images/Group 1617.png"
                        alt=""
                      />
                    </small>
                    <small className="unlock-btn">
                      Unlock Mails{" "}
                      <img
                        className="ps-3"
                        src="assets/images/Group 1617.png"
                        alt=""
                      />
                    </small>
                    <button
                      onClick={handleLeadSelectionExportExcel}
                      className="export-btn"
                      disabled={selectedLeads.length === 0 ? true : false}
                    >
                      Export{" "}
                      <img
                        className="ps-3"
                        src="assets/images/export.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="user-widget-box  my-3">
                {loading === false ? (
                  <div className="search-container mb-2">
                    {currentLeads && currentLeads.length === 0 ? (
                      <div>
                        <h5>Records Not Found</h5>
                      </div>
                    ) : currentLeads ? (
                      currentLeads.map((data, index) =>
                        data.name != "LinkedIn Member" ? (
                          <div>
                            <div
                              className="search-user-container py-2"
                              key={`${currentPage}${index}`}
                            >
                              <input
                                className="box ms-3 me-3"
                                id={data.url || data.profileLink}
                                type="checkbox"
                                name={data.name}
                                checked={selectedLeads.includes(
                                  data.url || data.profileLink
                                )}
                                onChange={(e)=>handleLeadSelectionChange(e,`${currentPage}${index}`)}
                              />
                              <div className="search-author text-danger ">
                                <img
                                  style={{ borderRadius: "50%" }}
                                  src={
                                    data.profilePicture
                                      ? data.profilePicture
                                      : data.image? data.image
                                            :"assets/images/author-image.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="search-user ps-3">
                                <p>{data.length === 0 ? null :<React.Fragment>
                                  {data.name?data.name :data.fullName}
                               </React.Fragment>}</p>
                                {/*<p>{data.length === 0 ? null : data.fullName}</p>*/}
                                <small className="d-block">
                                  Works at {data.length === 0 ? null : data.job?data.job:data.occupation}
                                </small>
                                <small className="d-block">
                                  {data.length === 0 ? null : data.location}
                                </small>
                              </div>
                              <div className="linkedin-icon d-flex justify-content-end">
                                <span>
                                  <a href={data.url?data.url:data.profileLink} target="_blank">
                                    <img
                                      src="assets/images/linkedin1.png"
                                      alt=""
                                    />
                                  </a>
                                </span>
                              </div>
                              <div className="search-email text-center">
                                <small
                                // className={
                                //   show[index] ? "d-block" : "d-block blur"
                                // }
                                >
                                  {unlockEmailDetails?.map((spec) => (
                                    <span>
                                      {spec.index === `${currentPage}${index}`
                                        ? spec.details.email === null || spec.details.email==="Not Found"?
                                        spec.details.email
                                        :
                                        (
                                          <div className="d-flex align-items-center">
                                          <small className="ms-2">{spec.details.email}</small>
                                          <img
                                              className="ms-2"
                                              src="assets/images/Vector.png"
                                              alt=""
                                          />
                                          </div>)
                                        : null}
                                    </span>
                                  ))}
                                </small>
                                {wait === `${currentPage}${index}` ? (
                                  <p>please wait...</p>
                                ) : (
                                  <a
                                    href="#"
                                    onClick={(e) =>
                                      handleUnlockEmail(e, index, data, props)
                                    }
                                  >
                                    <small className="d-block text-danger">
                                      Unlock Email
                                    </small>
                                  </a>
                                )}
                              </div>
                              <p className="search-view-btn ">
                                <a
                                  className="btn button"
                                  data-toggle="collapse"
                                  href={
                                    "#collapseExample_" +
                                    `${currentPage}${index}`
                                  }
                                  data-target={
                                    "#collapseExample_" +
                                    `${currentPage}${index}`
                                  }
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                  onClick={() => handleProfile(index, data, props)}
                                >
                                  View Profile
                                </a>
                              </p>
                              {/*<p>*/}
                              {/*  {unlockplus[`${currentPage}${index}`] ? (*/}
                              {/*    <img*/}
                              {/*      src="assets/images/Frame 543.png"*/}
                              {/*      alt=""*/}
                              {/*    />*/}
                              {/*  ) : (*/}
                              {/*    <SavedListButton*/}
                              {/*      data={data}*/}
                              {/*      type="texau"*/}
                              {/*      index={`${currentPage}${index}`}*/}
                              {/*      changeindex={(saveindex) =>*/}
                              {/*        setUnlockPlus((prev) => ({*/}
                              {/*          ...prev,*/}
                              {/*          [saveindex]: true,*/}
                              {/*        }))*/}
                              {/*      }*/}
                              {/*    />*/}
                              {/*  )}*/}
                              {/*</p>*/}
                               <p>
                              <SavedListButton data={data} searchType="texAu" />
                            </p>
                            </div>
                            <div
                              style={{
                                background: "white",
                                borderRadius: "20px",
                                padding: "20px",
                              }}
                            >
                              <div
                                className="panel-collapse collapse in"
                                id={
                                  "collapseExample_" + `${currentPage}${index}`
                                }
                              >
                                {!loadingProfile ? (
                                  specificUserDetails?.map((spec) => (
                                    <span>
                                      {spec.index ===
                                      `${currentPage}${index}` ? (
                                        <span>
                                          <SpecificUser
                                            details={spec.details}
                                            proxyData={spec.proxyCurl}
                                          />
                                        </span>
                                      ) : null}
                                    </span>
                                  ))
                                ) : (
                                  <div>
                                    <section
                                      className="item-section"
                                      style={{ textAlign: "center" }}
                                    >
                                      Please Wait..
                                    </section>
                                  </div>
                                )}{" "}
                              </div>
                            </div>
                          </div>
                        ) : (
                          console.log("not valid name")
                        )
                      )
                    ) : (
                      <h5>Record Not Found</h5>
                    )}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div role="status" style={{ height: "400px" }}>
                      <Lottie options={personLoader} />
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center">
                {loading === false ? (
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={searchedList ? searchedList.length : 1}
                    paginate={paginate}
                  />
                ) : null}
              </div>
              {/*<AskJarvis />*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

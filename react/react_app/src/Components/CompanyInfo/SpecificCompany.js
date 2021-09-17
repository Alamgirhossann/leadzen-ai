import React, { useEffect, useState } from "react";
import "./Style/style.css";
import SpecificUser from "../DetailedInfo/SpecificUser";
import Cookies from "js-cookie";
// import { Map, GoogleApiWrapper } from "google-maps-react";
import { v4 as uuidv4 } from "uuid";
const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;

const SpecificCompany = ({ data }) => {
  // const [openProfile, setOpenProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchId, setSearchId] = useState();
  const [specificUserDetails, setSpecificUserDetails] = useState([
    { index: null, details: null },
  ]);
  console.log("specific company data", data);
  // data = {
  //   0: {
  //     data: [
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         url: "https://fast.texau.com/dfc18a87-6142-4d77-a832-da9f85b9c229/spice/5d5be27b58ad5ac0f882b55d/www-wipro-com--2021-09-16T13:55:43.943Z.jpg",
  //       },
  //     ],
  //   },
  //   1: {
  //     data: [
  //       {
  //         message: "No emails or phones found",
  //         query: "https://www.wipro.com/",
  //       },
  //     ],
  //   },
  //   2: {
  //     data: [
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Adobe Experience Manager",
  //         confidence: 100,
  //         version: null,
  //         website: "https://www.adobe.com/marketing/experience-manager.html",
  //         categories: "CMS",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Java",
  //         confidence: 100,
  //         version: null,
  //         website: "http://java.com",
  //         categories: "Programming languages",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Bootstrap",
  //         confidence: 100,
  //         version: "3.3.7",
  //         website: "https://getbootstrap.com",
  //         categories: "UI frameworks",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Amazon Web Services",
  //         confidence: 100,
  //         version: null,
  //         website: "https://aws.amazon.com/",
  //         categories: "PaaS",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Apache",
  //         confidence: 100,
  //         version: null,
  //         website: "http://apache.org",
  //         categories: "Web servers",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Slick",
  //         confidence: 100,
  //         version: null,
  //         website: "https://kenwheeler.github.io/slick",
  //         categories: "JavaScript libraries",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Lodash",
  //         confidence: 100,
  //         version: "4.17.15",
  //         website: "http://www.lodash.com",
  //         categories: "JavaScript libraries",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Twitter Analytics",
  //         confidence: 100,
  //         version: null,
  //         website: "https://analytics.twitter.com",
  //         categories: "Analytics",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "OneTrust",
  //         confidence: 100,
  //         version: null,
  //         website: "http://www.onetrust.com",
  //         categories: "Cookie compliance",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Marketo Forms",
  //         confidence: 100,
  //         version: "2",
  //         website: "https://www.marketo.com",
  //         categories: "Widgets",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Linkedin Insight Tag",
  //         confidence: 100,
  //         version: null,
  //         website:
  //           "https://business.linkedin.com/marketing-solutions/insight-tag",
  //         categories: "Analytics",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Font Awesome",
  //         confidence: 100,
  //         version: null,
  //         website: "https://fontawesome.com/",
  //         categories: "Font scripts",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "jQuery",
  //         confidence: 100,
  //         version: "3.1.1",
  //         website: "https://jquery.com",
  //         categories: "JavaScript libraries",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Twitter Ads",
  //         confidence: 100,
  //         version: null,
  //         website: "https://ads.twitter.com",
  //         categories: "Advertising",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Marketo",
  //         confidence: 100,
  //         version: "160",
  //         website: "https://www.marketo.com",
  //         categories: "Marketing automation",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Hotjar",
  //         confidence: 100,
  //         version: null,
  //         website: "https://www.hotjar.com",
  //         categories: "Analytics",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Google Tag Manager",
  //         confidence: 100,
  //         version: null,
  //         website: "http://www.google.com/tagmanager",
  //         categories: "Tag managers",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Google Analytics",
  //         confidence: 100,
  //         version: null,
  //         website: "http://google.com/analytics",
  //         categories: "Analytics",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "FancyBox",
  //         confidence: 100,
  //         version: "3.5.7",
  //         website: "http://fancyapps.com/fancybox",
  //         categories: "JavaScript libraries",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Adobe Target",
  //         confidence: 100,
  //         version: "2.4.1",
  //         website: "https://www.adobe.com/marketing/target.html",
  //         categories: "Marketing automation, A/B Testing",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Adobe Experience Platform Launch",
  //         confidence: 100,
  //         version: null,
  //         website: "https://docs.adobelaunch.com/getting-started",
  //         categories: "Tag managers",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Adobe Experience Platform Identity Service",
  //         confidence: 100,
  //         version: null,
  //         website:
  //           "https://docs.adobe.com/content/help/en/id-service/using/home.html",
  //         categories: "Analytics",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Adobe Analytics",
  //         confidence: 100,
  //         version: null,
  //         website: "https://www.adobe.com/analytics/adobe-analytics.html",
  //         categories: "Analytics",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Pardot",
  //         confidence: 100,
  //         version: null,
  //         website: "https://www.pardot.com",
  //         categories: "Marketing automation",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Microsoft 365",
  //         confidence: 100,
  //         version: null,
  //         website: "https://www.microsoft.com/microsoft-365",
  //         categories: "Webmail, Email",
  //       },
  //       {
  //         websiteUrl: "https://www.wipro.com/",
  //         name: "Amazon Cloudfront",
  //         confidence: 100,
  //         version: null,
  //         website: "http://aws.amazon.com/cloudfront/",
  //         categories: "CDN",
  //       },
  //     ],
  //   },
  //   3: {
  //     data: [
  //       {
  //         query: "https://www.wipro.com/",
  //         facebook: "https://www.facebook.com/WiproLimited",
  //         instagram: "",
  //         linkedin: "https://www.linkedin.com/company/wipro/",
  //         twitter: "https://twitter.com/wipro",
  //         youtube: "https://www.youtube.com/user/Wiprovideos",
  //         quora: "",
  //         reddit: "",
  //         pinterest: "",
  //       },
  //     ],
  //   },
  //   4: {
  //     success: true,
  //     domain: "wipro.com",
  //     webmail: false,
  //     result: 10,
  //     lastId: 129412187,
  //     limit: 10,
  //     companyName: "Wipro Limited",
  //     emails: [
  //       {
  //         email: "sandeep.kaura@wipro.com",
  //         firstName: "Sandeep",
  //         lastName: "Kaura",
  //         position: "Director- Cloud and Infrastructure ( SEA)",
  //         sourcePage: "https://www.linkedin.com/in/sandeepkaura",
  //         companyName: "Wipro Limited",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "rinki.jain@wipro.com",
  //         firstName: "Rinki",
  //         lastName: "Jain",
  //         position: "Sr. Director, Global Business and Strategy",
  //         sourcePage: "https://www.linkedin.com/in/rinki-jain-874a977",
  //         companyName: "Appirio",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "anand.kundnani@wipro.com",
  //         firstName: "Anand",
  //         lastName: "Kundnani",
  //         position: "Associate Vice President.",
  //         sourcePage: "https://www.linkedin.com/in/anand-kundnani-a172386",
  //         companyName: "Wipro Ltd",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "Neelesh.gorle@wipro.com",
  //         firstName: "Neelesh",
  //         lastName: "Gorle",
  //         position: "Director, Presales & Solution Architecture",
  //         sourcePage: "https://www.linkedin.com/in/neelesh-gorle-485a702/",
  //         companyName: "Wipro Technologies",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "sujeendra.rao@wipro.com",
  //         firstName: "Sujeendra",
  //         lastName: "Rao",
  //         position: "Program Director",
  //         sourcePage: "https://www.linkedin.com/in/sujeendra-rao-32815510",
  //         companyName: "L & T Infotech",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "rajesh.sharma@wipro.com",
  //         firstName: "Rajesh",
  //         lastName: "Sharma",
  //         position: "Program Director",
  //         sourcePage: "https://www.linkedin.com/in/rajesh-sharma-2b100910b/",
  //         companyName: "Wipro",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "srinath.ramasesh@wipro.com",
  //         firstName: "Srinath",
  //         lastName: "Ramasesh",
  //         position:
  //           "Consulting Partner, Senior Director Strategy and Transformation",
  //         sourcePage: "https://www.linkedin.com/in/srinathramasesh/",
  //         companyName: "Wipro Technologies",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "viswanathan.ksv@wipro.com",
  //         firstName: "Ksv",
  //         lastName: "Viswanathan",
  //         position: "Chief Executive- india geography",
  //         sourcePage: "https://www.linkedin.com/in/ksv-viswanathan-36b9714/",
  //         companyName: "Wipro Infotech",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "rishabh.goel@wipro.com",
  //         firstName: "Rishabh",
  //         lastName: "Goel",
  //         position: "Practice Director",
  //         sourcePage: "https://www.linkedin.com/in/rishabhgoel",
  //         companyName: "Wipro Digital Operations and Platforms",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //       {
  //         email: "steven.armstrong@wipro.com",
  //         firstName: "Steven",
  //         lastName: "Armstrong",
  //         position: "Program Director, International Programs",
  //         sourcePage: "https://www.linkedin.com/in/steven-armstrong-a3705580",
  //         companyName: "Wipro",
  //         type: "prospect",
  //         status: "verified",
  //       },
  //     ],
  //   },
  // };

  let slicedArray = [];
  if (data) {
    if (data["4"] && data["4"].emails) {
      slicedArray = data["4"].emails.slice(0, 10);
    }
  }

  // const slicedArray = data["4"].emails.slice(0, 10);
  console.log("slicedArray", slicedArray);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleError(status) {
    console.error(`Got HTTP Error ${status}`);
  }

  function handleNotFound() {
    console.log("Not Found Yet, Waiting...");
  }

  function handleCookieError(response) {
    console.log("Response cookie error", response.statusText);
    handleError();
  }

  function handleUnAuthorized(response = null) {
    console.log("User is UnAuthorized");
    handleError();
    alert("Please Logout and LogIn Again");
  }

  const handleProfile = async (index, data) => {
    // setOpenProfile(true);
    setCurrentPage(`${currentPage}${index}`);
    let reqJsonPipl = {
      email: "",
      name: { first_name: "", last_name: "" },
      url: data,
    };
    console.log("in Handle profile...", `${currentPage}${index}`, data);
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
        const response = await fetch(apiServer + "/pipl/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
          body: JSON.stringify(reqJsonPipl),
        });

        async function handleSuccess(response) {
          let json_res = await response.json();
          console.log("Data Pipl..>>>>>>>>>>>", json_res);
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
                search_id: uuidv4(),
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

                console.log("response from saveResult>>>", result);
              } catch (e) {
                console.error("Exception>>", e);
              }
              setSpecificUserDetails((prev) => [
                ...prev,
                { index: `${currentPage}${index}`, details: json_res[0] },
              ]);
            } else {
              setSpecificUserDetails((prev) => [
                ...prev,
                {
                  index: `${currentPage}${index}`,
                  details: "Record Not Found",
                },
              ]);
            }
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

        switch (response.status) {
          case 200:
            return handleSuccess(response);
          case 401:
            return handleUnAuthorized(response);
          case 403:
            return handleCookieError();
          case 404:
            return handleNotFound();
          default:
            return handleError();
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
  console.log("currenrtt", currentPage);
  return data ? (
    <div>
      <section className="item-section mt-3">
        <div className="phone-child-div ">
          <div className="px-3">
            <p className="specific-page-title">Description</p>
            <div>
              <p>Not Found</p>
            </div>
            <p className="specific-page-title">Founded Year</p>
            <div>
              <p>Not Found</p>
            </div>
            <p className="specific-page-title">Company Headquarter</p>
            <div>
              <p>Not Found</p>
            </div>
          </div>
          <div className="px-3">
            <p className="specific-page-title">Company Type</p>
            <div>
              <p>Not Found</p>
            </div>
            <p className="specific-page-title">Company Website</p>
            <div>
              <p>
                {data["0"] ? data["0"].data[0].websiteUrl || "" : "not Found"}
              </p>
            </div>
            <p className="specific-page-title">Company Email id</p>
            <div>
              {data["1"] && data["1"].data
                ? data["1"].data.map((user) => <p>{user.emails}</p>)
                : "Not Found"}
              {/*<p>Support@HexagonAB.com</p>*/}
            </div>
            <p className="specific-page-title">Phone Number</p>
            <div>
              <p>Not Found</p>
            </div>
          </div>
        </div>
      </section>
      <section className="item-section">
        <div className="row">
          <div className="col-md-6 pe-5">
            <p className="specific-page-title">Business Description</p>
            <p>Not Found</p>
          </div>
          <div className="col-md-6">
            <img
              src={
                data["0"] ? data["0"].data[0].url || "Not Found" : "Not Found"
              }
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="item-section">
        <p className="specific-page-title">Teams/Key members</p>
        <div className="user-promote-slider">
          {slicedArray.map((user, index) => (
            <div className="text-center" key={index}>
              <div className="d-flex justify-content-center">
                <img
                  className=""
                  src="assets/images/user-athor-pic.png"
                  alt=""
                />
              </div>
              <p className="d-block mt-3">
                {user.firstName + " " + user.lastName || ""}
              </p>
              {/*<button onClick={() => handleProfile(index, user.sourcePage)}>*/}
              {/*  {" "}*/}
              {/*  unlock profile{" "}*/}
              {/*</button>*/}
              <p className="search-view-btn ">
                <a
                  className="btn button"
                  data-toggle="collapse"
                  href={"#collapseExample_" + `${index}`}
                  data-target={"#collapseExample_" + `${index}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => handleProfile(index, user.sourcePage)}
                >
                  View Profile
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
      {specificUserDetails?.map((spec) => (
        <span>
          {/*{openProfile ? (*/}
          {/*  <span>*/}
          {/*    <SpecificUser details={spec.details} />*/}
          {/*  </span>*/}
          {/*) : null}*/}
          {spec.index === `${currentPage}` ? (
            <span>
              <SpecificUser details={spec.details} />
            </span>
          ) : null}
        </span>
      ))}{" "}
      <section className="item-section">
        <div className="row">
          <div className="col-md-4">
            <p className="specific-page-title">Website Teafic</p>
            <p>Not Found</p>
          </div>
          <div className="col-md-4">
            <p className="specific-page-title"> Websites visits per day</p>
            <p> Not Found</p>
          </div>
          <div className="col-md-4">
            <p className="specific-page-title">Social presence</p>
            {data["3"] ? (
              data["3"].data.length > 0 ? (
                <div className="ms-2 mb-3">
                  <div className="d-flex">
                    <div className="col">
                      <div className="d-flex">
                        <div className="me-2">
                          <a
                            href={data["3"].data[0].facebook || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-facebook.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="me-2">
                          <a
                            href={data["3"].data[0].twitter || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-twitter.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="">
                          <a
                            href={data["3"].data[0].instagram || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-instagram.png"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                      <div className="d-flex mt-3">
                        <div className="me-2">
                          <a
                            href={data["3"].data[0].linkedin || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-linkedin.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="me-2">
                          <a
                            href={data["3"].data[0].pinterest || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-printarest.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="">
                          <a
                            href={data["3"].data[0].youtube || "#"}
                            target="_blank"
                          >
                            <img
                              style={{ height: "32px", width: "32px" }}
                              src="assets/images/social-mideum.png"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            ) : (
              "Not Found"
            )}
          </div>
        </div>
      </section>
      <section className="item-section">
        <p className="specific-page-title">Tech Stack</p>
        {data["2"] ? (
          data["2"].data.length > 0 ? (
            <div className="row">
              <div className="col-md-3">
                <div className="stack-card">
                  <div className="under-border">
                    <p>{data["2"].data[0].name}</p>
                  </div>
                  <div className="mute-color">
                    <p>{data["2"].data[0].categories}</p>
                  </div>
                  <div className="text-center">
                    <a href={data["2"].data[0].website} target="_blank">
                      Visit
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stack-card">
                  <div className="under-border">
                    <p>{data["2"].data[1].name}</p>
                  </div>
                  <div className="mute-color">
                    <p>{data["2"].data[1].categories}</p>
                  </div>
                  <div className="text-center">
                    <a href={data["2"].data[1].website} target="_blank">
                      Visit
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stack-card">
                  <div className="under-border">
                    <p>{data["2"].data[2].name}</p>
                  </div>
                  <div className="mute-color">
                    <p>{data["2"].data[2].categories}</p>
                  </div>
                  <div className="text-center">
                    <a href={data["2"].data[2].website} target="_blank">
                      Visit
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stack-card">
                  <div className="under-border">
                    <p>{data["2"].data[3].name}</p>
                  </div>
                  <div className="mute-color">
                    <p>{data["2"].data[3].categories}</p>
                  </div>
                  <div className="text-center">
                    <a href={data["2"].data[3].website} target="_blank">
                      Visit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        ) : (
          "Not Found"
        )}
      </section>
      <div className="text-center">
        <button className=" see-less-btn">See Less</button>
      </div>
    </div>
  ) : (
    <h5> Record Not Found </h5>
  );
};
// export default GoogleApiWrapper({
//   apiKey: "API_KEY",
// })(SpecificCompany);

export default SpecificCompany;

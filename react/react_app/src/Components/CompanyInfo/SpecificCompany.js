import React, { useEffect } from "react";
import "./Style/style.css";
// import { Map, GoogleApiWrapper } from "google-maps-react";

const SpecificCompany = ({ data }) => {
  console.log("specific company data", data);
  data = {
    0: {
      data: [
        {
          websiteUrl: "https://www.tata.com/",
          url: "https://fast.texau.com/dfc18a87-6142-4d77-a832-da9f85b9c229/spice/5d5be27b58ad5ac0f882b55d/www-tata-com--2021-09-15T09:09:39.533Z.jpg",
        },
      ],
    },
    1: {
      data: [
        {
          message: "No emails or phones found",
          query: "https://www.tata.com/",
        },
      ],
    },
    2: {
      data: [
        {
          websiteUrl: "https://www.tata.com",
          name: "Adobe Experience Manager",
          confidence: 100,
          version: null,
          website: "https://www.adobe.com/marketing/experience-manager.html",
          categories: "CMS",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "Java",
          confidence: 100,
          version: null,
          website: "http://java.com",
          categories: "Programming languages",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "jQuery",
          confidence: 100,
          version: null,
          website: "https://jquery.com",
          categories: "JavaScript libraries",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "Twitter Analytics",
          confidence: 100,
          version: null,
          website: "https://analytics.twitter.com",
          categories: "Analytics",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "Facebook",
          confidence: 100,
          version: null,
          website: "http://facebook.com",
          categories: "Widgets",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "Twitter Ads",
          confidence: 100,
          version: null,
          website: "https://ads.twitter.com",
          categories: "Advertising",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "Google Tag Manager",
          confidence: 100,
          version: null,
          website: "http://www.google.com/tagmanager",
          categories: "Tag managers",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "Google Analytics",
          confidence: 100,
          version: null,
          website: "http://google.com/analytics",
          categories: "Analytics",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "Microsoft 365",
          confidence: 100,
          version: null,
          website: "https://www.microsoft.com/microsoft-365",
          categories: "Webmail, Email",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "DigiCert",
          confidence: 100,
          version: null,
          website: "https://www.digicert.com/",
          categories: "SSL/TLS certificate authorities",
        },
        {
          websiteUrl: "https://www.tata.com",
          name: "Azure CDN",
          confidence: 100,
          version: null,
          website: "https://azure.microsoft.com/en-us/services/cdn/",
          categories: "CDN",
        },
      ],
    },
    3: {
      data: [
        {
          query: "https://www.tata.com",
          facebook: "https://facebook.com/TataGroup",
          instagram: "https://www.instagram.com/tatacompanies/",
          linkedin: "https://www.linkedin.com/company/tata-companies/",
          twitter: "https://twitter.com/TataCompanies",
          youtube: "https://www.youtube.com/user/TataCompanies",
          quora: "",
          reddit: "",
          pinterest: "",
        },
        {
          query: "https://www.tata.com",
          facebook: "https://www.facebook.com/tatagroup",
          instagram: "",
          linkedin: "",
          twitter:
            "https://twitter.com/TataCompanies/status/1436673604675010568",
          youtube: "",
          quora: "",
          reddit: "",
          pinterest: "",
        },
        {
          query: "https://www.tata.com",
          facebook: "",
          instagram: "",
          linkedin: "",
          twitter:
            "https://twitter.com/TataCompanies/status/1437293154017812480",
          youtube: "",
          quora: "",
          reddit: "",
          pinterest: "",
        },
        {
          query: "https://www.tata.com",
          facebook: "",
          instagram: "",
          linkedin: "",
          twitter:
            "https://twitter.com/TataCompanies/status/1438008970753372160",
          youtube: "",
          quora: "",
          reddit: "",
          pinterest: "",
        },
      ],
    },
    4: {
      success: true,
      domain: "tata.com",
      webmail: false,
      result: 100,
      lastId: 658786513,
      limit: 100,
      companyName: "TATA GROUP",
      emails: [
        {
          email: "dsingh@tata.com",
          firstName: "Dr. Sandhya",
          lastName: "Singh",
          position: "EXECUTIVE",
          sourcePage: "https://www.linkedin.com/in/singhsandhyaks",
          companyName: "TATA GROUP",
          type: "prospect",
          status: "verified",
        },
        {
          email: "dbhagwagar@tata.com",
          firstName: "Deepika",
          lastName: "Bhagwagar",
          position: "Deputy Company Secretary",
          sourcePage: "https://www.linkedin.com/in/deepika-bhagwagar-145861b8",
          companyName: "Tata Industries Limited",
          type: "prospect",
          status: "verified",
        },
        {
          email: "pvenkatesalu@tata.com",
          firstName: "Venkatesalu",
          lastName: "P",
          position: "TAS",
          sourcePage: "https://www.linkedin.com/in/venkatesalu-p-53882b15",
          companyName: "TAS",
          type: "prospect",
          status: "verified",
        },
        {
          email: "rram@tata.com",
          firstName: "Rajesh",
          lastName: "Ram",
          position: "Sales Executive",
          sourcePage: "https://www.linkedin.com/in/rajesh-ram-8480b014b",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sgokhale@tata.com",
          firstName: "Shantanu",
          lastName: "Gokhale",
          position: "Faculty and Deputy General Manager",
          sourcePage: "https://www.linkedin.com/in/shantanu-gokhale-a9128811",
          companyName: "Tata Management Training Center",
          type: "prospect",
          status: "verified",
        },
        {
          email: "snayak@tata.com",
          firstName: "Satyajit",
          lastName: "Nayak",
          position: "Account Officer",
          sourcePage: "https://www.linkedin.com/in/satyajit-nayak-b57298178",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "gpotdar@tata.com",
          firstName: "Girish",
          lastName: "Potdar",
          position: "IT Manager",
          sourcePage: "https://www.linkedin.com/in/girishpotdar",
          companyName: "Tata Management Training Center",
          type: "prospect",
          status: "verified",
        },
        {
          email: "gopal.gopalakrishnan@tata.com",
          firstName: "Gopal",
          lastName: "Gopalakrishnan",
          position: "Director",
          sourcePage:
            "https://www.linkedin.com/in/gopal-gopalakrishnan-990ab415/",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "arushiagrawal@tata.com",
          firstName: "Arushi",
          lastName: "Agrawal",
          position: "Senior Manager - Media, Group Corporate Communications",
          sourcePage: "https://www.linkedin.com/in/arushi-agrawal-75b1321b",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "aagrawal@tata.com",
          firstName: "ANIL",
          lastName: "AGRAWAL",
          position: "Finance Controller",
          sourcePage: "https://www.linkedin.com/in/anil-agrawal-48127018",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "pkumar@tata.com",
          firstName: "PRAVEEN KUMAR",
          lastName: "GAHLOT",
          position: "ASSTT-MANAGER",
          sourcePage:
            "https://www.linkedin.com/in/praveen-kumar-gahlot-3341b930",
          companyName: "TASL-TATA ADVANCED SYSTEMS LTD,HYDERABAD",
          type: "prospect",
          status: "verified",
        },
        {
          email: "vamin@tata.com",
          firstName: "Vijayalaxmi",
          lastName: "Amin",
          position: "Executive Secretary",
          sourcePage: "https://www.linkedin.com/in/vijayalaxmi-amin-9293a27",
          companyName: "TATA SONS LIMITED",
          type: "prospect",
          status: "verified",
        },
        {
          email: "ssrivastava@tata.com",
          firstName: "shobhit",
          lastName: "srivastava",
          position: "Android Developer",
          sourcePage: "https://www.linkedin.com/in/shobhit-srivastava-1753779b",
          companyName: "Tata Digital",
          type: "prospect",
          status: "verified",
        },
        {
          email: "abhishek@tata.com",
          firstName: "Abhishek",
          lastName: "Kallianpur",
          position: "Deputy Manager - Retail HR",
          sourcePage:
            "https://www.linkedin.com/in/abhishek-kallianpur-81a2b931/",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "achatterjee@tata.com",
          firstName: "Aranya",
          lastName: "Chatterjee",
          position: "Internee at Tata Enterprise, Legal Department",
          sourcePage: "https://www.linkedin.com/in/aranya-chatterjee-12a2131b5",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "mrawat@tata.com",
          firstName: "Manoj",
          lastName: "Rawat",
          position: "General Manager - Group Human Resources",
          sourcePage: "https://www.linkedin.com/in/manoj-rawat-5731618",
          companyName: "Tata Sons Limited",
          type: "prospect",
          status: "verified",
        },
        {
          email: "ssharma@tata.com",
          firstName: "Siddharth",
          lastName: "Sharma",
          position: "Group Chief Sustainability Officer",
          sourcePage: "https://www.linkedin.com/in/siddharthsharmarb",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sshinde@tata.com",
          firstName: "Sandeep",
          lastName: "Shinde",
          position: "TAS Manager",
          sourcePage: "https://www.linkedin.com/in/sandeep-shinde-090854b",
          companyName: "TAS",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sguha@tata.com",
          firstName: "Subhrajit",
          lastName: "Guha",
          position: "Sales Officer",
          sourcePage: "https://www.linkedin.com/in/subhrajit-guha-b52973126",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sbiswas@tata.com",
          firstName: "Sujay",
          lastName: "Biswas",
          position: "TAS",
          sourcePage: "https://www.linkedin.com/in/sujaybiswas",
          companyName: "Tata Administrative Services",
          type: "prospect",
          status: "verified",
        },
        {
          email: "tbhojwani@tata.com",
          firstName: "tarun",
          lastName: "bhojwani",
          position: "Vice President",
          sourcePage: "https://www.linkedin.com/in/tarun-bhojwani-a315b928",
          companyName: "Tata Sons Limited",
          type: "prospect",
          status: "verified",
        },
        {
          email: "narayanpathak@tata.com",
          firstName: "Narayan",
          lastName: "Pathak",
          position: "concessionaire",
          sourcePage: "https://www.linkedin.com/in/narayan-pathak-b9426642",
          companyName: "Tata Management Training Center",
          type: "prospect",
          status: "verified",
        },
        {
          email: "pjain@tata.com",
          firstName: "Priyanka",
          lastName: "Bhatter Jain",
          position: "Buyer",
          sourcePage:
            "https://www.linkedin.com/in/priyanka-bhatter-jain-3701a010",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "rahulsharma@tata.com",
          firstName: "Rahul",
          lastName: "Sharma",
          position: "Department Manager",
          sourcePage: "https://www.linkedin.com/in/rahul-sharma-b67b46186",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "pmascarenhas@tata.com",
          firstName: "Pearl",
          lastName: "Mascarenhas",
          position: "Head - Program Planning & Scheduling",
          sourcePage: "https://www.linkedin.com/in/pearl-mascarenhas-58ab2a4",
          companyName: "Tata Management Training Center",
          type: "prospect",
          status: "verified",
        },
        {
          email: "spradhan@tata.com",
          firstName: "Satyaban",
          lastName: "Pradhan",
          position: "AGM (HR & IR)",
          sourcePage: "https://www.linkedin.com/in/satyaban-pradhan-84b6347",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "bpatel@tata.com",
          firstName: "Bijal",
          lastName: "Patel",
          position: "Legal Executive",
          sourcePage: "https://www.linkedin.com/in/bijal-patel-a352389a",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "nsingh@tata.com",
          firstName: "Nagendra",
          lastName: "Singh",
          position: "Store Manager",
          sourcePage: "https://www.linkedin.com/in/nagendra-singh-1b102526",
          companyName: "ZUDIO Unit of TATA Retail Enterprise",
          type: "prospect",
          status: "verified",
        },
        {
          email: "nchadha@tata.com",
          firstName: "Navin",
          lastName: "Chadha",
          position: "Global Head Stratergy and Tranformation",
          sourcePage: "https://www.linkedin.com/in/navin-chadha-ba8465/",
          companyName: "Tata America International Corporation",
          type: "prospect",
          status: "verified",
        },
        {
          email: "ratantata@tata.com",
          firstName: "Ratan",
          lastName: "Tata",
          position: "Chairman",
          sourcePage: "https://in.linkedin.com/in/ratan-tata-433259164/",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "kgupta@tata.com",
          firstName: "Krishnakumar",
          lastName: "Gupta",
          position: "Developer",
          sourcePage:
            "https://www.linkedin.com/in/krishnakumar-gupta-b27650128",
          companyName: "Tata Digital",
          type: "prospect",
          status: "verified",
        },
        {
          email: "nkumar@tata.com",
          firstName: "Nitin",
          lastName: "kumar",
          position: "Business Unit Head",
          sourcePage: "https://www.linkedin.com/in/nitin-kumar-3b539576",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sir@tata.com",
          firstName: "Sir Ratan",
          lastName: "Naval Tata",
          position: "chairman",
          sourcePage:
            "https://www.linkedin.com/in/sir-ratan-naval-tata-b1598553",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "kbhatt@tata.com",
          firstName: "KAMLESH",
          lastName: "BHATT",
          position: "MANAGER -ACCOUNTS",
          sourcePage: "https://www.linkedin.com/in/kamlesh-bhatt-a3b5ab42",
          companyName: "TATA INDUSTRIES LIMITED",
          type: "prospect",
          status: "verified",
        },
        {
          email: "skanchan@tata.com",
          firstName: "Sadashiv",
          lastName: "Kanchan",
          position: "Assistant Manager - Accounts",
          sourcePage: "https://www.linkedin.com/in/sadashiv-kanchan-05246944",
          companyName: "TATA INDUSTRIES LIMITED",
          type: "prospect",
          status: "verified",
        },
        {
          email: "rkumar@tata.com",
          firstName: "Ravi Shankar",
          lastName: "Kumar",
          position: "Associate Product Manager",
          sourcePage: "https://www.linkedin.com/in/ravi-shankar-kumar-4b5299a9",
          companyName: "Tata Digital",
          type: "prospect",
          status: "verified",
        },
        {
          email: "tanyawang@tata.com",
          firstName: "Tanya Qianyi",
          lastName: "Wang",
          position: "Executive Assistant To President",
          sourcePage: "https://www.linkedin.com/in/tanya-qianyi-wang-9515a439",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "amitbanerjee@tata.com",
          firstName: "Amit",
          lastName: "Banerjee",
          position: "State Head",
          sourcePage: "https://www.linkedin.com/in/amit-banerjee-71668721",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "s_bhattacharya@tata.com",
          firstName: "Shantanu",
          lastName: "Bhattacharya",
          position:
            "GM-Digital Learning Experience I Global HR & Leadership Learning I Tata Management Training Centre",
          sourcePage: "https://www.linkedin.com/in/shantanub/",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sir.naval@tata.com",
          firstName: "Sir Ratan",
          lastName: "Naval Tata",
          sourcePage:
            "https://www.linkedin.com/in/sir-ratan-naval-tata-b1598553",
          type: "prospect",
          status: "verified",
        },
        {
          email: "s_naval@tata.com",
          firstName: "Sir Ratan",
          lastName: "Naval Tata",
          sourcePage:
            "https://www.linkedin.com/in/sir-ratan-naval-tata-b1598553",
          type: "prospect",
          status: "verified",
        },
        {
          email: "pshetty@tata.com",
          firstName: "Priyanka",
          lastName: "Shetty",
          position: "Manager - Social Media, Group Corporate Communications",
          sourcePage: "https://www.linkedin.com/in/priyanka-shetty-b197562a",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "vinodkumar@tata.com",
          firstName: "Vinod",
          lastName: "Kumar",
          sourcePage: "https://www.linkedin.com/in/vinodvb/",
          type: "prospect",
          status: "verified",
        },
        {
          email: "rtata@tata.com",
          firstName: "Rohan",
          lastName: "Tata",
          position: "Senior Vice President",
          sourcePage: "https://www.linkedin.com/in/rohan-tata-77a149136",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "basar.akkuzu@tata.com",
          firstName: "Basar",
          lastName: "Akkuzu, MBA",
          sourcePage: "https://www.linkedin.com/in/basar-akkuzu",
          type: "prospect",
          status: "verified",
        },
        {
          email: "b_akkuzu@tata.com",
          firstName: "Basar",
          lastName: "Akkuzu, MBA",
          sourcePage: "https://www.linkedin.com/in/basar-akkuzu",
          type: "prospect",
          status: "verified",
        },
        {
          email: "smehta@tata.com",
          firstName: "Shruti",
          lastName: "Mehta",
          position: "Finance Manager",
          sourcePage: "https://www.linkedin.com/in/shruti--mehta",
          companyName: "Tata Digital",
          type: "prospect",
          status: "verified",
        },
        {
          email: "skamat@tata.com",
          firstName: "SUDHIR",
          lastName: "Kamat",
          position: "General manager finance & accounts",
          sourcePage: "https://www.linkedin.com/in/sudhir-kamat-979a9035",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "mjoshi@tata.com",
          firstName: "Medha",
          lastName: "Joshi",
          position: "Product Owner",
          sourcePage: "https://www.linkedin.com/in/medha-joshi-30496579",
          companyName: "Tata Digital",
          type: "prospect",
          status: "verified",
        },
        {
          email: "Kushal.Parikh@tata.com",
          firstName: "Kushal",
          lastName: "Parikh",
          sourcePage: "https://www.linkedin.com/in/kushalparikh",
          type: "prospect",
          status: "verified",
        },
        {
          email: "k_parikh@tata.com",
          firstName: "Kushal",
          lastName: "Parikh",
          sourcePage: "https://www.linkedin.com/in/kushalparikh",
          type: "prospect",
          status: "verified",
        },
        {
          email: "rdas@tata.com",
          firstName: "Reema",
          lastName: "Das",
          position: "Senior Manager",
          sourcePage: "https://www.linkedin.com/in/reema-das-60470612",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sridhar.csr@tata.com",
          firstName: "C Sridhar",
          lastName: "Raju",
          position: "Head of Sales & Marketing",
          sourcePage: "https://www.linkedin.com/in/c-sridhar-raju-a085a318/",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "s_csr@tata.com",
          firstName: "C Sridhar",
          lastName: "Raju",
          position: "Head of Sales & Marketing",
          sourcePage: "https://www.linkedin.com/in/c-sridhar-raju-a085a318/",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "chandrasekaran@tata.com",
          firstName: "N.",
          lastName: "Chandrasekaran",
          position: "Chairman",
          sourcePage: "https://www.linkedin.com/in/n-chandrasekaran",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "N.Chandrasekaran@tata.com",
          firstName: "N.",
          lastName: "Chandrasekaran",
          position: "Chairman",
          sourcePage: "https://www.linkedin.com/in/n-chandrasekaran",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "james@tata.com",
          firstName: "James",
          lastName: "Garrison",
          position: "Software Developer",
          sourcePage: "https://www.linkedin.com/in/james-garrison-b09b4863",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "nikhilkumar@tata.com",
          firstName: "Nikhil",
          lastName: "kumar",
          position: "Assistant Manager Operations",
          sourcePage: "https://www.linkedin.com/in/nikhil-kumar-69188719/",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "md@tata.com",
          firstName: "Madhulika",
          lastName: "Damani",
          position: "Head - Indian Wear",
          sourcePage: "https://www.linkedin.com/in/madhulika-damani-65850375",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "ppatil@tata.com",
          firstName: "Pallavi",
          lastName: "Patil",
          position: "Solution Architect",
          sourcePage: "https://www.linkedin.com/in/pallavi-patil-715131a",
          companyName: "Tata Digital",
          type: "prospect",
          status: "verified",
        },
        {
          email: "mkumar@tata.com",
          firstName: "Dharmendra",
          lastName: "kumar Mishra",
          position: "Relationship Manager",
          sourcePage:
            "https://www.linkedin.com/in/dharmendra-kumar-mishra-081857122",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "bv@tata.com",
          firstName: "Marjolein",
          lastName: "Van Brandwijk",
          position: "Head Zudio",
          sourcePage: "https://www.linkedin.com/in/marjoleinvanbrandwijk/",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "s.mandal@tata.com",
          firstName: "Shuva",
          lastName: "Mandal",
          position: "Group General Counsel",
          sourcePage: "https://www.linkedin.com/in/shuva-mandal-9002704a",
          companyName: "Tata Sons Limited",
          type: "prospect",
          status: "verified",
        },
        {
          email: "kaizad.sethna@tata.com",
          firstName: "Kaizad",
          lastName: "Sethna",
          position: "Vice President Group HR",
          sourcePage: "https://www.linkedin.com/in/kaizad-sethna-329b7219",
          companyName: "Tata Sons Limited",
          type: "prospect",
          status: "verified",
        },
        {
          email: "kaizads@tata.com",
          firstName: "Kaizad",
          lastName: "Sethna",
          position: "Vice President Group HR",
          sourcePage: "https://www.linkedin.com/in/kaizad-sethna-329b7219",
          companyName: "Tata Sons Limited",
          type: "prospect",
          status: "verified",
        },
        {
          email: "cnage@tata.com",
          firstName: "Chetan",
          lastName: "Nage",
          position: "Senior Manager - Legal",
          sourcePage: "https://www.linkedin.com/in/chetan-nage-48ab1314",
          companyName: "Tata Sons Private Limited",
          type: "prospect",
          status: "verified",
        },
        {
          email: "banerjjeesauvik@tata.com",
          firstName: "Sauvik",
          lastName: "Banerjjee",
          position:
            "Vice President Digital Initiatives Tata Industries, CTO of TataCLiQ & Advisory to Group Co's",
          sourcePage: "https://www.linkedin.com/in/sauvik-banerjjee-492b65a",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sauvik.banerjjee@tata.com",
          firstName: "Sauvik",
          lastName: "Banerjjee",
          position: "Vice President - Tata Industries & Advisor to Group Co’s",
          sourcePage: "https://www.linkedin.com/in/sauvik-banerjjee-492b65a",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sauvik_banerjjee@tata.com",
          firstName: "Sauvik",
          lastName: "Banerjjee",
          position:
            "Vice President Digital Initiatives Tata Industries, CTO of TataCLiQ & Advisory to Group Co's",
          sourcePage: "https://www.linkedin.com/in/sauvik-banerjjee-492b65a",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "banerjjee@tata.com",
          firstName: "Sauvik",
          lastName: "Banerjjee",
          position: "Tata Digital - CTO",
          sourcePage: "https://www.linkedin.com/in/sauvik-banerjjee-492b65a",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "banerjjees@tata.com",
          firstName: "Sauvik",
          lastName: "Banerjjee",
          position: "Tata Digital - Chief Technology Officer",
          sourcePage: "https://www.linkedin.com/in/sauvik-banerjjee-492b65a",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "banerjjee.sauvik@tata.com",
          firstName: "Sauvik",
          lastName: "Banerjjee",
          position: "Tata Digital - CTO",
          sourcePage: "https://www.linkedin.com/in/sauvik-banerjjee-492b65a",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "ratan@tata.com",
          firstName: "Sir Ratan",
          lastName: "Naval Tata",
          position: "chairman",
          sourcePage:
            "https://www.linkedin.com/in/sir-ratan-naval-tata-b1598553",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "S.Singh@tata.com",
          firstName: "Sarabjeet",
          lastName: "Singh",
          position: "Operations Head",
          sourcePage: "https://www.linkedin.com/in/sarabjeet-singh-40a23214",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "supriya.s@tata.com",
          firstName: "Supriya",
          lastName: "Sharan",
          position: "Product Manager",
          sourcePage: "https://www.linkedin.com/in/supriya-sharan-4068993b/",
          companyName: "Tata Digital",
          type: "prospect",
          status: "verified",
        },
        {
          email: "singhs@tata.com",
          firstName: "Sujeet Pratap",
          lastName: "Singh",
          position: "Human Resources Manager",
          sourcePage:
            "https://www.linkedin.com/in/sujeet-pratap-singh-214280178",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "isethi@tata.com",
          firstName: "Indriyajit",
          lastName: "Sethi",
          position: "Vice President, Group Strategic Sourcing",
          sourcePage: "https://www.linkedin.com/in/indriyajit",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "vaibhavw@tata.com",
          firstName: "Vaibhav",
          lastName: "Wantu",
          position: "Regional Head - West",
          sourcePage: "https://www.linkedin.com/in/vaibhav-wantu-6a67441b",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "HR@tata.com",
          firstName: "Raja Harbinder",
          lastName: "Singh",
          position: "Head Of Sourcing-Westside",
          sourcePage:
            "https://www.linkedin.com/in/raja-harbinder-singh-a131a810",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "pr@tata.com",
          firstName: "Rajendra",
          lastName: "Patil",
          position:
            "Offers business opportunity-Work, zero investment, learn & earn, rewards & trips",
          sourcePage: "https://www.linkedin.com/in/rajendra-patil-38937234",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "rajesh@tata.com",
          firstName: "Rajesh",
          lastName: "P",
          position: "Engagement Manager",
          sourcePage: "https://www.linkedin.com/in/rajeshpiyer",
          companyName: "Tata Strategic Management Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "a.shaikh@tata.com",
          firstName: "Aquib",
          lastName: "Shaikh",
          position: "Junior Sales Automation Executive",
          sourcePage: "https://www.linkedin.com/in/aquib-shaikh-8b953613b",
          companyName: "Tata SmartFoodz",
          type: "prospect",
          status: "verified",
        },
        {
          email: "s.bhattacharya@tata.com",
          firstName: "Shantanu",
          lastName: "Bhattacharya",
          position:
            "GM-Digital Learning Experience I Global HR & Leadership Learning I Tata Management Training Centre",
          sourcePage: "https://www.linkedin.com/in/shantanub/",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "bhattacharya@tata.com",
          firstName: "Soumendu",
          lastName: "Bhattacharya",
          position: "Associate Vice President",
          sourcePage: "https://www.linkedin.com/in/bsoumendu",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "bhattacharyas@tata.com",
          firstName: "Shantanu",
          lastName: "Bhattacharya",
          position:
            "GM-Digital Learning Experience I Global HR & Leadership Learning I Tata Management Training Centre",
          sourcePage: "https://www.linkedin.com/in/shantanub/",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sjayarajan@tata.com",
          firstName: "Santhosh",
          lastName: "Jayarajan",
          position: "Assistant General Manager-Electrical",
          sourcePage: "https://www.linkedin.com/in/santhosh-jayarajan-05279553",
          companyName: "Tata Realty and Infrastructure",
          type: "prospect",
          status: "verified",
        },
        {
          email: "ksingh@tata.com",
          firstName: "Kamaljeet Singh ",
          lastName: ".",
          position: "Manager",
          sourcePage: "https://www.linkedin.com/in/kamaljeet-singh-b72b4a20",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "d-amit@tata.com",
          firstName: "Amit",
          lastName: "Deshpande",
          position: "Practice Head - Financial Services",
          sourcePage: "https://www.linkedin.com/in/amit-deshpande",
          companyName: "Tata Strategic Management Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "shah-p@tata.com",
          firstName: "Prachi",
          lastName: "Shah",
          position:
            "Deputy Buyer - Stationery, Bags & Travel - Landmark Division",
          sourcePage: "https://www.linkedin.com/in/prachi-shah-95423458",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "subedar_f@tata.com",
          firstName: "Farokh",
          lastName: "Subedar",
          position: "Chief Operating Officer",
          sourcePage: "https://www.linkedin.com/in/farokh-subedar-29a5aa10",
          companyName: "Tata Sons Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "sanjanabasu@tata.com",
          firstName: "Sanjana",
          lastName: "Basu",
          position: "Senior Manager, Venture Capital Arm of Tata Group",
          sourcePage: "https://www.linkedin.com/in/sanjana-basu",
          companyName: "TATA INDUSTRIES LIMITED",
          type: "prospect",
          status: "verified",
        },
        {
          email: "bhaskar.bhat@tata.com",
          firstName: "Bhaskar",
          lastName: "Bhat",
          position: "Director",
          sourcePage: "https://www.linkedin.com/in/bhaskar-bhat-9540781aa",
          companyName: "TATA SONS LIMITED",
          type: "prospect",
          status: "verified",
        },
        {
          email: "john@tata.com",
          firstName: "Dr. Arun",
          lastName: "John",
          position: "Consulting Advisor- Healthcare",
          sourcePage: "https://www.linkedin.com/in/dr-arun-john-85a5547",
          companyName: "Tata Strategic Management Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "agupta@tata.com",
          firstName: "Amit",
          lastName: "Gupta",
          position: "Deputy Head - Sourcing",
          sourcePage: "https://www.linkedin.com/in/amitguptaiimb",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "rajeevkumar@tata.com",
          firstName: "Rajeev",
          lastName: "Kumar",
          position: "Consulting Specialist",
          sourcePage: "https://www.linkedin.com/in/rajeev-kumar-a8074715",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "aroy@tata.com",
          firstName: "Avrojit",
          lastName: "Roy",
          position: "Department Manager",
          sourcePage: "https://www.linkedin.com/in/avrojit-roy-14167a7a",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "agoyal@tata.com",
          firstName: "Apoorva",
          lastName: "Goyal",
          position: "TAS Manager",
          sourcePage: "https://www.linkedin.com/in/apoorva-goyal-6a01a950",
          companyName: "Tata Group",
          type: "prospect",
          status: "verified",
        },
        {
          email: "vjoshi@tata.com",
          firstName: "Vaibhav",
          lastName: "Joshi",
          position: "Department Manager",
          sourcePage: "https://www.linkedin.com/in/vaibhav-joshi-bb99b411a",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "vinod@tata.com",
          firstName: "Vinod",
          lastName: "Kapote",
          position: "Head - IT",
          sourcePage: "https://www.linkedin.com/in/vinodkapote",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
        {
          email: "des@tata.com",
          firstName: "Sreshttha",
          lastName: "De",
          position: "hr and admin",
          sourcePage: "https://www.linkedin.com/in/sreshttha-de-841206164",
          companyName: "Trent Ltd",
          type: "prospect",
          status: "verified",
        },
      ],
    },
  };

  let slicedArray = [];
  if (data["4"].emails) {
    slicedArray = data["4"].emails.slice(0, 10);
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
  return (
    <div>
      <section className="item-section mt-3">
        <div className="phone-child-div ">
          <div className="px-3">
            <p className="specific-page-title">Description</p>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque ornare pharetra nisi, vel venenatis orci
                scelerisque in. Vestibulum sollicitudin sapien eget tellus
                semper, et congue mauris pharetra.{" "}
              </p>
            </div>
            <p className="specific-page-title">Founded Year</p>
            <div>
              <p>2001</p>
            </div>
            <p className="specific-page-title">Company Headquarter</p>
            <div>
              <p>Alpharetta, Georgia</p>
            </div>
          </div>
          <div className="px-3">
            <p className="specific-page-title">Company Type</p>
            <div>
              <p>Information technology company</p>
            </div>
            <p className="specific-page-title">Company Website</p>
            <div>
              <p>{data["0"].data[0].websiteUrl}</p>
            </div>
            <p className="specific-page-title">Company Email id</p>
            <div>
              <p>Support@HexagonAB.com</p>
            </div>
            <p className="specific-page-title">Phone Number</p>
            <div>
              <p>+91 888 888 8888</p>
            </div>
            <p className="specific-page-title">Employee Rating</p>
            <div>
              <p>4.5 Rating</p>
            </div>
          </div>
          <div className="px-3">
            <p className="specific-page-title">Recent News</p>
            <div>
              <p>
                Slack is needed if the Digital Transformation of Healthcare is
                to succeed
              </p>
              <div className="d-flex justify-content-between border-bottom">
                <p>Forbes</p>
                <p>03 Aug 2021</p>
              </div>
            </div>
            <div>
              <p>
                Slack is needed if the Digital Transformation of Healthcare is
                to succeed
              </p>
              <div className="d-flex justify-content-between">
                <p>Forbes</p>
                <p>03 Aug 2021</p>
              </div>
            </div>
            <p className="specific-page-title">Overall Culture Rating</p>
            <p>Rating</p>
          </div>
        </div>
      </section>
      <section className="item-section">
        <div className="row">
          <div className="col-md-6 pe-5">
            <p className="specific-page-title">Business Description</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque ornare pharetra nisi, vel venenatis orci scelerisque
              in. x
            </p>
          </div>
          <div className="col-md-6">
            <img src={data["0"].data[0].url || ""} alt="" />
            {/*<p className="text-center">*/}
            {/*  Website Screenshot (As on 21 August 2021)*/}
            {/*</p>*/}
          </div>
        </div>
      </section>
      <section className="item-section">
        <p className="specific-page-title">Teams/Key members</p>
        <div className="user-promote-slider">
          {slicedArray.map((user) => (
            <div className="text-center">
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
            </div>
          ))}
        </div>
      </section>
      <section className="item-section">
        <div className="row">
          <div className="col-md-6">
            <p className="specific-page-title">Office Locations</p>
            <img src="assets/images/map.png" alt="" />
          </div>
          <div className="col-md-6">
            <p className="specific-page-title">List of Office Location </p>
            <div>
              <p>Texas, USA</p>
              <p>New York, USA</p>
              <p>Tbilisi, Georgia</p>
              <p>London, UK</p>
              <p>Dubai, UAE</p>
              <p>Atlanta, Georgia</p>
              <p>Atlanta, Georgia</p>
              <p>Atlanta, Georgia</p>
            </div>
          </div>
        </div>
      </section>
      <section className="item-section">
        <div className="row">
          <div className="col-md-4">
            <p className="specific-page-title">Website Teafic</p>
            <img src="assets/images/Group 2431.png" alt="" />
          </div>
          <div className="col-md-4">
            <p className="specific-page-title"> Websites visits per day</p>
            <img src="assets/images/Group 2432.png" alt="" />
          </div>
          <div className="col-md-4">
            <p className="specific-page-title">Social presence</p>
            {data["3"].data.length > 0 ? (
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
            ) : null}
          </div>
        </div>
      </section>
      <section className="item-section">
        <p className="specific-page-title">Tech Stack</p>
        {data["2"].data.length > 0 ? (
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
        ) : null}
      </section>
      <div className="text-center">
        <button className=" see-less-btn">See Less</button>
      </div>
    </div>
  );
};

// export default GoogleApiWrapper({
//   apiKey: "API_KEY",
// })(SpecificCompany);

export default SpecificCompany;

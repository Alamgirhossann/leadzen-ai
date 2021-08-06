from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi_app.router.pipl_router import piplrouter

app = FastAPI()
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Analyst People API Endpoint"}


app.include_router(
    router=piplrouter
)


@app.post("/texAu")
async def texAu():
    print("in texau..")
    response = {
        "execution": {
            "status": "completed",
            "typeOf": "single",
            "executionTime": 20380,
            "inputs": {
                "li_at": "AQEDAQr0kDQA6KfIAAABewqYtE0AAAF7LqU4TU4AQ8QM5xmytN-EQ0lwxuRLPZXNWvNRpxS5cQ660JmpcdvDvzg2mi4QJi7ufPMHJox_KHjf5R9De5gcFdJt6p3SPC4WLMGWqFdzTvmfiuem9Zs3JAs-",
                "search": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                "numberOfPage": 1
            },
            "output": [
                {
                    "url": "https://www.linkedin.com/in/akash-mishra-7a568071?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAA86JG0BfGg1z4XCRhwibfrQyBejStUsQkY",
                    "currentJob": "UI/UX Consultant at Capita India - ..., and Node.  Design and develop web applications...",
                    "pastJob": None,
                    "name": "Akash Mishra",
                    "firstName": "Akash",
                    "lastName": "Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEeoh_BdZGdew/profile-displayphoto-shrink_100_100/0/1516441369970?e=1633564800&v=beta&t=wCA-T4lsS-qAQA-BSJONIQFBE8q3JD7ll_xbAB_iA08",
                    "job": "Web Developer",
                    "location": "Pune",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akash-mishra-17a9bb165?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACd7Qi4BIjU20DHyWZJXHYYaHX2Ei23ldPA",
                    "currentJob": "Passionate front-end web developer with 6+ years...",
                    "pastJob": "none",
                    "name": "Akash Mishra",
                    "firstName": "Akash",
                    "lastName": "Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/D5635AQFKVzYQOeE5lQ/profile-framedphoto-shrink_100_100/0/1626841139711?e=1628060400&v=beta&t=T-nxU8OgcufRzyejvmG0J7O0cNns5eDIgOoL1THioiI",
                    "job": "Web developer at TCS",
                    "location": "Pune",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akashmishra1292?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAp00g8B2tjIdPm5w7LXjDAH-Ott0oolOGk",
                    "currentJob": None,
                    "pastJob": "Team Lead at TechmartLive Solutions, LLC - Working as a Web Developer.",
                    "name": "Akash Kumar Mishra",
                    "firstName": "Akash",
                    "lastName": "Kumar Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5103AQEhiDYKCpaIMA/profile-displayphoto-shrink_100_100/0/1573047343239?e=1633564800&v=beta&t=2VcMUGKYrl_4dMqRSmQImWZC-Y5c4mS-9yXDAolsJfo",
                    "job": "Web Developer at IBA InfoTech",
                    "location": "Delhi, India",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akash-kumar-mishra-11513118b?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACyw9mEBGF1cXMp-R2iue0dUz4nOwqrYkio",
                    "currentJob": "Web Developer at Printlink Computer & Communication Pvt. Ltd.",
                    "pastJob": None,
                    "name": "Akash Kumar Mishra",
                    "firstName": "Akash",
                    "lastName": "Kumar Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5635AQEPuMfsg-mibQ/profile-framedphoto-shrink_100_100/0/1620560298226?e=1628060400&v=beta&t=z0T_70BRNYdznpL5-b8kJw7fzdcaq9XcHb-LP0W4XpU",
                    "job": "JOB SEEKER||FRONT-END DEVELOPER||WORDPRESS||MY SQL||HTML/HTML5||CSS/CSS3||JS||JDBC||ODISHA",
                    "location": "Cuttack",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akashbm?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACjYdmUBOD2weBGIQd-gcIXVf7No7AKI0rw",
                    "currentJob": None,
                    "pastJob": "Web Development Intern at The Sparks Foundation",
                    "name": "AKASH MISHRA",
                    "firstName": "AKASH",
                    "lastName": "MISHRA",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQGNJhwMsYgqQQ/profile-displayphoto-shrink_100_100/0/1601668690636?e=1633564800&v=beta&t=Mm4_TIHtI7pZWqFOcglZuGfv34biA5gPhIYpzju2FbU",
                    "job": "AWS Machine Learning Scholar | Competitive Programming | PR @TIET",
                    "location": "Visakhapatnam",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akash-kumar-mishra-a602a6141?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACJkgGgB24NucoG4NbdShWbZ3e-tnYuktiY",
                    "currentJob": "none",
                    "pastJob": "none",
                    "name": "Akash Kumar Mishra",
                    "firstName": "Akash",
                    "lastName": "Kumar Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQHK7HDb0y7wtw/profile-displayphoto-shrink_100_100/0/1609400908727?e=1633564800&v=beta&t=2W_rmTTaXzlUMd1L_YNxIM-Q9PQ5V7mLAlyZERL7Z10",
                    "job": "Blogger || Freelancer || Web Developer.",
                    "location": "Bengaluru",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akash-mishra-1085b115b?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACZablgB1CdKmbiHoKUqcIl6imrEotQx_zo",
                    "currentJob": "J2EE Web Services",
                    "pastJob": "none",
                    "name": "Akash Mishra",
                    "firstName": "Akash",
                    "lastName": "Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C4E03AQEPJlssBEfuwA/profile-displayphoto-shrink_100_100/0/1599110978474?e=1633564800&v=beta&t=PMWhN-E_9-TXkxS0q9Qw7IQoDAAAdrO0Eps6ADgTrkg",
                    "job": "Software Developer @ Amdocs | M.Tech. CSE [NIT Calicut (2019-21)]. Ex-Accenturite.",
                    "location": "Bhopal",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akash-mishra-a5112711?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAJU8x0BUbDySdeE1QPRdzeUeKxav2lSkDc",
                    "currentJob": "Web and Dot net developer at Paktolus Solutions",
                    "pastJob": None,
                    "name": "Akash Mishra",
                    "firstName": "Akash",
                    "lastName": "Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQF60-ZFRk72TQ/profile-displayphoto-shrink_100_100/0/1517746732510?e=1633564800&v=beta&t=3bOudSmq_kJtqmvY-7aiLW5fn08IbEYzKFCIu97GJZw",
                    "job": "Sr. Develpor - Dot net & web",
                    "location": "Mumbai",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akash-kumar-mishra-18aa9614a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACQcmnoBXmGECYsPZBj_Iuos2l9wr0GFcK0",
                    "currentJob": None,
                    "pastJob": "Web Developer at the webplant pvt. ltd.",
                    "name": "Akash Kumar Mishra",
                    "firstName": "Akash",
                    "lastName": "Kumar Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQFpL7d7oAQqMg/profile-displayphoto-shrink_100_100/0/1517857357533?e=1633564800&v=beta&t=vtrT3MguzuzFAFKa0kwz1isk-jmLVMxL_McAnphmvhk",
                    "job": "Senior Software Engineer at Heureux Software Solutions Pvt. Ltd.",
                    "location": "Delhi, India",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akash-mishra-?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAABh9LyIBrAKQBPCTCjeNeG1ua9nzeAjBhvA",
                    "currentJob": None,
                    "pastJob": "Senior Engineer - Product Development at HARMAN India - • Worked on Web services development and on the backend side of the platform, based on IoT...",
                    "name": "Akash Mishra",
                    "firstName": "Akash",
                    "lastName": "Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5103AQGybtULUV4IGA/profile-displayphoto-shrink_100_100/0/1529399784084?e=1633564800&v=beta&t=jDMpXJztdoG7xn6G4s-4DvraA5V2uF7-AYdrIKGq4x4",
                    "job": "Senior Software Developer at Forrester",
                    "location": "Gurgaon",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akash-kumar-mishra-11513118b?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACyw9mEBGF1cXMp-R2iue0dUz4nOwqrYkio",
                    "currentJob": "Web Developer at Printlink Computer & Communication Pvt. Ltd.",
                    "pastJob": None,
                    "name": "Akash Kumar Mishra",
                    "firstName": "Akash",
                    "lastName": "Kumar Mishra",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5635AQEPuMfsg-mibQ/profile-framedphoto-shrink_100_100/0/1620560298226?e=1628060400&v=beta&t=z0T_70BRNYdznpL5-b8kJw7fzdcaq9XcHb-LP0W4XpU",
                    "job": "JOB SEEKER||FRONT-END DEVELOPER||WORDPRESS||MY SQL||HTML/HTML5||CSS/CSS3||JS||JDBC||ODISHA",
                    "location": "Cuttack",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                },
                {
                    "url": "https://www.linkedin.com/in/akashbm?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACjYdmUBOD2weBGIQd-gcIXVf7No7AKI0rw",
                    "currentJob": None,
                    "pastJob": "Web Development Intern at The Sparks Foundation",
                    "name": "AKASH MISHRA",
                    "firstName": "AKASH",
                    "lastName": "MISHRA",
                    "profilePicture": "https://media-exp1.licdn.com/dms/image/C5603AQGNJhwMsYgqQQ/profile-displayphoto-shrink_100_100/0/1601668690636?e=1633564800&v=beta&t=Mm4_TIHtI7pZWqFOcglZuGfv34biA5gPhIYpzju2FbU",
                    "job": "AWS Machine Learning Scholar | Competitive Programming | PR @TIET",
                    "location": "Visakhapatnam",
                    "query": "https://www.linkedin.com/search/results/people/?firstName=akash&lastName=mishra&title=developer&keywords=web&industry=%5B%2296%22%5D",
                    "category": "People",
                    "timestamp": "2021-08-03T06:03:52.503Z"
                }
            ],
            "columnOrder": [
                "url",
                "pastJob",
                "name",
                "firstName",
                "lastName",
                "job",
                "profilePicture",
                "location",
                "query",
                "category",
                "timestamp",
                "error",
                "message",
                "cookieError"
            ]
        },
        "success": True
    }
    return response

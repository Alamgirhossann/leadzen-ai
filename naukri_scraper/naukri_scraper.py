# Web Scraper to retrieve information from naukri.com

from bs4 import BeautifulSoup
import requests
import pandas as pd
from selenium import webdriver
import os
import time
from datetime import datetime, timedelta
os.system('clear')

# no_of_pages = input("Enter the Number of Pages to be Scraped :")
no_of_pages = 3
url = "https://www.naukri.com/online-scrapper-jobs?cityTypeGid=9508"

cols = ['Job Title',
        'Job Link', 
        'Company Name', 
        'Company Link', 
        'Experience', 
        'Description', 
        'Salary Range', 
        'Location', 
        'Reviews',
        'Review Link', 
        'Ratings',
        'Skills', 
        'Type of Job',
        'Date of Posting',]

data = pd.DataFrame(columns=cols)

def scrape_page(url):

    """
    Function to use scrape data from a single page listing all the jobs on naukri.com.
    Takes the URL to be searched as the input argument.
    Returns a list of all the data scraped from the given url.
    """

    #  Request the url from the http server using selenium and parse using beautiful soup
    
    opts = webdriver.FirefoxOptions()
    opts.add_argument("--headless")
    driver = webdriver.Firefox(options=opts)
    driver.get(url)
    # page = requests.get(url) 

    time.sleep(5) 
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    driver.close()
    ret = []

    # Iterating through all the required job listings based on container classes
    for element in soup.find_all('article', class_='jobTuple bgWhite br4 mb-8'):
        job_header = element.find(class_ = "title fw500 ellipsis")
        job_title = job_header.text
        job_link = job_header.get('href')

        company_header = element.find(class_ = "subTitle ellipsis fleft")
        company_name = company_header.text
        company_link = company_header.get('href')

        exp = element.find(class_ = "ellipsis fleft fs12 lh16")
        exp = exp.text

        salary_header = element.find(class_ = "fleft grey-text br2 placeHolderLi salary")
        salary = salary_header.find(class_ = "ellipsis fleft fs12 lh16")
        salary = salary.text

        desc = element.find(class_ = "job-description fs12 grey-text")
        desc = desc.text

        location_header = element.find(class_ = "fleft grey-text br2 placeHolderLi location")
        location = location_header.find(class_ = "ellipsis fleft fs12 lh16")
        location = location.text

        rating = element.find(class_ = "starRating fleft dot")
        if rating:
            rating = rating.text
        else:
            rating = 'Not Specified'

        reviews = element.find(class_ = "reviewsCount ml-5 fleft blue-text")
        
        if reviews:
            review_link = reviews.get('href')
            reviews = reviews.text[1:len(reviews.text)-1].split(' ')[0]
            
        else:
            reviews = 'Not Specified'
            review_link = 'NA'

        skills_header = element.find(class_ = "tags has-description")
        skills = []
        if skills_header:
            for skill in skills_header:
                skills.append(skill.text)

        type_header = element.find(class_ = "jobType type fleft br2 mr-8")
    
        if type_header:
            type = type_header.find(class_ = 'fleft fw500')
            type = type.text
        else:
            type = 'Not Specified'

        posting_date_header = element.find(class_ = "type br2 fleft grey")

        if posting_date_header:
            posting_date = posting_date_header.find(class_ = "fleft fw500")
            posting_date = posting_date.text.split(' ')[0]

            if posting_date == '30+':
                posting_date = '30+ Days Ago'
            else:
                posting_date = datetime.today() - timedelta(days= int(posting_date))
                posting_date = posting_date.date()

        else:
            posting_date = 'Not Specified'

        # Append data to a list and return 
        entry = [job_title, job_link, company_name, company_link, exp, desc, salary, location, reviews, review_link, rating, skills, type, posting_date]
        ret.append(entry)
    return ret

# Loop to iterate through the number of pages to be searched
for i in range(1, no_of_pages+1):
    print(url)
    data_list = scrape_page(url)
    temp = pd.DataFrame(data_list, columns=cols)
    data = data.append(temp, ignore_index=True)
    # print(temp)
    
    if i==1:
        split_url = url.split('?')
        url = split_url[0] + '-' + str(i+1) + '?' + split_url[1]
    else:
        split_url = url.split('-'+ str(i))
        url = split_url[0] + '-' + str(i+1) + split_url[1]

data.to_csv('naukri_data.csv')
print('No. of Listings : ', len(data))

# sudo docker run proj:scraper
# sudo docker build -f Dockerfile -t proj:scraper .
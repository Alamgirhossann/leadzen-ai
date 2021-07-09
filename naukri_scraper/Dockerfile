FROM ubuntu:latest
FROM python:3.9

ENV PYTHONUNBUFFERED 1

WORKDIR /naukri_scraper

RUN echo "deb http://deb.debian.org/debian/ unstable main contrib non-free" >> /etc/apt/sources.list.d/debian.list
RUN apt-get update
RUN apt-get install -y --no-install-recommends firefox
RUN apt-get -y install python3-pip

ADD ./naukri_scraper.py /naukri_scraper/
ADD ./geckodriver /naukri_scraper/
COPY ./requirements.txt /naukri_scraper/requirements.txt


RUN cp geckodriver /usr/local/bin/
RUN chmod +x /usr/local/bin/geckodriver
RUN pip install -r requirements.txt

COPY ./naukri_scraper.py /naukri_scraper/
COPY ./geckodriver /naukri_scraper/

EXPOSE 8080
# RUN firefox
RUN ls
CMD python3 naukri_scraper.py

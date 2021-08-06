FROM python:3.9-slim-buster
MAINTAINER Analystt AI <support@analystt.ai>

RUN apt-get update -qqy && \
   apt-get -qqy --no-install-recommends install sudo build-essential wget && \
   rm -rf /var/lib/apt/lists/*

RUN apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false

RUN adduser appuser
RUN echo "appuser ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

WORKDIR /home/appuser

COPY requirements.txt requirements.txt

RUN python -m venv venv
RUN venv/bin/pip install pip wheel setuptools --upgrade
RUN venv/bin/pip install -r requirements.txt && rm -rf /root/.cache/pip

COPY fastapi_app fastapi_app
COPY boot.sh ./

RUN chmod +x boot.sh
RUN chown -R appuser:appuser ./

USER appuser

EXPOSE 5000

ENTRYPOINT ["./boot.sh"]

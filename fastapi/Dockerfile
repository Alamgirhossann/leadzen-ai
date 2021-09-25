FROM python:3.9-slim-buster
MAINTAINER Analystt AI <support@analystt.ai>

RUN apt-get update -qqy && \
   apt-get -qqy --no-install-recommends install sudo build-essential wget && \
   rm -rf /var/lib/apt/lists/*

RUN apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false

RUN adduser appuser
RUN echo "appuser ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER appuser
WORKDIR /home/appuser

COPY --chown=appuser:appuser  requirements.txt requirements.txt

RUN python -m venv venv
RUN venv/bin/pip install pip wheel setuptools --upgrade
RUN venv/bin/pip install -r requirements.txt && rm -rf ~/.cache/pip

COPY --chown=appuser:appuser  app app
COPY --chown=appuser:appuser  alembic.env.py ./
COPY --chown=appuser:appuser  alembic.ini ./
COPY --chown=appuser:appuser  boot.sh ./
COPY --chown=appuser:appuser  Excel Excel
RUN chmod +x boot.sh
EXPOSE 5000

ENTRYPOINT ["./boot.sh"]

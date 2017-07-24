FROM python:3
COPY ./web/requirements.txt /usr/src/requirements.txt
WORKDIR /usr/src/
RUN pip install -r requirements.txt
WORKDIR /usr/src/app

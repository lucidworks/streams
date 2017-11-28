FROM alpine:3.5

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && pip install bottle \
  && pip install requests \
  && rm -rf /var/cache/apk/*

RUN pip install clarifai --upgrade

WORKDIR /app
COPY main.py /app/
COPY requirements.txt /app/

ONBUILD RUN virtualenv /env && /env/bin/pip install -r /app/requirements.txt

ADD static /app/static/

EXPOSE 8080
CMD ["/usr/bin/python", "main.py"]

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

ADD static /app/static/
ADD views /app/views/

EXPOSE 8082
CMD ["/usr/bin/python", "main.py"]

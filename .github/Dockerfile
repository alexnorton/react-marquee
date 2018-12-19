FROM node:10-alpine

ENV HOME /github/home

RUN apk update && apk add git

RUN mkdir -p /github/home \
  && git config --global user.email "anonymous@example.com" \
  && git config --global user.name "GitHub Action"
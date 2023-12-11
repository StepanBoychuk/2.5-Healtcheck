FROM node:alpine

RUN npm install -g nodemon

COPY . /app

WORKDIR /app

RUN npm install

CMD ['npm', 'start:dev']
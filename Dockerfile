FROM postor/nodejs-docker

WORKDIR /app

RUN docker pull node:8-alpine

COPY package.json /app/package.json

RUN npm i

COPY . /app

CMD node app.js



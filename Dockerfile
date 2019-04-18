FROM postor/nodejs-docker

WORKDIR /app

COPY package.json /app/package.json

RUN npm i

COPY . /app

CMD node app.js



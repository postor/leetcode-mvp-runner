FROM maven:jdk-8-alpine

ADD . /app

WORKDIR /app

RUN chmod +x test.sh && mvn dependency:go-offline

CMD ./test.sh
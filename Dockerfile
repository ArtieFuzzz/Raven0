FROM node:alpine

LABEL key="ArtieFuzzz <jardenz.den@gmail.com>"

RUN apk update
RUN apk add py3-pip libtool autoconf automake g++ gcc git make

WORKDIR /opt/build/raven0

COPY package*.json ./

RUN npm install

RUN npm run build

COPY node_modules .

COPY build ./

ENTRYPOINT [ "npm", "start" ]

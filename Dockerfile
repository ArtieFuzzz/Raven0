FROM node:alpine

LABEL key="ArtieFuzzz <jardenz.den@gmail.com>"

RUN apk update
RUN apk add py3-pip libtool autoconf automake g++ gcc git make

WORKDIR /opt/build/raven0

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf src

ENTRYPOINT [ "npm", "start" ]

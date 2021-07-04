FROM node:alpine

LABEL DEVELOPER="ArtieFuzzz <jardenz.den@gmail.com>"

RUN apk update && apk add libtool autoconf automake g++ gcc git make

WORKDIR /opt/build/raven0

COPY . .
RUN npm install
RUN npm run build

RUN rm -rf src
RUN npm cache clean --force

ENTRYPOINT [ "npm", "start" ]

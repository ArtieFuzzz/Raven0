FROM node:alpine

RUN apk update
RUN apk add py3-pip libtool autoconf automake g++ gcc git make

WORKDIR /opt/raven0

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]

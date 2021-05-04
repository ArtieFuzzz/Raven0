FROM node:alpine

RUN apk add libtool autoconf automake g++ gcc git make

WORKDIR /opt/raven0

COPY package*.json ./

COPY . .

RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]

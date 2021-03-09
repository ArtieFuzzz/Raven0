FROM node:alpine

ENV NODE_CONTAINER_VERSION=1.0.0

WORKDIR /src

COPY package*.json ./

RUN npm install

CMD [ "node", "." ]
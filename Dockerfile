FROM nikolaik/python-nodejs:latest

WORKDIR /src

COPY package*.json ./

RUN npm install --python=3.9

CMD [ "node", "." ]

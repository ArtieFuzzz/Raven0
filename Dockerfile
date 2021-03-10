FROM nikolaik/python-nodejs:latest

WORKDIR /

COPY package*.json ./

RUN npm install --python=3.9

CMD [ "node", "src/main.js" ]

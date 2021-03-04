FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app

RUN npm install --legacy-peer-deps

COPY . /app

CMD ["npm", "start"]
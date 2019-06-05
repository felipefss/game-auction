FROM node:lts-alpine

WORKDIR /app/server

COPY client /app/client/
COPY server /app/server/

RUN npm install

EXPOSE 3000

CMD node app.js

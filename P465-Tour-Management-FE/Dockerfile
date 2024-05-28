FROM node:20.11.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update caddy
RUN npm ci --omit-dev
COPY ./src ./src
COPY ./public ./public
COPY ./Caddyfile ./
RUN npm run build

CMD caddy run
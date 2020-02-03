FROM node:8-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
ENV PORT 8001
COPY . .
RUN npm run build
RUN npm i -g serve
EXPOSE 8001
ENTRYPOINT ["serve", "-s", "dist"]
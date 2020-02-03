FROM node:12
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3333
ENTRYPOINT ["npm", "run", "dev"]
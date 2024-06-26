FROM node:20.11.1

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 4002

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
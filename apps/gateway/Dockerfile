FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:gateway

EXPOSE 4000
CMD ["npm", "run", "start:gateway"]
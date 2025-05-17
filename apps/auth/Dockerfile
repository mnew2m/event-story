FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:auth

EXPOSE 4001
CMD ["npm", "run", "start:auth"]
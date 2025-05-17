FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:auth

EXPOSE 3000
CMD ["npm", "run", "start:auth"]
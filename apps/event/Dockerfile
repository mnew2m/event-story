FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:event

EXPOSE 4002
CMD ["npm", "run", "start:event"]
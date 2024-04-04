FROM node:latest
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY ./ ./

RUN npm run build

EXPOSE 8080

<<<<<<< HEAD
CMD ["npm", "run", "dev"]
=======
CMD ["npm", "run", "dev"]
>>>>>>> 8966d5d46a7b7619be3cb535b41aab6641ffcdc4

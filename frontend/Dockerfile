FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
<<<<<<< HEAD
EXPOSE 5000
CMD ["node", "server.js"]
=======
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
>>>>>>> 9d59fae (initial commit frontend)

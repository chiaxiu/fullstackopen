FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

COPY . .

RUN chown -R node:node /usr/src/app

USER node

ENV VITE_BACKEND_URL="http://localhost:8080/api" 

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
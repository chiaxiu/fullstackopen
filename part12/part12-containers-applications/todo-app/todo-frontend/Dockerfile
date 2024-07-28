# Stage 1: Build
FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_BACKEND_URL="http://localhost:8080/api"

RUN npm run build

# Stage 2: Test
FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app .

RUN npm ci
RUN npm test

# Stage 3: Production
FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
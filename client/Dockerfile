# Dockerfile for React and Nginx

# Build Environment
# Pull Docker Hub base image
FROM node:16.15.0-alpine3.15 as build-stage
# Set working directory
WORKDIR /usr/app

COPY ./package.json ./
COPY ./yarn.lock ./


# Copy app to container
RUN yarn install

COPY . .

RUN yarn build

# production Environment

FROM nginx:alpine as production-stage

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /usr/app/build /usr/share/nginx/html

# Pull Docker Hub base image
FROM node:16.15.0-alpine3.15
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn
# Copy app to container
COPY . .

EXPOSE 8800

CMD [ "yarn", "start" ]
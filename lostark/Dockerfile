# Dockerfile adapted from
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package.json ./

RUN npm install

# Bundle app source
COPY . ./

EXPOSE 4000
CMD [ "node", "app.js" ]

# docker build -t coinark-server .
# docker run -d --rm -p 4000:4000 -v $(pwd)/db:/usr/src/app/db coinark-server
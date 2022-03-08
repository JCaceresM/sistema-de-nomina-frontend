# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:14-slim

# for caching optimisations
COPY package*.json /
RUN npm install
# required to serve the react app on the live server
RUN npm install -g serve

COPY . /app
WORKDIR /app

# noop files for non python projects and local development
RUN echo "#!/bin/bash" > /app/migrate.sh && chmod +x /app/migrate.sh
RUN echo "#!/bin/bash" > /usr/local/bin/start && chmod +x /usr/local/bin/start

ENV PATH=/node_modules/.bin:$PATH
ENV PORT=80
ENV HOST=0.0.0.0
ENV BROWSER='none'

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]

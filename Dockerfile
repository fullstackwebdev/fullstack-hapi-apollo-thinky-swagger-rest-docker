FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn install
CMD [ "npm", "start" ]
EXPOSE 8081
#EXPOSE 3001

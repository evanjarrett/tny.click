FROM node:8.11.1

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN cd /app && yarn install --force

EXPOSE 3000
CMD ["yarn", "start"]

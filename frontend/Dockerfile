FROM node:8.11.1

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN cd /app

RUN yarn global add @angular/cli@6.0.3
RUN yarn install --force
RUN ng set --global packageManager=yarn

EXPOSE 4200
CMD yarn start

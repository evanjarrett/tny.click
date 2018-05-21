FROM node:8.11.1

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN cd /app

RUN yarn global add @angular/cli@1.7.4
RUN yarn install --force
RUN ng set --global packageManager=yarn

EXPOSE 4200
CMD yarn start

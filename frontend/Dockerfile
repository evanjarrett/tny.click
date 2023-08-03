FROM node:16.13.2

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN yarn global add @angular/cli@13.2.0
RUN yarn install --force
RUN ng config -g cli.packageManager yarn

EXPOSE 4200
CMD yarn start

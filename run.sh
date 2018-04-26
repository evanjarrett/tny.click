#!/usr/bin/env bash

docker-compose run --rm yarn "$@"
sudo chown -R ${USER} .

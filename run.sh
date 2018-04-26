#!/usr/bin/env bash

docker-compose run --rm frontend "$@"
sudo chown -R ${USER} .

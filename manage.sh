#!/usr/bin/env bash
export UID=$UID
docker-compose run --rm tnyclick python manage.py

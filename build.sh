#!/usr/bin/env bash
docker-compose run --rm frontend yarn build
docker-compose run --rm tnyclick bash -c "python manage.py collectstatic --noinput"
# "&& python manage.py migrate && python manage.py createsuperuser"

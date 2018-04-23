FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN mkdir /config

ADD ./requirements.txt /config/

RUN pip install -r /config/requirements.txt

RUN mkdir /src;

WORKDIR /src

ADD ./ /src/

RUN python manage.py makemigrations
RUN python manage.py migrate

CMD exec gunicorn tnyclick.wsgi -b 0.0.0.0:8000 --workers 3

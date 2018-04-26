# Tny.Click

## Image uploading service

This is built using react and django.

To build react: `./run.sh yarn build`

To build the final container: `docker-compose build tnyclick`



The reasoning for all the Dockerfiles is because I want to test out react, 
but don't like the idea of having Node installed locally.
Now they are nicely contained, and are not polluting my local env. :)


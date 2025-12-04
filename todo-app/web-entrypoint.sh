#!/bin/sh

# substitute environment variables in the config file
echo $API_URL
envsubst '$API_URL' < /usr/share/nginx/html/config.template.json > /usr/share/nginx/html/config.json

# remove the template file
rm /usr/share/nginx/html/config.template.json

# start nginx
nginx -g 'daemon off;'
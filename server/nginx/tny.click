#
# HTTPS server configuration
#

server {
    listen 80;
    server_name tny.click;
    return 301 https://$host$request_uri;
}

server {
    listen  443 ssl;
    server_name tny.click;

    root    /var/www/tnyclick;

    access_log /var/log/nginx/tnyclick-access.log;
    error_log /var/log/nginx/tnyclick-error.log;


    location / {
        index   index.php index.html index.htm;
    }

    # Only execute php files from root dir.
    location  ~ \/.*\.php$ {
        try_files       $uri =404;
        fastcgi_pass    127.0.0.1:9000;
        fastcgi_index   index.php;
        fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param   PHP_VALUE "upload_max_filesize = 50M \n post_max_size=51M";
        include         fastcgi_params;                
    }

    # Set type to plain text
    location ~ /f/ { 
        default_type    text/plain;
    }

    # set type to png for images
    location ~ /i/ { 
        default_type    image/png;
    }

    # set type to gif for images
    location ~ /g/ { 
        default_type    image/gif;
    }


    ssl on;

    # add SSL conf here


    add_header Strict-Transport-Security max-age=15768000;

}



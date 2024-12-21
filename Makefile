run:
	echo $$PWD
	mkdir -p /tmp/nginx
	nginx -c $$PWD/nginx.conf

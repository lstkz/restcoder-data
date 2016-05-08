#!/bin/sh

#BASE
docker push restcoder/base_trusty

#SERVICES
docker push restcoder/service_mongodb:3.2.0
docker push restcoder/service_mysql:5.1.73
docker push restcoder/service_postgres:8.4.20
docker push restcoder/service_redis:3.0.6

#NODEJS
docker push restcoder/lang_nodejs:4.2.4
docker push restcoder/lang_nodejs:5.4.1

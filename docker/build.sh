#!/bin/sh

#BASE
docker build -t restcoder/base_trusty data/base/trusty

#SERVICES
docker build -t restcoder/service_mongodb:3.2.0  data/service_mongodb/3.2.0
docker build -t restcoder/service_mysql:5.1.73  data/service_mysql/5.1.73
docker build -t restcoder/service_postgres:8.4.20  data/service_postgres/8.4.20
docker build -t restcoder/service_redis:3.0.6  data/service_redis/3.0.6


#NODEJS
docker build -t restcoder/lang_nodejs:4.2.4  data/languages/nodejs/4.2.4
docker build -t restcoder/lang_nodejs:5.4.1  data/languages/nodejs/5.4.1


#!/bin/sh

#BASE
docker build -t docker.restcoder.com/base_trusty data/base/trusty

#SERVICES
docker build -t docker.restcoder.com/service_mongodb  data/service_mongodb/src
docker build -t docker.restcoder.com/service_redis  data/service_redis/src
docker build -t docker.restcoder.com/service_postgres  data/service_postgres/src


#NODEJS
docker build -t docker.restcoder.com/lang_nodejs:4.2.4  data/languages/nodejs/4.2.4
docker build -t docker.restcoder.com/lang_nodejs:5.4.1  data/languages/nodejs/5.4.1


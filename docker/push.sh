#!/bin/sh

#BASE
docker push docker.restcoder.com/base_trusty

#SERVICES
docker push docker.restcoder.com/service_mongodb
docker push docker.restcoder.com/service_redis
docker push docker.restcoder.com/service_postgres

#NODEJS
docker push docker.restcoder.com/lang_nodejs:4.2.4
docker push docker.restcoder.com/lang_nodejs:5.4.1

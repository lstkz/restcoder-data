#!/bin/sh

docker build -t docker.restcoder.com/service_mongodb  data/service_mongodb/src
docker build -t docker.restcoder.com/service_redis  data/service_redis/src

#!/bin/sh

#BASE
docker push restcoder/base_trusty
docker push restcoder/base_wheezy

#SERVICES
docker push restcoder/service_mongodb:3.2.0
docker push restcoder/service_mysql:5.1.73
docker push restcoder/service_postgres:8.4.20
docker push restcoder/service_redis:3.0.6

#NODEJS
docker push restcoder/lang_nodejs:4.4.4
docker push restcoder/lang_nodejs:6.1.0


#RUBY
docker push restcoder/lang_ruby:2.3.1

#PYTHON
docker push restcoder/lang_python:2.7.11

#JAVA
docker push restcoder/lang_java:1.8.0

#.NET
docker push restcoder/lang_dotnet:4.0.5

# APPS
docker push restcoder/app_007_proxy_api

# PROBLEMS
docker push restcoder/postgres_starter
docker push restcoder/postgres
docker push restcoder/redis

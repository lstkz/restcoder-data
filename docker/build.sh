#!/bin/sh

#BASE
docker build -t restcoder/base_trusty data/base/trusty
docker build -t restcoder/base_wheezy data/base/wheezy

#SERVICES
docker build -t restcoder/service_mongodb:3.2.6  data/service_mongodb/3.2.6
docker build -t restcoder/service_mysql:5.7.12  data/service_mysql/5.7.12
docker build -t restcoder/service_postgres:9.5.3  data/service_postgres/9.5.3
docker build -t restcoder/service_redis:3.2.0  data/service_redis/3.2.0


#NODEJS
docker build -t restcoder/lang_nodejs:4.4.4  data/languages/nodejs/4.4.4
docker build -t restcoder/lang_nodejs:6.1.0  data/languages/nodejs/6.1.0

#RUBY
docker build -t restcoder/lang_ruby:2.3.1  data/languages/ruby/2.3.1

#PYTHON
docker build -t restcoder/lang_python:2.7.11  data/languages/python/2.7.11

#JAVA
docker build -t restcoder/lang_java:1.8.0  data/languages/java/1.8.0

#.NET
docker build -t restcoder/lang_dotnet:4.0.5  data/languages/dotnet/4.0.5


# APPS
docker build -t restcoder/app_007_proxy_api data/apps/007-proxy-api



# PROBLEMS
docker build -t restcoder/postgres_starter data/problems/002-starter-database-connection/pg_database



#!/bin/sh

#BASE
docker build -t restcoder/base_trusty data/base/trusty
docker build -t restcoder/base_wheezy data/base/wheezy

#SERVICES
docker build -t restcoder/service_mongodb:3.2.0  data/service_mongodb/3.2.0
docker build -t restcoder/service_mysql:5.1.73  data/service_mysql/5.1.73
docker build -t restcoder/service_mysql:5.7.12  data/service_mysql/5.7.12
docker build -t restcoder/service_postgres:9.5.3  data/service_postgres/9.5.3
docker build -t restcoder/service_redis:3.0.6  data/service_redis/3.0.6


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
docker build -t restcoder/lang_dotnet:4.2.3  data/languages/dotnet/4.2.3



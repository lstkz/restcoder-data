FROM centos:centos6

#####################
# Install mysql     #
# port: 6379        #
# version: 3.0.6    #
#####################


RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum groupinstall -y "Development tools"
RUN yum -y install wget tar; yum clean all


RUN wget http://download.redis.io/releases/redis-3.0.6.tar.gz && \
    tar xzf redis-3.0.6.tar.gz && \
    cd redis-3.0.6 && \
    make && \
    make install

RUN adduser -m app
RUN chown app /redis-3.0.6/src
USER app
WORKDIR /redis-3.0.6/src/
ENTRYPOINT ["redis-server"]
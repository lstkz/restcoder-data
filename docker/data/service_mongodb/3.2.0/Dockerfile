FROM centos:centos6

#####################
# Install mongodb   #
# port: 27017       #
# version: 3.2.0    #
#####################


RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all

RUN echo -e "[mongodb-org-3.2]\n\
name=MongoDB Repository\n\
baseurl=https://repo.mongodb.org/yum/redhat/5/mongodb-org/3.2/x86_64/\n\
gpgcheck=0\n\
enabled=1" >> /etc/yum.repos.d/mongodb-org-3.2.repo

RUN yum install -y mongodb-org-3.2.0 mongodb-org-server-3.2.0 mongodb-org-shell-3.2.0 mongodb-org-mongos-3.2.0 mongodb-org-tools-3.2.0
RUN adduser -m app
RUN mkdir -p /data/db
RUN chown app /data/db
USER app

ENTRYPOINT ["/usr/bin/mongod"]
FROM centos:centos6

#####################
# Install mysql     #
# port: 3306        #
# version: 5.1.73   #
#####################


RUN yum -y install mysql-server; yum clean all
RUN service mysqld start && \
mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION; FLUSH PRIVILEGES; CREATE DATABASE mydb;"

USER mysql
ENTRYPOINT ["/usr/bin/mysqld_safe"]
FROM centos:centos6

######################
# Install postgres   #
# port: 5432         #
# version: 8.4.20    #
######################

RUN yum -y install postgresql-server
RUN service postgresql initdb
COPY postgresql.conf /var/lib/pgsql/data/postgresql.conf
COPY pg_hba.conf /var/lib/pgsql/data/pg_hba.conf
COPY init.sh /init.sh
RUN service postgresql start && runuser -l postgres -c "createdb mydb"
RUN chmod +x /init.sh
CMD /bin/bash -c "/init.sh start; while true; do sleep 1; done"
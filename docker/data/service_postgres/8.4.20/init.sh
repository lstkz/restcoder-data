#!/bin/sh
#
# postgresql    This is the init script for starting up the PostgreSQL
#               server.
#
# chkconfig: - 64 36
# description: PostgreSQL database server.
# processname: postmaster
# pidfile: /var/run/postmaster.PORT.pid

# This script is slightly unusual in that the name of the daemon (postmaster)
# is not the same as the name of the subsystem (postgresql)

# PGVERSION is the full package version, e.g., 8.4.0
# Note: the specfile inserts the correct value during package build
PGVERSION=8.4.20
# PGMAJORVERSION is major version, e.g., 8.4 (this should match PG_VERSION)
PGMAJORVERSION=`echo "$PGVERSION" | sed 's/^\([0-9]*\.[0-9]*\).*$/\1/'`

# Source function library.
. /etc/rc.d/init.d/functions

# Get network config.
. /etc/sysconfig/network

# Find the name of the script
NAME=`basename $0`
if [ ${NAME:0:1} = "S" -o ${NAME:0:1} = "K" ]
then
        NAME=${NAME:3}
fi

# For SELinux we need to use 'runuser' not 'su'
if [ -x /sbin/runuser ]
then
    SU=runuser
else
    SU=su
fi


# Set defaults for configuration variables
PGENGINE=/usr/bin
PGPORT=5432
PGDATA=/var/lib/pgsql/data
PGLOG=/var/lib/pgsql/pgstartup.log
# Value to set as postmaster process's oom_adj
PG_OOM_ADJ=-17

# Override defaults from /etc/sysconfig/pgsql if file is present
[ -f /etc/sysconfig/pgsql/${NAME} ] && . /etc/sysconfig/pgsql/${NAME}

export PGDATA
export PGPORT

lockfile="/var/lock/subsys/${NAME}"
pidfile="/var/run/postmaster.${PGPORT}.pid"

script_result=0

start(){
        [ -x "$PGENGINE/postmaster" ] || exit 5

        PSQL_START=$"Starting ${NAME} service: "

        # Make sure startup-time log file is valid
        if [ ! -e "$PGLOG" -a ! -h "$PGLOG" ]
        then
                touch "$PGLOG" || exit 4
                chown postgres:postgres "$PGLOG"
                chmod go-rwx "$PGLOG"
                [ -x /sbin/restorecon ] && /sbin/restorecon "$PGLOG"
        fi

        # Check for the PGDATA structure
        if [ -f "$PGDATA/PG_VERSION" ] && [ -d "$PGDATA/base" ]
        then
                # Check version of existing PGDATA
                if [ x`cat "$PGDATA/PG_VERSION"` != x"$PGMAJORVERSION" ]
                then
                        SYSDOCDIR="(Your System's documentation directory)"
                        if [ -d "/usr/doc/postgresql-$PGVERSION" ]
                        then
                                SYSDOCDIR=/usr/doc
                        fi
                        if [ -d "/usr/share/doc/postgresql-$PGVERSION" ]
                        then
                                SYSDOCDIR=/usr/share/doc
                        fi
                        if [ -d "/usr/doc/packages/postgresql-$PGVERSION" ]
                        then
                                SYSDOCDIR=/usr/doc/packages
                        fi
                        if [ -d "/usr/share/doc/packages/postgresql-$PGVERSION" ]
                        then
                                SYSDOCDIR=/usr/share/doc/packages
                        fi
                        echo
                        echo $"An old version of the database format was found."
                        echo $"You need to upgrade the data format before using PostgreSQL."
                        echo $"See $SYSDOCDIR/postgresql-$PGVERSION/README.rpm-dist for more information."
                        exit 1
                fi
        else
                # No existing PGDATA! Warn the user to initdb it.
                echo
                echo "$PGDATA is missing. Use \"service postgresql initdb\" to initialize the cluster first."
                echo_failure
                echo
                exit 1
        fi

        echo -n "$PSQL_START"
        test x"$PG_OOM_ADJ" != x && echo "$PG_OOM_ADJ" > /proc/self/oom_adj
        $SU -l postgres -c "$PGENGINE/postmaster -p '$PGPORT' -D '$PGDATA' ${PGOPTS} &" >> "$PGLOG" 2>&1 < /dev/null
        sleep 2
        pid=`head -n 1 "$PGDATA/postmaster.pid" 2>/dev/null`
        if [ "x$pid" != x ]
        then
                success "$PSQL_START"
                touch "$lockfile"
                echo $pid > "$pidfile"
                echo
        else
                failure "$PSQL_START"
                echo
                script_result=1
        fi
}

stop(){
        echo -n $"Stopping ${NAME} service: "
        if [ -e "$lockfile" ]
        then
            $SU -l postgres -c "$PGENGINE/pg_ctl stop -D '$PGDATA' -s -m fast" > /dev/null 2>&1 < /dev/null
            ret=$? 
            if [ $ret -eq 0 ]
            then
                echo_success
                rm -f "$pidfile"
                rm -f "$lockfile"
            else
                echo_failure
                script_result=1
            fi
        else
            # not running; per LSB standards this is "ok"
            echo_success
        fi
        echo
}

restart(){
    stop
    start
}

condrestart(){
    [ -e "$lockfile" ] && restart || :
}

reload(){
    $SU -l postgres -c "$PGENGINE/pg_ctl reload -D '$PGDATA' -s" > /dev/null 2>&1 < /dev/null
}

initdb(){
    if [ -f "$PGDATA/PG_VERSION" ]
    then
        echo -n "Data directory is not empty!"
        echo_failure
        echo
        script_result=1
    else
        echo -n $"Initializing database: "
        if [ ! -e "$PGDATA" -a ! -h "$PGDATA" ]
        then
                mkdir -p "$PGDATA" || exit 1
                chown postgres:postgres "$PGDATA"
                chmod go-rwx "$PGDATA"
        fi
        # Clean up SELinux tagging for PGDATA
        [ -x /sbin/restorecon ] && /sbin/restorecon "$PGDATA"

        # Make sure the startup-time log file is OK, too
        if [ ! -e "$PGLOG" -a ! -h "$PGLOG" ]
        then
                touch "$PGLOG" || exit 1
                chown postgres:postgres "$PGLOG"
                chmod go-rwx "$PGLOG"
                [ -x /sbin/restorecon ] && /sbin/restorecon "$PGLOG"
        fi

        # Initialize the database
        $SU -l postgres -c "$PGENGINE/initdb --pgdata='$PGDATA' --auth='ident'" >> "$PGLOG" 2>&1 < /dev/null

        # Create directory for postmaster log
        mkdir "$PGDATA/pg_log"
        chown postgres:postgres "$PGDATA/pg_log"
        chmod go-rwx "$PGDATA/pg_log"

        if [ -f "$PGDATA/PG_VERSION" ]
        then
            echo_success
        else
            echo_failure
            script_result=1
        fi
        echo
    fi
}

# See how we were called.
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  status)
        status -p "$pidfile" postmaster
        script_result=$?
        ;;
  restart)
        restart
        ;;
  condrestart|try-restart)
        condrestart
        ;;
  reload)
        reload
        ;;
  force-reload)
        restart
        ;;
  initdb)
        initdb
        ;;
  *)
        echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|initdb}"
        exit 2
esac

exit $script_result

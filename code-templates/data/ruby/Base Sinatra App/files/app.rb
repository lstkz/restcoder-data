require 'sinatra'

# your app goes here
# http://www.sinatrarb.com/




# there is no callback for sinatra startup
# wait 1s and print READY
Thread.new do
  sleep 1
  print 'READY'
end
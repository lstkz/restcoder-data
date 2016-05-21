from flask import Flask
import time
import sys
import os
from threading import Thread

app = Flask(__name__)

# your app goes here
# http://flask.pocoo.org/


# there is no callback for flask startup
# wait 1s and print READY
class readyThread(Thread):
    def run(self):
        time.sleep(1)
        sys.stdout.write("READY")
        sys.stdout.flush()

if __name__ == "__main__":
    readyThread().start()
    port = int(os.getenv('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
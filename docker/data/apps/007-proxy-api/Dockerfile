FROM restcoder/lang_nodejs:6.1.0


ENV SECRET_AUTH="r3st0d34Secret"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD node app
FROM restcoder/base_trusty

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 4.2.4

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
  && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.gz"
  
RUN adduser -disabled-password --gecos '' app
WORKDIR /home/app
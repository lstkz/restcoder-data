'use strict';
/*
export REDIS_URL=redis://localhost:6379
export PROXY_API_URL=http://localhost:5050
export PORT=3700

 */

var express = require('express');
var superagent = require('superagent');
var app = express();
const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

app.get('*', (req, res, next) => {
  const url = req.url;
  console.log(url);
  redisClient.get(url, function (err, result) {
    if (err) {
      return next(err);
    }
    if (result) {
      res.json(JSON.parse(result));
      return;
    }
    superagent.get(process.env.PROXY_API_URL + url)
      .end(function (err, proxyRes) {
        if (err || proxyRes.status !== 200) {
          res.status(502).end();
        } else {
          redisClient.setex(url, 5, JSON.stringify(proxyRes.body), function (err) {
            console.log(arguments);
            if (err) {
              return next(err);
            }
            res.json(proxyRes.body);
          });
        }
      });
  });
});


app.listen(process.env.PORT, function () {
    console.log('listening on port', process.env.PORT);
    console.log('READY');
});
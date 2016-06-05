'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5050;

const app = express();

app.use(bodyParser.json());

const responses = {};

app.post('/set', function (req, res, next) {
  if (req.get('authorization') === process.env.SECRET_AUTH) {
    // structure
    // {type: String, json: Object, status: Number}
    responses[req.body.url] = req.body.settings;
    res.end();
  } else {
    next();
  }
});

app.get('*', function (req, res, next) {
  const data = responses[req.url];
  if (!data) {
    res.json({
      result: 'some random response'
    })
  } else {
    switch (data.type) {
      case 'ok':
        res.status(data.status || 200).json(data.json);
        return;
      case 'error':
        res.socket.destroy();
        return;
      default:
        res.status(500).end();
    }
  }
});



app.listen(PORT, function () {
  console.log('listening on', PORT);
});
'use strict';


var express = require('express');
var app = express();

//your app goes here

app.listen(process.env.PORT, function () {
  console.log('Listening on', process.env.PORT);
  //Keep this line, otherwise your app will fail testing
  console.log('READY');
});
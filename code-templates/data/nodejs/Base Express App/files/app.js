'use strict';


var express = require('express');
var app = express();

//your app goes here

app.listen(process.env.PORT, function () {
    //Keep this line, otherwise your app will fail testing
    console.log('READY');
});
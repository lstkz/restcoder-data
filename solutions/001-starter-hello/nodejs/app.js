'use strict';


var express = require('express');
var app = express();

app.get("/hello", function (req, res) {
    res.send("world"); 
});

app.listen(process.env.PORT, function () {
    //Keep this line, otherwise your app will fail testing
    console.log('READY');
});
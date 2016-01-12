"use strict";

var fs = require('fs');
var _ = require("underscore");
var Path = require("path");
var ejs = require("ejs");
var marked = require('marked');
var utils = require("../lib/utils");
var Problem = require("../lib/models").Problem;


var basePath = Path.join(__dirname, "./data");

var variables = require("./variables.json");


utils.run(function* () {
    yield Problem.remove({});
    var directories = fs.readdirSync(basePath);
    yield directories.map(dir => {
        var path = basePath + "/" + dir;
        var data = JSON.parse(fs.readFileSync(path + "/data.json", 'utf8'));
        var content = fs.readFileSync(path + "/content.html", 'utf8');

        variables.md = function (filename) {
            return marked(fs.readFileSync(path + "/" + filename, 'utf8'));
        };
        content = ejs.render(content, variables);
        data.content = content;
        data.examples = require(path + "/examples");
        data.examples.forEach(item => {
            item.requests.forEach(r => {
                if (_.isObject(r.response.body)) {
                    r.response.body = JSON.stringify(r.response.body, null, 4);
                }
            });
        });
        if (data.swaggerSpecs) {
            data.swaggerSpecs = data.swaggerSpecs.map(spec => {
                spec.content = fs.readFileSync(path + "/" + spec.content, 'utf8');
                return spec;
            });
        }
        return Problem.create(data);
    });
});
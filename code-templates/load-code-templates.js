"use strict";

var fs = require('fs');
var config = require('config');
var _ = require("underscore");
var Path = require("path");
var utils = require("../lib/utils");
var CodeTemplate = require("../lib/models").CodeTemplate;


var basePath = Path.join(__dirname, "data");
var baseDirs = [
    Path.join(basePath, "nodejs"),
    Path.join(basePath, "ruby"),
    Path.join(basePath, "python"),
    Path.join(basePath, "java"),
    Path.join(basePath, "dotnet"),
];

utils.run(function* () {
    yield CodeTemplate.remove({});

    yield _.map(baseDirs, baseDir => function*() {
        var directories = fs.readdirSync(baseDir);
        yield directories.map(dir => {
            var path = baseDir + "/" + dir;
            var data = JSON.parse(fs.readFileSync(path + "/data.json", 'utf8'));
            var filesPath = path + "/files";
            var files = utils.getFiles(filesPath);
            data.files = files.map(filePath => {
                return {
                    path: filePath.replace(filesPath, "").replace(/^\//, ""),
                    content: fs.readFileSync(filePath, "utf8")
                };
            });
            return CodeTemplate.create(data);
        });
    });
});
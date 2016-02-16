"use strict";

var utils = require("../lib/utils");
var Language = require("../lib/models").Language;
var Service = require("../lib/models").Service;

utils.run(function* () {
    yield Language.remove({});
    yield Language.create(require("./data/language.json"));

    yield Service.remove({});
    yield Service.create(require("./data/service.json"));
});
"use strict";

const fs = require('fs');
const Path = require("path");
const utils = require("../lib/utils");
const uuid = require('node-uuid');


const basePath = Path.join(__dirname, "./data");

const owner = '62523';
const BASE_URL = 'http://localhost:5000';

utils.run(function* () {
  const directories = fs.readdirSync(basePath);
  yield directories.map((dir) => {
    const path = basePath + "/" + dir;
    const data = JSON.parse(fs.readFileSync(path + "/data.json", 'utf8'));
    const examples = JSON.parse(fs.readFileSync(path + "/examples.json", 'utf8'));
    const timestamp = new Date().getDate();
    const postman = {
      id: uuid.v4(),
      name: data.name,
      description: '',
      order: [],
      folders: [],
      timestamp,
      owner,
      remoteLink: '',
      public: false,
      requests: []
    };
    examples[0].requests.forEach((req) => {
      const request =  {
        id: uuid.v4(),
        headers: '',
        url: "http://localhost:5000/hello",
        pathVariables: {},
        preRequestScript: "",
        method: "GET",
        data: [],
        dataMode: "params",
        description: "",
        descriptionFormat: "html",
        time: timestamp,
        version: 1,
        responses: [],
        tests: "",
        collectionId: "92c6f882-f028-fbe7-b989-9315d7c5198c",
        name: "http://localhost:5000/hello",
        folder: ""
      };
    });
  });
});
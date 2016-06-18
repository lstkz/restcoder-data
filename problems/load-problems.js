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

function _createGettingStarted(basePath, problem) {
  const path = basePath + "/getting-started.json";
  if (!fs.existsSync(path)) {
    return '';
  }
  var steps = JSON.parse(fs.readFileSync(path, 'utf8'));
  const variables = {problem};
  const stepsHtml = steps.map((step) => {
    if (step.cmd) {
      return `<span class="nv">$ </span>${ejs.render(step.cmd, variables)}<br/>`;
    }
    if (step.comment) {
      return `<span class="bash-comment"># ${ejs.render(step.comment, variables)}</span>`;
    }
  });
  return (
`<section id="getting-started">
    <h4>Getting started</h4>
    <pre><code>${stepsHtml.join('<br/>')}</code></pre>
</section>`);
}

function _renderDockerSetupRow(image) {
  return (`
  <tr>
    <td><strong>${image.name}</strong></td>
    <td>
        ${image.description}<br/><br/>
        Start docker container:<br/>
        <pre><code><span class="nv">$ </span>${image.command}</code></pre>
        Set <code>${image.env}</code> in <code>.env</code>:<br/>
        <pre><code><span class="nv">$ </span>restcoder set ${image.name}</code></pre>
    </td>
  </tr>`);
}

function dockerSetup(basePath, file='docker-images.json') {
  const path = Path.join(basePath, file);
  var images = JSON.parse(fs.readFileSync(path, 'utf8'));
  return (`
<section>
    <h4>Docker Setup</h4>
    <div class="table-responsive">
        <table class="table table-bordered table-condensed">
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
            <tbody>
                ${images.map(_renderDockerSetupRow).join('')}
            </tbody>
        </table>
    </div>
</section>`);
}

utils.run(function*() {
  var directories = fs.readdirSync(basePath);
  yield directories.map(dir => {
    var path = basePath + "/" + dir;
    var data = JSON.parse(fs.readFileSync(path + "/data.json", 'utf8'));
    var content = fs.readFileSync(path + "/content.html", 'utf8');

    variables.md = function (filename) {
      return marked(fs.readFileSync(path + "/" + filename, 'utf8'));
    };
    variables.dockerSetup = (filename) => {
      return dockerSetup(path, filename);
    };
    content = ejs.render(content, variables);
    data.content = content + _createGettingStarted(path, data);
    data.examples = require(path + "/examples");
    data.examples.forEach(item => {
      item.requests.forEach(r => {
        if (_.isObject(r.response.body)) {
          r.response.body = JSON.stringify(r.response.body, null, 4);
        }
        if (_.isObject(r.request.body)) {
          r.request.body = JSON.stringify(r.request.body, null, 4);
        }
      });
    });
    if (data.swaggerSpecs) {
      data.swaggerSpecs = data.swaggerSpecs.map(spec => {
        spec.content = fs.readFileSync(path + "/" + spec.content, 'utf8');
        return spec;
      });
    }
    return function*() {
      try {
        yield Problem.findByIdAndUpdate(data._id, data, { upsert: true });
      } catch (e) {
        console.log('failed: ' + dir);
        throw e;
      }
    };
  });
});
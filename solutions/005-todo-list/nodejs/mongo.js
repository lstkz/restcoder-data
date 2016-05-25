'use strict';


var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

var connection = mongoose.createConnection(process.env.MONGODB_URL);
autoIncrement.initialize(connection);

const TODOSchema = new Schema({
  name: String,
  done: Boolean
});
TODOSchema.plugin(autoIncrement.plugin, {
  model: 'TODO',
  startAt: 1
});
var TODO = connection.model('TODO', TODOSchema);


app.use(bodyParser.json());

function _mapItem(item) {
  return {
    id: item._id,
    name: item.name,
    done: item.done
  }
}

app.post('/todos', (req, res, next) => {
  if (!req.body.name || typeof req.body.name !== 'string') {
    res.status(400).json({error: 'invalid name'});
    return;
  }
  const item = new TODO({
    name: req.body.name,
    done: false
  });
  item.save().then(() => {
    res.status(201).json(_mapItem(item));
  }).catch(next);
});


app.get('/todos', (req, res, next) => {
  TODO.find({}).sort({_id: 1}).then((result) => res.json(result.map(_mapItem))).catch(next);
});

app.post('/todos/:id/done', (req, res, next) => {
  const id = +req.params.id;
  if (!id || id < 1 || id % 1 !== 0) {
    res.status(400).json({error: 'invalid id'});
    return;
  }
  TODO.findById(id).then((item) => {
    if (!item) {
      res.status(404).json({error: 'not found'});
      return;
    }
    if (item.done) {
      res.status(400).json({error: 'already done'});
      return;
    }
    item.done = true;
    return item.save();
  }).then(() => {
    res.status(204).end();
  }).catch(next);
});


app.listen(process.env.PORT, function () {
    //Keep this line, otherwise your app will fail testing
    console.log('READY');
});
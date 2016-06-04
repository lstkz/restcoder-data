'use strict';


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.POSTGRES_URL, {})


var TODO = sequelize.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  done: Sequelize.BOOLEAN
}, {
  timestamps: false,
});



app.use(bodyParser.json());

app.post('/todos', (req, res, next) => {
  if (!req.body.name || typeof req.body.name !== 'string') {
    res.status(400).json({error: 'invalid name'});
    return;
  }
  TODO.create({
    name: req.body.name,
    done: false
  }).then((item) => {
    res.status(201).json(item);
  }).catch(next);
});


app.get('/todos', (req, res, next) => {
  TODO.findAll({order: 'id ASC'}).then((result) => res.json(result)).catch(next);
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
  if (!process.env.FOREMAN_WORKER_NAME || process.env.FOREMAN_WORKER_NAME === 'web.1') {
    sequelize.sync().then(function () {
      console.log('READY');
    })
  } else {
    console.log('READY');
  }
});


'use strict';


const express = require('express');
const _ = require('underscore');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var connection = mongoose.createConnection(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/testdb');

const ReservationSchema = new Schema({
  username: String,
  spots: Number,
});

const RoomSchema = new Schema({
  name: {type: String, unique: true, required: true},
  spots: Number,
  spotsLeft: Number,
  reservations: [ReservationSchema]
});

var Room = connection.model('Room', RoomSchema);

app.use(bodyParser.json());

app.post('/rooms', (req, res, next) => {
  const values = req.body;
  values.spotsLeft = values.spots;
  values.reservations = [];
  Room.create(req.body).then(() => res.status(204).end()).catch(next);
});


app.get('/rooms', (req, res, next) => {
  Room.find({})
    .then((rooms) => {
      const result = rooms.map((room) => {
        const groups = _.groupBy(room.reservations, 'username');
        return {
          name: room.name,
          spots: room.spots,
          spotsLeft: room.spotsLeft,
          reservations: _.map(groups, (values, username) => {
            return {
              username,
              totalSpots: values.reduce((sum, value) => sum + value.spots, 0)
            };
          })
        };
      });
      res.json(result);
    })
    .catch(next);
});

app.post('/rooms/:name/reservations', (req, res, next) => {
  const spots = req.body.spots;
  Room.findOneAndUpdate(
    {name: req.params.name, spotsLeft: {$gte: spots}},
    {$push: {reservations: req.body}, $inc: {spotsLeft: -spots} },
    {new: false}
  ).then((room) => {
    if (!room) {
      res.status(400).end();
    } else {
      res.status(204).end();
    }
  }).catch(next);
});

app.use(function (err, req, res, next) {
  console.log(err, err.stack);
  res.status(500).json({err: err});
});

app.listen(process.env.PORT || 5000, function () {
  console.log('READY');
});
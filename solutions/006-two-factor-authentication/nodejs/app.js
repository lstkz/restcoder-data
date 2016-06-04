

'use strict';


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const qr = require('qr-image');
const jwt = require('jwt-simple');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || 'secret';

var connection = mongoose.createConnection(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/testdb');

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: String,
  secret: String,
  enabled: Boolean,
});

var User = connection.model('User', UserSchema);

passport.use(new BearerStrategy(function (token, done) {
  let userId;
  try {
    userId = jwt.decode(token, JWT_TOKEN_SECRET).userId;
  } catch (e) {
    return done(null, false);
  }
  User.findById(userId, done);
}));

const auth = (req, res, next) => {
  const header = req.get('authorization') || '';
  if (!header) {
    res.status(401).end();
    return;
  }
  const split = header.trim().split(' ');
  if (split.length !== 2 || split[0] !== 'JWT') {
    res.status(401).end();
    return;
  }
  let userId;
  try {
    userId = jwt.decode(split[1], JWT_TOKEN_SECRET).userId;
  } catch (e) {
    res.status(401).end();
    return;
  }
  User.findById(userId).then((user) => {
    if (!user) {
      res.status(401).end();
      return;
    }
    req.user = user;
    next();
  }).catch(next);
};

app.use(bodyParser.json());

app.post('/register', (req, res, next) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

app.post('/login', (req, res, next) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          error: 'INVALID_CREDENTIALS'
        });
        return;
      }
      if (user.enabled) {
        if (!req.body.code) {
          res.status(401).json({
            error: 'CODE_REQUIRED'
          });
          return;
        }
        const verified = speakeasy.totp.verify({ secret: user.secret, encoding: 'base32', token: req.body.code});
        if (!verified) {
          res.status(401).json({
            error: 'INVALID_CODE'
          });
          return;
        }
      }
      res.json({
        token: jwt.encode({userId: user.id}, JWT_TOKEN_SECRET)
      });
    })
    .catch(next);
});

app.get('/me', auth, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

app.post('/two-factor', auth, (req, res, next) => {
  if (req.user.enabled) {
    res.status(400).json({
      error: 'ALREADY_ENABLED'
    });
    return;
  }
  const secret = speakeasy.generateSecret({
    name: req.user.username
  });
  secret.otpauth_url += '&issuer=RestCoder';
  req.user.enabled = false;
  req.user.secret = secret.base32;
  req.user.save().then(() => {
    res.set('content-type', 'image/png');
    qr.image(secret.otpauth_url, { type: 'png' }).pipe(res);
  }).catch(next);
});


app.post('/two-factor/confirm', auth, (req, res, next) => {
  if (req.user.enabled) {
    res.status(400).json({
      error: 'ALREADY_ENABLED'
    });
    return;
  }
  const verified = speakeasy.totp.verify({ secret: req.user.secret, encoding: 'base32', token: req.body.code});
  if (!verified) {
    res.status(400).json({
      error: 'INVALID_CODE'
    });
    return;
  }
  req.user.enabled = true;
  req.user.save().then(() => {
    res.status(204).end();
  }).catch(next);
});

app.delete('/two-factor', auth, (req, res, next) => {
  if (!req.user.enabled) {
    res.status(400).json({
      error: 'NOT_ENABLED'
    });
    return;
  }
  req.user.enabled = false;
  req.user.save().then(() => res.status(204).end()).catch(next);
});

app.use(function (err, req, res, next) {
  console.log(err, err.stack);
  res.status(500).json({err: err});
});

app.listen(process.env.PORT || 5000, function () {
  console.log('READY');
});
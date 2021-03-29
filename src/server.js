'use strict';

const express = require('express');
const app = express();
const notFoundRequest = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
app.use(express.json()); //Global Middleware
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
app.use(logger); //Global Middleware
const superTest = require('supertest');


app.get('/', (req, res) => {
  res.send('Hello From the Other side');
});

app.get('/error', (req, res) => {
  throw new Error('ERROR FROM server side :) ...');
});

//http://localhost:3000/person?name=raghad
app.get('/person', validator, (req, res) => {
  res.json({ name: `${req.query.name}` });
});

function start(port) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

app.use('*', notFoundRequest);
app.use(errorHandler);

module.exports = {
  app: app,
  start: start,
  superTest:superTest,
};
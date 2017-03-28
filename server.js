'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const S3_BUCKET = process.env.S3_BUCKET;
require('dotenv').config();

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan')
  app.use(logger('dev'))
}
const projects = require('./routes/projects.js');
const sign_s3 = require('./routes/sign-s3.js');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/projects', projects);
app.use('sign-s3', sign_s3);

app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log(err)
  res.status(err.status || 500)
  res.json(err)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on http://localhost:'+ port);
});

module.exports = app;

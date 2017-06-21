// BASE SETUP
const express = require('express');
const debug = require('debug')('placementapp');
const name = 'placementapp';
debug('booting %s', name);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://nikhil:ferrari2805@ds131480.mlab.com:31480/placementdev1');

//app.use('/', routes);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
var router = require('./api');
app.use('/api', router);

app.listen(8000, function() {
  console.log('listening app on 8000')
});
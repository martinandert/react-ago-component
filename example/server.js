'use strict';

var express     = require('express');
var browserify  = require('connect-browserify');
var reactify    = require('reactify');
var React       = require('react');

require('node-jsx').install();

var App = React.createFactory(require('./client'));

express()
  .use('/bundle.js', browserify.serve({
    entry: __dirname + '/client',
    debug: true, watch: true,
    transforms: [reactify]
  }))
  .get('/style.css', function(req, res, next) {
    res.setHeader('Content-Type', 'text/css');
    res.send('body { margin-top: 100px; text-align: center; } h1 { font-weight: normal; margin: 0 20px 20px; } time { font-weight: bold; } p { margin: 0 20px 5px; }');
  })
  .get('/', function(req, res, next) {
    var now = Date.now();

    res.cookie('serverTime', now, { maxAge: 10000, httpOnly: false });
    res.send(React.renderToString(App({ serverTime: now })));
  })
  .listen(3000, function() {
    console.log('Point your browser to http://localhost:3000');
  });

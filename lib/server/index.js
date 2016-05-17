'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console, no-use-before-define, no-underscore-dangle, global-require  */

var debug = require('debug')('buzz-website-component:server.client');
var app = new _express2.default();
var port = _config2.default.port;

// Use this middleware to set up hot module reloading via webpack.
if (global.__DEVELOPMENT__) {
  debug('In Development Mode - Load Hot Dev');
  require('./middleware/hot-dev.middleware').default(app, require('../../webpack/config.js'));
} else {
  app.use(_express2.default.static(_path2.default.join(__dirname, '../../static')));
}

var API_KEY = '818457475735154';
var SECRET = 'MvaEq-GIUf8U_QdcTOF4kOb0-sg';
var CLOUD_NAME = 'dpl3us1zw';

app.get('/cloudinary/*', function (req, res) {
  var url = 'https://api.cloudinary.com/v1_1/' + CLOUD_NAME + '/resources/';
  console.log('Path', req.path);
  console.log('Params', req.params);
  console.log('Query', req.query);

  var endpoint = req.path.replace('/cloudinary', '');

  _axios2.default.get(url + endpoint, {
    auth: { username: API_KEY, password: SECRET }
  }).then(function (response) {
    debug(response.data);
    res.json(response.data);
  }).catch(function (error) {
    debug(error);
    res.error(error);
  });
});

app.use(function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, '../client/index.html'));
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port ' + port + '. Open up http://localhost:' + port + '/ in your browser.');
  }
});
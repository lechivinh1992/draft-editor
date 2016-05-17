'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, webpackConfig) {
  var compiler = (0, _webpack2.default)(webpackConfig);
  app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
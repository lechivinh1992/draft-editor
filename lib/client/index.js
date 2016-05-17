'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Root = require('../containers/Root');

var _Root2 = _interopRequireDefault(_Root);

var _configureStore = require('../redux/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = window.__data;
var store = (0, _configureStore2.default)(initialState);

var rootElement = document.getElementById('content');

(0, _reactDom.render)(_react2.default.createElement(_Root2.default, { store: store }), rootElement);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData();

  var id = _Entity$get$getData.id;

  return _react2.default.createElement(
    'span',
    { id: id },
    props.children
  );
};
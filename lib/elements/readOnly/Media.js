'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  var entity = _draftJs.Entity.get(props.block.getEntityAt(0));

  var _entity$getData = entity.getData();

  var src = _entity$getData.src;
  var alignment = _entity$getData.alignment;
  var caption = _entity$getData.caption;
  var entities = _entity$getData.entities;

  var type = entity.getType();

  var component = void 0;
  if (type === 'image') {
    component = _react2.default.createElement(_Image2.default, { src: src, alignment: alignment, caption: caption });
  }
  if (type === 'table') {
    component = _react2.default.createElement(_Table2.default, { entities: entities });
  }

  return component;
};
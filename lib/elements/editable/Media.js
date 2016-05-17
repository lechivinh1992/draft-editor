'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  var entity = _draftJs.Entity.get(props.block.getEntityAt(0));

  var _entity$getData = entity.getData();

  var src = _entity$getData.src;
  var alt = _entity$getData.alt;
  var alignment = _entity$getData.alignment;
  var caption = _entity$getData.caption;

  var type = entity.getType();

  var blockProps = props.blockProps;


  var component = void 0;
  if (type === 'image') {
    component = _react2.default.createElement(_Image2.default, { src: src, alignment: alignment, alt: alt, caption: caption, block: props.block, blockProps: blockProps });
  }

  return component;
};
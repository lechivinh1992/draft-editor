'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  var entity = _draftJs.Entity.get(props.block.getEntityAt(0));

  var _entity$getData = entity.getData();

  var markdown = _entity$getData.markdown;

  console.log(entity.getData());
  return _react2.default.createElement('div', { id: 'content', dangerouslySetInnerHTML: { __html: (0, _marked2.default)(markdown || '') } });
};
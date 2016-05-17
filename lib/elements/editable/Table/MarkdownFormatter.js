'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkdownFormatter = function MarkdownFormatter(props) {
  return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: (0, _marked2.default)(props.value ? props.value.toString() : '') } });
};

MarkdownFormatter.propTypes = {
  value: _react.PropTypes.any
};

exports.default = MarkdownFormatter;
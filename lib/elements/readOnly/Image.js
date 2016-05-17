'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600
  },
  buttons: {
    marginBottom: 10
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: 'center'
  },
  media: {
    maxWidth: '100%'
  }
};

exports.default = function (props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('img', { src: props.src, style: styles.media, alt: props.caption }),
    _react2.default.createElement(
      'p',
      null,
      props.caption
    ),
    _react2.default.createElement(
      'p',
      null,
      props.alignment
    )
  );
};
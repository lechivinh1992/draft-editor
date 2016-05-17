'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

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
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3
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
  link: {
    color: '#3b5998',
    textDecoration: 'underline'
  }
};

exports.default = function (props) {
  var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData();

  var href = _Entity$get$getData.href;
  var url = _Entity$get$getData.url;

  return _react2.default.createElement(
    'a',
    { href: href || url, style: styles.link },
    props.children
  );
};
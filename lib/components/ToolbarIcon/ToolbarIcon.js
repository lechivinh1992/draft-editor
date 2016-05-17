'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ToolbarIcon = require('./ToolbarIcon.scss');

var _ToolbarIcon2 = _interopRequireDefault(_ToolbarIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ToolbarIcon = function ToolbarIcon(_ref) {
  var label = _ref.label;
  var icon = _ref.icon;
  var active = _ref.active;
  var onToggle = _ref.onToggle;
  var style = _ref.style;
  return _react2.default.createElement(
    'li',
    {
      className: (0, _classnames2.default)(_ToolbarIcon2.default.root, _defineProperty({}, _ToolbarIcon2.default.active, active)),
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        onToggle(style);
      }
    },
    !icon ? label : _react2.default.createElement(
      'span',
      { className: 'material-icons' },
      icon
    )
  );
};

ToolbarIcon.propTypes = {
  label: _react.PropTypes.string,
  icon: _react.PropTypes.string,
  active: _react.PropTypes.bool,
  onToggle: _react.PropTypes.func.isRequired,
  style: _react.PropTypes.string
};

exports.default = ToolbarIcon;
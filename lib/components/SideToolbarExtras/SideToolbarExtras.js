'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ToolbarIcon = require('../ToolbarIcon');

var _ToolbarIcon2 = _interopRequireDefault(_ToolbarIcon);

var _types = require('../../types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SideToolbarExtras = require('./SideToolbarExtras.scss');

var _SideToolbarExtras2 = _interopRequireDefault(_SideToolbarExtras);

var _common = require('../../styles/common.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SideToolbarExtras = function SideToolbarExtras(_ref) {
  var editorState = _ref.editorState;
  var onToggle = _ref.onToggle;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_common.toolbar, _SideToolbarExtras2.default.root) },
    _react2.default.createElement(
      'ul',
      { className: _common.toolbarIcons },
      _types.BLOCK_TYPES.map(function (type) {
        return _react2.default.createElement(_ToolbarIcon2.default, {
          key: type.label || type.icon,
          active: type.style === blockType,
          label: type.label,
          icon: type.icon,
          onToggle: onToggle,
          style: type.style
        });
      })
    )
  );
};

SideToolbarExtras.propTypes = {
  editorState: _react.PropTypes.object,
  onToggle: _react.PropTypes.func.isRequired
};

exports.default = SideToolbarExtras;
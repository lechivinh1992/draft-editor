'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _ToolbarIcon = require('../ToolbarIcon');

var _ToolbarIcon2 = _interopRequireDefault(_ToolbarIcon);

var _types = require('../../types');

var _customStyleMap = require('../../customStyleMap');

var _common = require('../../styles/common.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineToolbar = function (_Component) {
  _inherits(InlineToolbar, _Component);

  function InlineToolbar() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, InlineToolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(InlineToolbar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isLinkEdit: false,
      url: ''
    }, _this.onToggleStyle = function (inlineStyle) {
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var editorState = _this$props.editorState;

      onChange(_draftJs.RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }, _this.onApplyEntity = function () {
      var editorState = _this.props.editorState;


      var entityKey = _draftJs.Entity.create('link-to', 'MUTABLE', { id: 'hello' });
      var contentState = editorState.getCurrentContent();

      var entity = _draftJs.Modifier.applyEntity(contentState, editorState.getSelection(), entityKey);

      var nextEditorState = _draftJs.EditorState.push(editorState, entity, 'apply-entity');

      _this.props.onChangeSimple(nextEditorState);
    }, _this.onToggleColor = function (toggledColor) {
      var _this$props2 = _this.props;
      var editorState = _this$props2.editorState;
      var onChange = _this$props2.onChange;

      var selection = editorState.getSelection();

      // Let's just allow one color at a time. Turn off all active colors.
      var nextContentState = Object.keys(_customStyleMap.colorStyleMap).reduce(function (contentState, color) {
        return _draftJs.Modifier.removeInlineStyle(contentState, selection, color);
      }, editorState.getCurrentContent());

      var nextEditorState = _draftJs.EditorState.push(editorState, nextContentState, 'change-inline-style');

      var currentStyle = editorState.getCurrentInlineStyle();

      // Unset style override for current color.
      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce(function (state, color) {
          return _draftJs.RichUtils.toggleInlineStyle(state, color);
        }, nextEditorState);
      }

      // If the color is being toggled on, apply it.
      if (!currentStyle.has(toggledColor)) {
        nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
      }

      onChange(nextEditorState);
    }, _this.onShowLinkEdit = function () {
      _this.setState({ isLinkEdit: true, url: '' }, function () {
        return _this.refs.url.focus();
      });
    }, _this.onUrlChange = function (e) {
      return _this.setState({ url: e.target.value });
    }, _this.onConfirmLink = function (e) {
      e.preventDefault();
      _this.confirmLink(_this.state.url);
    }, _this.onUrlEnterKeyDown = function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        _this.confirmLink(_this.state.url);
      }
    }, _this.confirmLink = function (urlValue) {
      var editorState = _this.props.editorState;

      var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: urlValue, alt: 'Hello' });
      var nextEditorState = _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);

      _this.props.onChangeSimple(nextEditorState);
      _this.setState({ isLinkEdit: false, url: '' });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InlineToolbar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var editorState = _props.editorState;
      var position = _props.position;

      var currentStyle = editorState.getCurrentInlineStyle();

      if (this.state.isLinkEdit) {
        return _react2.default.createElement(
          'div',
          { id: 'inlineToolbar', className: _common.toolbar, style: position },
          _react2.default.createElement('input', {
            type: 'text', ref: 'url',
            value: this.state.url,
            onChange: this.onUrlChange,
            onKeyDown: this.onUrlEnterKeyDown
          }),
          _react2.default.createElement(
            'button',
            { onClick: this.onConfirmLink },
            'Confirm Link'
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { id: 'inlineToolbar', className: _common.toolbar, style: position },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'ul',
            { className: _common.toolbarIcons },
            _types.INLINE_STYLES.map(function (type) {
              return _react2.default.createElement(_ToolbarIcon2.default
              // key={type.label || type.icon}
              // active={currentStyle.has(type.style)}

              // key={type.label || type.icon}
              // active={currentStyle.has(type.style)}
              , {
                key: type.label || type.icon,
                active: currentStyle.has(type.style),
                label: type.label,
                icon: type.icon,
                onToggle: _this2.onToggleStyle,
                style: type.style
              });
            }),
            _types.COLORS.map(function (type) {
              return _react2.default.createElement(_ToolbarIcon2.default, {
                key: type.label || type.icon,
                active: currentStyle.has(type.style),
                label: type.label,
                icon: type.icon,
                onToggle: _this2.onToggleColor,
                style: type.style
              });
            }),
            _react2.default.createElement(_ToolbarIcon2.default, { label: 'Link',
              icon: 'link',
              onToggle: this.onShowLinkEdit
              // style={type.style}
            }),
            _react2.default.createElement(_ToolbarIcon2.default, { label: 'Link To',
              icon: 'more',
              onToggle: this.applyLinkTo
              // style={type.style}
            })
          )
        )
      );
    }
  }]);

  return InlineToolbar;
}(_react.Component);

InlineToolbar.propTypes = {
  editorState: _react.PropTypes.object,
  onChange: _react.PropTypes.func.isRequired,
  onChangeSimple: _react.PropTypes.func.isRequired,
  position: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    left: _react.PropTypes.number
  })
};
exports.default = InlineToolbar;
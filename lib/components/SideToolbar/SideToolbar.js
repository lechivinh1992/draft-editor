'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _SideToolbarExtras = require('../SideToolbarExtras');

var _SideToolbarExtras2 = _interopRequireDefault(_SideToolbarExtras);

var _SideToolbar = require('./SideToolbar.scss');

var _SideToolbar2 = _interopRequireDefault(_SideToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideToolbar = function (_Component) {
  _inherits(SideToolbar, _Component);

  function SideToolbar(props) {
    _classCallCheck(this, SideToolbar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SideToolbar).call(this, props));

    _this.onToggle = function (blockType) {
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var editorState = _this$props.editorState;

      onChange(_draftJs.RichUtils.toggleBlockType(editorState, blockType));
    };

    _this.state = {
      isExpanded: false
    };
    return _this;
  }

  _createClass(SideToolbar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isExpanded = this.state.isExpanded;
      var _props = this.props;
      var editorState = _props.editorState;
      var onUploadImage = _props.onUploadImage;

      return _react2.default.createElement(
        'div',
        { style: this.props.style, className: _SideToolbar2.default.root },
        _react2.default.createElement(
          'span',
          {
            className: 'material-icons',
            onMouseDown: function onMouseDown(e) {
              return e.preventDefault();
            },
            onClick: onUploadImage
          },
          'insert_photo'
        ),
        _react2.default.createElement(
          'span',
          {
            className: 'material-icons',
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ isExpanded: true });
            },
            onMouseDown: function onMouseDown(e) {
              return e.preventDefault();
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ isExpanded: false });
            }
          },
          isExpanded ? _react2.default.createElement(_SideToolbarExtras2.default, { editorState: editorState, onToggle: this.onToggle }) : null,
          'menu'
        )
      );
    }
  }]);

  return SideToolbar;
}(_react.Component);

SideToolbar.propTypes = {
  editorState: _react.PropTypes.object,
  style: _react.PropTypes.object,
  // onUploadImage: PropTypes.func.isRequired,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = SideToolbar;
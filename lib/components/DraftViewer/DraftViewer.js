'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _decorator = require('../../decorator');

var _decorator2 = _interopRequireDefault(_decorator);

var _blockRenderer = require('./blockRenderer');

var _blockRenderer2 = _interopRequireDefault(_blockRenderer);

var _getBlockStyle = require('../../getBlockStyle');

var _getBlockStyle2 = _interopRequireDefault(_getBlockStyle);

var _customStyleMap = require('../../customStyleMap');

var _customStyleMap2 = _interopRequireDefault(_customStyleMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraftViewer = function (_Component) {
  _inherits(DraftViewer, _Component);

  function DraftViewer() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DraftViewer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DraftViewer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      editorState: _draftJs.EditorState.createEmpty(_decorator2.default)
    }, _this.changeRawContent = function (rawContent) {
      if (!rawContent || rawContent.blocks.length === 0) return;
      var contentState = (0, _draftJs.convertFromRaw)(_extends({ entityMap: {} }, rawContent));
      _this.setState({ editorState: _draftJs.EditorState.createWithContent(contentState, _decorator2.default) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DraftViewer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.rawContent) {
        this.changeRawContent(this.props.rawContent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'editor' },
        _react2.default.createElement(_draftJs.Editor, {
          readOnly: true,
          blockRendererFn: _blockRenderer2.default,
          blockStyleFn: _getBlockStyle2.default,
          customStyleMap: _customStyleMap2.default,
          editorState: this.state.editorState,
          ref: 'editor'
        })
      );
    }
  }]);

  return DraftViewer;
}(_react.Component);

DraftViewer.propTypes = {
  rawContent: _react.PropTypes.object
};
exports.default = DraftViewer;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  button: {
    background: '#08c',
    border: 0,
    color: '#ffffff',
    margin: '10px 0',
    padding: '10px'
  },
  input: {
    display: 'block',
    border: 0,
    borderBottom: '1px solid #08c'
  }
};

var AddImage = function (_Component) {
  _inherits(AddImage, _Component);

  function AddImage() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, AddImage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AddImage)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      imageSrc: '',
      imageCaption: '',
      imageAlign: ''
    }, _this.onLinkInputKeyDown = function (e) {
      if (e.which === 13) {
        _this.addImage(e);
      }
    }, _this.addImage = function () {
      if (!_this.state.imageSrc) return;

      var entityKey = _draftJs.Entity.create('image', 'IMMUTABLE', {
        content: {
          src: _this.state.imageSrc,
          caption: _this.state.imageCaption
        }
      });

      var editorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(_this.props.editorState, entityKey, ' ');

      _this.props.onChange(editorState);
      _this.setState({ imageSrc: '' });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddImage, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var imageInput = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { placeholder: 'Url', style: styles.input, ref: 'url',
          onChange: function onChange(e) {
            return _this2.setState({ imageSrc: e.target.value });
          }, onKeyDown: this.onLinkInputKeyDown }),
        _react2.default.createElement('input', { placeholder: 'Caption', style: styles.input, ref: 'url',
          onChange: function onChange(e) {
            return _this2.setState({ imageCaption: e.target.value });
          } }),
        _react2.default.createElement(
          'button',
          { style: styles.button, onMouseDown: this.addImage },
          'Add Image'
        )
      );

      return _react2.default.createElement(
        'div',
        null,
        imageInput
      );
    }
  }]);

  return AddImage;
}(_react.Component);

AddImage.propTypes = {
  showImageInput: _react.PropTypes.bool,
  editorState: _react.PropTypes.object,
  onChange: _react.PropTypes.func
};
exports.default = AddImage;
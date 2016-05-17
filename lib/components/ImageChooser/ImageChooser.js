'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _images = require('../../redux/actions/images');

var actions = _interopRequireWildcard(_images);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ImageChooser = require('./ImageChooser.scss');

var _ImageChooser2 = _interopRequireDefault(_ImageChooser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageChooser = function (_Component) {
  _inherits(ImageChooser, _Component);

  function ImageChooser() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ImageChooser);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ImageChooser)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.loadImages = function () {
      _this.props.loadImages();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ImageChooser, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var images = _props.images;
      var selectImage = _props.selectImage;
      var selected = _props.selected;
      var active = _props.active;
      var onAfterOpen = _props.onAfterOpen;
      var onClose = _props.onClose;

      return _react2.default.createElement(
        _reactModal2.default,
        {
          isOpen: active,
          onAfterOpen: onAfterOpen,
          onRequestClose: onClose,
          closeTimeoutMS: 1000
        },
        _react2.default.createElement(
          'h1',
          null,
          'Image Chooser'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', { type: 'text' }),
          _react2.default.createElement(
            'button',
            { onClick: this.loadImages },
            'Load Images'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _ImageChooser2.default.imageList },
          images.map(function (image, idx) {
            return _react2.default.createElement(
              'div',
              { key: idx, className: _ImageChooser2.default.image, onClick: function onClick() {
                  return selectImage(image);
                } },
              _react2.default.createElement('img', {
                role: 'presentation',
                src: image.url.replace('/image/upload', '/image/upload/h_200,w_200,c_fit')
              }),
              selected === image && 'selected'
            );
          })
        )
      );
    }
  }]);

  return ImageChooser;
}(_react.Component);

ImageChooser.propTypes = {
  active: _react.PropTypes.bool.isRequired,
  onAfterOpen: _react.PropTypes.func,
  onClose: _react.PropTypes.func,
  loadImages: _react.PropTypes.func.isRequired,
  selectImage: _react.PropTypes.func.isRequired,
  isLoading: _react.PropTypes.bool.isRequired,
  images: _react.PropTypes.array.isRequired,
  selected: _react.PropTypes.object
};
exports.default = (0, _reactRedux.connect)(function (state) {
  return state.images;
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(actions, dispatch);
})(ImageChooser);
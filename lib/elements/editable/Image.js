'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Image = require('./Image.scss');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Image);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Image)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isHover: false,
      isEdit: false,
      alt: ''
    }, _this.handleMouseOver = function (e) {
      e.preventDefault();
      if (!_this.state.isEdit) {
        _this.setState({ isHover: true });
      }
    }, _this.handleMouseLeave = function (e) {
      e.preventDefault();
      _this.setState({ isHover: false });
    }, _this.handleEdit = function (e) {
      e.preventDefault();
      _this.setState({ isEdit: true }, function () {
        return _this.props.blockProps.startEdit();
      });
    }, _this.handleSaveAlt = function (e) {
      e.preventDefault();
      var entityKey = _this.props.block.getEntityAt(0);
      _draftJs.Entity.mergeData(entityKey, { alt: _this.state.alt });
      _this.setState({ isEdit: false }, function () {
        return _this.props.blockProps.finishEdit();
      });
    }, _this.handleSetAlignment = function (alignment) {
      var entityKey = _this.props.block.getEntityAt(0);
      _draftJs.Entity.mergeData(entityKey, { alignment: alignment });
      _this.setState({ isEdit: false }, function () {
        return _this.props.blockProps.finishEdit();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Image, [{
    key: 'render',


    // className={styles.image}
    // style={{ backgroundImage: `url(${src})` }}
    // onMouseOver={this.handleHover}
    // onMouseLeave={this.handleMouseLeave}

    value: function render() {
      var _this2 = this,
          _classNames;

      var _props = this.props;
      var src = _props.src;
      var alt = _props.alt;
      var caption = _props.caption;
      var alignment = _props.alignment;


      var edit = _react2.default.createElement(
        'div',
        { className: _Image2.default.overlay },
        _react2.default.createElement('input', {
          className: _Image2.default.alt, type: 'text',
          value: this.state.alt,
          onChange: function onChange(e) {
            return _this2.setState({ alt: e.target.value });
          }
        }),
        _react2.default.createElement(
          'button',
          { onClick: this.handleSaveAlt },
          'Save'
        )
      );

      var hover = _react2.default.createElement(
        'div',
        { className: _Image2.default.overlay },
        _react2.default.createElement(
          'div',
          { className: _Image2.default.alignment },
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.handleSetAlignment('left');
              }, className: _Image2.default.item },
            'Left'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.handleSetAlignment('center');
              }, className: _Image2.default.item },
            'Center'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.handleSetAlignment('right');
              }, className: _Image2.default.item },
            'Right'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.handleEdit },
            'Edit Alt'
          ),
          _react2.default.createElement(
            'button',
            null,
            'Change Src'
          ),
          _react2.default.createElement(
            'button',
            null,
            'Remove'
          )
        )
      );

      var rootStyle = (0, _classnames2.default)(_Image2.default.root, (_classNames = {}, _defineProperty(_classNames, _Image2.default.left, alignment === 'left'), _defineProperty(_classNames, _Image2.default.center, alignment === 'center'), _defineProperty(_classNames, _Image2.default.right, alignment === 'right'), _classNames));

      return _react2.default.createElement(
        'div',
        { className: rootStyle },
        _react2.default.createElement(
          'div',
          {
            className: _Image2.default.imageWrapper,
            onMouseOver: this.handleMouseOver,
            onMouseLeave: this.handleMouseLeave
          },
          _react2.default.createElement('img', { role: 'presentation', className: _Image2.default.image, src: src, alt: alt }),
          this.state.isHover && !this.state.isEdit && hover,
          this.state.isEdit && edit
        ),
        _react2.default.createElement(
          'div',
          { className: _Image2.default.caption },
          _react2.default.createElement(
            'p',
            null,
            caption
          )
        )
      );
    }
  }]);

  return Image;
}(_react.Component);

Image.propTypes = {
  src: _react.PropTypes.string,
  alt: _react.PropTypes.string,
  alignment: _react.PropTypes.string,
  caption: _react.PropTypes.string,
  block: _react.PropTypes.object,
  blockProps: _react.PropTypes.object.isRequired
};
exports.default = Image;
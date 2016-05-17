'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDataGridWithAddons = require('react-data-grid/dist/react-data-grid-with-addons');

var _reactDataGridWithAddons2 = _interopRequireDefault(_reactDataGridWithAddons);

var _humps = require('humps');

var _humps2 = _interopRequireDefault(_humps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnEditor = function (_Component) {
  _inherits(ColumnEditor, _Component);

  function ColumnEditor() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ColumnEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ColumnEditor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isEdit: false,
      isColumnEdit: false,
      columns: [{
        key: 'name',
        name: 'Name',
        editable: true,
        width: 200,
        resizable: true
      }, {
        key: 'width',
        name: 'Width',
        editable: true,
        width: 200,
        resizable: true
      }]
    }, _this.onRowUpdated = function (e) {
      var obj = e.updated;

      // Assign key if name changed
      if (e.updated.name) {
        obj = _extends({}, e.updated, {
          key: _humps2.default.camelize(e.updated.name)
        });
      }
      if (e.updated.width) {
        obj = _extends({}, e.updated, {
          width: parseInt(e.updated.width, 10)
        });
      }

      var rows = _this.props.columns;
      Object.assign(rows[e.rowIdx], obj);
      _this.props.onChange(rows);
    }, _this.handleAddRow = function () {
      var newColumn = {
        key: 'columnName',
        name: 'Column Name',
        width: 100
      };
      _this.props.onChange([].concat(_toConsumableArray(_this.props.columns), [newColumn]));
    }, _this.rowGetter = function (i) {
      return _this.props.columns[i];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // {
  //   key: 'useMarkdown',
  //   name: 'Use Markdown',
  //   editable: true,
  // }


  _createClass(ColumnEditor, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.handleAddRow },
            'Add Columns'
          )
        ),
        _react2.default.createElement(_reactDataGridWithAddons2.default, {
          columns: this.state.columns,
          enableCellSelect: true,
          rowGetter: this.rowGetter,
          onRowUpdated: this.onRowUpdated,
          rowsCount: this.props.columns.length,
          minHeight: 500
        })
      );
    }
  }]);

  return ColumnEditor;
}(_react.Component);

ColumnEditor.propTypes = {
  columns: _react.PropTypes.array.isRequired,
  onChange: _react.PropTypes.func.isRequired
};
exports.default = ColumnEditor;
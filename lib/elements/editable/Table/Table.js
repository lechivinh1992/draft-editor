'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDataGrid = require('react-data-grid');

var _reactDataGrid2 = _interopRequireDefault(_reactDataGrid);

var _MarkdownEditor = require('./MarkdownEditor');

var _MarkdownEditor2 = _interopRequireDefault(_MarkdownEditor);

var _MarkdownFormatter = require('./MarkdownFormatter');

var _MarkdownFormatter2 = _interopRequireDefault(_MarkdownFormatter);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _ColumnEditor = require('./ColumnEditor');

var _ColumnEditor2 = _interopRequireDefault(_ColumnEditor);

require('react-data-grid/themes/react-data-grid.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultRows = [];
for (var i = 1; i < 10; i++) {
  defaultRows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
}

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Table)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isEdit: false,
      isColumnEdit: false,
      columns: [{
        key: 'id',
        name: 'ID',
        width: 100,
        resizable: true
      }, // useMarkdown: false
      {
        key: 'title',
        name: 'Title',
        width: 100,
        resizable: true
      }, // useMarkdown: true
      {
        key: 'count',
        name: 'Count',
        width: 100,
        resizable: true
      }],
      // useMarkdown: false
      rows: defaultRows
    }, _this.onRowUpdated = function (e) {
      var rows = _this.state.rows;
      Object.assign(rows[e.rowIdx], e.updated);
      _this.setState({ rows: rows });
    }, _this.onColumnEditStart = function () {
      _this.setState({ isColumnEdit: true });
    }, _this.onColumnEditFinish = function () {
      _this.setState({ isColumnEdit: false });
    }, _this.onColumnEditComplete = function () {
      _this.setState({});
    }, _this.handleStart = function (e) {
      e.preventDefault();
      _this.setState({ isEdit: true }, function () {
        return _this.props.blockProps.startEdit();
      });
    }, _this.handleFinish = function (e) {
      e.preventDefault();
      _this.setState({ isEdit: false }, function () {
        return _this.props.blockProps.finishEdit();
      });
    }, _this.rowGetter = function (i) {
      return _this.state.rows[i];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Table, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var columns = this.state.columns.map(function (item) {
        return _extends({}, item, {
          editable: _this2.state.isEdit,
          editor: _MarkdownEditor2.default,
          formatter: _MarkdownFormatter2.default
        });
      });

      // formatter: item.useMarkdown ? MarkdownFormatter : undefined,
      var modal = _react2.default.createElement(
        _reactModal2.default,
        {
          isOpen: this.state.isColumnEdit,
          onRequestClose: this.onColumnEditFinish,
          closeTimeoutMS: 1000
        },
        _react2.default.createElement(_ColumnEditor2.default, { columns: this.state.columns, onChange: function onChange(columns) {
            return _this2.setState({ columns: columns });
          } }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.onColumnEditFinish },
            'Ok'
          )
        )
      );

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactDataGrid2.default, {
          columns: columns,
          enableCellSelect: this.state.isEdit,
          rowGetter: this.rowGetter,
          onRowUpdated: this.onRowUpdated,
          rowsCount: this.state.rows.length,
          minHeight: 500
        }),
        _react2.default.createElement(
          'button',
          { onClick: this.onColumnEditStart },
          'Edit Columns'
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.handleStart },
          'Edit'
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.handleFinish },
          'Finish'
        ),
        this.state.isColumnEdit && modal
      );
    }
  }]);

  return Table;
}(_react.Component);

Table.propTypes = {
  block: _react.PropTypes.object.isRequired,
  blockProps: _react.PropTypes.object.isRequired
};
exports.default = Table;
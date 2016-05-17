'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  var entity = _draftJs.Entity.get(props.block.getEntityAt(0));

  var _entity$getData = entity.getData();

  var columns = _entity$getData.columns;
  var data = _entity$getData.data;
  // console.log(data)

  return _react2.default.createElement(
    'table',
    null,
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        columns.map(function (column, idx) {
          return _react2.default.createElement(
            'th',
            { key: idx },
            column
          );
        })
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      data.map(function (entity, idx) {
        return _react2.default.createElement(
          'tr',
          { key: idx },
          columns.map(function (column, subIdx) {
            return _react2.default.createElement(
              'td',
              { key: subIdx },
              entity[column]
            );
          })
        );
      })
    )
  );
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBlockStyle;

var _BlockStyles = require('./styles/BlockStyles.scss');

var _BlockStyles2 = _interopRequireDefault(_BlockStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return _BlockStyles2.default.blockquote;
    case 'paragraph':
      return _BlockStyles2.default.paragraph;
    case 'call-to-action':
      return _BlockStyles2.default.callToAction;
    case 'note':
      return _BlockStyles2.default.note;
    case 'small':
      return _BlockStyles2.default.small;
    default:
      return null;
  }
}
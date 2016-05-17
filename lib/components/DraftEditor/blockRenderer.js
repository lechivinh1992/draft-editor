'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockRenderer;

var _draftJs = require('draft-js');

var _DraftEditorBlock = require('draft-js/lib/DraftEditorBlock.react');

var _DraftEditorBlock2 = _interopRequireDefault(_DraftEditorBlock);

var _Media = require('../../elements/editable/Media');

var _Media2 = _interopRequireDefault(_Media);

var _Html = require('../../elements/readOnly/Html');

var _Html2 = _interopRequireDefault(_Html);

var _Table = require('../../elements/editable/Table');

var _Table2 = _interopRequireDefault(_Table);

var _Markdown = require('../../elements/readOnly/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function blockRenderer(block, props) {
  if (block.getType() === 'atomic') {
    var type = void 0;
    try {
      var entity = _draftJs.Entity.get(block.getEntityAt(0));
      type = entity.getType();
    } catch (err) {
      return null;
    }
    switch (type) {
      case 'html':
        return {
          component: _Html2.default,
          editable: false
        };
      case 'markdown':
        return {
          component: _Markdown2.default,
          editable: false
        };
      case 'table':
        return {
          component: _Table2.default,
          editable: false,
          props: props
        };
      default:
        return {
          component: _Media2.default,
          editable: false,
          props: props
        };
    }
  }

  return {
    component: _DraftEditorBlock2.default
  };
}
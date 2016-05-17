'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockRender;

var _draftJs = require('draft-js');

var _DraftEditorBlockReact = require('draft-js/lib/DraftEditorBlock.react.js');

var _DraftEditorBlockReact2 = _interopRequireDefault(_DraftEditorBlockReact);

var _Media = require('../../elements/readOnly/Media');

var _Media2 = _interopRequireDefault(_Media);

var _Html = require('../../elements/readOnly/Html');

var _Html2 = _interopRequireDefault(_Html);

var _Markdown = require('../../elements/readOnly/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function blockRender(block) {
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
      default:
        return {
          component: _Media2.default,
          editable: false
        };
    }
  }

  return {
    component: _DraftEditorBlockReact2.default,
    editable: false
  };
}
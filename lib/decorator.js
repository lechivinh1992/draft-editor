'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _Link = require('./elements/readOnly/Link');

var _Link2 = _interopRequireDefault(_Link);

var _LinkTo = require('./elements/readOnly/LinkTo');

var _LinkTo2 = _interopRequireDefault(_LinkTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType().toLowerCase() === 'link';
  }, callback);
}

function findLinkToEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType().toLowerCase() === 'link-to';
  }, callback);
}

exports.default = new _draftJs.CompositeDecorator([{
  strategy: findLinkEntities,
  component: _Link2.default
}, {
  strategy: findLinkToEntities,
  component: _LinkTo2.default
}]);
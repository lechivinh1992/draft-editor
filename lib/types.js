'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BLOCK_TYPES = exports.BLOCK_TYPES = [{ label: 'H1', style: 'header-one' }, { label: 'H2', style: 'header-two' }, { label: 'H3', style: 'header-three' }, { label: 'H4', style: 'header-four' }, { label: 'H5', style: 'header-five' }, { label: 'H6', style: 'header-six' }, { label: 'P', style: 'paragraph' }, { label: 'BQ', icon: 'format_quote', style: 'blockquote' }, { label: 'UL', icon: 'format_list_bulleted', style: 'unordered-list-item' }, { label: 'OL', icon: 'format_list_numbered', style: 'ordered-list-item' }, { label: 'S', style: 'small' }, { label: 'CTA', icon: 'call_to_action', style: 'call-to-action' }, { label: 'Note', icon: 'note', style: 'note' }, { label: 'Code Block', style: 'code-block' }];

var INLINE_STYLES = exports.INLINE_STYLES = [{ label: 'B', icon: 'format_bold', style: 'BOLD' }, { label: 'I', icon: 'format_italic', style: 'ITALIC' }, { label: 'U', icon: 'format_underlined', style: 'UNDERLINE' }, { label: 'Strike', icon: 'strikethrough_s', style: 'STRIKETHROUGH' }, { label: 'Code', icon: 'code', style: 'CODE' }];

var ATOMIC_TYPES = exports.ATOMIC_TYPES = [{ label: 'Image', icon: 'add_a_photo', style: 'image' }, { label: 'Table', icon: 'grid_on', style: 'table' }, { label: 'Html', icon: 'code', style: 'html' }, { label: 'Link', icon: 'link', style: 'link' }];

var COLORS = exports.COLORS = [{ label: 'Red', style: 'red' }, { label: 'Orange', style: 'orange' }, { label: 'Yellow', style: 'yellow' }, { label: 'Green', style: 'green' }, { label: 'Blue', style: 'blue' }, { label: 'Indigo', style: 'indigo' }, { label: 'Highlight', style: 'highlight' }];
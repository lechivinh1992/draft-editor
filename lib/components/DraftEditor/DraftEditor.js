'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

var _decorator = require('../../decorator');

var _decorator2 = _interopRequireDefault(_decorator);

var _blockRenderer = require('./blockRenderer');

var _blockRenderer2 = _interopRequireDefault(_blockRenderer);

var _getBlockStyle = require('../../getBlockStyle');

var _getBlockStyle2 = _interopRequireDefault(_getBlockStyle);

var _DraftEditor = require('./DraftEditor.scss');

var _DraftEditor2 = _interopRequireDefault(_DraftEditor);

var _customStyleMap = require('../../customStyleMap');

var _customStyleMap2 = _interopRequireDefault(_customStyleMap);

var _SideToolbar = require('../SideToolbar/SideToolbar');

var _SideToolbar2 = _interopRequireDefault(_SideToolbar);

var _InlineToolbar = require('../InlineToolbar');

var _InlineToolbar2 = _interopRequireDefault(_InlineToolbar);

var _LinkInput = require('./../LinkInput');

var _LinkInput2 = _interopRequireDefault(_LinkInput);

var _ImageChooser = require('../ImageChooser');

var _ImageChooser2 = _interopRequireDefault(_ImageChooser);

var _selection = require('./utils/selection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var blockRenderMap = _draftJs.DefaultDraftBlockRenderMap.set('note', {
  element: 'div'
});

var DraftEditor = function (_Component) {
  _inherits(DraftEditor, _Component);

  function DraftEditor() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DraftEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DraftEditor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      editorState: _draftJs.EditorState.createEmpty(_decorator2.default),
      inlineToolbar: { show: false },
      editors: (0, _immutable.Map)()
    }, _this.onChange = function (editorState) {
      if (!editorState.getSelection().isCollapsed()) {
        var selectionRange = (0, _selection.getSelectionRange)();
        if (!selectionRange || !selectionRange.endOffset) return;

        var selectionCoords = (0, _selection.getSelectionCoords)(selectionRange);
        _this.setState({
          inlineToolbar: {
            show: true,
            position: {
              top: selectionCoords.offsetTop,
              left: selectionCoords.offsetLeft
            }
          }
        });
      } else {
        _this.setState({ inlineToolbar: { show: false } });
      }

      _this.setState({ editorState: editorState }, _this.updateSelection);
    }, _this.onChangeSimple = function (editorState) {
      _this.setState({ editorState: editorState });
    }, _this.onShowImageChooser = function (e) {
      e.preventDefault();
      _this.setState({ showImageChooser: true });
    }, _this.onCloseImageChoose = function (e) {
      e.preventDefault();
      _this.setState({ showImageChooser: false });
    }, _this.onStartEdit = function (blockKey) {
      var editors = _this.state.editors;
      // Determine which is editing

      _this.setState({ editors: editors.set(blockKey, true) });
    }, _this.onFinishEdit = function (blockKey) {
      var editors = _this.state.editors;

      _this.setState({ editors: editors.remove(blockKey) });
    }, _this.changeRawContent = function (rawContent) {
      if (!rawContent || rawContent.blocks.length === 0) return;

      var contentState = (0, _draftJs.convertFromRaw)(_extends({ entityMap: {} }, rawContent));
      _this.setState({ editorState: _draftJs.EditorState.createWithContent(contentState, _decorator2.default) });
    }, _this.focus = function () {
      return _this.refs.editor.focus();
    }, _this.logState = function () {
      var content = _this.state.editorState.getCurrentContent();
      console.log(JSON.stringify((0, _draftJs.convertToRaw)(content), null, 2));
    }, _this.test = function () {
      console.log('currentBlockContainsLink', _draftJs.RichUtils.currentBlockContainsLink(_this.state.editorState));
      console.log('getCurrentBlockType', _draftJs.RichUtils.getCurrentBlockType(_this.state.editorState));
    }, _this.promptForLink = function (e) {
      e.preventDefault();
      var editorState = _this.state.editorState;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        _this.setState({
          showURLInput: true,
          urlValue: ''
        }, function () {
          setTimeout(function () {
            return _this.refs.url.focus();
          }, 0);
        });
      }
    }, _this.addImage = function () {
      var src = window.prompt('Enter a URL');
      console.log(src);

      if (!src) {
        return;
      }

      var entityKey = _draftJs.Entity.create('image', 'IMMUTABLE', {
        src: src,
        alignment: 'left',
        caption: 'This image caption here'
      });
      var editorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(_this.state.editorState, entityKey, ' ');
      _this.onChange(editorState);
    }, _this.openCloudinary = function () {
      cloudinary.openUploadWidget({ cloud_name: 'dpl3us1zw', upload_preset: 'qlolfyyu' }, function (error, result) {
        console.log(error, result);
      });
    }, _this.createObject = function (columns, array) {
      var obj = {};
      for (var i = 0; i < columns.length; i++) {
        obj[columns[i]] = array[i];
      }
      return obj;
    }, _this.pasteTable = function (array) {
      var columns = array[0];
      console.log(columns);
      var data = [];
      for (var i = 1; i < array.length; i++) {
        data.push(_this.createObject(columns, array[i]));
      }

      var entityKey = _draftJs.Entity.create('table', 'IMMUTABLE', { columns: columns, data: data });
      var editorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(_this.state.editorState, entityKey, ' ');

      _this.onChange(editorState);
    }, _this.handlePastedText = function (text, html) {
      console.log('text', html);
      var rawJson = _papaparse2.default.parse(text);
      // console.log(rawJson)
      _this.pasteTable(rawJson.data);
      return true;
      // console.log('html', html)
    }, _this.confirmLink = function (e) {
      e.preventDefault();
      var _this$state = _this.state;
      var editorState = _this$state.editorState;
      var urlValue = _this$state.urlValue;

      console.log(urlValue);
      var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: urlValue, alt: 'Hello' });

      _this.onChange(_draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey));

      _this.setState({
        showURLInput: false,
        urlValue: ''
      }, function () {
        setTimeout(function () {
          return _this.refs.editor.focus();
        }, 0);
      });
    }, _this.updateSelection = function () {
      var selectionRange = (0, _selection.getSelectionRange)();
      var selectedBlock = void 0;
      if (selectionRange) {
        selectedBlock = (0, _selection.getSelectedBlockElement)(selectionRange);
      }
      _this.setState({
        selectedBlock: selectedBlock,
        selectionRange: selectionRange
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DraftEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.rawContent) {
        this.changeRawContent(this.props.rawContent);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.rawContent && this.props.rawContent !== nextProps.rawContent) {
        this.changeRawContent(nextProps.rawContent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var editorState = _state.editorState;
      var selectedBlock = _state.selectedBlock;

      var sideToolbarOffsetTop = 0;

      if (selectedBlock) {
        var editor = document.getElementById('editor');
        var editorBounds = editor.getBoundingClientRect();
        var blockBounds = selectedBlock.getBoundingClientRect();

        sideToolbarOffsetTop = blockBounds.bottom - editorBounds.top - 31; // height of side toolbar
        // sideToolbarOffsetTop = (blockBounds.bottom) - 31 // height of side toolbar
      }

      var inlineToolbar = this.state.inlineToolbar.show && !this.state.showURLInput ? _react2.default.createElement(_InlineToolbar2.default, {
        editorState: editorState,
        onChange: this.onChange,
        onChangeSimple: this.onChangeSimple,
        position: this.state.inlineToolbar.position
      }) : null;

      var linkInput = this.state.showURLInput ? _react2.default.createElement(
        _LinkInput2.default,
        {
          editorState: editorState,
          onChange: this.onChange,
          position: this.state.inlineToolbar.position
        },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', {
            ref: 'url',
            onChange: function onChange(e) {
              _this2.setState({ urlValue: e.target.value });
            }
          }),
          _react2.default.createElement(
            'button',
            { onMouseDown: this.confirmLink },
            'Confirm'
          )
        )
      ) : null;

      var sidebar = selectedBlock ? _react2.default.createElement(_SideToolbar2.default, {
        editorState: editorState,
        style: { top: sideToolbarOffsetTop },
        onChange: this.onChange,
        onUploadImage: this.onShowImageChooser
      }) : null;

      var toolbar = _react2.default.createElement(
        'div',
        { className: _DraftEditor2.default.toolbar },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.logState, style: { marginRight: 10 } },
            'Log State'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.test, style: { marginRight: 10 } },
            'Test'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.promptForLink, style: { marginRight: 10 } },
            'Link'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.addImage, style: { marginRight: 10 } },
            'Add Image'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.openCloudinary, style: { marginRight: 10 } },
            'Open Cloudinary'
          )
        )
      );

      var customBlockRenderer = function customBlockRenderer(block) {
        return (0, _blockRenderer2.default)(block, {
          startEdit: _this2.onStartEdit,
          finishEdit: _this2.onFinishEdit
        });
      };

      return _react2.default.createElement(
        'div',
        { className: _DraftEditor2.default.root },
        toolbar,
        _react2.default.createElement(
          'div',
          { id: 'editor', className: _DraftEditor2.default.editor, onClick: this.focus },
          sidebar,
          inlineToolbar,
          linkInput,
          this.state.showImageChooser && _react2.default.createElement(_ImageChooser2.default, {
            active: this.state.showImageChooser,
            onClose: this.onCloseImageChoose
          }),
          _react2.default.createElement(_draftJs.Editor, {
            ref: 'editor',
            editorState: editorState,
            blockStyleFn: _getBlockStyle2.default,
            blockRendererFn: customBlockRenderer,
            blockRenderMap: blockRenderMap,
            customStyleMap: _customStyleMap2.default,
            onChange: this.onChange,
            handlePastedText: this.handlePastedText,
            placeholder: 'Write something...',
            readOnly: this.state.editors.count(),
            spellCheck: true
          })
        )
      );
    }
  }]);

  return DraftEditor;
}(_react.Component);

DraftEditor.propTypes = {
  rawContent: _react.PropTypes.object
};
exports.default = DraftEditor;
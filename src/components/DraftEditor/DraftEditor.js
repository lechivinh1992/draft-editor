import React, { Component, PropTypes } from 'react'
import {
  Editor,
  EditorState,
  Entity,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
  DefaultDraftBlockRenderMap
} from 'draft-js'
import { Map } from 'immutable'
import papa from 'papaparse'
import decorator from '../../decorator'
import blockRenderer from './blockRenderer'
import getBlockStyle from '../../getBlockStyle'
import styles from './DraftEditor.scss'
import customStyleMap from '../../customStyleMap'
import SideToolbar from '../SideToolbar/SideToolbar'
import InlineToolbar from '../InlineToolbar'
import LinkInput from './../LinkInput'
import ImageChoose from '../ImageChooser'
import {
  getSelectionRange,
  getSelectedBlockElement,
  getSelectionCoords
} from './utils/selection'

const blockRenderMap = DefaultDraftBlockRenderMap.set('note', {
  element: 'div'
})

export default class DraftEditor extends Component {
  static propTypes = {
    rawContent: PropTypes.object
  };

  state = {
    editorState: EditorState.createEmpty(decorator),
    inlineToolbar: { show: false },
    editors: Map(),
  };

  componentWillMount() {
    if (this.props.rawContent) {
      this.changeRawContent(this.props.rawContent)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rawContent && this.props.rawContent !== nextProps.rawContent) {
      this.changeRawContent(nextProps.rawContent)
    }
  }

  onChange = (editorState) => {
    if (!editorState.getSelection().isCollapsed()) {
      const selectionRange = getSelectionRange()
      if (!selectionRange || !selectionRange.endOffset) return

      const selectionCoords = getSelectionCoords(selectionRange)
      this.setState({
        inlineToolbar: {
          show: true,
          position: {
            top: selectionCoords.offsetTop,
            left: selectionCoords.offsetLeft
          }
        }
      })
    } else {
      this.setState({ inlineToolbar: { show: false } })
    }

    this.setState({ editorState }, this.updateSelection)
  };

  onChangeSimple = (editorState) => {
    this.setState({ editorState })
  };

  onShowImageChooser = (e) => {
    e.preventDefault()
    this.setState({ showImageChooser: true })
  };

  onCloseImageChoose = (e) => {
    e.preventDefault()
    this.setState({ showImageChooser: false })
  };

  onStartEdit = (blockKey) => {
    const { editors } = this.state
    // Determine which is editing
    this.setState({ editors: editors.set(blockKey, true) })
    console.log(blockKey)
  };

  onFinishEdit = (blockKey) => {
    const { editors } = this.state
    this.setState({ editors: editors.remove(blockKey) })
  };

  changeRawContent = (rawContent) => {
    if (!rawContent || rawContent.blocks.length === 0) return

    const contentState = convertFromRaw({ entityMap: {}, ...rawContent })
    this.setState({ editorState: EditorState.createWithContent(contentState, decorator) })
  };

  focus = () => this.refs.editor.focus();

  logState = () => {
    const content = this.state.editorState.getCurrentContent()
    console.log(JSON.stringify(convertToRaw(content), null, 2))
  };

  test = () => {
    console.log('currentBlockContainsLink', RichUtils.currentBlockContainsLink(this.state.editorState))
    console.log('getCurrentBlockType', RichUtils.getCurrentBlockType(this.state.editorState))
  };

  promptForLink = (e) => {
    e.preventDefault()
    const { editorState } = this.state
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      this.setState({
        showURLInput: true,
        urlValue: '',
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0)
      })
    }
  };

  addImage = () => {
    const src = window.prompt('Enter a URL')
    console.log(src)

    if (!src) {
      return
    }

    const entityKey = Entity.create('image', 'IMMUTABLE', {
      src,
      alignment: 'left',
      caption: 'This image caption here'
    })
    const editorState = AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      ' '
    )
    this.onChange(editorState)
  };

  // openCloudinary = () => {
  //   cloudinary.openUploadWidget({ cloud_name: 'dpl3us1zw', upload_preset: 'qlolfyyu' },
  //     (error, result) => {
  //       console.log(error, result)
  //     })
  // };

  createObject = (columns, array) => {
    const obj = {}
    for (let i = 0; i < columns.length; i++) {
      obj[columns[i]] = array[i]
    }
    return obj
  };

  pasteTable = (array) => {
    const columns = array[0]
    console.log(columns)
    const data = []
    for (let i = 1; i < array.length; i++) {
      data.push(this.createObject(columns, array[i]))
    }

    const entityKey = Entity.create('table', 'IMMUTABLE', { columns, data })
    const editorState = AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      ' '
    )

    this.onChange(editorState)
  };

  handlePastedText = (text, html) => {
    console.log('text', html)
    const rawJson = papa.parse(text)
    // console.log(rawJson)
    this.pasteTable(rawJson.data)
    return true
    // console.log('html', html)
  };

  openCloudinary() {
    cloudinary.openUploadWidget({ cloud_name: 'dpl3us1zw', upload_preset: 'qlolfyyu' },
      (error, result) => {
        console.log(error, result)
      })
  }

  confirmLink = (e) => {
    e.preventDefault()
    const { editorState, urlValue } = this.state
    console.log(urlValue)
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue, alt: 'Hello' })

    this.onChange(RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    ))

    this.setState({
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0)
    })
  };

  updateSelection = () => {
    const selectionRange = getSelectionRange()
    let selectedBlock
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange)
    }
    this.setState({
      selectedBlock,
      selectionRange
    })
  };

  render() {
    const { editorState, selectedBlock } = this.state
    let sideToolbarOffsetTop = 0

    if (selectedBlock) {
      const editor = document.getElementById('editor')
      const editorBounds = editor.getBoundingClientRect()
      const blockBounds = selectedBlock.getBoundingClientRect()

      sideToolbarOffsetTop = (blockBounds.bottom - editorBounds.top) - 31 // height of side toolbar
      // sideToolbarOffsetTop = (blockBounds.bottom) - 31 // height of side toolbar
    }

    const inlineToolbar = this.state.inlineToolbar.show && !this.state.showURLInput ? (
      <InlineToolbar
        editorState={editorState}
        onChange={this.onChange}
        onChangeSimple={this.onChangeSimple}
        position={this.state.inlineToolbar.position}
      />
    ) : null

    const linkInput = this.state.showURLInput ? (
      <LinkInput
        editorState={editorState}
        onChange={this.onChange}
        position={this.state.inlineToolbar.position}
      >
        <div>
          <input
            ref="url"
            onChange={(e) => { this.setState({ urlValue: e.target.value }) }}
          />
          <button onMouseDown={this.confirmLink}>
            Confirm
          </button>
        </div>
      </LinkInput>
    ) : null

    const sidebar = selectedBlock ? (
      <SideToolbar
        editorState={editorState}
        style={{ top: sideToolbarOffsetTop }}
        onChange={this.onChange}
        onUploadImage={this.onShowImageChooser}
      />
    ) : null

    const toolbar = (
      <div className={styles.toolbar}>
        <div>
          <button onClick={this.logState} style={{ marginRight: 10 }}>Log State</button>
          <button onClick={this.test} style={{ marginRight: 10 }}>Test</button>
          <button onClick={this.promptForLink} style={{ marginRight: 10 }}>Link</button>
          <button onClick={this.addImage} style={{ marginRight: 10 }}>Add Image</button>
          <button onClick={this.openCloudinary} style={{ marginRight: 10 }}>Open Cloudinary</button>
        </div>
      </div>
    )

    const customBlockRenderer = (block) => blockRenderer(block, {
      startEdit: this.onStartEdit,
      finishEdit: this.onFinishEdit,
      remove: this.onRemove
    })

    return (
      <div className={styles.root}>
        {toolbar}
        <div id="editor" className={styles.editor} onClick={this.focus}>
          {sidebar}
          {inlineToolbar}
          {linkInput}
          {this.state.showImageChooser && (
            <ImageChoose
              active={this.state.showImageChooser}
              onClose={this.onCloseImageChoose}
              editorState={editorState}
              onChange={this.onChange}
            />
          )}
          <Editor
            ref="editor"
            editorState={editorState}
            blockStyleFn={getBlockStyle}
            blockRendererFn={customBlockRenderer}
            blockRenderMap={blockRenderMap}
            customStyleMap={customStyleMap}
            onChange={this.onChange}
            handlePastedText={this.handlePastedText}
            placeholder="Write something..."
            readOnly={this.state.editors.count()}
            spellCheck
          />
        </div>
      </div>
    )
  }
}

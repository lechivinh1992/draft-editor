import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
import BlockStyleControls from './controls/BlockStyleControls'
import InlineStyleControls from './controls/InlineStyleControls'
import ColorControls from './controls/ColorControls'
import decorator from './decorator'
// import { blockRenderer } from './blockRenderer'
import blockRenderer from './editorBlockRenderer'
import getBlockStyle from './getBlockStyle'
import styles from './DraftEditor.scss'
import customStyleMap from './customStyleMap'
import SideToolbar from './SideToolbar'
import InlineToolbar from './InlineToolbar'
import {
  getSelectionRange,
  getSelectedBlockElement,
  getSelectionCoords
} from './utils/selection'

import './styles.css'

export default class DraftEditor extends Component {
  static propTypes = {
    rawContent: PropTypes.object
  };

  state = {
    editorState: EditorState.createEmpty(decorator),
    inlineToolbar: { show: false }
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
  }

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

    const inlineToolbar = this.state.inlineToolbar.show ? (
      <InlineToolbar
        editorState={editorState}
        onChange={this.onChange}
        position={this.state.inlineToolbar.position}
      />
    ) : null

    const sidebar = selectedBlock ? (
      <SideToolbar
        editorState={editorState}
        style={{ top: sideToolbarOffsetTop }}
        onChange={this.onChange}
        onUploadImage={this.handleUploadImage}
      />
    ) : null

    // const toolbar = (
    //   <div className={styles.toolbar}>
    //     <div style={{ display: 'flex' }}>
    //       <BlockStyleControls
    //         className={styles.controls}
    //         editorState={editorState}
    //         onChange={this.onChange}
    //       />
    //       <span style={{ margin: '0 2rem 0 0.5rem' }}>|</span>
    //     </div>
    //     <div style={{ display: 'flex' }}>
    //       <InlineStyleControls
    //         className={styles.controls}
    //         editorState={editorState}
    //         onChange={this.onChange}
    //       />
    //       <span style={{ margin: '0 2rem 0 0.5rem' }}>|</span>
    //       <ColorControls
    //         className={styles.controls}
    //         editorState={editorState}
    //         onChange={this.onChange}
    //       />
    //     </div>
    //     <div>
    //       <button onMouseDown={this.promptForLink} style={{ marginRight: 10 }}>LINK</button>
    //       <button onClick={this.logState} style={{ marginRight: 10 }}>Log State</button>
    //     </div>
    //   </div>
    // )

    return (
      <div className={styles.root}>
        { /* toolbar */ }
        <div id="editor" className={styles.editor} onClick={this.focus}>
          {sidebar}
          {inlineToolbar}
          <Editor
            ref="editor"
            editorState={editorState}
            blockStyleFn={getBlockStyle}
            blockRendererFn={blockRenderer}
            customStyleMap={customStyleMap}
            onChange={this.onChange}
            placeholder="Write something..."
            spellCheck
          />
        </div>
      </div>
    )
  }
}

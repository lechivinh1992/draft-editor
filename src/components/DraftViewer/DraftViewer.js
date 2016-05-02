import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import decorator from '../../decorator'
import blockRenderer from './blockRenderer'
import getBlockStyle from '../../getBlockStyle'
import customStyleMap from '../../customStyleMap'

export default class DraftViewer extends Component {
  static propTypes = {
    rawContent: PropTypes.object
  };

  state = {
    editorState: EditorState.createEmpty(decorator),
  };

  componentWillMount() {
    if (this.props.rawContent) {
      this.changeRawContent(this.props.rawContent)
    }
  }

  changeRawContent = (rawContent) => {
    if (!rawContent || rawContent.blocks.length === 0) return
    const contentState = convertFromRaw({ entityMap: {}, ...rawContent })
    this.setState({ editorState: EditorState.createWithContent(contentState, decorator) })
  };

  render() {
    return (
      <div id="editor">
        <Editor
          readOnly
          blockRendererFn={blockRenderer}
          blockStyleFn={getBlockStyle}
          customStyleMap={customStyleMap}
          editorState={this.state.editorState}
          ref="editor"
        />
      </div>
    )
  }
}

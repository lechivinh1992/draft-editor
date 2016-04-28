import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
import BlockStyleControls from './controls/BlockStyleControls'
import InlineStyleControls from './controls/InlineStyleControls'
import ColorControls from './controls/ColorControls'
import decorator from './decorator'
import getBlockStyle from './getBlockStyle'
import styles from './DraftEditor.scss'
import customStyleMap from './customStyleMap'

export default class DraftEditor extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.rawContent && this.props.rawContent !== nextProps.rawContent) {
      this.changeRawContent(nextProps.rawContent)
    }
  }

  onChange = (editorState) => this.setState({ editorState });

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

  toggleColor = (editorState) => this.setState({ editorState }); // TODO Remove this

  render() {
    const { editorState } = this.state

    return (
      <div className={styles.root}>
        <div className={styles.toolbar}>
          <div style={{ display: 'flex' }}>
            <BlockStyleControls
              editorState={editorState}
              onChange={this.onChange}
            />
            <span style={{ margin: '0 2rem 0 0.5rem' }}>|</span>
          </div>
          <div style={{ display: 'flex' }}>
            <InlineStyleControls
              editorState={editorState}
              onChange={this.onChange}
            />
            <span style={{ margin: '0 2rem 0 0.5rem' }}>|</span>
            <ColorControls
              editorState={editorState}
              onToggle={this.toggleColor}
              onChange={this.onChange}
            />
          </div>
          <div>
            <button onClick={this.logState} style={{ marginRight: 10 }}>Log State</button>
          </div>
        </div>
        <div className={styles.editor} onClick={this.focus}>
          <Editor
            ref="editor"
            editorState={editorState}
            blockStyleFn={getBlockStyle}
            customStyleMap={customStyleMap}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

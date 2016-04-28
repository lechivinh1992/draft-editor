import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import StyleButton from './StyleButton/StyleButton'
import { BLOCK_TYPES } from './../types'

export default class BlockStyleControls extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
  };

  onToggle = (blockType) => {
    const { onChange, editorState } = this.props
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    )
  };

  render() {
    const { editorState, className } = this.props
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    return (
      <div className={className}>
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            // icon={type.icon}
            onToggle={this.onToggle}
            style={type.style}
          />
        )}
      </div>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import StyleButton from './StyleButton/StyleButton'
import { INLINE_STYLES } from './../types'

export default class InlineStyleControls extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
  };

  onToggle = (inlineStyle) => {
    const { onChange, editorState } = this.props
    onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    )
  };

  render() {
    const { editorState, className } = this.props
    const currentStyle = editorState.getCurrentInlineStyle()
    return (
      <div className={className}>
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            // icon={type.icon}
            label={type.label}
            onToggle={this.onToggle}
            style={type.style}
          />
        )}
      </div>
    )
  }
}

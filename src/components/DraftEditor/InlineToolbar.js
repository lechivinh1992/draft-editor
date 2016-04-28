import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import ToolbarIcon from './ToolbarIcon'

const INLINE_STYLES = [
  { icon: 'format_bold', style: 'BOLD' },
  { icon: 'format_italic', style: 'ITALIC' },
  { label: 'U', icon: 'format_underlined', style: 'UNDERLINE' },
  // { label: 'Code', icon: 'format_code', style: 'CODE' },
  { label: 'Strike', icon: 'strikethrough_s', style: 'STRIKETHROUGH' },
]

export default class InlineToolbar extends Component {
  static propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    position: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),
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
    const { editorState, position } = this.props
    const currentStyle = editorState.getCurrentInlineStyle()
    return (
      <div
        className="toolbar"
        id="inlineToolbar"
        style={position}
      >
        <ul className="toolbar-icons">
          {INLINE_STYLES.map(type =>
            <ToolbarIcon
              key={type.label || type.icon}
              active={currentStyle.has(type.style)}
              label={type.label}
              icon={type.icon}
              onToggle={this.onToggle}
              style={type.style}
            />
          )}
        </ul>
      </div>
    )
  }
}

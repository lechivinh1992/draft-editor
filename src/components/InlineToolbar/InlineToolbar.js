import React, { Component, PropTypes } from 'react'
import { RichUtils, EditorState, Modifier } from 'draft-js'
import ToolbarIcon from '../ToolbarIcon'
import { INLINE_STYLES, COLORS } from '../../types'
import { colorStyleMap } from '../../customStyleMap'
import { toolbar, toolbarIcons } from '../../styles/common.scss'

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

  onToggleColor = (toggledColor) => {
    const { editorState, onChange } = this.props
    const selection = editorState.getSelection()

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce(
        (contentState, color) => Modifier.removeInlineStyle(contentState, selection, color)
        , editorState.getCurrentContent()
      )

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    )

    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce(
        (state, color) => RichUtils.toggleInlineStyle(state, color),
        nextEditorState
      )
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      )
    }

    onChange(nextEditorState)
  };

  render() {
    const { editorState, position } = this.props
    const currentStyle = editorState.getCurrentInlineStyle()
    return (
      <div id="inlineToolbar" className={toolbar} style={position}>
        <div>
          <ul className={toolbarIcons}>
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
            {COLORS.map(type =>
              <ToolbarIcon
                key={type.label || type.icon}
                active={currentStyle.has(type.style)}
                label={type.label}
                icon={type.icon}
                onToggle={this.onToggleColor}
                style={type.style}
              />
            )}
          </ul>
        </div>
      </div>
    )
  }
}

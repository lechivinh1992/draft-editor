import React, { PropTypes, Component } from 'react'
import { RichUtils, Modifier, EditorState } from 'draft-js'
import { COLORS } from '../types'
import StyleButton from './StyleButton/StyleButton'
import { colorStyleMap } from '../customStyleMap'

export default class ColorControls extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
  };

  toggleColor = (toggledColor) => {
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
    const { editorState, className } = this.props
    const currentStyle = editorState.getCurrentInlineStyle()
    return (
      <div className={className}>
        {COLORS.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={this.toggleColor}
            style={type.style}
          />
        )}
      </div>
    )
  }
}

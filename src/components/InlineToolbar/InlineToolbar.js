import React, { Component, PropTypes } from 'react'
import { RichUtils, Entity, EditorState, Modifier } from 'draft-js'
import ToolbarIcon from '../ToolbarIcon'
import { INLINE_STYLES, COLORS } from '../../types'
import { colorStyleMap } from '../../customStyleMap'
import { toolbar, toolbarIcons } from '../../styles/common.scss'

export default class InlineToolbar extends Component {
  static propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onChangeSimple: PropTypes.func.isRequired,
    position: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),
  };

  state = {
    isLinkEdit: false,
    url: ''
  };

  onToggleStyle = (inlineStyle) => {
    const { onChange, editorState } = this.props
    onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    )
  };

  onApplyEntity = () => {
    const { editorState } = this.props

    const entityKey = Entity.create('link-to', 'MUTABLE', { id: 'hello' })
    const contentState = editorState.getCurrentContent()

    const entity = Modifier.applyEntity(
      contentState,
      editorState.getSelection(),
      entityKey
    )

    const nextEditorState = EditorState.push(
      editorState,
      entity,
      'apply-entity'
    )

    this.props.onChangeSimple(nextEditorState)
  }

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

  onShowLinkEdit = () => {
    this.setState({ isLinkEdit: true, url: '' }, () => this.refs.url.focus())
  };

  onUrlChange = (e) => this.setState({ url: e.target.value });

  onConfirmLink = (e) => {
    e.preventDefault()
    this.confirmLink(this.state.url)
  };

  onUrlEnterKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.confirmLink(this.state.url)
    }
  };

  confirmLink = (urlValue) => {
    const { editorState } = this.props
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue, alt: 'Hello' })
    const nextEditorState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    )

    this.props.onChangeSimple(nextEditorState)
    this.setState({ isLinkEdit: false, url: '' })
  };

  render() {
    const { editorState, position } = this.props
    const currentStyle = editorState.getCurrentInlineStyle()

    if (this.state.isLinkEdit) {
      return (
        <div id="inlineToolbar" className={toolbar} style={position}>
          <input
            type="text" ref="url"
            value={this.state.url}
            onChange={this.onUrlChange}
            onKeyDown={this.onUrlEnterKeyDown}
          />
          <button onClick={this.onConfirmLink}>Confirm Link</button>
        </div>
      )
    }

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
                onToggle={this.onToggleStyle}
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
            <ToolbarIcon
              // key={type.label || type.icon}
              // active={currentStyle.has(type.style)}
              label="Link"
              icon="link"
              onToggle={this.onShowLinkEdit}
              // style={type.style}
            />
            <ToolbarIcon
              // key={type.label || type.icon}
              // active={currentStyle.has(type.style)}
              label="Link To"
              icon="more"
              onToggle={this.onApplyEntity}
              // style={type.style}
            />
          </ul>
        </div>
      </div>
    )
  }
}

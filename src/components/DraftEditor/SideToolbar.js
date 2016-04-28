import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import ToolbarIcon from './ToolbarIcon'

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { icon: 'format_list_bulleted', style: 'unordered-list-item' },
  { icon: 'format_list_numbered', style: 'ordered-list-item' },
  { icon: 'format_quote', style: 'blockquote' }
]

const SideToolbarExtras = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection()
  const blockType = editorState.getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  return (
    <div className="toolbar side">
      <ul className="toolbar-icons">
        {BLOCK_TYPES.map(type =>
          <ToolbarIcon
            key={type.label || type.icon}
            active={type.style === blockType}
            label={type.label}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
          />
        )}
      </ul>
    </div>
  )
}

export default class SideToolbar extends Component {
  static propTypes = {
    editorState: PropTypes.object,
    style: PropTypes.object,
    // onUploadImage: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }
  }

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
    const { isExpanded } = this.state
    const { editorState, onUploadImage } = this.props
    return (
      <div style={this.props.style} className="side-toolbar">
        <span
          className="material-icons"
          onMouseDown={e => e.preventDefault()}
          onClick={onUploadImage}
        >
          insert_photo
        </span>
        <span
          className="material-icons"
          onMouseEnter={() => this.setState({ isExpanded: true })}
          onMouseDown={(e) => e.preventDefault()}
          onMouseLeave={() => this.setState({ isExpanded: false })}
        >
          {isExpanded
            ? <SideToolbarExtras editorState={editorState} onToggle={this.onToggle} />
            : null
          }
          menu
        </span>
      </div>
    )
  }
}

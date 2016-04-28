import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import SideToolbarExtras from '../SideToolbarExtras'
import styles from './SideToolbar.scss'

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
      <div style={this.props.style} className={styles.root}>
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

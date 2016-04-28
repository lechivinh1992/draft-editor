import React, { PropTypes } from 'react'
import ToolbarIcon from '../ToolbarIcon'
import { BLOCK_TYPES } from '../../types'
import classNames from 'classnames'
import styles from './SideToolbarExtras.scss'
import { toolbar, toolbarIcons } from '../../styles/common.scss'

const SideToolbarExtras = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection()
  const blockType = editorState.getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  return (
    <div className={classNames(toolbar, styles.root)}>
      <ul className={toolbarIcons}>
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

SideToolbarExtras.propTypes = {
  editorState: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
}

export default SideToolbarExtras

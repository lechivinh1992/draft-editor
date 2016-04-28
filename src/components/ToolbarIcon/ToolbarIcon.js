import React, { PropTypes } from 'react'
import classNames from 'classnames'
import styles from './ToolbarIcon.scss'

const ToolbarIcon = ({ label, icon, active, onToggle, style }) => (
  <li
    className={classNames(styles.root, { [styles.active]: active })}
    onMouseDown={(e) => {
      e.preventDefault()
      onToggle(style)
    }}
  >
    {!icon ? label : <span className="material-icons">{icon}</span>}
  </li>
)

ToolbarIcon.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  style: PropTypes.string
}

export default ToolbarIcon

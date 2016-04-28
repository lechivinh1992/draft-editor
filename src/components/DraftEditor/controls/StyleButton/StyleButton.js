import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import styles from './StyleButton.scss'

export default class StyleButton extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
  };

  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    const { active, label } = this.props
    const className = classNames(styles.root, { [styles.active]: active })

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {label}
      </span>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { toolbar } from '../../styles/common.scss'

export default class LinkInput extends Component {
  static propTypes = {
    children: PropTypes.element,
    position: PropTypes.object,
  };

  render() {
    const { position } = this.props
    return (
      <div id="inlineToolbar" className={toolbar} style={position}>
        {this.props.children}
      </div>
    )
  }
}

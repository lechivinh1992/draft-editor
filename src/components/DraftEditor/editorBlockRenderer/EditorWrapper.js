import React, { Component, PropTypes } from 'react'

export default class EditorWrapper extends Component {
  static propTypes = {
    name: PropTypes.string,
    component: PropTypes.element.isRequired
  }

  render() {
    const { name, component } = this.props
    return (
      <div>
        <div>{name}</div>
        {component}
      </div>
    )
  }
}

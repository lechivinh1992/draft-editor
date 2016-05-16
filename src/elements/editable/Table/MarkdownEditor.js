import React, { Component, PropTypes } from 'react'

export default class MarkdownEditor extends Component {
  static propTypes = {
    value: PropTypes.bool,
    rowIdx: PropTypes.number,
    column: PropTypes.shape({
      key: PropTypes.string,
      onCellChange: PropTypes.func
    }),
    dependentValues: PropTypes.object
  };

  onChange = (e) => {
    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e)
  };

  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.handleChange} />
    )
  }
}

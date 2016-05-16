import React, { Component, PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid/dist/react-data-grid-with-addons'
import humps from 'humps'

export default class ColumnEditor extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    isEdit: false,
    isColumnEdit: false,
    columns: [
      {
        key: 'name',
        name: 'Name',
        editable: true,
        width: 200,
        resizable: true
      },
      {
        key: 'width',
        name: 'Width',
        editable: true,
        width: 200,
        resizable: true
      },
      // {
      //   key: 'useMarkdown',
      //   name: 'Use Markdown',
      //   editable: true,
      // }
    ],
  };

  onRowUpdated = (e) => {
    let obj = e.updated

    // Assign key if name changed
    if (e.updated.name) {
      obj = {
        ...e.updated,
        key: humps.camelize(e.updated.name)
      }
    }
    if (e.updated.width) {
      obj = {
        ...e.updated,
        width: parseInt(e.updated.width, 10)
      }
    }

    const rows = this.props.columns
    Object.assign(rows[e.rowIdx], obj)
    this.props.onChange(rows)
  };

  handleAddRow = () => {
    const newColumn = {
      key: 'columnName',
      name: 'Column Name',
      width: 100
    }
    this.props.onChange([...this.props.columns, newColumn])
  };

  rowGetter = (i) => this.props.columns[i];

  render() {
    return (
      <div>
        <div>
          <button onClick={this.handleAddRow}>Add Columns</button>
        </div>
        <ReactDataGrid
          columns={this.state.columns}
          enableCellSelect
          rowGetter={this.rowGetter}
          onRowUpdated={this.onRowUpdated}
          rowsCount={this.props.columns.length}
          minHeight={500}
        />
      </div>
    )
  }
}

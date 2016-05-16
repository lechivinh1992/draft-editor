import React, { Component, PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import MarkdownEditor from './MarkdownEditor'
import MarkdownFormatter from './MarkdownFormatter'
import Modal from 'react-modal'
import ColumnEditor from './ColumnEditor'
import 'react-data-grid/themes/react-data-grid.css'

const defaultRows = []
for (let i = 1; i < 10; i++) {
  defaultRows.push({
    id: i,
    title: `Title ${i}`,
    count: i * 1000
  })
}

export default class Table extends Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    blockProps: PropTypes.object.isRequired,
  };

  state = {
    isEdit: false,
    isColumnEdit: false,
    columns: [
      {
        key: 'id',
        name: 'ID',
        width: 100,
        resizable: true,
        // useMarkdown: false
      },
      {
        key: 'title',
        name: 'Title',
        width: 100,
        resizable: true,
        // useMarkdown: true
      },
      {
        key: 'count',
        name: 'Count',
        width: 100,
        resizable: true,
        // useMarkdown: false
      }
    ],
    rows: defaultRows
  };

  onRowUpdated = (e) => {
    const rows = this.state.rows
    Object.assign(rows[e.rowIdx], e.updated)
    this.setState({ rows })
  };

  onColumnEditStart = () => {
    this.setState({ isColumnEdit: true })
  };

  onColumnEditFinish = () => {
    this.setState({ isColumnEdit: false })
  };

  onColumnEditComplete = () => {
    this.setState({})
  };

  handleStart = (e) => {
    e.preventDefault()
    this.setState({ isEdit: true }, () => this.props.blockProps.startEdit())
  };

  handleFinish = (e) => {
    e.preventDefault()
    this.setState({ isEdit: false }, () => this.props.blockProps.finishEdit())
  };

  rowGetter = (i) => this.state.rows[i];

  render() {
    const columns = this.state.columns.map((item) => ({
      ...item,
      editable: this.state.isEdit,
      editor: MarkdownEditor,
      formatter: MarkdownFormatter,
      // formatter: item.useMarkdown ? MarkdownFormatter : undefined,
    }))

    const modal = (
      <Modal
        isOpen={this.state.isColumnEdit}
        onRequestClose={this.onColumnEditFinish}
        closeTimeoutMS={1000}
      >
        <ColumnEditor columns={this.state.columns} onChange={(columns) => this.setState({ columns })} />
        <div>
          <button onClick={this.onColumnEditFinish}>Ok</button>
        </div>
      </Modal>
    )

    return (
      <div>
        <ReactDataGrid
          columns={columns}
          enableCellSelect={this.state.isEdit}
          rowGetter={this.rowGetter}
          onRowUpdated={this.onRowUpdated}
          rowsCount={this.state.rows.length}
          minHeight={500}
        />
        <button onClick={this.onColumnEditStart}>Edit Columns</button>
        <button onClick={this.handleStart}>Edit</button>
        <button onClick={this.handleFinish}>Finish</button>
        {this.state.isColumnEdit && modal}
      </div>
    )
  }
}

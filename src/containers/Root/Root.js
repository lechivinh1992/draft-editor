import React, { Component } from 'react'
import DraftEditor from '../../components/DraftEditor'
import styles from './Root.scss'
import rawContent from './content.json'

export default class Root extends Component {
  render() {
    return (
      <div className={styles.root}>
        <h1>Draft Editor</h1>
        <DraftEditor rawContent={rawContent} />
      </div>
    )
  }
}

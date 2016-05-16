import React, { Component } from 'react'
import DraftEditor from '../../components/DraftEditor'
// import DraftViewer from '../../components/DraftViewer'
import styles from './App.scss'
import '../../styles/common.css'
// import rawContent from './content.json'
import rawContent from './post.json'

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

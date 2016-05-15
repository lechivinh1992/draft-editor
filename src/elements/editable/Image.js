import React, { Component, PropTypes } from 'react'
import { Entity } from 'draft-js'
import classNames from 'classnames'
import styles from './Image.scss'

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    alignment: PropTypes.string,
    caption: PropTypes.string,
    block: PropTypes.object,
    blockProps: PropTypes.object.isRequired
  };

  state = {
    isHover: false,
    isEdit: false,
    alt: ''
  };

  handleMouseOver = (e) => {
    e.preventDefault()
    if (!this.state.isEdit) {
      this.setState({ isHover: true })
    }
  };

  handleMouseLeave = (e) => {
    e.preventDefault()
    this.setState({ isHover: false })
  };

  handleEdit = (e) => {
    e.preventDefault()
    this.setState({ isEdit: true }, () => this.props.blockProps.startEdit())
  };

  handleSaveAlt = (e) => {
    e.preventDefault()
    const entityKey = this.props.block.getEntityAt(0)
    Entity.mergeData(entityKey, { alt: this.state.alt })
    this.setState({ isEdit: false }, () => this.props.blockProps.finishEdit())
  };

  handleSetAlignment = (alignment) => {
    const entityKey = this.props.block.getEntityAt(0)
    Entity.mergeData(entityKey, { alignment })
    this.setState({ isEdit: false }, () => this.props.blockProps.finishEdit())
  };

  // className={styles.image}
  // style={{ backgroundImage: `url(${src})` }}
  // onMouseOver={this.handleHover}
  // onMouseLeave={this.handleMouseLeave}

  render() {
    const { src, alt, caption, alignment } = this.props

    const edit = (
      <div className={styles.overlay}>
        <input
          className={styles.alt} type="text"
          value={this.state.alt}
          onChange={(e) => this.setState({ alt: e.target.value })}
        />
        <button onClick={this.handleSaveAlt}>Save</button>
      </div>
    )

    const hover = (
      <div className={styles.overlay}>
        <div className={styles.alignment}>
          <button onClick={() => this.handleSetAlignment('left')} className={styles.item}>Left</button>
          <button onClick={() => this.handleSetAlignment('center')} className={styles.item}>Center</button>
          <button onClick={() => this.handleSetAlignment('right')} className={styles.item}>Right</button>
        </div>
        <div>
          <button onClick={this.handleEdit}>Edit Alt</button>
          <button>Change Src</button>
          <button>Remove</button>
        </div>
      </div>
    )

    const rootStyle = classNames(styles.root, {
      [styles.left]: alignment === 'left',
      [styles.center]: alignment === 'center',
      [styles.right]: alignment === 'right',
    })

    return (
      <div className={rootStyle}>
        <div
          className={styles.imageWrapper}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          <img role="presentation" className={styles.image} src={src} alt={alt} />
          {this.state.isHover && !this.state.isEdit && hover}
          {this.state.isEdit && edit}
        </div>
        <div className={styles.caption}>
          <p>{caption}</p>
        </div>
      </div>
    )
  }
}


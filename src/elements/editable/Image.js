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
    isEditCaption: false,
    isEditSrc: false,
    alt: this.props.alt,
    caption: '',
    src: this.props.src
  };

  onCaptionKeyDown = (e) => {
    if (e.which === 13) {
      this.saveCaption(e)
    }
    if (e.which === 27) {
      this.setState({ isEditCaption: false })
    }
  };

  changeImgSrc = (e) => {
    e.preventDefault()
    const entityKey = this.props.block.getEntityAt(0)
    Entity.mergeData(entityKey, { src: this.state.src })
    this.setState({ isEditSrc: false }, () => this.props.blockProps.finishEdit())
  };

  handleChangeImgSrc = (e) => {
    e.preventDefault()
    this.setState({ isEditSrc: true }, () => this.props.blockProps.startEdit())
  };

  handleEditCaption = (e) => {
    e.preventDefault()
    this.setState({ isEditCaption: true }, () => { this.props.blockProps.startEdit(); this.refs.caption.focus() })
  };

  saveCaption = (e) => {
    e.preventDefault()
    const entityKey = this.props.block.getEntityAt(0)
    Entity.mergeData(entityKey, { caption: this.state.caption })
    this.setState({ isEditCaption: false }, () => this.props.blockProps.finishEdit())
  };

  removeCaption = (e) => {
    e.preventDefault()
    const entityKey = this.props.block.getEntityAt(0)
    Entity.mergeData(entityKey, { caption: '' })
    this.setState({ caption: '' })
  };

  handleSetAlignment = (alignment) => {
    const entityKey = this.props.block.getEntityAt(0)
    Entity.mergeData(entityKey, { alignment })
    this.setState({ isEdit: false }, () => this.props.blockProps.finishEdit())
  };

  handleSaveAlt = (e) => {
    e.preventDefault()
    const entityKey = this.props.block.getEntityAt(0)
    Entity.mergeData(entityKey, { alt: this.state.alt })
    this.setState({ isEdit: false }, () => this.props.blockProps.finishEdit())
  };

  handleEdit = (e) => {
    e.preventDefault()
    this.setState({ isEdit: true }, () => { this.props.blockProps.startEdit(); this.refs.alt.focus() })
  };

  handleMouseLeave = (e) => {
    e.preventDefault()
    this.setState({ isHover: false })
  };

  handleMouseOver = (e) => {
    e.preventDefault()
    if (!this.state.isEdit) {
      this.setState({ isHover: true })
    }
  };

  // className={styles.image}
  // style={{ backgroundImage: `url(${src})` }}
  // onMouseOver={this.handleHover}
  // onMouseLeave={this.handleMouseLeave}

  render() {
    const { src, alt, alignment } = this.props

    const edit = (
      <div className={styles.overlay}>
        <input
          ref="alt"
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
          <button onClick={this.handleChangeImgSrc}>Change Src</button>
          <button>Remove</button>
        </div>
      </div>
    )

    const editCaption = (
      <div>
        <input
          ref="caption"
          value={this.state.caption}
          onChange={(e) => this.setState({ caption: e.target.value })}
          onKeyDown={this.onCaptionKeyDown}
          style={{ float: 'left' }}
        />
        <span className="material-icons" onClick={this.removeCaption}>delete_forever</span>
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
          {!this.state.isEditCaption && this.state.caption === '' ? <input
            style={{ border: 0 }}
            onClick={this.handleEditCaption}
            placeholder="Click to add caption"
          /> : null}
          {!this.state.isEditCaption ? <p onClick={this.handleEditCaption}>{this.state.caption}</p> : editCaption}
        </div>
        {this.state.isEditSrc ? <div>
          <input
            type="text"
            value={this.state.src}
            onChange={(e) => this.setState({ src: e.target.value })}
          />
          <button onClick={this.changeImgSrc}>Save</button>
        </div> : null}
      </div>
    )
  }
}


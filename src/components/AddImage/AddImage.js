import React, { Component, PropTypes } from 'react'
import { Entity, AtomicBlockUtils } from 'draft-js'

export default class AddImage extends Component {
  static propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func
  };

  state = {
    imageSrc: '',
    imageCaption: ''
  };

  onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      this.addImage(e)
    }
  }

  addImage = () => {
    if (!this.state.imageSrc) {
      return
    }

    const entityKey = Entity.create('image', 'IMMUTABLE', {
      src: this.state.imageSrc,
      caption: this.state.imageCaption
    })

    const editorState = AtomicBlockUtils.insertAtomicBlock(
      this.props.editorState,
      entityKey,
      ' '
    )

    this.props.onChange(editorState)
    this.setState({ imageSrc: '' })
  };

  render() {
    const imageInput = (
      <div>
        <input
          placeholder="Url"
          ref="url"
          onChange={(e) => this.setState({ imageSrc: e.target.value })}
          onKeyDown={this.onLinkInputKeyDown}
        />
        <button onMouseDown={this.addImage}>Add Image</button>
      </div>
    )

    return (
      <div>
        {imageInput}
      </div>
    )
  }
}

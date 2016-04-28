import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'

export default class ImageChooser extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onAfterOpen: PropTypes.func,
    onClose: PropTypes.func
  };

  render() {
    const { active, onAfterOpen, onClose } = this.props
    return (
      <Modal
        isOpen={active}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        closeTimeoutMS={1000}
      >
        <h1>Image Chooser</h1>
        <p>Etc.</p>
      </Modal>
    )
  }
}

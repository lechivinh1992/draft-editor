import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux/actions/images'
import Modal from 'react-modal'
import styles from './ImageChooser.scss'
import AddImage from '../AddImage'

class ImageChooser extends Component {
  static propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func,
    active: PropTypes.bool.isRequired,
    onAfterOpen: PropTypes.func,
    onClose: PropTypes.func,
    loadImages: PropTypes.func.isRequired,
    selectImage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    selected: PropTypes.object
  };

  loadImages = () => {
    this.props.loadImages()
  };

  render() {
    const { editorState, onChange, images, selectImage, selected, active, onAfterOpen, onClose } = this.props
    return (
      <Modal
        isOpen={active}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        closeTimeoutMS={1000}
      >
        <h1>Image Chooser</h1>
        <AddImage editorState={editorState} onChange={onChange} />
        <div>
          <input type="text" />
          <button onClick={this.loadImages}>Load Images</button>
        </div>
        <div className={styles.imageList}>
          {images.map((image, idx) => (
            <div key={idx} className={styles.image} onClick={() => selectImage(image)}>
              <img
                role="presentation"
                src={image.url.replace('/image/upload', '/image/upload/h_200,w_200,c_fit')}
              />
              {selected === image && 'selected'}
            </div>
          ))}
        </div>
      </Modal>
    )
  }
}

export default connect(
  (state) => state.images,
  (dispatch) => bindActionCreators(actions, dispatch)
)(ImageChooser)

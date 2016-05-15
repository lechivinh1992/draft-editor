import request from 'axios'
import { createAction } from 'redux-actions'

export const LOAD_IMAGES_START = 'images/LOAD_IMAGES_START'
export const LOAD_IMAGES_SUCCESS = 'images/LOAD_IMAGES_SUCCESS'
export const LOAD_IMAGES_FAIL = 'images/LOAD_IMAGES_FAIL'

export const SELECT_IMAGE = 'images/SELECT_IMAGE'

export const selectImage = createAction(SELECT_IMAGE)

export function loadImages({ tag } = {}) {
  const url = '/cloudinary/image'
  // console.log(url)
  return (dispatch) => {
    dispatch(createAction(LOAD_IMAGES_START)())
    request
      .get(url)
      .then((response) => dispatch(createAction(LOAD_IMAGES_SUCCESS)(response.data)))
      .catch((error) => dispatch(createAction(LOAD_IMAGES_FAIL)(error)))
  }
}

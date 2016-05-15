import {
  LOAD_IMAGES_START,
  LOAD_IMAGES_SUCCESS,
  LOAD_IMAGES_FAIL,
  SELECT_IMAGE
} from '../actions/images'

const initialState = {
  isLoading: false,
  images: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_IMAGES_START:
      return {
        ...state,
        isLoading: true
      }
    case LOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.payload.resources,
        isLoading: false
      }
    case LOAD_IMAGES_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case SELECT_IMAGE:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state
  }
}

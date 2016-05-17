'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _images = require('../actions/images');

var initialState = {
  isLoading: false,
  images: []
};

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _images.LOAD_IMAGES_START:
      return _extends({}, state, {
        isLoading: true
      });
    case _images.LOAD_IMAGES_SUCCESS:
      return _extends({}, state, {
        images: action.payload.resources,
        isLoading: false
      });
    case _images.LOAD_IMAGES_FAIL:
      return _extends({}, state, {
        error: action.payload,
        isLoading: false
      });
    case _images.SELECT_IMAGE:
      return _extends({}, state, {
        selected: action.payload
      });
    default:
      return state;
  }
}
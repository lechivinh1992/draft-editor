'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectImage = exports.SELECT_IMAGE = exports.LOAD_IMAGES_FAIL = exports.LOAD_IMAGES_SUCCESS = exports.LOAD_IMAGES_START = undefined;
exports.loadImages = loadImages;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOAD_IMAGES_START = exports.LOAD_IMAGES_START = 'images/LOAD_IMAGES_START';
var LOAD_IMAGES_SUCCESS = exports.LOAD_IMAGES_SUCCESS = 'images/LOAD_IMAGES_SUCCESS';
var LOAD_IMAGES_FAIL = exports.LOAD_IMAGES_FAIL = 'images/LOAD_IMAGES_FAIL';

var SELECT_IMAGE = exports.SELECT_IMAGE = 'images/SELECT_IMAGE';

var selectImage = exports.selectImage = (0, _reduxActions.createAction)(SELECT_IMAGE);

function loadImages() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var tag = _ref.tag;

  var url = '/cloudinary/image';
  // console.log(url)
  return function (dispatch) {
    dispatch((0, _reduxActions.createAction)(LOAD_IMAGES_START)());
    _axios2.default.get(url).then(function (response) {
      return dispatch((0, _reduxActions.createAction)(LOAD_IMAGES_SUCCESS)(response.data));
    }).catch(function (error) {
      return dispatch((0, _reduxActions.createAction)(LOAD_IMAGES_FAIL)(error));
    });
  };
}
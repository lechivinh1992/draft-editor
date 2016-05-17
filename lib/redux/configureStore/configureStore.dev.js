'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _DevTools = require('../../components/DevTools');

var _DevTools2 = _interopRequireDefault(_DevTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore() {
  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), _DevTools2.default.instrument()));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      /* eslint-disable global-require */
      var nextRootReducer = require('../reducers').default;
      /* eslint-enable global-require */
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
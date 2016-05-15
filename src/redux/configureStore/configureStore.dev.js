import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../../components/DevTools'

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('../reducers').default
      /* eslint-enable global-require */
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

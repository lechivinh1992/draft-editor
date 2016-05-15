import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from '../App'
import DevTools from '../../components/DevTools'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.node,
  };

  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

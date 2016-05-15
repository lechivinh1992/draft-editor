import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from '../containers/Root'
import configureStore from '../redux/configureStore'

const initialState = window.__data
const store = configureStore(initialState)

const rootElement = document.getElementById('content')

render(
  <Root store={store} />,
  rootElement
)

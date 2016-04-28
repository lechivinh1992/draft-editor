import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from '../containers/Root'

const rootElement = document.getElementById('content')

render(
  <Root />,
  rootElement
)

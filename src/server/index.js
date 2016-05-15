/* eslint-disable no-console, no-use-before-define, no-underscore-dangle, global-require  */

import Express from 'express'
import path from 'path'
import config from '../config'
import request from 'axios'

const debug = require('debug')('buzz-website-component:server.client')
const app = new Express()
const port = config.port

// Use this middleware to set up hot module reloading via webpack.
if (global.__DEVELOPMENT__) {
  debug('In Development Mode - Load Hot Dev')
  require('./middleware/hot-dev.middleware').default(app, require('../../webpack/config.js'))
} else {
  app.use(Express.static(path.join(__dirname, '../../static')))
}

const API_KEY = '818457475735154'
const SECRET = 'MvaEq-GIUf8U_QdcTOF4kOb0-sg'
const CLOUD_NAME = 'dpl3us1zw'

app.get('/cloudinary/*', (req, res) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/`
  console.log('Path', req.path)
  console.log('Params', req.params)
  console.log('Query', req.query)

  const endpoint = req.path.replace('/cloudinary', '')

  request
    .get(url + endpoint, {
      auth: { username: API_KEY, password: SECRET }
    })
    .then((response) => {
      debug(response.data)
      res.json(response.data)
    })
    .catch((error) => {
      debug(error)
      res.error(error)
    })
})

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

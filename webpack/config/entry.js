/* eslint-disable global-require */

const entry = {
  main: [
    './src/client/index.js'
  ],
  vendor: ['react']
}

if (global.__DEVELOPMENT__) {
  entry.main.unshift('webpack-hot-middleware/client')
}

module.exports = entry

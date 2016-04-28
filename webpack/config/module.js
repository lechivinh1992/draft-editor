/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./module.prod')
} else {
  module.exports = require('./module.dev')
}

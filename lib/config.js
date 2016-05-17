'use strict';

var env = process.env.NODE_ENV || 'development';

module.exports = {
  production: {
    port: '2400'
  },
  development: {
    port: '3400'
  }
}[env];
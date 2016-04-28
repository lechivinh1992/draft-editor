const env = process.env.NODE_ENV || 'development'

module.exports = {
  production: {
    port: '2030',
  },
  development: {
    port: '3030',
  },
}[env]

const session = require('../index.js')

function build (options) {
  return Object.assign({}, options, { execute: execute.bind(null, options) })
}

function execute (options) {
  return session.create(options.email, options.password)
}

module.exports = { build }

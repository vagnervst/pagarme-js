import session from '../index'

function execute ({ email, password }) {
  return session.create(email, password)
}

function build (options) {
  return Object.assign({}, options, { execute: execute.bind(null, options) })
}

export default {
  build
}

import { merge } from 'ramda'
import session from '../../session'

function execute ({ email, password }) {
  return session.create({}, email, password)
}

function build (options) {
  return merge(options, { execute: execute.bind(null, options) })
}

export default { build }

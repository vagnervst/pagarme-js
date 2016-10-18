import { merge, pick, objOf } from 'ramda'
import session from '../../session'

function execute ({ email, password }) {
  return session.create({}, email, password).then(pick(['session_id'])).then(objOf('body'))
}

function build (options) {
  return merge(options, { execute: execute.bind(null, options) })
}

export default { build }

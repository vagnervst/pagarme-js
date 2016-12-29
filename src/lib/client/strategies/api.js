import { merge, pick, objOf } from 'ramda'

function execute (options) {
  return Promise.resolve(options)
    .then(pick(['api_key']))
    .then(objOf('body'))
}

function build (options) {
  return merge(options, { execute: execute.bind(null, options) })
}

export default {
  build,
}

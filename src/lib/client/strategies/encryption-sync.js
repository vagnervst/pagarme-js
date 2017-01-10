import { pipe, merge, pick, objOf } from 'ramda'

const execute = pipe(pick(['encryption_key']), objOf('body'))

function build (options) {
  return merge(options, { execute: execute.bind(null, options) })
}

export default {
  build,
}

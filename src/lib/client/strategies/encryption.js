function execute (options) {
  return Promise.resolve(options)
}

function build (options) {
  return Object.assign({}, options, { execute: execute.bind(null, options) })
}

export default {
  build
}

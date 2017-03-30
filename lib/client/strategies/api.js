/**
 * @name api
 * @memberof strategies
 * @private
 */
import { merge } from 'ramda'

/**
 * Creates an object with
 * the `api_key` from
 * the supplied `options` param
 *
 * @param {any} options
 * @returns {Object} an object containing
 *                   a body property with
 *                   the desired `api_key
 * @private
 */
function execute (opts) {
  const { api_key } = opts
  const body = {
    body: {
      api_key,
    },
  }
  return merge(body, opts.options)
}

/**
 * Returns the supplied parameter with
 * the `execute` function added to it.
 *
 * @param {any} options
 * @returns {Object} The `options` parameter
 *                   with `execute` add to it
 * @private
 */
function build (options) {
  return merge(options, { execute: execute.bind(null, options) })
}

export default {
  build,
}

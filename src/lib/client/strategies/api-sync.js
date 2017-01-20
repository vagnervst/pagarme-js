/**
 * @name api-sync
 * @memberof strategies
 * @private
 */
import { pipe, merge, pick, objOf } from 'ramda'

/**
 * Creates an object with
 * the `api_key` from
 * the supplied `options` param
 *
 * @param {any} options
 * @returns {Object} an object containing
 *                   a body property with
 *                   the desired `api_key`
 * @private
 */
const execute = pipe(pick(['api_key']), objOf('body'))

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

/**
 * @name api
 * @memberof strategies
 * @private
 */
import { merge, pick, objOf } from 'ramda'

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
function execute (options) {
  return Promise.resolve(options)
    .then(pick(['api_key']))
    .then(objOf('body'))
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

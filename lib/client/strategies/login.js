/**
 * @name login
 * @memberof strategies
 * @private
 */
import { merge, pick, objOf } from 'ramda'

import session from '../../resources/session'

/**
 * Creates a session in the server
 * and returns a Promise with the
 * pertinent object.
 *
 * @param {any} { email, password }
 * @returns {Promise} Resolves to an object
 *                    containing a body with
 *                    the desired `session_id`
 * @private
 */
function execute ({ email, password }) {
  return session.create({}, email, password)
    .then(pick(['session_id']))
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

export default { build }

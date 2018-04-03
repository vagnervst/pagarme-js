/**
 * @name sessionId
 * @memberof strategies
 * @private
 */
import { reject, resolve } from 'bluebird'
import { merge } from 'ramda'
import transactions from '../../resources/transactions'

/**
 * Creates an object with
 * the `session_id` from
 * the supplied `options` param
 *
 * @param {any} options
 * @returns {Object} an object containing
 *                   a body property with
 *                   the desired `session_id`
 * @private
 */
function execute (opts) {
  const { session_id, options } = opts
  const payload = merge({
    body: {
      session_id,
    },
  }, options && options.baseURL ? { baseURL: options.baseURL } : {})

  return transactions.calculateInstallmentsAmount(payload, { amount: 1, interest_rate: 100 })
    .catch(error => (opts.skipAuthentication ? resolve(opts.options) : reject(error)))
    .catch({ name: 'ApiError' }, () => reject(new Error('You must supply a valid session id')))
    .then(merge(payload))
    .then(requestOpts => ({
      authentication: { session_id },
      options: requestOpts,
    }))
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

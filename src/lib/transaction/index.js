/**
 * @name Transaction
 * @description This module exposes functions
 *              related to the `/transactions` path.
 *
 * @module transaction
 **/

import routes from '../routes'
import request from '../request'

/**
 * `POST /transactions`
 * Creates a transaction from the given payload.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} id The ID of the transaction.
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const get = (opts, id) =>
  request.get(opts, routes.transaction.details(id), {})

/**
 * `POST /transactions`
 * Creates a transaction from the given payload.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 * @param {Object} body The payload for the request
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const create = (opts, body) =>
  request.post(opts, routes.transaction.base, body)

export default {
  get,
  create,
}

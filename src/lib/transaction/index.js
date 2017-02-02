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
 * `GET /transactions/:id`
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

/**
 * `POST /transactions/:id/capture`
 * Captures a transaction from the given id.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 * @param {Object} id The transaction ID to be captured
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const capture = (opts, id) =>
  request.post(opts, routes.transaction.capture(id), {})

/**
 * `POST /transactions/:id/refund`
 * Captures a transaction from the given id.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 * @param {Object} id The transaction ID to be refunded
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const refund = (opts, id) =>
  request.post(opts, routes.transaction.refund(id), {})

export default {
  get,
  capture,
  create,
  refund,
}

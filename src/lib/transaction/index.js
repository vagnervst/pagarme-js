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
 * Returns a transaction with the given id.
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
 * `GET /transactions`
 * Returns a company's' list of transactions.
 *
 * @example
 * client.transaction.findAll({ count: 100, page: 2 })
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} pagination An object that overrides
 *                            the pagination's defaults
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const findAll = (opts, pagination) =>
  request.get(opts, routes.transaction.base, pagination || {})

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

const splitRules = {
/**
 * `GET /transactions/:id/split_rules/`
 * Returns all split rules for a transaction
 *
 * @param {Object} opts - An options params which
 *                        is usually already bound
 *                        by `connect` functions.
 *
 * @param {Number} id - The transaction ID to get the
 *                      split rules from.
 *
 * @returns {Promise} - Resolves to the result of
 *                      the request or to an error.
 */
  findAll: (opts, id) =>
    request.get(opts, routes.transaction.splitRules.findAll(id), {}),
/**
 * `GET /transactions/:id/split_rules/:id`
 * Returns a specific split rule.
 *
 * @param {Object} opts - An options params which
 *                        is usually already bound
 *                        by `connect` functions.
 * @param {Number} id - The transaction ID to get the
 *                      split rules from.
 * @param {Number} splitId - A specific split rule ID.
 *
 * @returns {Promise} - Resolves to the result of
 *                      the request or to an error.
 */
  find: (opts, id, splitId) =>
    request.get(opts, routes.transaction.splitRules.find(id, splitId), {}),
}

const payables = {
/**
 * `GET /transactions/:id/payables`
 * Returns all payables for a transaction
 *
 * @param {Object} opts - An options params which
 *                        is usually already bound
 *                        by `connect` functions.
 *
 * @params {Number} id - The transaction ID to get the
 *                       payables from.
 *
 * @returns {Promise} - Resolves to the result of
 *                      the request or to an error.
 */
  findAll: (opts, id) =>
    request.get(opts, routes.transaction.payables.findAll(id), {}),

/**
 * `GET /transactions/:id/payables`
 * Returns all payables for a transaction
 *
 * @param {Object} opts - An options params which
 *                        is usually already bound
 *                        by `connect` functions.
 *
 * @params {Number} id - The transaction ID to get the
 *                       payables from.
 *
 * @params {Number} payableId - A specific payable ID.
 *
 * @returns {Promise} - Resolves to the result of
 *                      the request or to an error.
 */
  find: (opts, id, payableId) =>
    request.get(opts, routes.transaction.payables.find(id, payableId), {}),
}

/**
 * `POST /transactions/:id/collect_payment`
 * Sends a payment link to a customer
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Number} id - The transaction ID to collect
 *                      payment
 *
 * @param {Object} body - The payload for the request
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const collectPayment = (opts, id, body) =>
  request.post(opts, routes.transaction.collectPayment(id), body)

/**
 * `GET /transactions/card_hash_key`
 * Create a card hash key
 *
 * @param {Object} opts - An options params which
 *                        is usually already bound
 *                        by `connect` functions.
 *
 * @returns {Promise} - Resolves to the result of
 *                      the request or to an error.
 */
const cardHashKey = opts =>
  request.get(opts, routes.transaction.cardHashKey, {})

export default {
  get,
  capture,
  create,
  findAll,
  refund,
  splitRules,
  payables,
  collectPayment,
  cardHashKey,
}

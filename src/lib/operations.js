/**
 * @name Operations
 * @description This module exposes functions
 *              related to the `/balance/operations` path.
 *
 * @module operations
 **/

import { cond, has, T, curry } from 'ramda'
import routes from './routes'
import request from './request'

const findOne = curry((opts, body) =>
  request.get(opts, routes.operations.details(body.id), {})
)

const findAll = curry((opts, pagination) =>
  request.get(opts, routes.operations.base, pagination || {})
)

/**
 * `GET /balance/operations`
 * Makes a request to /balance/operations or to /balance/operations/:id and
 * returns company's balanceOperations or returns a specif company's
 * balanceOperation
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} body The payload for the request.
 * @param {Number} [body.id] The operations's ID. If not sent a
 *                           operations list will be returned instead.
 * @param {Number} [body.count] Pagination option to get a list of operations.
 *                              Number of operations in a page
 * @param {Number} [body.page] Pagination option for a list of operations.
 *                             The page index.
*/
const find = (opts, body) =>
  cond([
    [has('id'), findOne(opts)],
    [T, findAll(opts)],
  ])(body)

/**
 * `GET /balance/operations`
 * Returns company's balanceOperations
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} body The payload for the request.
 * @param {Number} [body.count] Pagination option to get a list of operations.
 *                              Number of operations in a page
 * @param {Number} [body.page] Pagination option for a list of operations.
 *                             The page index.
*/
const all = (opts, pagination) =>
  findAll(opts, pagination)

/**
 * `GET /balance/operations/days`
 * Returns a company's balanceOperations aggregated by day
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
*/
const days = opts =>
  request.get(opts, routes.operations.days, {})

export default {
  find,
  all,
  days,
}

/**
 * @name Balance
 * @description This module exposes functions
 *              related to the `/balance` path.
 *
 * @module balance
 **/
import routes from './routes'
import request from './request'

/**
 * `GET /balance`
 * Returns company's balance
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
*/
const balance = opts =>
  request.get(opts, routes.balance.base, {})

export default balance

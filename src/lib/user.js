/**
 * @name User
 * @description This module exposes functions
 *              related to the `/users` path.
 *
 * @module user
 **/

import { merge } from 'ramda'
import routes from './routes'
import request from './request'

/**
 * `PUT /users/reset_password`
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 * @param {String} email The email of the account
 *                       of which the password will
 *                       be reset.
 * @returns {Promise} Resolves to the result
 *                    of the request or an error.
 */
const resetPassword = (opts, email) => {
  const newOpts = merge(opts, { qs: { email } })
  return request.put(newOpts, routes.user.resetPassword, {})
}

export default {
  resetPassword,
}

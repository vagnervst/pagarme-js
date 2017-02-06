/**
 * @name Session
 * @description This module exposes functions
 *              related to the `/sessions` path.
 *
 * @module session
 **/

import routes from '../routes'
import request from '../request'

/**
 * `POST /sessions`
 * Creates a session from the given payload.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 * @param {String} email The account's email
 *
 * @param {String} password The account's password
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const create = (opts, email, password) =>
  request.post(opts, routes.session.base, { email, password })

/**
 * `DELETE /sessions/:id`
 *
 * Deletes the session with the given ID
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 * @param {String} id The session's id
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const destroy = (opts, id) =>
  request.delete(opts, routes.session.destroy(id), {})

export default {
  create,
  destroy,
}


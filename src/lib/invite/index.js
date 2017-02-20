
/**
 * @name Invite
 * @description This module exposes functions
 *              related to the `/invites` path.
 *
 * @module invite
 **/

import routes from '../routes'
import request from '../request'

/**
 * `GET /invites/:id`
 * Returns an invite with the given id.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} id The ID of the invite.
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const find = (opts, id) =>
  request.get(opts, routes.invite.details(id), {})

/**
 * `GET /invites`
 * Returns a list of recent invites.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const findAll = opts =>
  request.get(opts, routes.invite.base, {})

/**
 * `POST /invites`
 * Creates an invite from the given payload.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} body A payload that contains
 *                      email and permission
 *                      of the invited person.
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const create = (opts, body) =>
  request.post(opts, routes.invite.base, body)

/**
 * `DELETE /invites`
 * Deletes an invite from the given payload.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} id The ID of the invite.
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const destroy = (opts, id) =>
  request.delete(opts, routes.invite.details(id), {})

export default {
  find,
  findAll,
  create,
  destroy,
}

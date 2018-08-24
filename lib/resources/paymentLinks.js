/**
 * @name PaymentLinks
 * @description This module exposes functions
 *              related to the `/payment_links` path.
 *
 * @module paymentLinks
 **/

import routes from '../routes'
import request from '../request'

/**
 * `POST /payment_links`
 * Creates a paymentLink from the given payload.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} body The payload for the request.
 * {@link https://docs.pagar.me/v2017-08-28/reference#criando-um-link-de-pagamento-1|API Reference for this payload}
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */
const create = (opts, body) =>
  request.post(opts, routes.paymentLinks.base, body)

export default {
  create,
}

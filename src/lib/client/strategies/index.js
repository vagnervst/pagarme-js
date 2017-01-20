/**
 * @name Strategies
 * @description This module is responsible for the
 *              authentication method strategies.
 * @module strategies
 * @private
 */

import { both, has, cond, propEq } from 'ramda'
import encryption from './encryption'
import login from './login'
import api from './api'
import apiSync from './api-sync'
import encryptionSync from './encryption-sync'

/**
 * Defines the correct authentication
 * method according to the supplied
 * object's properties and returns
 * the builder function.
 *
 * @param {Object} options The object containing
 *                         the authentication data
 * @return {?Function} The builder function for
 *                     the Authentication method
 * @private
 */
const strategyBuilder = cond([
  [both(has('email'), has('password')), login.build],
  [both(has('api_key'), propEq('sync', true)), apiSync.build],
  [both(has('encryption'), propEq('sync', true)), encryptionSync.build],
  [has('api_key'), api.build],
  [has('encryption_key'), encryption.build],
])

/**
 * Finds and resolves to a builder
 * function for authentication
 * according to the supplied object.
 *
 * @param {Object} options The object containing
 *                         the authentication data
 * @returns {Promise} Resolves to either the
 *                    correct builder function
 *                    or rejects with an Error.
 */
function find (options) {
  const strategy = strategyBuilder(options)

  if (strategy) {
    return Promise.resolve(strategy)
  }

  return Promise.reject(new Error('You must supply a valid authentication object'))
}

/**
 * Finds and return the synchronously
 * a auth strategy's builder according
 * to the supplied object.
 *
 * @param {Object} options The object containing
 *                         the authentication data
 * @returns {Promise} Resolves to either the
 *                    correct builder function
 *                    or rejects with an Error.
 */
function findSync (options) {
  const strategy = strategyBuilder(options)

  return strategy
}

export default { find, findSync }


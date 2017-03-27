/**
 * @name Strategies
 * @description This module is responsible for the
 *              authentication method strategies.
 * @module strategies
 * @private
 */

import { and, both, has, cond, propEq, prop, ifElse, equals, not, or, compose, objOf } from 'ramda'
import encryption from './encryption'
import login from './login'
import api from './api'
import apiSync from './api-sync'
import encryptionSync from './encryption-sync'
import company from '../../company'

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

function isBrowserEnvironment () {
  if (global === undefined) {
    return true
  }

  return false
}

const buildBody = objOf('body')

function isValidKey (options) {
  const apiKey = prop('api_key', options)
  const encryptionKey = prop('encryption_key', options)

  const body = cond([
    [has('api_key'), () => buildBody({ api_key: apiKey })],
    [has('encryption_key'), () => buildBody({ encryption_key: encryptionKey })],
  ])(options)

  return company.current(body)
}

function rejectInvalidAuthObject () {
  return Promise.reject(new Error('You must supply a valid authentication object'))
}

function isValidStrategy (options) {
  const strategy = strategyBuilder(options)

  const strategyIsNotUndefined = compose(not, equals(undefined))

  return ifElse(
    strategyIsNotUndefined,
    () => Promise.resolve(strategy),
    rejectInvalidAuthObject
  )(strategy)
}

function rejectInvalidKey () {
  return Promise.reject(new Error('You must supply a valid key'))
}

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
  const skipAuthentication = propEq('skipAuthentication', true)(options)

  if (skipAuthentication) {
    return isValidStrategy(options)
  }

  if (or(has('api_key', options), has('encryption_key', options))) {
    if (and(has('api_key', options), isBrowserEnvironment())) {
      return Promise.reject(new Error('You cannot use an api key in the browser!'))
    }

    return isValidKey(options)
      .then(() => isValidStrategy(options))
      .catch(() => rejectInvalidKey())
  }

  return isValidStrategy(options)
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

/**
 * @name OnboardingAnswers
 * @description This module exposes functions
 *              related to the '/onboarding_answers' path.
 *
 * @module onboardingAnswers
 **/

import routes from '../routes'
import request from '../request'

/**
 * `POST /onboarding_answers`
 * Creates a onboarding answer from the given payload.
 *
 * @param {Object} opts An options params which
 *                      is usually already bound
 *                      by `connect` functions.
 *
 * @param {Object} body The payload for the request.
 *
 * @returns {Promise} Resolves to the result of
 *                    the request or to an error.
 */

const create = (opts, body) =>
  request.post(opts, routes.onboardingAnswers.base, body)

export default {
  create,
}

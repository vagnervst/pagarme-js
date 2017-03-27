/**
 * @name Validator
 * @description This module handles some validations
 * @module validator
 **/

import {
  __,
  mapObjIndexed,
  prop,
  keys,
  pick,
  pipe,
  map,
  ifElse,
} from 'ramda'

import validators from './validators'

const filterValidTypes = pipe(
  keys,
  pick
)

const validation = prop(__, validators)

const mapIfArray = func =>
  ifElse(Array.isArray, map(func), func)

const applyValidator = (subject, type) => {
  const validator = mapIfArray(validation(type))
  return validator(subject)
}

const applyValidators = mapObjIndexed(applyValidator)

/**
 * This method validates the properties supplied in the object.
 *
 * @param {Object} [body] An object that contains all properties to
 *                        be validated.
 * @param {(String|String[]|Number|Number[])} [body.cnpj] A CNPF, or an array
 *                                                        of CNPFs, to be
 *                                                        validated.
 * @param {(String|String[]|Number|Number[])} [body.cpf] A CPF, or an array of
 *                                                       CPFs, to be
 *                                                       validated.
 * @param {(String|String[]|Number|Number[])} [body.ddd] A DDD, or an array of
 *                                                       DDDs, to be validated.
 * @param {(String|String[]|Number|Number[])} [body.zipcode] A zipcode, or an
 *                                                           array of zipcodes,
 *                                                           to be validated.
 * @param {(String|String[]|Number|Number[])} [body.phone] A phone number, or
 *                                                         an array of phones,
 *                                                         to be validated.
 *
 *
 * @param {Object|Object[]} [body.card] A card, or an array of cards, to be
 *                                      validated.
 * @param {String} [body.card.card_holder_name] The card's holder name.
 * @param {(String|Number)} [body.card.card_number] The card's number.
 * @param {(String|Number)} [body.card.card_cvv] The card's CVV.
 * @param {(String|Number)} [body.card.card_expiration_date] The card's
 *                                                           expiratation date.
 *
 * @returns {Object} An object that returns each of the supplied properties
 *                   with true or false, indicating if the supplied value is valid
 *                   or invalid.
 **/
const validate = pipe(
  filterValidTypes(validators),
  applyValidators
)

export default validate

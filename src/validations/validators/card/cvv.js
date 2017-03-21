import {
  pipe,
  equals,
  length,
  replace,
  toString,
  ifElse,
  always,
  curry,
} from 'ramda'

const clean = replace(/[^0-9]/g, '')

const isAmex = equals('amex')

const isLength = size => pipe(
  length,
  equals(size)
)

const validate = brand =>
  ifElse(always(isAmex(brand)), isLength(4), isLength(3))

const isValidCvv = curry((cvv, brand) => pipe(
  toString,
  clean,
  validate(brand)
)(cvv))

export default isValidCvv

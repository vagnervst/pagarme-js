import {
  defaultTo,
  toString,
  always,
  replace,
  pipe,
  isEmpty,
  ifElse,
  map,
  toPairs,
  last,
  head,
  find,
  __,
} from 'ramda'

import allBins from './bins'

const mapBins = map(__, allBins)

const clean = replace(/[^0-9]/g, '')

const cardNumberMatchBins = (cardNumber, brandBins) =>
  brandBins.reduce((acc, start) => {
    if (cardNumber.startsWith(start)) {
      return true
    }
    return acc
  }, false)

const makeCardMatcher = cardNumber => brandBins =>
  cardNumberMatchBins(cardNumber, brandBins)

const getBrand = pipe(
  makeCardMatcher,
  mapBins,
  toPairs,
  find(pair => last(pair) === true),
  defaultTo(['unknown']),
  head,
)

export default pipe(
  toString,
  clean,
  ifElse(isEmpty, always('unknown'), getBrand)
)


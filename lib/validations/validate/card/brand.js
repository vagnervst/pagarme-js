import {
  __,
  always,
  find,
  head,
  ifElse,
  isEmpty,
  last,
  map,
  pipe,
  replace,
  toPairs,
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

const brand = pipe(
  makeCardMatcher,
  mapBins,
  toPairs,
  find(last),
  head
)

export default pipe(
  clean,
  ifElse(isEmpty, always('unknown'), brand)
)


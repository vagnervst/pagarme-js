import { mapObjIndexed } from 'ramda'
import transaction from './transaction'
import strategy from './session/strategy'

const resources = {
  transaction
}

const bindOptions = options => {
  const mapper = (val, key) =>
    typeof val === 'object'
      ? mapObjIndexed(mapper, val)
      : val.bind(null, options)

  return mapObjIndexed(mapper, resources)
}

export const connect = authentication => {
  return strategy
    .find(authentication)
    .then(s => s.execute())
    .then(bindOptions)
}


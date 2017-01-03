import { merge, mapObjIndexed } from 'ramda'
import strategies from './strategies'
import resources from './resources'

function bindOptions (options) {
  const mapper = (val) => {
    if (typeof val === 'object') {
      return mapObjIndexed(mapper, val)
    }

    return val.bind(null, options)
  }

  return mapObjIndexed(mapper, resources)
}

function connect (authentication) {
  return strategies
    .find(authentication)
    .then(s => s.execute())
    .then(bindOptions)
}

const exports = merge({ connect }, resources)

export default exports

import { mapObjIndexed, tap } from 'ramda'
import strategies from './strategies'
import resources from './resources'

function bindOptions (options) {
  const mapper = (val, key) =>
    typeof val === 'object'
      && mapObjIndexed(mapper, val)
      || val.bind(null, options)

  return mapObjIndexed(mapper, resources)
}

function connect (authentication) {
  return strategies
    .find(authentication)
    .then(s => s.execute())
    .then(bindOptions)
}
       
export default { connect }


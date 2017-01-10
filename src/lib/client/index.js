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

function connectSync (authentication) {
  const options = merge(authentication, { sync: true })
  const strategyBuilder = strategies.findSync(options)
  const strategy = strategyBuilder.execute()

  return bindOptions(strategy)
}

const client = merge({ connect, connectSync }, resources)

export default client

import { both, has, cond, propEq } from 'ramda'
import encryption from './encryption'
import login from './login'
import api from './api'
import apiSync from './api-sync'
import encryptionSync from './encryption-sync'

const strategyBuilder = cond([
  [both(has('email'), has('password')), login.build],
  [both(has('api_key'), propEq('sync', true)), apiSync.build],
  [both(has('encryption'), propEq('sync', true)), encryptionSync.build],
  [has('api_key'), api.build],
  [has('encryption_key'), encryption.build],
])

function find (options) {
  const strategy = strategyBuilder(options)

  if (strategy) {
    return Promise.resolve(strategy)
  }

  return Promise.reject(new Error('You must supply a valid authentication object'))
}

function findSync (options) {
  const strategy = strategyBuilder(options)

  return strategy
}

export default { find, findSync }


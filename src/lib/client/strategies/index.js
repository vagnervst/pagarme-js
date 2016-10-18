import { both, has, cond } from 'ramda'
import encryption from './encryption'
import login from './login'
import api from './api'

const strategyBuilder = cond([
  [both(has('email'), has('password')), login.build],
  [has('apiKey'), api.build],
  [has('encryptionKey'), encryption.build]
])

function find (options) {
  const strategy = strategyBuilder(options)

  if (strategy) {
    return Promise.resolve(strategy)
  }

  return Promise.reject(new Error('You must supply a valid authentication object'))
}

export default { find }


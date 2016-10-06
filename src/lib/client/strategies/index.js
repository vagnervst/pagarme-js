import encryption from './encryption'
import login from './login'
import api from './api'

function find (options) {
  let strategy = false

  if (options.email && options.password) strategy = login.build
  if (options.apiKey) strategy = api.build
  if (options.encryptionKey) strategy = encryption.build
  if (strategy) return Promise.resolve(strategy(options))

  return Promise.reject(new Error('You must supply a valid authentication object'))
}

export default { find }


const encryption = require('./encryption')
const login = require('./login')
const api = require('./api')

function find (options) {
  var strategy = false
  if (options.email && options.password)
	strategy = login.build
  if (options.apiKey)
	strategy = api.build
  if (options.encryptionKey)
	strategy = encryption.build

  if (strategy)
	return Promise.resolve(strategy(options))

  return Promise.reject(new Error('You must supply a valid authentication object'))
}

module.exports = { find }

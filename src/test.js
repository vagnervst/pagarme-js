const pagarme = require('../build/bundle.js')

const emailPasswordAuth = {
  email: 'jose@silva.com',
  password: '12345xuxa',
  onExpire: function () {
	console.log('session expired')
  }
}

const apiKeyAuth = {
  apiKey: 'ak_live_lkjsdhfkjsdhfjkd'
}

const encryptionKeyAuth = {
  encryptionKey: 'ek_live_lkjsdhfkjsdhfjkd'
}

pagarme.connect(emailPasswordAuth)
	.then(client => client.transaction.get(123))
	.then(console.log.bind(console))

pagarme.connect(apiKeyAuth)
	.then(client => client.transaction.get(123))
	.then(console.log.bind(console))

pagarme.connect(encryptionKeyAuth)
	.then(client => client.transaction.get(123))
	.then(console.log.bind(console))


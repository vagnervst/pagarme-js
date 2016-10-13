const pagarme = require('../build/bundle.js').default

const emailPasswordAuth = {
  email: 'jonathan@pagar.me',
  password: 'asdas123',
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

pagarme.client.connect(emailPasswordAuth)
  .then(client => client.transaction.get(123))
  .then(console.log.bind(console))
  .catch(err => console.dir(err.response))

pagarme.client.connect(apiKeyAuth)
  .then(client => client.transaction.get(123))
  .then(console.dir.bind(console))

pagarme.client.connect(encryptionKeyAuth)
  .then(client => client.transaction.get(123))
  .then(console.dir.bind(console))


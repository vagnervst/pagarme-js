const pagarme = require('./index.js')

const login = new pagarme.strategy.LoginPassword('user', 'pass')

pagarme.connect({ email: 'jose@silva.com', password: '12345xuxa', onExpire: function () { } })
	.then(client => client.transaction.get(123))
	.then(console.log.bind(console))


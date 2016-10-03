const EventEmitter = require('events');
const session = require('./index')

class Strategy extends EventEmitter {
	execute () {
		throw new RuntimeException('You need to override execute() method')
	}
}

// LoginPassword
//
class LoginPassword extends Strategy {
	constructor (login, password) {
		super()
		this.login = login
		this.password = password
	}

	execute () {
		return session.create({}, this.login, this.password)
	}
}

class EncryptionKey extends Strategy {}
class ApiKey extends Strategy {}

module.exports = { LoginPassword, EncryptionKey, ApiKey }


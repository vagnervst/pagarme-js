const strategy = require('./lib/session/strategy')
const transaction = require('./lib/transaction')
const client = require('./lib/client')
const connect = client.connect

module.exports = { strategy, transaction, connect }

# Isomorphic Pagar.me

A JavaScript library to interface with Pagar.me API, which works on browser
and on Node.js.

## API Docs

This library provides a `Promise` based interface for all calls. Before you
can use the library to call Pagar.me API, you need to provide authentication
details which will be used through API calls.

### Authorization

Pagar.me can authorize clients in various fashions. This library handles all
available authentication strategies via `connect` function.

* Using API key:

```javascript
import pagarme from 'pagarme'

pagarme.connect({ apiKey: 'ak_test_y7jk294ynbzf93' })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
```

* Using encryption key:

```javascript
import pagarme from 'pagarme'

pagarme.connect({ encryptionKey: 'ek_test_y7jk294ynbzf93' })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
```

* Using email and password:

```javascript
import pagarme from 'pagarme'

pagarme.connect({ email: 'user@email.com', password: '123456' })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
```

### Using `connect`

When you call `connect`, a Promise which resolves to a `client` or an
error will be returned. If a **login**, **API key** or **encryption key**
authentication error happen, you can `catch` the error with the Promise:

```javascript
import pagarme from 'pagarme'

pagarme.connect({ email: 'user@email.com', password: '123456' })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
  .catch(error => console.error(error))
```

When using **email** and **password** authentication, you can also provide
a callback which will be invoked in case of a session expiration:

```javascript
import pagarme from 'pagarme'

function onExpire (session) {
  console.log('Session expired!')
}

pagarme.connect({ email: 'user@email.com', password: '123456', onExpire })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
  .catch(error => console.error(error))
```


### Client API Reference

Most of Pagar.me REST API endpoints are covered in `client` object. Every
function call issued to `client` will return a `Promise` which represent and
manage the result's lifecycle.

#### Transactions

##### `client.transactions.all`

Return all transactions.

##### `client.transactions.find(transactionId)`

Find transactions with the given ID.

##### `client.transactions.refund(transactionId)`

Refund the transaction with the given ID.

## Building

To build the library, use `npm start`. The result is produced inside `build`
directory.

## Testing

To run library's tests, use `npm test`


<img src="https://cdn.rawgit.com/pagarme/brand/9ec30d3d4a6dd8b799bca1c25f60fb123ad66d5b/logo-circle.svg" width="127px" height="127px" align="left"/>

# Pagar.me Javascript

A JavaScript library to interface with Pagar.me API, works on browser
and on Node.js.

<br>

## Description

This library covers all your needs for integrating with Pagar.me either in Front or Back end. We provide:

* A clean Promise-based interface for all endpoints in Pagarme's API
* Documents validations (CPF, CNPJ, and others)
* A fast way to generate card hashes from cards (`client.security.encrypt`)
* Postback validation

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

pagarme.client.connect({ api_key: 'ak_test_y7jk294ynbzf93' })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
```

> IMPORTANT: Never use API key on the browser, you should use encription key for client side usage.

* Using encryption key:

```javascript
import pagarme from 'pagarme'

const card = {
  card_number: '4111111111111111',
  card_holder_name: 'abc',
  card_expiration_date: '1225',
  card_cvv: '123',
}

pagarme.client.connect({ encryption_key: 'ek_test_y7jk294ynbzf93' })
  .then(client => client.security.encrypt(card))
  .then(card_hash => console.log(card_hash))
```

* Using email and password:

```javascript
import pagarme from 'pagarme'

pagarme.client.connect({ email: 'user@email.com', password: '123456' })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
```

### Client API

All of Pagar.me REST API endpoints are covered in `client` object. Every
function call issued to `client` will return a `Promise` which represents and
manages the result's lifecycle.


### Using `connect`

When you call `connect`, a Promise which resolves to a `client` or an
error will be returned. If a **login**, **API key** or **encryption key**
authentication error happen, you can `catch` the error with the Promise:

```javascript
import pagarme from 'pagarme'

pagarme.client.connect({ email: 'user@email.com', password: '123456' })
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

pagarme.client.connect({ email: 'user@email.com', password: '123456', onExpire })
  .then(client => client.transactions.all())
  .then(transactions => console.log(transactions))
  .catch(error => console.error(error))
```

### Validations

This lib also includes a bunch of validators for convenience. They can be
used in `pagarme.validate` like this:

```javascript
const result = pagarme.validate({
  cnpj: '18.727.053/0001-74',
  cpf: ['403.845.348-37', '20184536856'],
  ddd: 15,
  zipcode: '05679010',
  phone: '996220394',
  card: {
    card_holder_name: 'Pedro Paulo',
    card_number: '5545497548400992',
    card_cvv: 856,
    card_expiration_date: '11/21',
  }
})
```

Note that you can send numbers, string, and arrays, the validator will
validate everything and return an object containing `true` or `false`
in the same order you sent the numbers. An example return of this is:

```javascript
{
  cnpj: true,
  cpf: [true, false],
  ddd: true,
  zipcode: true,
  phone: true,
  card: {
    card_holder_name: true,
    brand: 'mastercard', // we add this field for convenience, it's the only non-boolean field.
    card_number: true,
    card_cvv: true,
    card_expiration_date: true,
    card_expiration_month: true,
    card_expiration_year: true,
  }
}
```

### Transaction example

```javascript
const card = {
  card_number: '4111111111111111',
  card_holder_name: 'abc',
  card_expiration_date: '1225',
  card_cvv: '123',
}

function connect (email, password) {
  return pagarme.client.connect({ email, password })
}

function encryptCard (client, card) {
  return client.security.encrypt(card)
    .then(card_hash => ({ client, card_hash }))
}

function makeTransaction (client, card_hash, amount) {
  return client.transactions.create({ card_hash, amount })
}

connect('youremail@something.com', 'somepassword')
  .then(client => encryptCard(client, card))
  .then(({ client, card_hash }) =>
    makeTransaction(client, card_hash, 1000) // $10.00
  )
  .then(transaction => console.log(transaction))
```

## Building

To build the library, use `npm start`. The result is produced inside `dist`
directory.

## Testing

To run library's tests, use `npm test`


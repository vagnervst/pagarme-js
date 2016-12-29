const pagarme = require('../dist/pagarme.js').default
const fetch = require('node-fetch')

fetch('https://api.pagar.me/1/companies/temporary', { method: 'POST' })
  .then(res => res.json())
  .then((company) => {
    const emailPasswordAuth = {
      email: company.email,
      password: company.password,
      onExpire () {
        console.log('session expired')
      },
    }

    const apiKeyAuth = {
      api_key: company.api_key.test,
    }

    const encryptionKeyAuth = {
      encryption_key: company.encryption_key.test,
    }

    const transactionData = {
      amount: 83060,
      card_number: '4111111111111111',
      card_expiration_date: '1018',
      card_holder_name: 'Test User',
      card_cvv: '123',
      metadata: {
        product: 'pokemon',
        name: 'Charmeleon',
        quantity: 1,
      },
    }

    pagarme.client.connect(apiKeyAuth)
      .then(client => client.transaction.create(transactionData))
      .then((transaction) => {
        pagarme.client.connect(emailPasswordAuth)
          .then(client => client.transaction.get(transaction.id))
          .then(console.log.bind(console))
          .catch(err => console.dir(err.response))

        pagarme.client.connect(apiKeyAuth)
          .then(client => client.transaction.get(transaction.id))
          .then(console.dir.bind(console))
          .catch(err => console.dir(err.response))
      })
  })

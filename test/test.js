const pagarme = require('../dist/pagarme.js').default
const fetch = require('node-fetch')

fetch('https://api.pagar.me/1/companies/temporary', { method: 'POST' })
  .then(res => res.json())
  .then((company) => {
    console.log(company)

    const emailPasswordAuth = {
      email: company.email,
      password: company.password,
      onExpire () {
        console.log('session expired')
      }
    }

    const apiKeyAuth = {
      apiKey: company.api_key
    }

    const encryptionKeyAuth = {
      encryptionKey: company.encryption_key
    }

    pagarme.client.connect(emailPasswordAuth)
      .then(client => client.transaction.get(123))
      .then(console.log.bind(console))
      .catch(err => console.dir(err.response))

    pagarme.client.connect(apiKeyAuth)
      .then(client => client.transaction.get(123))
      .then(console.dir.bind(console))
      .catch(err => console.dir(err.response))

    pagarme.client.connect(encryptionKeyAuth)
      .then(client => client.transaction.get(123))
      .then(console.dir.bind(console))
      .catch(err => console.dir(err.response))
  })

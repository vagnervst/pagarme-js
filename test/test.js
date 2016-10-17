const pagarme = require('../dist/pagarme.js').default
const fetch = require('node-fetch')

let tempCompany = {}

fetch('https://api.pagar.me/1/companies/temporary', { method: 'POST' })
  .then(res => res.json())
  .then((data) => {
    tempCompany = data
    console.log(tempCompany)

    const emailPasswordAuth = {
      email: tempCompany.email,
      password: tempCompany.password,
      onExpire () {
        console.log('session expired')
      }
    }

    const apiKeyAuth = {
      apiKey: tempCompany.api_key
    }

    const encryptionKeyAuth = {
      encryptionKey: tempCompany.encryption_key
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
  })

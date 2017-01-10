import Promise from 'bluebird'
import fetch from 'node-fetch'
import { valid } from '../transaction/mocks/create.js'
import pagarme from '../../../dist/pagarme'

describe('client', () => {
  let company

  beforeAll(Promise.coroutine(function * createCompany () {
    company = yield fetch('https://api.pagar.me/1/companies/temporary', { method: 'POST' })
      .then(res => res.json())
  }))

  describe('with `connectSync`', () => {
    let syncClient

    beforeAll(function createClient () {
      syncClient = pagarme.client.connectSync({
        api_key: company.api_key.test
      })
    })

    describe('when creating a transaction', () => {
      let response

      beforeAll(Promise.coroutine(function * createTransaction () {
        response = yield syncClient.transaction.create(valid)
      }))

      it('should return an object', () => {
        expect(response).toEqual(expect.any(Object))
      })

      it('should return a `transaction` object', () => {
        expect(response.object).toEqual('transaction')
      })

      it('should return data with `referer` = `api_key`', () => {
        expect(response.referer).toEqual('api_key')
      })
    })
  })
})

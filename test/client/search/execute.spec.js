import Promise from 'bluebird'
import fetch from 'node-fetch'
import pagarme from '../../../dist/pagarme'
import mock from './mocks'

describe('client.search', () => {
  let company
  let client
  let response

  beforeAll(Promise.coroutine(function* newCompany () {
    company = yield fetch('https://api.pagar.me/1/companies/temporary', { method: 'POST' })
      .then(res => res.json())
  }))

  describe('with `api_key` auth', () => {
    beforeAll(Promise.coroutine(function* newClient () {
      client = yield pagarme.client.connect({
        api_key: company.api_key.test,
      })

      response = yield client.search(mock)
    }))

    it('should return an ElasticSearch-like response object', () => {
      expect(response).toEqual(
        expect.objectContaining({
          took: expect.any(Number),
          timed_out: expect.any(Boolean),
          hits: expect.any(Object),
        })
      )
    })
  })
})


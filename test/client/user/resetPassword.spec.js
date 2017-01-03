import Promise from 'bluebird'
import fetch from 'node-fetch'
import pagarme from '../../../dist/pagarme'

describe('client.user.resetPassword', () => {
  const client = pagarme.client
  let company
  let response

  beforeAll(Promise.coroutine(function* newCompany () {
    company = yield fetch('https://api.pagar.me/1/companies/temporary', { method: 'POST' })
      .then(res => res.json())
  }))

  describe('when calling with a valid email', () => {
    beforeAll(Promise.coroutine(function* resetPassword () {
      response = yield client.user.resetPassword({
        email: company.email
      })
    }))

    it('should have status \'200\'', () => {
      expect(response.status).toBe(200)
    })
  })
})

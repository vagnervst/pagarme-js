import Promise from 'bluebird'
import pagarme from '../../../dist/pagarme'

describe('client.company.createTemporary', () => {
  const client = pagarme.client
  let response

  describe('when called', () => {
    beforeAll(Promise.coroutine(function* newTemporaryCompany () {
      response = yield client.company.createTemporary()
    }))

    it('response should be according a defined format', () => {
      console.log(JSON.stringify(response))
      expect(response).toEqual(expect.objectContaining({
        company_id: expect.any(String),
        user_id: expect.any(String),
        api_key: {
          test: expect.any(String),
          live: expect.any(String),
        },
        encryption_key: {
          test: expect.any(String),
          live: expect.any(String)
        },
        email: expect.any(String),
        password: expect.any(String),
      }))
    })

    it('the returned email and password should be able to create a new session', () => {
      const assert = (res) => {
        expect(res).not.toEqual(expect.any(Error))
        // Testing for a subset of the client's object format is enough
        expect(res).toEqual(expect.objectContaining({
          transaction: expect.any(Function),
          search: expect.any(Function),
        }))
      }

      client
        .connect({ email: response.email, password: response.password })
        .then(assert)
        .catch(assert)
    })
  })
})

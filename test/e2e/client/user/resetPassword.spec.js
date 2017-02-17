import Promise from 'bluebird'
import fetch from 'node-fetch'
import pagarme from '../../../../dist/pagarme'
import { invalid } from '../../../shared/mocks/user/resetPassword'

describe('client.user.resetPassword', () => {
  let company
  let response
  let client = pagarme.client

  beforeAll(Promise.coroutine(function* newCompany() {
    company = yield fetch('https://api.pagar.me/1/companies/temporary', {
        method: 'POST'
      })
      .then(res => res.json())
  }))

  describe('when called with a valid email', () => {
    beforeAll(Promise.coroutine(function* resetPassword() {
      response = yield client.user.resetPassword({}, company.email)
    }))

    it('should have a response equals to \'{}\'', () => {
      expect(response).toEqual({})
    })
  })

  describe('when called with a non existent email', () => {
    beforeAll(Promise.coroutine(function* resetPassword() {
      try {
        yield client.user.resetPassword({}, invalid.email)
      } catch (err) {
        response = err
      }
    }))

    it('should have thrown an Error', () => {
      expect(response).toBeInstanceOf(Error)
    })

    it('should have an Array `error` as property', () => {
      expect(response.response.errors).toBeInstanceOf(Array)
    })

    it('should have `error` with length = 1', () => {
      expect(response.response.errors.length).toBe(1)
    })

    it('should have a `not_found` typed error', () => {
      expect(response.response.errors[0].type).toBe('not_found')
    })
  })
})

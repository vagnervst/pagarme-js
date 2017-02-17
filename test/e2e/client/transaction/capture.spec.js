import Promise from 'bluebird'
import fetch from 'node-fetch'
import pagarme from '../../../../dist/pagarme'
import { valid, invalid } from '../../../shared/mocks/transaction/capture'

describe('client.transaction.capture', () => {
  let company
  let client
  let response
  let transaction

  beforeAll(Promise.coroutine(function* newCompany () {
    company = yield fetch('https://api.pagar.me/1/companies/temporary', { method: 'POST' })
      .then(res => res.json())
  }))

  function sharedTests () {
    describe('when capturing an authorised transaction', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        transaction = yield client.transaction.create(valid)
      }))

      beforeAll(Promise.coroutine(function* captureTransaction () {
        response = yield client.transaction.capture(transaction.id)
      }))

      it('response should have status = `paid`', () => {
        expect(response.status).toEqual('paid')
      })

      it('response should have object = `transaction`', () => {
        expect(response.object).toEqual('transaction')
      })
    })

    describe('when capturing an already captured transaction', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        transaction = yield client.transaction.create(invalid)
      }))

      beforeAll(Promise.coroutine(function* captureTransaction () {
        try {
          yield client.transaction.capture(transaction.id)
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

      it('should have `error` with length > 0', () => {
        expect(response.response.errors.length).toBeGreaterThan(0)
      })
    })
  }

  describe('with api_key auth', () => {
    beforeAll(Promise.coroutine(function* newClient () {
      client = yield pagarme.client.connect({
        api_key: company.api_key.test,
      })
    }))

    sharedTests()
  })

  describe('with login auth', () => {
    beforeAll(Promise.coroutine(function* newClient () {
      client = yield pagarme.client.connect({
        email: company.email,
        password: company.password,
      })
    }))

    sharedTests()
  })

  describe('with encryption_key auth', () => {
    beforeAll(Promise.coroutine(function* newClient () {
      client = yield pagarme.client.connect({
        encryption_key: company.encryption_key.test,
      })
    }))

    // EKs can only authorise transactions, but not capture them
    describe('when capturing an authorised transaction', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        transaction = yield client.transaction.create(valid)
      }))

      beforeAll(Promise.coroutine(function* captureTransaction () {
        try {
          yield client.transaction.capture(transaction.token)
        } catch (err) {
          response = err
        }
      }))

      it('the transaction response should have an special format', () => {
        expect(transaction).toEqual(expect.objectContaining({
          object: 'transaction',
          status: 'authorized',
          date_created: expect.any(String),
          token: expect.stringMatching(/^test_transaction_/),
        }))
      })

      it('should have thrown an Error', () => {
        expect(response).toBeInstanceOf(Error)
      })

      it('should have an Array `error` as property', () => {
        expect(response.response.errors).toBeInstanceOf(Array)
      })

      it('should have `error` with length > 0', () => {
        expect(response.response.errors.length).toBeGreaterThan(0)
      })
    })
  })
})

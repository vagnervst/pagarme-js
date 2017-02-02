import Promise from 'bluebird'
import fetch from 'node-fetch'
import pagarme from '../../../dist/pagarme'
import { valid } from './mocks/create'

describe('client.transaction.refund', () => {
  let company
  let client
  let response
  let transaction

  beforeAll(Promise.coroutine(function* newCompany () {
    company = yield fetch('https://api.pagar.me/1/companies/temporary', { method: 'POST' })
      .then(res => res.json())
  }))

  function sharedTests () {
    describe('when refunding a paid transaction', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        transaction = yield client.transaction.create(valid)
      }))

      beforeAll(Promise.coroutine(function* refundTransaction () {
        response = yield client.transaction.refund(transaction.id)
      }))

      it('response should have object = `transaction`', () => {
        expect(response.object).toEqual('transaction')
      })

      it('response should have status = `paid`', () => {
        expect(response.status).toEqual('refunded')
      })
    })

    describe('when refunding an already refunded transaction', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        transaction = yield client.transaction.create(valid)
        yield client.transaction.refund(transaction.id)
      }))

      beforeAll(Promise.coroutine(function* refundTransaction () {
        try {
          yield client.transaction.refund(transaction.id)
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

      it('should have `Transação já estornada` as message', () => {
        expect(response.response.errors[0].message).toEqual('Transação já estornada')
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

    // EKs can only authorise transactions
    describe('when refunding an authorised transaction', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        transaction = yield client.transaction.create(valid)
      }))

      beforeAll(Promise.coroutine(function* refundTransaction () {
        try {
          yield client.transaction.refund(transaction.token)
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
  })
})

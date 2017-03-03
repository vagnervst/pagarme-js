import Promise from 'bluebird'
import fetch from 'node-fetch'
import pagarme from '../../../../dist/pagarme'
import { valid, invalid } from '../../../shared/mocks/transaction/create'

describe('client.transactions.create', () => {
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
    }))

    describe('and valid data', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        response = yield client.transactions.create(valid)
      }))

      it('should return an object', () => {
        expect(response).toEqual(expect.any(Object))
      })

      it('should return a `transaction` object', () => {
        expect(response.object).toEqual('transaction')
      })

      it('should return data with `status` = `paid`', () => {
        expect(response.status).toEqual('paid')
      })

      it('should return data with a Number `id`', () => {
        expect(response.id).toEqual(expect.any(Number))
      })

      it('should return data with `status` = `paid`', () => {
        expect(response.amount).toEqual(valid.amount)
      })

      it('should return `card_hold_name` matching the supplied', () => {
        expect(response.card_holder_name).toEqual(valid.card_holder_name)
      })

      it('should return `card_last_digits` matching the supplied', () => {
        expect(response.card_last_digits).toEqual(valid.card_number.slice(-4))
      })

      it('should return `card_first_digits` matching the suppled', () => {
        expect(response.card_first_digits).toEqual(valid.card_number.substring(0, 6))
      })

      it('should return a `metadata` field', () => {
        expect(response.metadata).not.toBeNull()
      })
    })

    describe('and invalid data', () => {
      beforeAll(Promise.coroutine(function* newFailedTransaction () {
        try {
          yield client.transactions.create(invalid)
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

  describe('with login auth', () => {
    beforeAll(Promise.coroutine(function* newClient () {
      client = yield pagarme.client.connect({
        email: company.email,
        password: company.password,
      })
    }))

    describe('and valid data', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        response = yield client.transactions.create(valid)
      }))

      it('should return an object', () => {
        expect(response).toEqual(expect.any(Object))
      })

      it('should return a `transaction` object', () => {
        expect(response.object).toEqual('transaction')
      })

      it('should return data with `status` = `paid`', () => {
        expect(response.status).toEqual('paid')
      })

      it('should return data with a Number `id`', () => {
        expect(response.id).toEqual(expect.any(Number))
      })

      it('should return data with `status` = `paid`', () => {
        expect(response.amount).toEqual(valid.amount)
      })

      it('should return `card_hold_name` matching the supplied', () => {
        expect(response.card_holder_name).toEqual(valid.card_holder_name)
      })

      it('should return `card_last_digits` matching the supplied', () => {
        expect(response.card_last_digits).toEqual(valid.card_number.slice(-4))
      })

      it('should return `card_first_digits` matching the suppled', () => {
        expect(response.card_first_digits).toEqual(valid.card_number.substring(0, 6))
      })

      it('should return a `metadata` field', () => {
        expect(response.metadata).not.toBeNull()
      })
    })

    describe('and invalid data', () => {
      beforeAll(Promise.coroutine(function* newFailedTransaction () {
        try {
          yield client.transactions.create(invalid)
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

  describe('with `encryption_key` auth', () => {
    beforeAll(Promise.coroutine(function* newClient () {
      client = yield pagarme.client.connect({
        encryption_key: company.encryption_key.test,
      })
    }))

    describe('and valid data', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        response = yield client.transactions.create(valid)
      }))

      it('should return an object', () => {
        expect(response).toEqual(expect.any(Object))
      })

      it('should return a `transaction` object', () => {
        expect(response.object).toEqual('transaction')
      })

      it('should return an object with status `authorized`', () => {
        expect(response.status).toEqual('authorized')
      })

      it('should return an object with `token`', () => {
        expect(response.token).toBeDefined()
      })

      it('should return an object with `token` starting with `test_transaction`', () => {
        expect(response.token).toMatch(/^test_transaction_/)
      })
    })

    describe('and invalid data', () => {
      beforeAll(Promise.coroutine(function* newFailedTransaction () {
        try {
          yield client.transactions.create(invalid)
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


import Promise from 'bluebird'
import fetch from 'node-fetch'
import pagarme from '../../../dist/pagarme'
import transactionData from '../../mocks/transaction/valid_payload.mock'
import invalidData from '../../mocks/transaction/invalid_payload.mock'

describe('client.transaction.create', () => {
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
        api_key: company.api_key.test
      })
    }))

    describe('and valid data', () => {
      beforeAll(Promise.coroutine(function* newTransaction () {
        response = yield client.transaction.create(transactionData)
      }))

      it('should return an object', () => {
        expect(response).toEqual(expect.any(Object))
      })

      it('should return a `transaction` object', () => {
        expect(response).toEqual(expect.objectContaining({
          object: expect.stringMatching('transaction')
        }))
      })

      it('should return data with `status` = `paid`', () => {
        expect(response).toEqual(expect.objectContaining({
          status: 'paid'
        }))
      })

      it('should return data with a Number `id`', () => {
        expect(response).toEqual(expect.objectContaining({
          id: expect.any(Number)
        }))
      })

      it('should return data with `status` = `paid`', () => {
        expect(response.amount).toEqual(transactionData.amount)
      })

      it('should return `card_hold_name` matching the supplied', () => {
        expect(response.card_holder_name).toEqual(transactionData.card_holder_name)
      })

      it('should return `card_last_digits` matching the supplied', () => {
        expect(response.card_last_digits).toEqual(transactionData.card_number.slice(-4))
      })

      it('should return `card_first_digits` matching the suppled', () => {
        expect(response.card_first_digits).toEqual(transactionData.card_number.substring(0, 6))
      })

      it('should return a `metadata` field', () => {
        expect(response.metadata).not.toBeNull()
      })
    })

    describe('and invalid data', () => {
      beforeAll(Promise.coroutine(function* newFailedTransaction () {
        try {
          yield client.transaction.create(invalidData)
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


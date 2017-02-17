import Promise from 'bluebird'
import pagarme from '../../../../dist/pagarme'
import { valid, invalid } from '../../../shared/mocks/company/create'

describe('client.company.create', () => {
  const client = pagarme.client
  let response

  describe('with a valid payload', () => {
    beforeAll(Promise.coroutine(function* newCompany () {
      response = yield client.company.create({}, valid)
    }))

    it('should have `object` = `company`', () => {
      expect(response.object).toEqual('company')
    })

    it('should have `name` = payload\'s company_name ', () => {
      expect(response.name).toEqual(valid.company_name)
    })

    it('should have `status` = `pending_confirmation`', () => {
      expect(response.status).toEqual('pending_confirmation')
    })
  })

  describe('with an invalid payload', () => {
    beforeAll(Promise.coroutine(function* newCompany () {
      try {
        yield client.company.create({}, invalid)
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

    it('should have a children of `error` w/ type `invalid_parameter`', () => {
      expect(response.response.errors[0].type).toEqual('invalid_parameter')
    })

    it('should have a children of `error` w/ `parameter_name = name`', () => {
      expect(response.response.errors[0].parameter_name).toEqual('name')
    })
  })
})

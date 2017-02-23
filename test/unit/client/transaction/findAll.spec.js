import Promise from 'bluebird'

import pagarme from '../../../../dist/pagarme'


describe('client.transaction.findAll', () => {
  let response
  let client

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then((cli) => { client = cli })
  )

  describe('when called without parameters', () => {
    beforeAll(Promise.coroutine(function* getTransaction () {
      response = yield client.transaction.findAll()
    }))


    it('should be a GET request', () => {
      expect(response.method).toBe('GET')
    })

    it('should have an api_key', () => {
      expect(response.body.api_key).toBeTruthy()
    })

    it('should have requested `/transactions` ', () => {
      expect(response.url).toBe('/transactions')
    })
  })

  describe('when called with pagination options', () => {
    beforeAll(Promise.coroutine(function* getTransaction () {
      response = yield client.transaction.findAll({ count: 100, page: 10 })
    }))


    it('should be a GET request', () => {
      expect(response.method).toBe('GET')
    })

    it('should have an api_key', () => {
      expect(response.body.api_key).toBeTruthy()
    })

    it('should have count = 100 ', () => {
      expect(response.body.count).toEqual('100')
    })

    it('should have page = 10 ', () => {
      expect(response.body.page).toBe('10')
    })

    it('should have requested `/transactions` ', () => {
      expect(response.url).toBe('/transactions')
    })
  })
})

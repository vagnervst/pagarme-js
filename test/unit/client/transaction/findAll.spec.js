import Promise from 'bluebird'
import connect from '../../../shared/unitTestEnv'

describe('client.transaction.findAll', () => {
  let response
  let server
  let client

  beforeAll(Promise.coroutine(function* createEchoServer () {
    ({ client, server } = yield connect())
  }))

  afterAll(() => {
    server.close()
  })

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

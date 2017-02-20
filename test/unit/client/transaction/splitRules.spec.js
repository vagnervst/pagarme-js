import Promise from 'bluebird'
import connect from '../../../shared/unitTestEnv'


function splitRules (client) {
  return Promise.props({
    findAll: client.transaction.splitRules.findAll(1234),
    find: client.transaction.splitRules.find(1234, 5432),
  })
}

describe('client.transaction.splitRules', () => {
  let response
  let server

  beforeAll(() => {
    return connect()
      .then(({ client, server: srv }) => {
        server = srv
        return client
      })
      .then(splitRules)
      .then((res) => {
        response = res
      })
  })

  afterAll(() => {
    server.close()
  })

  describe('findAll', () => {
    it('should be a GET request', () => {
      expect(response.findAll.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.findAll.body.api_key).toBeTruthy()
    })
    it('should use /transactions/:id/split_rules', () => {
      expect(response.findAll.url).toBe('/transactions/1234/split_rules')
    })
  })

  describe('find', () => {
    it('should be a GET request', () => {
      expect(response.find.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.find.body.api_key).toBeTruthy()
    })
    it('should use /transactions/:id/capture', () => {
      expect(response.find.url).toBe('/transactions/1234/split_rules/5432')
    })
  })
})

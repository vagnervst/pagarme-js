import Promise from 'bluebird'
import pagarme from '../../../../dist/pagarme'


function splitRules (client) {
  return Promise.props({
    findAll: client.splitRules.find({ transactionId: 1234 }),
    find: client.splitRules.find({ transactionId: 1234, id: 5432 }),
  })
}

describe('client.splitRules', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(splitRules)
    .then((res) => { response = res })
  )

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
    it('should use /transactions/:id/split_rules/:id', () => {
      expect(response.find.url).toBe('/transactions/1234/split_rules/5432')
    })
  })
})

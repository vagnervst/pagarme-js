import Promise from 'bluebird'
import pagarme from '../../../../dist/pagarme'


function antifraudAnalyses (client) {
  return Promise.props({
    findAll: client.antifraudAnalyses.find({ transactionId: 5432 }),
    find: client.antifraudAnalyses.find({ transactionId: 5432, id: 1234 })
  })
}

describe('client.antifraudAnalyses', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(antifraudAnalyses)
    .then((res) => { response = res })
  )

  describe('findAll', () => {
    it('should be a GET request', () => {
      expect(response.findAll.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.findAll.body.api_key).toBeTruthy()
    })
    it('should use /transactions/:transactionId/antifraud_analyses', () => {
      expect(response.findAll.url).toBe('/transactions/5432/antifraud_analyses')
    })
  })

  describe('find', () => {
    it('should be a GET request', () => {
      expect(response.find.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.find.body.api_key).toBeTruthy()
    })
    it('should use /transactions/:transactionId/antifraud_analyses/:antifraudId', () => {
      expect(response.find.url).toBe('/transactions/5432/antifraud_analyses/1234')
    })
  })
})

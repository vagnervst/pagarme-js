import Promise from 'bluebird'
import pagarme from '../../../../dist/pagarme'

function antifraudAnalyses (client) {
  return Promise.props({
    findAll: client.transaction.antifraudAnalyses.findAll(1234),
    find: client.transaction.antifraudAnalyses.find(1234, 5432)
  })
}

describe('client.transaction.antifraudAnalyses', () => {
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
    it('should use /transactions/:id/antifraud_analyses', () => {
      expect(response.findAll.url).toBe('/transactions/1234/antifraud_analyses')
    })
  })

  describe('find', () => {
    it('should be a GET request', () => {
      expect(response.find.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.find.body.api_key).toBeTruthy()
    })
    it('should use /transactions/:id/antifraud_analyses/:antifraudId', () => {
      expect(response.find.url).toBe('/transactions/1234/antifraud_analyses/5432')
    })
  })
})

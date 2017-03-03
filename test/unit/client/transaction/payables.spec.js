import Promise from 'bluebird'

import pagarme from '../../../../dist/pagarme'


function payables (client) {
  return Promise.props({
    findAll: client.payables.find({}),
    findTransaction: client.payables.find({ transactionId: 1234 }),
    findOne: client.payables.find({ id: 5432 }),
  })
}

describe('client.payables', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(payables)
    .then((res) => { response = res })
  )

  describe('findTransaction', () => {
    it('should be a GET request', () => {
      expect(response.findTransaction.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.findTransaction.body.api_key).toBeTruthy()
    })
    it('should use /transactions/:id/payables', () => {
      expect(response.findTransaction.url).toBe('/transactions/1234/payables')
    })
  })

  describe('findOne', () => {
    it('should be a GET request', () => {
      expect(response.findOne.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.findOne.body.api_key).toBeTruthy()
    })
    it('should use /payables/:id', () => {
      expect(response.findOne.url).toBe('/payables/5432')
    })
  })

  describe('findAll', () => {
    it('should be a GET request', () => {
      expect(response.findAll.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.findAll.body.api_key).toBeTruthy()
    })
    it('should use /payables/:id', () => {
      expect(response.findAll.url).toBe('/payables')
    })
  })
})

import Promise from 'bluebird'
import pagarme from '../../../../dist/pagarme'


function getTransaction (client) {
  return Promise.props({
    find: client.transactions.find({ id: 1337 }),
    findAll: client.transactions.find({ count: 10, page: 2 }),
    findAllAlias: client.transactions.all({ count: 10, page: 2 }),
  })
}

describe('client.transactions.find', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(getTransaction)
    .then((res) => {
      response = res
    })
  )
  describe('find', () => {
    it('should be a GET request', () => {
      expect(response.find.method).toBe('GET')
    })

    it('should have an api_key', () => {
      expect(response.find.body.api_key).toBeTruthy()
    })

    it('should use /transaction/:id route', () => {
      expect(response.find.url).toBe('/transactions/1337')
    })
  })

  describe('findAll', () => {
    it('should be a GET request', () => {
      expect(response.findAll.method).toBe('GET')
    })

    it('should have an api_key', () => {
      expect(response.findAll.body.api_key).toBeTruthy()
    })

    it('should have requested `/transactions` ', () => {
      expect(response.findAll.url).toBe('/transactions')
    })
  })

  describe('findAll', () => {
    it('should be a GET request', () => {
      expect(response.findAllAlias.method).toBe('GET')
    })

    it('should have an api_key', () => {
      expect(response.findAllAlias.body.api_key).toBeTruthy()
    })

    it('should have requested `/transactions` ', () => {
      expect(response.findAllAlias.url).toBe('/transactions')
    })
  })
})


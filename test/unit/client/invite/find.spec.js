import Promise from 'bluebird'
import pagarme from '../../../../dist/pagarme'

function findInvites (client) {
  return Promise.props({
    findAll: client.invite.findAll(),
    find: client.invite.find(1234),
  })
}

describe('client.invite', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(findInvites)
    .then((res) => { response = res })
  )

  describe('findAll', () => {
    it('should be a GET request', () => {
      expect(response.findAll.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.findAll.body.api_key).toBeTruthy()
    })
    it('should use /invites/:id', () => {
      expect(response.findAll.url).toBe('/invites')
    })
  })

  describe('find', () => {
    it('should be a GET request', () => {
      expect(response.find.method).toBe('GET')
    })
    it('should have an api_key', () => {
      expect(response.find.body.api_key).toBeTruthy()
    })
    it('should use /invites/:id/capture', () => {
      expect(response.find.url).toBe('/invites/1234')
    })
  })
})


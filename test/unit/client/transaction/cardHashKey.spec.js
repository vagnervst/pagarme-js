import connect from '../../../shared/unitTestEnv'

function createCardHashKey (client) {
  return client.transaction.cardHashKey()
}

describe('client.transaction.cardHashKey', () => {
  let response
  let server

  beforeAll(() => {
    return connect({ strategy: 'encryption' })
      .then(({ client, server: srv }) => {
        server = srv
        return client
      })
      .then(createCardHashKey)
      .then((res) => {
        response = res
      })
  })

  afterAll(() => {
    server.close()
  })

  it('should be a GET request', () => {
    expect(response.method).toBe('GET')
  })

  it('should have an encryption_key', () => {
    expect(response.body.encryption_key).toBeTruthy()
  })

  it('should use /transactions/card_hash_key', () => {
    expect(response.url).toBe('/transactions/card_hash_key')
  })
})

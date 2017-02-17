import connect from '../../../shared/unitTestEnv'


function getTransaction (client) {
  return client.transaction.get(1337)
}

describe('client.transaction.get', () => {
  let response
  let server

  beforeAll(() => {
    return connect()
      .then(({ client, server: srv }) => {
        server = srv
        return client
      })
      .then(getTransaction)
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

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })

  it('should use /transaction/:id route', () => {
    expect(response.url).toBe('/transactions/1337')
  })
})

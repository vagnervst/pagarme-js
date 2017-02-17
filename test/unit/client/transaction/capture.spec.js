import connect from '../../../shared/unitTestEnv'


function captureTransaction (client) {
  return client.transaction.capture(1234)
}

describe('client.transaction.capture', () => {
  let response
  let server

  beforeAll(() => {
    return connect()
      .then(({ client, server: srv }) => {
        server = srv
        return client
      })
      .then(captureTransaction)
      .then((res) => {
        response = res
      })
  })

  afterAll(() => {
    server.close()
  })

  it('should be a POST request', () => {
    expect(response.method).toBe('POST')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })

  it('should use /transaction/:id/capture', () => {
    expect(response.url).toBe('/transactions/1234/capture')
  })
})

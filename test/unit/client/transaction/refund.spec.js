import connect from '../../../shared/unitTestEnv'


function refundTransaction (client) {
  return client.transaction.refund(1234)
}

describe('client.transaction.refund', () => {
  let response
  let server

  beforeAll(() => {
    return connect()
      .then(({ client, server: srv }) => {
        server = srv
        return client
      })
      .then(refundTransaction)
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

  it('should use /transaction/:id/refund', () => {
    expect(response.url).toBe('/transactions/1234/refund')
  })
})

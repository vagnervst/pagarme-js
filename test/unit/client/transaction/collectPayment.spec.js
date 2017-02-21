import { valid } from '../../../shared/mocks/transaction/collect-payment'
import connect from '../../../shared/unitTestEnv'

function collectPayment (client) {
  return client.transaction.collectPayment(1234, valid)
}

describe('client.transaction.collectPayment', () => {
  let response
  let server

  beforeAll(() => {
    return connect()
      .then(({ client, server: srv }) => {
        server = srv
        return client
      })
      .then(collectPayment)
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

  it('should have an email', () => {
    expect(response.body.email).toBeTruthy()
  })

  it('should use /transactions/:id/collect_payment', () => {
    expect(response.url).toBe('/transactions/1234/collect_payment') 
  })
})

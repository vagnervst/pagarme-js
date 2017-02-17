import { valid } from '../../../shared/mocks/transaction/create'
import connect from '../../../shared/unitTestEnv'


function createValidTransaction (client) {
  return client.transaction.create(valid)
}
describe('client.transaction.create', () => {
  let response
  let server

  beforeAll(() => {
    return connect()
      .then(({ client, server: srv }) => {
        server = srv
        return client
      })
      .then(createValidTransaction)
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

  it('should have an amount', () => {
    expect(response.body.amount).toBeTruthy()
  })

  it('should use /transaction route', () => {
    expect(response.url).toBe('/transactions')
  })
})

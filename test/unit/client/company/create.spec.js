import connect from '../../../shared/unitTestEnv'
import { valid } from '../../../shared/mocks/company/create'


function createValidSession (client) {
  return client.company.create(valid)
}

describe('client.company.create', () => {
  let response
  let server

  beforeAll(() => {
    return connect()
      .then(({ client, server: srv }) => {
        server = srv
        return client
      })
      .then(createValidSession)
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

  it('should have an name', () => {
    expect(response.body.name).toBeTruthy()
  })

  it('should have an company_name', () => {
    expect(response.body.company_name).toBeTruthy()
  })

  it('should have an email', () => {
    expect(response.body.email).toBeTruthy()
  })

  it('should have an password', () => {
    expect(response.body.password).toBeTruthy()
  })

  it('should use /companies route', () => {
    expect(response.url).toBe('/companies')
  })
})

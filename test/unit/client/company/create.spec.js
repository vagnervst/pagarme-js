import pagarme from '../../../../dist/pagarme'
import { valid } from '../../../shared/mocks/company/create'


function createValidSession (client) {
  return client.company.create(valid)
}

describe('client.company.create', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(createValidSession)
    .then((res) => { response = res })
  )

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

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })

  it('should use /companies route', () => {
    expect(response.url).toBe('/companies')
  })
})


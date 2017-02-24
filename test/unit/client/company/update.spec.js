import pagarme from '../../../../dist/pagarme'
import { valid } from '../../../shared/mocks/company/create'

function update (client) {
  return client.company.update(valid)
}

describe('client.company.update', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(update)
    .then((res) => { response = res })
  )

  it('should be a PUT request', () => {
    expect(response.method).toBe('PUT')
  })

  it('should use /company route', () => {
    expect(response.url).toBe('/company')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })
})

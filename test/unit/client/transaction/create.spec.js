import { valid } from '../../../shared/mocks/transaction/create'
import pagarme from '../../../../dist/pagarme'

function createValidTransaction (client) {
  return client.transaction.create(valid)
}

describe('client.transaction.create', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(createValidTransaction)
    .then((res) => { response = res })
  )

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

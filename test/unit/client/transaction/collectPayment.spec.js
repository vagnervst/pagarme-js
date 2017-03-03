import { valid } from '../../../shared/mocks/transaction/collect-payment'

import pagarme from '../../../../dist/pagarme'

function collectPayment (client) {
  return client.transactions.collectPayment({ id: 1234, email: 'a@b.co' })
}

describe('client.transactions.collectPayment', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(collectPayment)
    .then((res) => { response = res })
  )

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

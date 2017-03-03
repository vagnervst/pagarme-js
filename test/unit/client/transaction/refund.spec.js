import pagarme from '../../../../dist/pagarme'


function refundTransaction (client) {
  return client.transactions.refund({ id: 1234 })
}

describe('client.transactions.refund', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(refundTransaction)
    .then((res) => { response = res })
  )

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

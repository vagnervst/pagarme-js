import pagarme from '../../../../dist/pagarme'


function captureTransaction (client) {
  return client.transaction.capture(1234)
}

describe('client.transaction.capture', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(captureTransaction)
    .then((res) => { response = res })
  )

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

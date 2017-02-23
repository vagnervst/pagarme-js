import pagarme from '../../../../dist/pagarme'


function getTransaction (client) {
  return client.transaction.get(1337)
}

describe('client.transaction.get', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(getTransaction)
    .then((res) => { response = res })
  )

  it('should be a GET request', () => {
    expect(response.method).toBe('GET')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })

  it('should use /transaction/:id route', () => {
    expect(response.url).toBe('/transactions/1337')
  })
})

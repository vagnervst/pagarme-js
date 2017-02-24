import pagarme from '../../../../dist/pagarme'

function resetKeys (client) {
  return client.company.resetKeys()
}

describe('client.company.resetKeys', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(resetKeys)
    .then((res) => { response = res })
  )

  it('should be a PUT request', () => {
    expect(response.method).toBe('PUT')
  })

  it('should use /company/reset_keys route', () => {
    expect(response.url).toBe('/company/reset_keys')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })
})

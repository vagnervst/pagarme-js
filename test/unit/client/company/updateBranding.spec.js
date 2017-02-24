import pagarme from '../../../../dist/pagarme'

function updateBranding (client) {
  return client.company.updateBranding({ id: 1234 })
}

describe('client.company.updateBranding', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(updateBranding)
    .then((res) => { response = res })
  )

  it('should be a PUT request', () => {
    expect(response.method).toBe('PUT')
  })

  it('should use /company/branding/:id route', () => {
    expect(response.url).toBe('/company/branding/1234')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })
})

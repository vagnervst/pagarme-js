import pagarme from '../../../../dist/pagarme'


function current (client) {
  return client.company.current()
}

describe('client.company.current', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(current)
    .then((res) => { response = res })
  )

  it('should be a GET request', () => {
    expect(response.method).toBe('GET')
  })

  it('should use /company route', () => {
    expect(response.url).toBe('/company')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })
})

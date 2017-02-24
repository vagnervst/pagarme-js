import pagarme from '../../../../dist/pagarme'


function activate (client) {
  return client.company.activate()
}

describe('client.company.activate', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(activate)
    .then((res) => { response = res })
  )

  it('should be a POST request', () => {
    expect(response.method).toBe('POST')
  })

  it('should use /companies/activate route', () => {
    expect(response.url).toBe('/companies/activate')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })
})

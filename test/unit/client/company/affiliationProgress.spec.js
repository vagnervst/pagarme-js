import pagarme from '../../../../dist/pagarme'

function affiliationProgress (client) {
  return client.company.affiliationProgress()
}

describe('client.company.affiliationProgress', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(affiliationProgress)
    .then((res) => { response = res })
  )


  it('should be a GET request', () => {
    expect(response.method).toBe('GET')
  })

  it('should use /company/affiliation_progress route', () => {
    expect(response.url).toBe('/company/affiliation_progress')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })
})

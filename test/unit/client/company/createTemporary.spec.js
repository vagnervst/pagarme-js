import pagarme from '../../../../dist/pagarme'


function createTemporary (client) {
  return client.company.createTemporary()
}

describe('client.company.createTemporary', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(createTemporary)
    .then((res) => { response = res })
  )


  it('should be a POST request', () => {
    expect(response.method).toBe('POST')
  })

  it('should use /companies/temporary route', () => {
    expect(response.url).toBe('/companies/temporary')
  })
})

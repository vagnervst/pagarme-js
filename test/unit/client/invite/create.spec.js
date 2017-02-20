import pagarme from '../../../../dist/pagarme'

function createInvite (client) {
  return client.invite.create({
    email: 'abc@d.com',
    permission: 'admin',
  })
}

describe('client.invite.create', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(createInvite)
    .then((res) => { response = res })
  )


  it('should be a POST request', () => {
    expect(response.method).toBe('POST')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })

  it('should have an email', () => {
    expect(response.body.email).toBeTruthy()
  })

  it('should have a permission', () => {
    expect(response.body.permission).toBeTruthy()
  })

  it('should use /invites route', () => {
    expect(response.url).toBe('/invites')
  })
})

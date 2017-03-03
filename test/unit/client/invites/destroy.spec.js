import pagarme from '../../../../dist/pagarme'

function destroyInvite (client) {
  return client.invites.destroy({ id: 'abcd' })
}
describe('client.invites.destroy', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(destroyInvite)
    .then((res) => { response = res })
  )


  it('should be a DELETE request', () => {
    expect(response.method).toBe('DELETE')
  })

  it('should have an api_key', () => {
    expect(response.body.api_key).toBeTruthy()
  })

  it('should use /invites/:id route', () => {
    expect(response.url).toBe('/invites/abcd')
  })
})

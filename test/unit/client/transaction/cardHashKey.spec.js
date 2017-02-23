import pagarme from '../../../../dist/pagarme'


function createCardHashKey (client) {
  return client.transaction.cardHashKey()
}

describe('client.transaction.cardHashKey', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    encryption_key: 'xxx',
  })
    .then(createCardHashKey)
    .then((res) => { response = res })
  )

  it('should be a GET request', () => {
    expect(response.method).toBe('GET')
  })

  it('should have an encryption_key', () => {
    expect(response.body.encryption_key).toBeTruthy()
  })

  it('should use /transactions/card_hash_key', () => {
    expect(response.url).toBe('/transactions/card_hash_key')
  })
})

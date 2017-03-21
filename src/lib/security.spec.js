import security from './security'
import NodeRSA from 'node-rsa'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('client.security.encrypt', () => {
  const key = new NodeRSA({ b: 2048 }, {encryptionScheme: 'pkcs1'})
  const publicKey = key.exportKey('pkcs1-public-pem')
  it('should generate a valid card_hash', () =>
    security.encrypt(
      {
        body: {
          api_key: '123',
        },
      },
      {
        card_number: '4111111111111111',
        card_holder_name: 'abc',
        card_expiration_date: '1225',
        card_cvv: '123',
        // you can pass a key generated from
        // 'client.transactions.cardHashKey'
        // but this is not needed. We did it
        // here because we don't want this to
        // be an e2e test.
        key: {
          date_created: '2017-03-15T18:12:07.937Z',
          id: 446698,
          ip: '177.32.85.54',
          public_key: publicKey,
        },
      },
    ).then((hash) => {
      const cardHash = hash.split('_')[1]
      const cardQueryString = key.decrypt(cardHash, 'utf8')

      return expect(cardQueryString)
        .toBe('card_number=4111111111111111&card_holder_name=abc&card_expiration_date=1225&card_cvv=123')
    })
  )
})

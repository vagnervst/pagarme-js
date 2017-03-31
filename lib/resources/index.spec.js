import client from '../client'

/*
 *
 * This is an E2E test
 *
 */

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('pagarme.client', () => {
  it('should return an error if an invalid api key is given', () =>
    client.connect({ api_key: 'libjsdonetomorrow' })
      .catch(err =>
        expect(err.message).toBe('You must supply a valid API key'))
  )

  it('should return an error when an invalid auth option is given', () =>
    client.connect({ name: 'Minhoca' })
      .catch(err =>
        expect(err.message).toBe('You must supply a valid authentication object')
      )
  )

  it('should return an error if an invalid encryption_key is given', () =>
    client.connect({ encryption_key: 'fwefwe' })
      .catch(err =>
        expect(err.message).toBe('You must supply a valid encryption key'))
  )

  test('when a valid api key is given', () =>
    client.connect({ api_key: process.env.API_KEY })
      .then(cli => cli.company.current())
      .then(result => expect(result).toBeTruthy())
      .catch(err =>
        expect(err.message).not.toBe('You must supply a valid key'))
  )

  test('when a valid encryption_key is given', () =>
    client.connect({ encryption_key: process.env.ENCRYPTION_KEY })
      .then(cli => cli.transactions.calculateInstallmentsAmount({ amount: 1, interest_rate: 100 }))
      .then(result => expect(result).toBeTruthy())
      .catch(err =>
        expect(err.message).not.toBe('You must supply a valid key'))
  )
})

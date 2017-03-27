import client from './client'

/*
 *
 * This is an E2E test
 *
 */

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('pagarme.client', () => {
  it('should return an error if an invalid api key is given', () => {
    return client.connect({ api_key: 'libjsdonetomorrow' })
      .catch(err => {
        expect(err.message).toBe('You must supply a valid key')
      })
  })

  it('should return an error when an invalid auth option is given', () => {
    return client.connect({ name: 'Minhoca' })
      .catch(err => {
        expect(err.message).toBe('You must supply a valid authentication object')
      })
  })

  it('company should have property `object` when a valid api key is given', () => {
    return client.connect({ api_key: process.env.API_KEY })
      .then(client => {
        return client.company.current()
      })
      .then(company => {
        expect(company).toHaveProperty('object', 'company')
      })
  })
})

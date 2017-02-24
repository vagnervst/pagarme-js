import Promise from 'bluebird'
import pagarme from '../../../../dist/pagarme'

function emailTemplates (client) {
  return Promise.props({
    find: client.company.emailTemplates.find(1234),
    update: client.company.emailTemplates.update({ id: 1235 }),
  })
}

describe('client.company.emailTemplates', () => {
  let response

  beforeAll(() => pagarme.client.connect({
    options: { baseURL: 'http://127.0.0.1:8080' },
    api_key: 'xxx',
  })
    .then(emailTemplates)
    .then((res) => { response = res })
  )


  describe('find', () => {
    it('should be a GET request', () => {
      expect(response.find.method).toBe('GET')
    })

    it('should use /company/email_templates/:id route', () => {
      expect(response.find.url).toBe('/company/email_templates/1234')
    })

    it('should have an api_key', () => {
      expect(response.find.body.api_key).toBeTruthy()
    })
  })

  describe('update', () => {
    it('should be a PUT request', () => {
      expect(response.update.method).toBe('PUT')
    })

    it('should use /company/email_templates/:id route', () => {
      expect(response.update.url).toBe('/company/email_templates/1235')
    })

    it('should have an api_key', () => {
      expect(response.update.body.api_key).toBeTruthy()
    })
  })
})

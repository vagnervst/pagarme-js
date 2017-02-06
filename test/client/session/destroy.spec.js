import Promise from 'bluebird'
import pagarme from '../../../dist/pagarme'
import { auth, postDeletePayload } from './mocks/destroy'


describe('client.session.destroy', () => {
  const client = pagarme.client
  let session
  let response

  describe('when called', () => {
    beforeAll(Promise.coroutine(function* newSession () {
      session = yield client.session.create({}, auth.email, auth.password)
    }))


    beforeAll(Promise.coroutine(function* deleteSesion () {
      response = yield client.session.destroy({}, session.session_id)
    }))

    it('should have a response = `{}`', () => {
      expect(response).toEqual({})
    })

    it('should have invalidated the session for future requests', () => {
      function assert (res) {
        expect(res.response.errors).toBeDefined()
        expect(res.response.errors).toEqual(expect.any(Array))
        expect(res.response.errors[0])
          .toEqual(expect.objectContaining({
            type: 'action_forbidden',
            parameter_name: null,
            message: 'Sessão inválida',
          }))
      }

      return client.transaction
        .create({ body: { session_id: session.session_id } }, postDeletePayload)
        .then(assert)
        .catch(assert)
    })
  })
})

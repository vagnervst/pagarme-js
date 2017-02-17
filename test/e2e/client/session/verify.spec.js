import Promise from 'bluebird'
import pagarme from '../../../../dist/pagarme'
import { auth } from '../../../shared/mocks/session/destroy'


describe('client.session.verify', () => {
  const client = pagarme.client
  let session
  let response

  beforeAll(Promise.coroutine(function* newSession () {
    session = yield client.session.create({}, auth.email, auth.password)
  }))

  describe('with a valid password', () => {
    beforeAll(Promise.coroutine(function* verifySession () {
      response =
        yield client
          .session
          .verify({ body: { session_id: session.session_id } }, {
            id: session.session_id,
            password: auth.password,
          })
    }))

    it('should return valid = true', () => {
      expect(response.valid).toEqual(true)
    })
  })

  describe('with an invalid password', () => {
    beforeAll(Promise.coroutine(function* verifySession () {
      response = yield client
          .session
          .verify({ body: { session_id: session.session_id } }, {
            id: session.session_id,
            password: '123123',
          })
    }))

    it('should return valid = false', () => {
      expect(response.valid).toEqual(false)
    })
  })

  describe('with different `id` and `session_id`', () => {
    beforeAll(Promise.coroutine(function* verifySession () {
      try {
        yield client
          .session
          .verify({ body: { session_id: session.session_id } }, {
            id: '123',
            password: auth.password,
          })
      } catch (err) {
        response = err
      }
    }))

    it('should return an error ', () => {
      expect(response).toBeInstanceOf(Error)
    })

    it('should have a "action_forbidden" error ', () => {
      expect(response.response.errors[0]).toEqual(expect.objectContaining({
        type: 'action_forbidden',
        message: 'Sessão inválida',
      }))
    })
  })
})

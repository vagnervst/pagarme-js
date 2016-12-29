import routes from '../routes'
import request from '../request'

const create = (opts, email, password) =>
  request.post(opts, routes.session, { email, password })

const verify = Promise.resolve(1)
const destroy = Promise.resolve(1)

export default {
  create,
  verify,
  destroy,
}


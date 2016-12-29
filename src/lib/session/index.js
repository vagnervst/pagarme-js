import routes from '../routes'
import request from '../request'

const create = (opts, email, password) =>
  request.post(opts, routes.session, { email, password })

export default {
  create,
}


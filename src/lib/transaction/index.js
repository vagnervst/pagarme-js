import routes from '../routes'
import request from '../request'

const get = (opts, id) =>
  request.get(opts, routes.transaction.details(id), {})

const create = (opts, body) =>
  request.post(opts, routes.transaction.base, body)

export default {
  get,
  create
}

import routes from '../routes'
import request from '../request'

const get = (opts, id) => request.get(opts, routes.transaction.details(id), {})

export default {
  get
}

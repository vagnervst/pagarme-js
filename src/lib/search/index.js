import routes from '../routes'
import request from '../request'

const execute = (opts, query) =>
  request.get(opts, routes.search, query)

export default execute

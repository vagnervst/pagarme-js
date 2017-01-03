import { merge } from 'ramda'
import routes from '../routes'
import request from '../request'

const resetPassword = (opts = {}, email) => {
  const newOpts = merge(opts, { qs: { email } })
  request.put(newOpts, routes.user.reset_password, {})
}

export default {
  resetPassword
}

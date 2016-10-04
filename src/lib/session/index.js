import fetch from 'node-fetch'
import url from '../client/url'

const create = (opts, email, password) =>
  url.post(opts, url.session, { email, password })

const verify = opts => Promise.resolve(1)
const destroy = opts => Promise.resolve(1)

export default {
	create,
	verify,
	destroy
}


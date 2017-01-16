import Promise from 'bluebird'
import fetch from 'node-fetch'
import {
  merge,
  length,
  keys,
} from 'ramda'
import qs from 'qs'
import routes from './routes'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

function ApiError (response) {
  this.response = response
  this.name = 'ApiError'
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ApiError)
  }
}

ApiError.prototype = Object.create(Error.prototype)
ApiError.prototype.constructor = ApiError

function buildRequestParams (method, endpoint, options, data) {
  let query = ''
  let body = ''
  let headers = options.headers || {}

  const payload = merge(
    options.body || {},
    data || {},
  )

  const queries = options.qs || {}

  if (length(keys(queries))) {
    query = `${qs.stringify(queries)}`
  }

  if (['GET', 'HEAD'].includes(method)) {
    if (length(keys(payload)) > 0) {
      query += `${query ? '&' : ''}${qs.stringify(payload, { encode: false })}`
    }
  } else if (length(keys(payload)) > 0) {
    body = JSON.stringify(payload)
    headers = merge(headers, defaultHeaders)
  }

  const url = `${endpoint}${query ? `?${query}` : ''}`

  /* eslint-disable */
  // console.log(
  //   'url:', url,
  //   '\nheaders:', headers,
  //   '\payload:', payload,
  //   '\nbody:', body,
  // )
  /* eslint-enable */

  return { url, params: { method, body, headers } }
}

function handleError (response) {
  if (response.status === 500) {
    return Promise.reject(
      new ApiError({
        errors: [{ message: 'Pagar.me server error' }],
      })
    )
  }

  return response.json()
    .then(body => Promise.reject(new ApiError(body)))
}


function handleResult (response) {
  if (response.ok) {
    return response.json()
  }

  return handleError(response)
}

function buildRequest (method) {
  return function request (options, path, body) {
    const endpoint = (options.baseURL || routes.base) + path
    const { url, params } = buildRequestParams(method, endpoint, options, body)

    return fetch(url, params).then(handleResult)
  }
}

export default {
  get: buildRequest('GET'),
  put: buildRequest('PUT'),
  post: buildRequest('POST'),
  delete: buildRequest('DELETE'),
}

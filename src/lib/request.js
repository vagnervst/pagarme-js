import Promise from 'bluebird'
import fetch from 'node-fetch'
import { equals, merge } from 'ramda'
import qs from 'querystring'
import routes from './routes'

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

function ApiError (response) {
  this.response = response
  this.name = 'ApiError'
  Error.captureStackTrace(this, ApiError)
}

ApiError.prototype = Object.create(Error.prototype)
ApiError.prototype.constructor = ApiError

function buildRequestParams (method, endpoint, options, data) {
  const config = options.body || {}
  const payload = merge(config, data || {})
  const headers = merge(options.headers, jsonHeaders)
  let body
  let path

  if (equals(method, 'GET') || options.qs) {
    let query

    if (options.qs) {
      query = merge(payload, options.qs)
      body = JSON.stringify(payload)
    } else {
      query = payload
      body = JSON.stringify({})
    }

    path = `${endpoint}?${qs.stringify(query)}`
  } else {
    body = JSON.stringify(payload)
    path = endpoint
  }

  return [path, { method, body, headers }]
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
    const [newEndpoint, newOptions] = buildRequestParams(method, endpoint, options, body)

    return fetch(newEndpoint, newOptions).then(handleResult)
  }
}

export default {
  get: buildRequest('GET'),
  put: buildRequest('PUT'),
  post: buildRequest('POST'),
  delete: buildRequest('DELETE'),
}

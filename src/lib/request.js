import Promise from 'bluebird'
import fetch from 'node-fetch'
import { merge } from 'ramda'
import routes from './routes'

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

function ApiError (response) {
  this.response = response
  this.name = 'ApiError'
  Error.captureStackTrace(this, ApiError)
}
ApiError.prototype = Object.create(Error.prototype)
ApiError.prototype.constructor = ApiError

function buildOptions (method, options, data) {
  const config = options.body || {}
  const payload = merge(config, data || {})
  const headers = merge(options.headers, jsonHeaders)
  const body = JSON.stringify(payload)
  return { method, body, headers }
}

function handleError (response) {
  if (response.status === 500) {
    return Promise.reject(
      new ApiError({
        errors: [{ message: 'Pagar.me server error' }]
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
  return function request (options, url, body) {
    return fetch(url, buildOptions(method, options, body)).then(handleResult)
  }
}

export default {
  get: buildRequest('GET'),
  put: buildRequest('PUT'),
  post: buildRequest('POST'),
  delete: buildRequest('DELETE')
}


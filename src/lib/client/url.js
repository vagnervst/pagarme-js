import Promise from 'bluebird'

import fetch from 'node-fetch'
import { merge } from 'ramda'
import path from 'path'

const url = 'https://api.pagar.me/1'
const session = url + '/sessions'
const transaction = url + '/transactions'

const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function ApiError (response) {
    this.response = response
    this.name = "ApiError"
    Error.captureStackTrace(this, ApiError)
}
ApiError.prototype = Object.create(Error.prototype)
ApiError.prototype.constructor = ApiError

function buildOptions (method, options, data) {
  const config = options.body || {}
  const payload = merge(config, data || {})
  const headers = merge(options.headers, jsonHeaders)
  const body = JSON.stringify(payload)
  console.log(body)
  return { method, body, headers } 
}

function handleResult (response) {
  if (response.ok) {
    return response.json()
  }

  return handleError(response)
}

function handleError (response) {
  if (response.status === 500) {
    return Promise.reject(
      new ApiError({
        errors: [{ message: "Pagar.me server error" }]
      })
    )
  }
  
  return response.json()
    .then(body => Promise.reject(new ApiError(body)))
}

function request (url, options) {
  return fetch(url, options).then(handleResult)
}

function get (options, url, body) {
  return request(url, buildOptions('GET', options, body))
}

function put (options, url, body) {
  return request(url, buildOptions('PUT', options, body))
}

function post (options, url, body) {
  return request(url, buildOptions('POST', options, body))
}

function _delete (options, url, body) {
  return request(url, buildOptions('DELETE', options, body))
}

export default {
  session,
  transaction,
  get,
  put,
  post,
  delete: _delete
}


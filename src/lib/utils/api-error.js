function ApiError (response) {
  this.response = response
  this.name = 'ApiError'
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ApiError)
  }
}

ApiError.prototype = Object.create(Error.prototype)
ApiError.prototype.constructor = ApiError

export default ApiError

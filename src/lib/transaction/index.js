module.exports = {
  get: function (opts, id) {
  	return Promise.resolve({id, opts})
  }
}

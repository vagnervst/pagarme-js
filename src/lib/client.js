const { mapObjIndexed } = require('ramda') 
const transaction = require('./transaction')
const strategy = require('./session/strategy')

const resources = { transaction }

const bindOptions = options => {
  const mapper = (val, key) => 
	typeof val === 'object'
	  && mapObjIndexed(mapper, val)
	  || val.bind(null, options)

  return mapObjIndexed(mapper, resources)
}

module.exports = {
  connect: function (authentication) {
	return strategy
		.find(authentication)
	  	.then(s => s.execute())
	  	.then(bindOptions)
  }
}

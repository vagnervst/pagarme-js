const { mapObjIndexed } = require('ramda') 
const transaction = require('./transaction')

const resources = { transaction }

const bindOptions = options => {
  const mapper = (val, key) => 
	typeof val === 'object'
	  && mapObjIndexed(mapper, val)
	  || val.bind(null, options)

  return mapObjIndexed(mapper, resources)
}

module.exports = {
  connect: function (strategy) {
    return strategy.execute().then(bindOptions)
  }
}

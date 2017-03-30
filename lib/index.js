import client from './client'
import validate from './validations'
import postback from './postback'
import resources from './resources'

export default Object.assign({
  client,
  validate,
  postback,
}, resources)


import {
  pipe,
  toString,
  replace,
  test,
} from 'ramda'

export default pipe(
  toString,
  replace(/"/g, "'"),
  test(/^[a-zA-Z_' ]*$/)
)

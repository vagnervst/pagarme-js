import {
  pipe,
  length,
  equals,
  replace,
  toString,
} from 'ramda'

const clean = replace(/[^0-9]+/g, '')

export default size => pipe(
  toString,
  clean,
  length,
  equals(size)
)

import {
  both,
  gte,
  lte,
  pipe,
  __,
} from 'ramda'

const validate = both(gte(__, 1), lte(__, 12))

export default pipe(
  parseInt,
  validate
)

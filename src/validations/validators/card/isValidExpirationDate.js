import {
  and,
  replace,
  modulo,
  add,
  prop,
  gt,
  lt,
  lte,
  equals,
  length,
  both,
  splitEvery,
  zipObj,
  merge,
  cond,
  pipe,
  ifElse,
  toString,
  T,
  F,
} from 'ramda'

const clean = replace(/[^0-9]/g, '')

const getCurrentDate = () => {
  const date = new Date()

  return {
    currentYear: modulo(date.getFullYear(), 1000),
    currentMonth: add(date.getMonth(), 1),
  }
}

const cardDateLessThanCurrentDate = (props, dates) =>
  lt(prop(props[0], dates), prop(props[1], dates))

const isInvalidYear = dates =>
  cardDateLessThanCurrentDate(['year', 'currentYear'], dates)

const monthLessThanCurrentMonth = dates =>
  cardDateLessThanCurrentDate(['month', 'currentMonth'], dates)

const yearEqualsCurrentYear = dates =>
  equals(prop('year', dates), prop('currentYear', dates))

const isExpiredDate = both(
  yearEqualsCurrentYear,
  monthLessThanCurrentMonth
)

const isValidMonth = (dates) => {
  const month = prop('month', dates)

  return and(
    lte(month, 12),
    gt(month, 0)
  )
}

const validateDate = (date) => {
  const dateArray = splitEvery(2, date).map(Number)
  const dateObj = zipObj(['month', 'year'], dateArray)

  const dates = merge(dateObj, getCurrentDate())

  return cond([
    [isExpiredDate, F],
    [isInvalidYear, F],
    [T, isValidMonth],
  ])(dates)
}

const validate = (date) => {
  const lengthIsFour = pipe(
    length,
    equals(4)
  )

  return ifElse(
    lengthIsFour,
    validateDate,
    F
  )(date)
}

export default pipe(
  toString,
  clean,
  validate
)

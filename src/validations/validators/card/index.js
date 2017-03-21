import {
  __,
  pipe,
  prop,
  replace,
  splitEvery,
} from 'ramda'
import getBrand from './getBrand'
import isValidCvv from './cvv'
import isValidCardNumber from './isValidCardNumber'
import isValidExpirationMonth from './isValidExpirationMonth'
import isValidExpirationYear from './isValidExpirationYear'
import isValidExpirationDate from './isValidExpirationDate'
import isValidHolderName from './isValidHolderName'

const validateCardData = (card) => {
  const cleanDate = replace(/[^0-9]/g, '', prop('card_expiration_date', card))
  const [month, year] = splitEvery(2, cleanDate).map(Number)

  const validateCardHolderName = pipe(
    prop('card_holder_name'),
    isValidHolderName
  )

  const validateCardNumber = pipe(
    prop('card_number'),
    isValidCardNumber
  )

  const validateExpirationDate = pipe(
    prop('card_expiration_date'),
    isValidExpirationDate
  )

  const brand = getBrand(prop('card_number', card))

  const validateCvv = pipe(
    prop('card_cvv'),
    isValidCvv(__, brand)
  )

  return {
    card_holder_name: validateCardHolderName(card),
    card_number: validateCardNumber(card),
    card_expiration_date: validateExpirationDate(card),
    card_expiration_month: isValidExpirationMonth(month),
    card_expiration_year: isValidExpirationYear(year),
    brand,
    card_cvv: validateCvv(card),
  }
}

export default validateCardData

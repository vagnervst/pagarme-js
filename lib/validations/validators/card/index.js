import {
  __,
  pipe,
  prop,
  has,
  not,
  omit,
  both
} from 'ramda'
import getBrand from './getBrand'
import isValidCvv from './cvv'
import isValidCardNumber from './isValidCardNumber'
import isValidCardNumberLength from './isValidCardNumberLength'
import isValidExpirationDate from './isValidExpirationDate'
import isValidHolderName from './isValidHolderName'

const validProps = [
  'card_holder_name',
  'card_number',
  'card_expiration_date',
  'card_cvv',
]

const missingProps = (card) => {
  const cardIsMissingProp = pipe(has(__, card), not)
  return validProps.filter(cardIsMissingProp)
}

const missingNumber = pipe(
  has('card_number'),
  not
)

const validateCardData = (card) => {
  if (missingNumber(card)) {
    throw new Error('Missing card number')
  }

  const validateExpirationDate = pipe(
    prop('card_expiration_date'),
    isValidExpirationDate
  )

  const validateCardHolderName = pipe(
    prop('card_holder_name'),
    isValidHolderName
  )

  const brand = getBrand(prop('card_number', card))

  const validateCardNumber = pipe(
    prop('card_number'),
    both(
      (__) => isValidCardNumberLength,
      isValidCardNumber,
    )
  )

  const validateCvv = pipe(
    prop('card_cvv'),
    isValidCvv(__, brand)
  )

  const validated = {
    brand,
    card_holder_name: validateCardHolderName(card),
    card_number: validateCardNumber(card),
    card_expiration_date: validateExpirationDate(card),
    card_cvv: brand ? validateCvv(card) : false,
  }

  return omit(missingProps(card), validated)
}

export default validateCardData

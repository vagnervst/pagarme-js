import {
  tap,
  replace,
  pipe,
  equals,
  cond,
  applySpec,
  T
} from 'ramda'

const clean = replace(/[^0-9]/g, '')

const isElo = equals('ELO')
const isValidDiscover = equals('discover')
const isValidHipercard = equals('hipercard')
const isValidDinners = equals('Dinners')
const isValidAura = equals('Aura')
const isValidJcb = equals('jcb')
const isValidVisa = equals('visa')
const isValidMastercard = equals('mastercard')





const validate = (cardNumber) => {
  console.log(cardNumber)
  return true
}


export default pipe(
  tap(console.log),
  //toString,
  tap(console.log),
  clean,
  validate
)


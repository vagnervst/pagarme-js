import {
  anyPass,
} from 'ramda'

import { cnpj, cpf } from './cnpj-and-cpf'
import numberSize from './numberSize'
import email from './email'
import card from './card'

const ddd = numberSize(2)
const phone = anyPass([numberSize(8), numberSize(9)])
const zipcode = numberSize(8)

export default {
  cnpj,
  cpf,
  ddd,
  email,
  phone,
  zipcode,
  card,
}

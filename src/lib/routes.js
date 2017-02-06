const base = 'https://api.pagar.me:443/1'

const session = {
  base: '/sessions',
  get destroy () {
    return id => `/sessions/${id}`
  },
}

const transaction = {
  base: '/transactions',
  card_hash_key: '/transactions/card_hash_key',
  calculate_installments_amount: '/transactions/calculate_installments_amount',
  details: id => `/transactions/${id}`,
  refund: id => `/transactions/${id}/refund`,
  capture: id => `/transactions/${id}/capture`,
}

const search = '/search'

const user = {
  base: '/users',
  reset_password: '/users/reset_password',
}

const company = {
  base: '/companies',
  temporary: '/companies/temporary',
}

export default {
  base,
  company,
  session,
  transaction,
  search,
  user,
}

const base = 'https://api.pagar.me:443/1'

const session = '/sessions'

const transaction = {
  base: '/transactions',
  card_hash_key: '/transactions/card_hash_key',
  calculate_installments_amount: '/transactions/calculate_installments_amount',
  get details () {
    return id => `/transactions/${id}`
  },
  get refund () {
    return id => `/transactions/${id}/refund`
  },
  get capture () {
    return id => `/transactions/${id}/capture`
  },
}

const search = '/search'

const user = {
  base: '/users',
  reset_password: '/users/reset_password',
}

export default {
  base,
  session,
  transaction,
  search,
  user,
}

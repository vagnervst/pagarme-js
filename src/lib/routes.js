const base = 'https://api.pagar.me:443/1'

const session = {
  base: '/sessions',
  destroy: id => `/sessions/${id}`,
  verify: id => `/sessions/${id}/verify`,
}

const transaction = {
  base: '/transactions',
  cardHashKey: '/transactions/card_hash_key',
  calculateInstallmentsAmount: '/transactions/calculate_installments_amount',
  details: id => `/transactions/${id}`,
  refund: id => `/transactions/${id}/refund`,
  capture: id => `/transactions/${id}/capture`,
  payables: {
    findAll: id => `/transactions/${id}/payables`,
    find: (id, payableId) => `/transactions/${id}/payables/${payableId}`,
  },
  splitRules: {
    findAll: id => `/transactions/${id}/split_rules`,
    find: (id, splitId) => `/transactions/${id}/split_rules/${splitId}`,
  },
  collectPayment: id => `/transactions/${id}/collect_payment`,
}

const invite = {
  base: '/invites',
  details: id => `/invites/${id}`,
}

const search = '/search'

const user = {
  base: '/users',
  resetPassword: '/users/reset_password',
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
  invite,
}

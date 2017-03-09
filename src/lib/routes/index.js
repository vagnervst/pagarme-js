const base = 'https://api.pagar.me:443/1'

const session = {
  base: '/sessions',
  destroy: id => `/sessions/${id}`,
  verify: id => `/sessions/${id}/verify`,
}

const transactions = {
  base: '/transactions',
  cardHashKey: '/transactions/card_hash_key',
  calculateInstallmentsAmount: '/transactions/calculate_installments_amount',
  details: id => `/transactions/${id}`,
  refund: id => `/transactions/${id}/refund`,
  capture: id => `/transactions/${id}/capture`,
  collectPayment: id => `/transactions/${id}/collect_payment`,
  antifraudAnalyses: {
    findAll: id => `/transactions/${id}/antifraud_analyses`,
    find: (id, antifraudId) => `/transactions/${id}/antifraud_analyses/${antifraudId}`,
  },
}

const payables = {
  base: '/payables',
  transaction: transactionId => `/transactions/${transactionId}/payables`,
  find: id => `/payables/${id}`,
}

const invites = {
  base: '/invites',
  details: id => `/invites/${id}`,
}

const recipients = {
  base: '/recipients',
  details: id => `/recipients/${id}`,
  balance: id => `/recipients/${id}/balance`,
}

const bulkAnticipations = {
  base: recipientId => `/recipients/${recipientId}/bulk_anticipations`,
  details: (recipientId, id) => `/recipients/${recipientId}/bulk_anticipations/${id}`,
  limits: recipientId => `/recipients/${recipientId}/bulk_anticipations/limits`,
  days: (recipientId, id) => `/recipients/${recipientId}/bulk_anticipations/${id}/days`,
  confirm: (recipientId, id) => `/recipients/${recipientId}/bulk_anticipations/${id}/confirm`,
  cancel: (recipientId, id) => `/recipients/${recipientId}/bulk_anticipations/${id}/cancel`,
}

const search = '/search'

const user = {
  base: '/users',
  resetPassword: '/users/reset_password',
}

const company = {
  basePlural: '/companies',
  base: '/company',
  temporary: '/companies/temporary',
  activate: '/companies/activate',
  resetKeys: '/company/reset_keys',
  affiliationProgress: '/company/affiliation_progress',
  branding: id => `/company/branding/${id}`,
  emailTemplates: id => `/company/email_templates/${id}`,
}

const splitRules = {
  findAll: transactionId => `/transactions/${transactionId}/split_rules`,
  find: (transactionId, splitId) => `/transactions/${transactionId}/split_rules/${splitId}`,
}

const antifraudAnalyses = {
  findAll: transactionId => `/transactions/${transactionId}/antifraud_analyses`,
  find: (transactionId, antifraudId) => `/transactions/${transactionId}/antifraud_analyses/${antifraudId}`,
}

const bankAccounts = {
  base: '/bank_accounts',
  details: id => `/bank_accounts/${id}`,
}

const plans = {
  base: '/plans',
  details: id => `/plans/${id}`,
}

const acquirersConfigurations = {
  base: '/acquirers_configurations',
  details: id => `/acquirers_configuration/${id}`,
}

const acquirers = {
  base: '/acquirers',
  details: id => `/acquirer/${id}`,
}

const subscriptions = {
  base: '/subscriptions',
  details: id => `/subscriptions/${id}`,
  cancel: id => `/subscriptions/${id}/cancel`,
  transactions: id => `/subscriptions/${id}/transactions`,
}

const transfers = {
  base: '/transfers',
  details: id => `/transfers/${id}`,
  days: '/transfers/days',
  limits: '/transfers/limits',
  cancel: id => `/transfers/${id}/cancel`,
}

export default {
  base,
  company,
  session,
  transactions,
  search,
  user,
  invites,
  splitRules,
  antifraudAnalyses,
  payables,
  recipients,
  bulkAnticipations,
  bankAccounts,
  plans,
  acquirersConfigurations,
  acquirers,
  subscriptions,
  transfers,
}

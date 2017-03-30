import runTest from '../../test/runTest'

test('client.balance.primary', () => {
  return runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.balance.primary(),
    method: 'GET',
    url: '/balance',
    body: {
      api_key: 'abc123',
    },
  })
})

test('client.balance.find', () => {
  return runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.balance.find({
      recipientId: 1234
    }),
    method: 'GET',
    url: '/recipients/1234/balance',
    body: {
      api_key: 'abc123',
    },
  })
})

import runTest from '../../test/runTest'

test('client.balance', () => {
  return runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.balance(),
    method: 'GET',
    url: '/balance',
    body: {
      api_key: 'abc123',
    },
  })
})


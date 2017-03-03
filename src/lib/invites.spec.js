import runTest from '../../test/runTest'

test('client.invites.create', () => {
  return runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.invites.create({
      email: 'abc@d.com',
      permission: 'admin',
    }),
    method: 'POST',
    url: '/invites',
    body: {
      api_key: 'abc123',
      email: 'abc@d.com',
      permission: 'admin',
    },
  })
})

test('client.invites.destroy', () => {
  return runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.invites.destroy({
      id: 1234,
    }),
    method: 'DELETE',
    url: '/invites/1234',
    body: {
      api_key: 'abc123',
    },
  })
})

test('client.invites.find', () => {
  return runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.invites.find({
      id: 1234,
    }),
    method: 'GET',
    url: '/invites/1234',
    body: {
      api_key: 'abc123',
    },
  })
})

test('client.invites.findAll', () => {
  return runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.invites.find({}),
    method: 'GET',
    url: '/invites',
    body: {
      api_key: 'abc123',
    },
  })
})

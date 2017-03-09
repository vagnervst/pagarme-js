import runTest from '../../test/runTest'
import Promise from 'bluebird'
import { merge } from 'ramda'

const findOptions = {
  connect: {
    api_key: 'abc123',
  },
  method: 'GET',
  body: {
    api_key: 'abc123',
  },
}

test('client.operations.find', () => {
  const find = runTest(merge(findOptions, {
    subject: client => client.operations.find({ id: 1337 }),
    url: '/balance/operations/1337',
  }))

  const findAll = runTest(merge(findOptions, {
    subject: client => client.operations.find({
      count: 10,
      page: 2,
      status: 'available',
    }),
    url: '/balance/operations',
  }))

  return Promise.props({
    find,
    findAll,
  })
})

test('client.operations.all', () => {
  return runTest(merge(findOptions, {
    subject: client => client.operations.find({
      count: 10,
      page: 2,
      status: 'available',
    }),
    url: '/balance/operations',
  }))
})

test('client.operations.days', () => {
  return runTest(merge(findOptions, {
    subject: client => client.operations.days(),
    url: '/balance/operations/days',
  }))
})

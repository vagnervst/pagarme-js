import runTest from '../../test/runTest'

test('client.paymentLinks.create', () =>
  runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.paymentLinks.create({
      amount: 1000,
      items: [
        {
          id: '1',
          title: 'Bola de futebol',
          unit_price: 400,
          quantity: 1,
          tangible: true,
        },
        {
          id: 'a123',
          title: 'Caderno do Goku',
          unit_price: 600,
          quantity: 1,
          tangible: true,
        },
      ],
    }),
    method: 'POST',
    url: '/payment_links',
    body: {
      api_key: 'abc123',
      amount: 1000,
      items: [
        {
          id: '1',
          title: 'Bola de futebol',
          unit_price: 400,
          quantity: 1,
          tangible: true,
        },
        {
          id: 'a123',
          title: 'Caderno do Goku',
          unit_price: 600,
          quantity: 1,
          tangible: true,
        },
      ],
    },
  })
)

export default {
  type: 'transaction',
  query: {
    query: {
      filtered: {
        query: {
          match_all: {},
        },
        filter: {
          and: [
            {
              range: {
                date_created: {
                  lte: '2016-01-31',
                  gte: '2016-01-01',
                },
              },
            },
            {
              or: [
                {
                  term: {
                    status: 'waiting_payment',
                  },
                },
                {
                  term: {
                    status: 'paid',
                  },
                },
              ],
            },
          ],
        },
      },
    },
    sort: [
      {
        date_created: {
          order: 'desc',
        },
      },
    ],
    size: 5,
    from: 0,
  },
}


import {
  merge,
} from 'ramda'

import pagarme from '../dist/pagarme'


export default function (test) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000
  const opts = {
    options: { baseURL: 'http://127.0.0.1:8080' },
  }
  return pagarme.client.connect(merge(opts, test.connect))
    .then(test.subject)
    .then((response) => {
      expect(response.method).toBe(test.method)
      expect(response.url).toBe(test.url)
      expect(response.body).toMatchObject(test.body)
    })
}


import qs from 'qs'
import {
  concat,
  tail,
  pipe,
  split,
  head,
  propEq,
  curry,
} from 'ramda'

const parsers = {
  get: {
    url: pipe(
      split('?'),
      head
    ),
    body: pipe(
      split('?'),
      tail,
      concat(''),
      qs.parse
    ),
  },
  post: {
    body: pipe(
      Buffer.concat.bind(Buffer),
      chunks => chunks.toString('utf8'),
      JSON.parse
    ),
  },
}

const isGetRequest = propEq('method', 'GET')

const parse = curry((chunks, req) => {
  if (isGetRequest(req)) {
    return {
      url: parsers.get.url(req.url),
      body: parsers.get.body(req.url),
    }
  }
  return {
    url: req.url,
    body: parsers.post.body(chunks),
  }
})

module.exports = parse

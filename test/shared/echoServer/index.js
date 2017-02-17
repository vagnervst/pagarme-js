import http from 'http'
import {
  pipe,
  pickAll,
  mergeAll,
  of as wrapInArray,
  ap as applyFunctions,
} from 'ramda'
import parseUrlAndBody from './parsers'

export default function (port) {
  const server = http.createServer((req, res) => {
    const chunks = []

    req.on('data', (chunk) => {
      chunks.push(chunk)
    })

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })

      const headerAndMethod = pickAll(['headers', 'method'])

      const respond = pipe(
        wrapInArray,
        applyFunctions([
          headerAndMethod,
          parseUrlAndBody(chunks),
        ]),
        mergeAll,
        JSON.stringify,
        res.end.bind(res),
      )

      respond(req)
    })
  })

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server))
  })
}

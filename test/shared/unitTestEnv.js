import Promise from 'bluebird'
import openport from 'openport'
import { merge, cond, equals, T, always, partial } from 'ramda'
import pagarme from '../../dist/pagarme'
import spawnEchoServer from './echoServer'

Promise.promisifyAll(openport)

const ports = {
  startingPort: 2000,
  endingPort: 5000,
}

function createServer () {
  return openport.findAsync(ports)
    .then(spawnEchoServer)
}

function chooseStrategy (company, strategy) {
  const apiKey = {
    api_key: company.api_key.test,
  }

  const encryptionKey = {
    encryption_key: company.encryption_key.test,
  }

  const pickStrategy = cond([
    [equals('api'), always(apiKey)],
    [equals('encryption'), always(encryptionKey)],
    [T, always(apiKey)]
  ])

  return pickStrategy(strategy)
}

function start (strategy, { company, server }) {
  const { port } = server.address()
  const chosenStrategy = chooseStrategy(company, strategy)
  const opts = merge(chosenStrategy, { options: { baseURL: `http://0.0.0.0:${port}`, }, })
  
  return pagarme.client.connect(opts)
    .then(client => ({
      client,
      server,
    }))
}

export default function connect ({ strategy } = { strategy: 'api' }) {
  return Promise.props({
    company: pagarme.client.company.createTemporary(),
    server: createServer(),
  })
    .then(partial(start, [strategy]))
}


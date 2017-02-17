import Promise from 'bluebird'
import openport from 'openport'
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

function start ({ company, server }) {
  const port = server.address().port

  return pagarme.client.connect({
    api_key: company.api_key.test,
    options: {
      baseURL: `http://0.0.0.0:${port}`,
    },
  })
    .then(client => ({
      client,
      server,
    }))
}

export default function connect () {
  return Promise.props({
    company: pagarme.client.company.createTemporary(),
    server: createServer(),
  })
    .then(start)
}


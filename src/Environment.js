const { Environment, Network, RecordSource, Store } = require('relay-runtime')

const RELAY_ENDPOINT =
  'https://api.graph.cool/relay/v1/cj4o4ce3254yd0149cj1im4l1'

const fetchQuery = (operation, variables) => {
  return fetch(RELAY_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json()
  })
}

const network = Network.create(fetchQuery)

const source = new RecordSource()
const store = new Store(source)

export default new Environment({
  network,
  store
})

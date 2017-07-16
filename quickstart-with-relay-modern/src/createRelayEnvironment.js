const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')


function fetchQuery(
  operation,
  variables,
) {
  
  return fetch('https://api.graph.cool/relay/v1/cj56quv3zdtuq0181s0121qe8', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const network = Network.create(fetchQuery)

const source = new RecordSource()
const store = new Store(source)

export default new Environment({
  network,
  store,
})

import {
  Environment,
  Network,
  RecordSource,
  Store,
  QueryResponseCache
} from 'relay-runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const cache = new QueryResponseCache({ size: 25, ttl: 1000 })

const RELAY_ENDPOINT =
  'https://api.graph.cool/relay/v1/cj4o4ce3254yd0149cj1im4l1'
const SUBSCRIPTIONS_ENDPOINT =
  'wss://subscriptions.graph.cool/v1/cj4o4ce3254yd0149cj1im4l1'

const fetchQuery = (operation, variables) => {
  const cached = cache.get(operation.text, variables)
  if (cached) {
    return cached.payload
  }
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
  })
    .then(response => response.json())
    .then(data => {
      cache.set(operation.text, variables, data)
      return data
    })
}

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient(SUBSCRIPTIONS_ENDPOINT, {
    reconnect: true
  })
  subscriptionClient.subscribe({ query, variables }, (error, result) => {
    observer.onNext({ data: result })
  })
}

const network = Network.create(fetchQuery, setupSubscription)
const store = new Store(new RecordSource())
export default new Environment({
  network,
  store
})

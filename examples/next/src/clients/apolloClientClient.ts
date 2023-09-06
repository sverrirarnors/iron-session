import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  from,
  DefaultOptions,
} from '@apollo/client'

import { onError } from '@apollo/client/link/error'

const cache = new InMemoryCache({
  typePolicies: {
    EventType: {
      keyFields: ['id'],
    },
    RegistrationType: {
      keyFields: ['id'],
    },
    UserType: {
      keyFields: ['id'],
    },
  },
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
  },
  query: {
    // fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }

  if (networkError) console.error(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API })
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: from([errorLink, httpLink]),
  defaultOptions,
})

export default client

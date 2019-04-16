import fetch from "node-fetch";
import ApolloClient from "apollo-boost";

export const isBrowser = typeof window !== "undefined";

export type ApolloConfig = {
  uri: string;
  resolvers: any;
} | null;

let apolloClient;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

const create = (initialState, config: ApolloConfig) => {
  const client = new ApolloClient({
    uri: config!.uri,
    resolvers: config!.resolvers,
  });

  if (initialState) {
    client.cache.restore(initialState);
  }

  return client;
};

const initApollo = (initialState, apolloConfig) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, apolloConfig);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, apolloConfig);
  }

  return apolloClient;
};

export { initApollo };

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: "http://127.0.0.1:8055/graphql"
})

export const provider = createApolloProvider({
    defaultClient: apolloClient,
})
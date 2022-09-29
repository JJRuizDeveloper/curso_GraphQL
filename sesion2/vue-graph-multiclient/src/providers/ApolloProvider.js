import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

// Para evitar la consulta repetitiva de los datos usamos cachés
const cache = new InMemoryCache();

// Cliente de Apollo para conectar al servidor de Directus
const directusClient = new ApolloClient({
    cache: cache,
    // La uri debería de ir a una variable de entorno
    uri: 'http://localhost:8055/graphql'
});

// Cliente de Apollo para conectar al servidor de Apollo
const apolloClient = new ApolloClient({
    cache: cache,
    uri: 'http://localhost:4000/'
});

// El provider que utilizaremos para realizar las peticiones GraphQL necesita de un cliente
export const provider = createApolloProvider({
    clients: {
        directusClient,
        apolloClient
    },
    defaultClient: directusClient
})
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { DirectusAPI } from "./datasources/DirectusAPI.js";

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    csrfPrevention: true,
    cache: "bounded",
    dataSources: () => {
        return {
            authorAPI: new DirectusAPI('authors'),
            bookAPI: new DirectusAPI('books'),
            forumAPI: new DirectusAPI('forums'),
            reviewAPI: new DirectusAPI('reviews')
        };
      },
});

server.listen().then( ({url}) => {
    console.log(`Server ready at ${url}`)
});